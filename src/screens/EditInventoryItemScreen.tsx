import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, TextInput, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef } from 'react';
import { DetailScaffold, FieldLabel, LoadingState, PrimaryButton, SectionCard } from '../components/ui';
import { SuggestedInput } from '../components/SuggestedInput';
import { ScanFieldModal } from '../components/ScanFieldModal';
import { Icon } from '../components/Icon';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { API_BASE_URL } from '../api/client';
import {
  getInventoryItem, getOptions, updateInventoryItem, uploadInventoryPhoto,
  getSpecSuggestions, mergeSpecsFillEmpty,
  type InventorySpec, type SelectOption, type SelectOptionKind, type SpecTwin,
} from '../api/mobile';
import { showToast } from '../lib/toast';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const OPTION_KINDS: SelectOptionKind[] = [
  'work_order_unit', 'work_order_department',
  'inventory_equipment_category', 'inventory_equipment_status', 'inventory_operating_system', 'inventory_brand',
];

function Field({ value, onChangeText, placeholder, multiline, onScan }: {
  value: string; onChangeText: (v: string) => void; placeholder: string; multiline?: boolean; onScan?: () => void;
}) {
  const input = (
    <TextInput
      value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={T.faint}
      multiline={multiline} autoCorrect={false}
      style={{ flex: onScan ? 1 : undefined, minHeight: multiline ? 76 : 44, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, paddingHorizontal: 13, paddingVertical: multiline ? 11 : 0, fontSize: 14, color: T.text }}
    />
  );
  if (!onScan) return input;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      {input}
      <Pressable onPress={onScan} accessibilityLabel="Ler com a câmera" style={{ width: 44, height: 44, borderRadius: 11, borderWidth: 1, borderColor: `${T.primary}55`, backgroundColor: `${T.primary}12`, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="camera" size={19} color={T.primary} />
      </Pressable>
    </View>
  );
}

/**
 * Edição de item já cadastrado — permite completar o cadastro depois, em campo
 * (o técnico nem sempre tem tudo à mão na hora de colar a etiqueta).
 *
 * A NOSSA etiqueta não é editável: ela vem do vínculo com a etiqueta física.
 */
export function EditInventoryItemScreen() {
  const nav = useNavigation<Nav>();
  const route = useRoute<RouteProp<RootStackParamList, 'EditInventoryItem'>>();
  const { token } = useAuth();
  const itemId = route.params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [scanField, setScanField] = useState<'sku' | 'serial' | 'assetTag' | null>(null);

  const [labelCode, setLabelCode] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [assetTag, setAssetTag] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [sku, setSku] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [equipmentStatus, setEquipmentStatus] = useState('');
  const [operatingSystem, setOperatingSystem] = useState('');
  const [unitName, setUnitName] = useState('');
  const [room, setRoom] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [specs, setSpecs] = useState<InventorySpec[]>([]);
  const [specTwins, setSpecTwins] = useState<SpecTwin[]>([]);
  const [mainPhotoUrl, setMainPhotoUrl] = useState<string | null>(null);

  // Câmera embutida pra trocar/adicionar foto sem sair da tela.
  const [permission, requestPermission] = useCameraPermissions();
  const [shooting, setShooting] = useState<null | 'main' | 'attachment'>(null);
  const cameraRef = useRef<CameraView>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [detail, opts] = await Promise.all([
        getInventoryItem(token, itemId),
        getOptions(token, OPTION_KINDS),
      ]);
      const i = detail.item;
      setLabelCode(i.labelCode ?? null);
      setName(i.name || '');
      setCategory(i.category || '');
      setAssetTag(i.assetTag || '');
      setSerialNumber(i.serialNumber || '');
      setSku(i.sku || '');
      setBrand(i.brand || '');
      setModel(i.model || '');
      setEquipmentStatus(i.equipmentStatus || '');
      setOperatingSystem(i.operatingSystem || '');
      setUnitName(i.unitName || '');
      setRoom(i.room || '');
      setCurrentLocation(i.currentLocation || '');
      setNotes(i.notes || '');
      setSpecs(i.technicalSpecs || []);
      setMainPhotoUrl(i.mainPhotoUrl ?? null);
      setOptions(Array.isArray(opts) ? opts : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível carregar o item.');
    } finally {
      setLoading(false);
    }
  }, [token, itemId]);

  useEffect(() => { void load(); }, [load]);

  // Sugestão de specs de aparelho-gêmeo (mesma marca+modelo+categoria), excluindo este item.
  useEffect(() => {
    if (!brand.trim() || !model.trim() || !category.trim()) { setSpecTwins([]); return; }
    let alive = true;
    const timer = setTimeout(async () => {
      try {
        const found = await getSpecSuggestions(token, { brand, model, category, excludeId: itemId });
        if (alive) setSpecTwins(found);
      } catch { if (alive) setSpecTwins([]); }
    }, 450);
    return () => { alive = false; clearTimeout(timer); };
  }, [brand, model, category, token, itemId]);

  const importSpecsFromTwin = (twin: SpecTwin) => {
    const { merged, applied } = mergeSpecsFillEmpty(specs, twin.technicalSpecs);
    setSpecs(merged);
    setSpecTwins([]);
    showToast(applied ? `${applied} especificaç${applied === 1 ? 'ão importada' : 'ões importadas'}` : 'Nada a preencher');
  };

  const opts = (kind: SelectOptionKind) => options.filter(o => o.kind === kind);

  const takePhoto = async (role: 'main' | 'attachment') => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.9 });
      if (!photo?.uri) return;
      // Reduz antes de subir — o servidor também redimensiona, mas isso poupa
      // a rede do hospital (foto crua de celular passa de 5 MB).
      const resized = await ImageManipulator.manipulateAsync(photo.uri, [{ resize: { width: 1600 } }], {
        compress: 0.8, format: ImageManipulator.SaveFormat.JPEG,
      });
      await uploadInventoryPhoto(token, itemId, { uri: resized.uri, role });
      setShooting(null);
      showToast(role === 'main' ? 'Foto principal atualizada.' : 'Foto anexada.');
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Falha ao enviar a foto.');
      setShooting(null);
    }
  };

  const save = async () => {
    if (!name.trim()) { setError('Nome é obrigatório.'); return; }
    setSaving(true);
    setError(null);
    try {
      await updateInventoryItem(token, itemId, {
        name: name.trim(),
        category: category.trim() || null,
        assetTag: assetTag.trim() || null,
        serialNumber: serialNumber.trim() || null,
        sku: sku.trim() || null,
        brand: brand.trim() || null,
        model: model.trim() || null,
        equipmentStatus: equipmentStatus.trim() || null,
        operatingSystem: operatingSystem.trim() || null,
        unitName: unitName.trim() || null,
        room: room.trim() || null,
        currentLocation: currentLocation.trim() || null,
        notes: notes.trim() || null,
        technicalSpecs: specs.filter(s => s.key.trim() && s.value.trim()),
      });
      showToast('Item atualizado.');
      nav.goBack();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível salvar.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <DetailScaffold onBack={() => nav.goBack()} title="Editar item"><LoadingState /></DetailScaffold>;
  }

  // Câmera em tela cheia enquanto tira a foto.
  if (shooting) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0A0E18' }}>
        {permission?.granted && (
          <CameraView ref={cameraRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} facing="back" />
        )}
        <View style={{ paddingTop: 52, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Pressable onPress={() => setShooting(null)} style={{ width: 38, height: 38, borderRadius: 11, backgroundColor: 'rgba(255,255,255,.14)', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={19} color="#fff" />
          </Pressable>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>
            {shooting === 'main' ? 'Foto principal' : 'Foto anexa'}
          </Text>
          <View style={{ width: 38 }} />
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ alignItems: 'center', paddingBottom: 46 }}>
          {permission?.granted ? (
            <Pressable onPress={() => void takePhoto(shooting)} style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: '#fff', borderWidth: 5, borderColor: 'rgba(255,255,255,.35)' }} />
          ) : (
            <Pressable onPress={requestPermission} style={{ paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, backgroundColor: T.primary }}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>Permitir câmera</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  return (
    <DetailScaffold onBack={() => nav.goBack()} eyebrow={labelCode || undefined} title="Editar item">
      <SectionCard title="Fotos">
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <View style={{ width: 84, height: 84, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted, alignItems: 'center', justifyContent: 'center' }}>
            {mainPhotoUrl ? (
              <Image
                source={{ uri: `${API_BASE_URL}${mainPhotoUrl}`, headers: token ? { Authorization: `Bearer ${token}` } : undefined }}
                style={{ width: '100%', height: '100%' }} resizeMode="cover"
              />
            ) : (
              <Icon name="camera" size={22} color={T.faint} />
            )}
          </View>
          <View style={{ flex: 1, gap: 8 }}>
            <Pressable onPress={() => setShooting('main')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 10, borderRadius: 11, backgroundColor: T.primary }}>
              <Icon name="camera" size={15} color="#fff" />
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>{mainPhotoUrl ? 'Trocar principal' : 'Foto principal'}</Text>
            </Pressable>
            <Pressable onPress={() => setShooting('attachment')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 10, borderRadius: 11, borderWidth: 1, borderColor: T.border }}>
              <Icon name="plus" size={15} color={T.primary} />
              <Text style={{ color: T.primary, fontWeight: '700', fontSize: 13 }}>Anexar foto</Text>
            </Pressable>
          </View>
        </View>
      </SectionCard>

      <SectionCard title="Identificação">
        <View style={{ gap: 11 }}>
          {!!labelCode && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: `${T.primary}0E`, borderWidth: 1, borderColor: `${T.primary}44`, borderRadius: 11, padding: 10 }}>
              <Icon name="qr" size={15} color={T.primary} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: T.primary }}>{labelCode}</Text>
                <Text style={{ fontSize: 10.5, color: T.muted }}>Etiqueta SDX — vem da etiqueta colada, não editável</Text>
              </View>
            </View>
          )}
          <View><FieldLabel required>Nome</FieldLabel><Field value={name} onChangeText={setName} placeholder="Ex.: GABINETE DELL OPTIPLEX" /></View>
          <SuggestedInput label="Tipo do equipamento" value={category} onChangeText={setCategory} placeholder="Monitor, gabinete, switch…" options={opts('inventory_equipment_category')} />
          <View><FieldLabel>Patrimônio anterior</FieldLabel><Field value={assetTag} onChangeText={setAssetTag} placeholder="Um por linha" multiline onScan={() => setScanField('assetTag')} /></View>
          <View><FieldLabel>Número de série</FieldLabel><Field value={serialNumber} onChangeText={setSerialNumber} placeholder="Opcional" onScan={() => setScanField('serial')} /></View>
          <View><FieldLabel>SKU / código interno</FieldLabel><Field value={sku} onChangeText={setSku} placeholder="Opcional" onScan={() => setScanField('sku')} /></View>
        </View>
      </SectionCard>

      <SectionCard title="Equipamento">
        <View style={{ gap: 11 }}>
          <SuggestedInput label="Marca" value={brand} onChangeText={setBrand} placeholder="Dell, HP…" options={opts('inventory_brand')} />
          <View><FieldLabel>Modelo</FieldLabel><Field value={model} onChangeText={setModel} placeholder="Optiplex 3050" /></View>
          <SuggestedInput label="Estado" value={equipmentStatus} onChangeText={setEquipmentStatus} placeholder="Funcionando…" options={opts('inventory_equipment_status')} />
          <SuggestedInput label="Sistema operacional" value={operatingSystem} onChangeText={setOperatingSystem} placeholder="Windows 11" options={opts('inventory_operating_system')} />
        </View>
      </SectionCard>

      <SectionCard title="Local">
        <View style={{ gap: 11 }}>
          <SuggestedInput label="Unidade" value={unitName} onChangeText={setUnitName} placeholder="Hospital do Olho" options={opts('work_order_unit')} />
          <SuggestedInput label="Departamento / Setor" value={room} onChangeText={setRoom} placeholder="CEDOC, Recepção…" options={opts('work_order_department')} />
          <View><FieldLabel>Detalhe do local</FieldLabel><Field value={currentLocation} onChangeText={setCurrentLocation} placeholder="Ex.: armário 3, mesa 2" /></View>
        </View>
      </SectionCard>

      <SectionCard title={`Especificações (${specs.length})`} action={
        <Pressable onPress={() => setSpecs([...specs, { key: '', value: '' }])} hitSlop={8}>
          <Text style={{ color: T.primary, fontSize: 12.5, fontWeight: '700' }}>Adicionar</Text>
        </Pressable>
      }>
        {specTwins.length > 0 && (
          <Pressable
            onPress={() => importSpecsFromTwin(specTwins[0])}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: `${T.primary}12`, borderWidth: 1, borderColor: `${T.primary}55`, borderRadius: 11, padding: 12, marginBottom: 10 }}
          >
            <Icon name="layers" size={18} color={T.primary} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: T.primary }}>
                Importar de aparelho igual{specTwins.length > 1 ? ` (${specTwins.length})` : ''}
              </Text>
              <Text style={{ fontSize: 11, color: T.muted }}>
                Copia as especificações do mais recente ({specTwins[0].technicalSpecs.length}) — só preenche o que está vazio
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color={T.primary} />
          </Pressable>
        )}
        <View style={{ gap: 9 }}>
          {specs.length === 0 && <Text style={{ fontSize: 12.5, color: T.muted }}>Nenhuma especificação.</Text>}
          {specs.map((s, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Field value={s.key} onChangeText={(v) => setSpecs(specs.map((x, j) => j === i ? { ...x, key: v } : x))} placeholder="RAM" />
              </View>
              <View style={{ flex: 1.3 }}>
                <Field value={s.value} onChangeText={(v) => setSpecs(specs.map((x, j) => j === i ? { ...x, value: v } : x))} placeholder="8 GB" />
              </View>
              <Pressable onPress={() => setSpecs(specs.filter((_, j) => j !== i))} hitSlop={8}>
                <Icon name="trash" size={16} color={T.danger} />
              </Pressable>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Observação">
        <Field value={notes} onChangeText={setNotes} placeholder="Observações gerais sobre o item." multiline />
      </SectionCard>

      {!!error && <Text style={{ color: T.danger, fontSize: 13, marginBottom: 10 }}>{error}</Text>}
      <PrimaryButton label={saving ? 'Salvando…' : 'Salvar alterações'} icon="check" accent={T.primary} onPress={save} />
      {saving && <ActivityIndicator style={{ marginTop: 10 }} color={T.primary} />}
      <View style={{ height: 12 }} />

      <ScanFieldModal
        visible={scanField !== null}
        title={scanField === 'serial' ? 'Ler número de série' : scanField === 'assetTag' ? 'Ler patrimônio anterior' : 'Ler SKU / código'}
        onClose={() => setScanField(null)}
        onPick={(value) => {
          if (scanField === 'serial') setSerialNumber(value);
          else if (scanField === 'assetTag') setAssetTag(value);
          else if (scanField === 'sku') setSku(value);
        }}
      />
    </DetailScaffold>
  );
}
