import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import { Icon } from './Icon';
import { T } from '../theme/theme';
import { getInventory, resolveInventoryLabel, type InvolvedEquipmentInput } from '../api/mobile';

// CAIXA ALTA sem acento — mesma convenção dos selects.
const upper = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().trim().replace(/\s+/g, ' ');

/**
 * Bloco "Equipamentos envolvidos" da OS (app) — lista opcional 0..N de quem deu
 * problema. Cada entrada vem do inventário (busca por nome/etiqueta/patrimônio)
 * ou por texto livre quando o equipamento ainda não está cadastrado. Ver
 * docs/WORK_ORDER_EQUIPMENT_AND_TAXONOMY.md (repo do servidor).
 */
export function InvolvedEquipmentBlock({
  token, value, onChange, highlight,
}: {
  token: string | null;
  value: InvolvedEquipmentInput[];
  onChange: (next: InvolvedEquipmentInput[]) => void;
  highlight?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{ id: string; name: string; assetTag: string | null; serialNumber?: string | null; unitName?: string | null; room?: string | null; currentLocation?: string | null }>>([]);
  const [loading, setLoading] = useState(false);
  const [freeText, setFreeText] = useState('');
  const [scanOpen, setScanOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const scanLock = useRef(false);

  // Browse (q vazio) = lista equipamentos patrimoniados; digitar filtra. Só busca
  // com o seletor aberto — não consome rede à toa.
  useEffect(() => {
    if (!pickerOpen) return;
    const term = query.trim();
    let alive = true;
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const items = await getInventory(token, term ? { q: term } : {});
        if (alive) {
          setResults(items
            .filter((i) => (i as { itemType?: string }).itemType !== 'consumable')
            .slice(0, 12)
            .map((i) => ({ id: i.id, name: i.name, assetTag: i.assetTag, serialNumber: i.serialNumber, unitName: i.unitName, room: i.room, currentLocation: (i as { currentLocation?: string | null }).currentLocation })));
        }
      } catch {
        if (alive) setResults([]);
      } finally {
        if (alive) setLoading(false);
      }
    }, term ? 350 : 0);
    return () => { alive = false; clearTimeout(timer); };
  }, [query, token, pickerOpen]);

  const has = (id: string) => value.some((e) => e.itemId === id);
  const addItem = (it: { id: string; name: string; assetTag: string | null; serialNumber?: string | null; unitName?: string | null; room?: string | null; currentLocation?: string | null }) => {
    if (!has(it.id)) onChange([...value, {
      itemId: it.id, itemName: it.name, itemAssetTag: it.assetTag,
      itemSerialNumber: it.serialNumber, itemUnitName: it.unitName, itemRoom: it.room, itemCurrentLocation: it.currentLocation,
      problemNote: null,
    }]);
    setQuery(''); setPickerOpen(false);
  };
  // Texto de local a partir de unidade/setor/local livre.
  const localOf = (e: InvolvedEquipmentInput) => [e.itemUnitName, e.itemRoom].filter(Boolean).join(' / ') || e.itemCurrentLocation || '';
  const addFree = () => {
    const t = upper(freeText.trim());
    if (!t) return;
    onChange([...value, { freeText: t, problemNote: null }]);
    setFreeText(''); setPickerOpen(false);
  };

  const openScanner = async () => {
    if (!permission?.granted) {
      const res = await requestPermission();
      if (!res.granted) return;
    }
    scanLock.current = false;
    setPickerOpen(false);
    setScanOpen(true);
  };
  const onScanned = async ({ data }: BarcodeScanningResult) => {
    if (scanLock.current) return;
    scanLock.current = true;
    setScanOpen(false);
    try {
      // O QR guarda a URL .../i/<code>?c=<n>; resolveInventoryLabel normaliza.
      const r = await resolveInventoryLabel(token, String(data || ''));
      if (r.itemId) {
        if (!has(r.itemId)) onChange([...value, { itemId: r.itemId, labelCode: r.code, itemName: r.code, problemNote: null }]);
      } else {
        onChange([...value, { labelCode: r.code, freeText: r.code, problemNote: null }]);
      }
    } catch {
      // etiqueta não resolvida — guarda o texto lido como referência
      const code = String(data || '').split('/i/').pop()?.split('?')[0] || String(data || '');
      if (code) onChange([...value, { freeText: upper(code), problemNote: null }]);
    }
  };
  const removeAt = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const setProblem = (i: number, note: string) => onChange(value.map((e, idx) => (idx === i ? { ...e, problemNote: note } : e)));

  return (
    <View style={{ gap: 10, borderRadius: 12, borderWidth: highlight ? 1.5 : 0, borderColor: highlight ? T.primary : 'transparent', padding: highlight ? 10 : 0, backgroundColor: highlight ? `${T.primary}0D` : 'transparent' }}>
      <Text style={{ fontSize: 12, color: T.muted }}>
        Opcional. Aponte o(s) equipamento(s) que deram problema — do inventário ou por descrição.
      </Text>

      {value.map((e, i) => (
        <View key={i} style={{ gap: 8, borderRadius: 10, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, padding: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icon name="monitor" size={16} color={T.primary} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13.5, fontWeight: '700', color: T.text }} numberOfLines={1}>
                {e.itemName || e.freeText || e.labelCode || 'Equipamento'}
                {(e.itemAssetTag || e.labelCode) ? `  ·  ${e.itemAssetTag || e.labelCode}` : ''}
              </Text>
              <Text style={{ fontSize: 10.5, color: T.faint }} numberOfLines={1}>
                {[e.itemSerialNumber ? `SÉRIE ${e.itemSerialNumber}` : null, localOf(e) ? `LOCAL ${localOf(e)}` : null]
                  .filter(Boolean).join('  ·  ') || (e.itemId ? 'do inventário' : 'sem cadastro')}
              </Text>
            </View>
            <Pressable onPress={() => removeAt(i)} hitSlop={8}><Icon name="x" size={16} color={T.danger} /></Pressable>
          </View>
          <TextInput
            value={e.problemNote ?? ''}
            onChangeText={(v) => setProblem(i, v)}
            placeholder="Qual o problema? (opcional)"
            placeholderTextColor={T.faint}
            style={{ height: 38, borderRadius: 9, borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted, paddingHorizontal: 12, fontSize: 13, color: T.text }}
          />
        </View>
      ))}

      {/* Abre o seletor (bottom-sheet), igual ao Solicitante — não polui a tela. */}
      <Pressable onPress={() => { setQuery(''); setPickerOpen(true); }}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 46, borderRadius: 11, borderWidth: 1, borderColor: T.primary, backgroundColor: `${T.primary}0E` }}>
        <Icon name="plus" size={16} color={T.primary} />
        <Text style={{ fontSize: 13.5, fontWeight: '800', color: T.primary }}>Adicionar equipamento</Text>
      </Pressable>

      {/* Seletor bottom-sheet: busca + lista contida + QR + texto livre */}
      <Modal visible={pickerOpen} transparent animationType="slide" onRequestClose={() => setPickerOpen(false)}>
        <Pressable onPress={() => setPickerOpen(false)} style={{ flex: 1, backgroundColor: 'rgba(15,23,42,.45)', justifyContent: 'flex-end' }}>
          <Pressable onPress={() => {}} style={{ backgroundColor: T.bg, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: 520, paddingTop: 10, paddingBottom: 24 }}>
            <View style={{ alignItems: 'center', paddingBottom: 8 }}>
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: T.border }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: '800', color: T.text }}>Equipamento envolvido</Text>
              <Pressable onPress={() => setPickerOpen(false)} hitSlop={10}><Icon name="x" size={20} color={T.muted} /></Pressable>
            </View>

            <View style={{ paddingHorizontal: 16, gap: 10 }}>
              <Pressable onPress={openScanner}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 44, borderRadius: 11, borderWidth: 1, borderColor: T.primary, backgroundColor: `${T.primary}0E` }}>
                <Icon name="qr" size={16} color={T.primary} />
                <Text style={{ fontSize: 13.5, fontWeight: '800', color: T.primary }}>Ler QR da etiqueta</Text>
              </Pressable>

              <View style={{ height: 46, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Icon name="search" size={15} color={T.muted} />
                <TextInput value={query} onChangeText={setQuery} placeholder="Buscar patrimoniado…" placeholderTextColor={T.faint} autoFocus style={{ flex: 1, fontSize: 14, color: T.text }} />
                {loading && <ActivityIndicator size="small" color={T.primary} />}
              </View>
            </View>

            <ScrollView keyboardShouldPersistTaps="handled" style={{ marginTop: 8 }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}>
              {results.map((it) => (
                <Pressable key={it.id} onPress={() => addItem(it)} disabled={has(it.id)}
                  style={{ paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: T.border, opacity: has(it.id) ? 0.4 : 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: T.text }}>
                    {it.name}{it.assetTag ? `  ·  ${it.assetTag}` : ''}
                  </Text>
                  <Text style={{ fontSize: 11.5, color: T.faint }}>
                    {[
                      it.serialNumber ? `SÉRIE ${it.serialNumber}` : null,
                      [it.unitName, it.room].filter(Boolean).join(' / ') || it.currentLocation || 'sem local',
                    ].filter(Boolean).join('  ·  ')}
                  </Text>
                </Pressable>
              ))}
              {!loading && results.length === 0 && (
                <Text style={{ fontSize: 12.5, color: T.muted, paddingVertical: 12 }}>Nenhum equipamento. Use a descrição abaixo.</Text>
              )}
            </ScrollView>

            <View style={{ paddingHorizontal: 16, paddingTop: 8, flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <TextInput value={freeText} onChangeText={setFreeText} placeholder="Sem cadastro? Descreva…" placeholderTextColor={T.faint} onSubmitEditing={addFree}
                style={{ flex: 1, height: 44, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted, paddingHorizontal: 12, fontSize: 13.5, color: T.text }} />
              <Pressable onPress={addFree} disabled={!freeText.trim()}
                style={{ height: 44, paddingHorizontal: 16, borderRadius: 11, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center', opacity: freeText.trim() ? 1 : 0.5 }}>
                <Text style={{ fontSize: 13, fontWeight: '800', color: '#fff' }}>Adicionar</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Câmera de leitura do QR/etiqueta */}
      <Modal visible={scanOpen} animationType="slide" onRequestClose={() => setScanOpen(false)}>
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <CameraView
            style={{ flex: 1 }}
            barcodeScannerSettings={{ barcodeTypes: ['qr', 'ean13', 'code128', 'code39'] }}
            onBarcodeScanned={onScanned}
          />
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, paddingTop: 54, paddingHorizontal: 20, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>Aponte para o QR da etiqueta</Text>
          </View>
          <Pressable onPress={() => setScanOpen(false)}
            style={{ position: 'absolute', bottom: 44, alignSelf: 'center', paddingHorizontal: 26, paddingVertical: 13, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.16)' }}>
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '800' }}>Cancelar</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
