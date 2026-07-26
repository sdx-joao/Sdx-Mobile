import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, TextInput, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef } from 'react';
import { DetailScaffold, FieldLabel, PrimaryButton, SectionCard } from '../components/ui';
import { SuggestedInput } from '../components/SuggestedInput';
import { ScanFieldModal } from '../components/ScanFieldModal';
import { SpecCollectModal } from '../components/SpecCollectModal';
import { MachineLinkModal } from '../components/MachineLinkModal';
import type { DetectedMachine } from '../api/mobile';
import { Icon } from '../components/Icon';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { getOptions, getSpecSuggestions, mergeSpecsFillEmpty, type SelectOption, type SpecTwin } from '../api/mobile';
import { listPending, type PendingForm } from '../lib/pending-registrations';
import { useResource } from '../api/use-resource';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;
const PRIMARY_TYPES = ['EQUIPAMENTO', 'PERIFERICO', 'FERRAMENTA', 'MATERIAL', 'SUPRIMENTO'];
const STEPS = ['Cadastro', 'Especificações', 'Fotos', 'Observações'] as const;
type Step = 0 | 1 | 2 | 3;

const OPTION_KINDS = [
  'inventory_item_type', 'inventory_equipment_category', 'work_order_unit', 'work_order_department',
  'inventory_brand', 'inventory_model', 'inventory_equipment_status', 'inventory_unit', 'inventory_spec_key',
] as const;

function Field({ value, onChangeText, placeholder, multiline, keyboardType, onScan }: {
  value: string; onChangeText: (v: string) => void; placeholder: string; multiline?: boolean;
  keyboardType?: 'default' | 'number-pad';
  /** Quando presente, mostra o botão de câmera (lê código de barras ou os números). */
  onScan?: () => void;
}) {
  const input = (
    <TextInput
      value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={T.faint}
      multiline={multiline} keyboardType={keyboardType} autoCorrect={false}
      style={{ flex: onScan ? 1 : undefined, minHeight: multiline ? 76 : 44, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, paddingHorizontal: 13, paddingVertical: multiline ? 11 : 0, fontSize: 14, color: T.text }}
    />
  );
  if (!onScan) return input;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      {input}
      <Pressable
        onPress={onScan}
        accessibilityLabel="Ler da etiqueta com a câmera"
        style={{ width: 44, height: 44, borderRadius: 11, borderWidth: 1, borderColor: `${T.primary}55`, backgroundColor: `${T.primary}12`, alignItems: 'center', justifyContent: 'center' }}
      >
        <Icon name="camera" size={19} color={T.primary} />
      </Pressable>
    </View>
  );
}

export function NewInventoryItemScreen() {
  const nav = useNavigation<Nav>();
  const route = useRoute<RouteProp<RootStackParamList, 'NewInventoryItem'>>();
  const labelCode = route.params?.labelCode;
  const copies = Math.max(1, route.params?.copies ?? 1);
  const firstCopy = route.params?.firstCopy ?? 1;
  const resumeLabelCode = route.params?.resumeLabelCode;
  const { token } = useAuth();
  const insets = useSafeAreaInsets();
  // Leitor de campo por câmera (código de barras ou OCR). Ver ScanFieldModal.
  const [scanField, setScanField] = useState<'sku' | 'serial' | null>(null);
  // Coleta de specs pelo PC (script + código). Ver SpecCollectModal.
  const [collectingSpecs, setCollectingSpecs] = useState(false);
  // Vínculo com máquina do SDX Nuntius. Ver MachineLinkModal.
  const [linkingMachine, setLinkingMachine] = useState(false);
  const [linkedMachine, setLinkedMachine] = useState<DetectedMachine | null>(null);

  const optionsLoader = useCallback(() => getOptions(token, [...OPTION_KINDS]), [token]);
  const { data: options } = useResource(optionsLoader);
  const opts = useCallback((kind: string): SelectOption[] => (options ?? []).filter((o) => o.kind === kind), [options]);

  const [step, setStep] = useState<Step>(0);
  const [error, setError] = useState<string | null>(null);
  const [resumeValidated, setResumeValidated] = useState<number[] | null>(null);

  // Campos
  const [primaryType, setPrimaryType] = useState('EQUIPAMENTO');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [sku, setSku] = useState('');
  const [assetTag, setAssetTag] = useState('');
  const [unitName, setUnitName] = useState('');
  const [room, setRoom] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [equipmentStatus, setEquipmentStatus] = useState('FUNCIONANDO');
  const [operatingSystem, setOperatingSystem] = useState('');
  const [unit, setUnit] = useState('UN');
  const [minQty, setMinQty] = useState('0');
  const [maxQty, setMaxQty] = useState('0');
  const [initialQty, setInitialQty] = useState('0');
  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>([]);
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [notes, setNotes] = useState('');
  const [mainPhotoUri, setMainPhotoUri] = useState<string | null>(null);
  const [attachmentUris, setAttachmentUris] = useState<string[]>([]);

  const isEquip = primaryType === 'EQUIPAMENTO';

  // Sugestão de specs de aparelho-gêmeo (mesma marca+modelo+categoria).
  const [specTwins, setSpecTwins] = useState<SpecTwin[]>([]);
  useEffect(() => {
    if (!isEquip || !brand.trim() || !model.trim() || !category.trim()) { setSpecTwins([]); return; }
    let alive = true;
    const timer = setTimeout(async () => {
      try {
        const found = await getSpecSuggestions(token, { brand, model, category });
        if (alive) setSpecTwins(found);
      } catch { if (alive) setSpecTwins([]); }
    }, 450);
    return () => { alive = false; clearTimeout(timer); };
  }, [isEquip, brand, model, category, token]);

  const importSpecsFromTwin = (twin: SpecTwin) => {
    setSpecs((prev) => mergeSpecsFillEmpty(prev, twin.technicalSpecs).merged);
    setSpecTwins([]);
  };

  // Câmera
  const [capturing, setCapturing] = useState<null | 'main' | 'attachment'>(null);
  // Foto tirada/escolhida aguardando confirmação antes de guardar.
  const [preview, setPreview] = useState<null | { uri: string; role: 'main' | 'attachment' }>(null);

  /** Blocos que a máquina não tem como preencher sozinha. */
  const pendingBlocks = [
    !unitName.trim() && 'unidade',
    !room.trim() && 'setor',
    !mainPhotoUri && 'foto',
    !equipmentStatus.trim() && 'estado',
  ].filter(Boolean) as string[];
  const [permission, requestPermission] = useCameraPermissions();
  const camRef = useRef<CameraView | null>(null);

  useEffect(() => {
    if (!resumeLabelCode) return;
    let active = true;
    listPending().then((list) => {
      const d = list.find((p) => p.labelCode === resumeLabelCode);
      if (!d || !active) return;
      const f = d.form;
      setPrimaryType(f.primaryType || 'EQUIPAMENTO'); setName(f.name); setCategory(f.category || '');
      setSku(f.sku || ''); setAssetTag(f.assetTag || ''); setUnitName(f.unitName); setRoom(f.room);
      setSerialNumber(f.serialNumber || ''); setBrand(f.brand || ''); setModel(f.model || '');
      setEquipmentStatus(f.equipmentStatus || 'FUNCIONANDO'); setOperatingSystem(f.operatingSystem || '');
      setUnit(f.unit || 'UN'); setMinQty(String(f.minQty ?? 0)); setMaxQty(String(f.maxQty ?? 0)); setInitialQty(String(f.initialQty ?? 0));
      setSpecs(f.technicalSpecs || []); setNotes(f.notes || '');
      setMainPhotoUri(f.mainPhotoUri || null); setAttachmentUris(f.attachmentUris || []);
      setResumeValidated(d.validated);
    });
    return () => { active = false; };
  }, [resumeLabelCode]);

  // Tirar → mostra a PRÉVIA (a câmera sai na hora). Guarda só ao confirmar.
  const capturePhoto = async () => {
    if (!capturing) return;
    try {
      const shot = await camRef.current?.takePictureAsync({ quality: 0.6 });
      if (!shot?.uri) return;
      const role = capturing;
      setCapturing(null);
      setPreview({ uri: shot.uri, role });
    } catch {
      setCapturing(null);
    }
  };

  const pickFromGallery = async () => {
    if (!capturing) return;
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) return;
      const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
      if (res.canceled || !res.assets?.[0]?.uri) return;
      const role = capturing;
      setCapturing(null);
      setPreview({ uri: res.assets[0].uri, role });
    } catch { /* ignora */ }
  };

  // Confirmar → redimensiona e guarda localmente (sobe ao salvar o item).
  const confirmPhoto = async () => {
    if (!preview) return;
    try {
      const resized = await ImageManipulator.manipulateAsync(preview.uri, [{ resize: { width: 1280 } }], { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG });
      if (preview.role === 'main') setMainPhotoUri(resized.uri);
      else setAttachmentUris((prev) => [...prev, resized.uri]);
    } finally {
      setPreview(null);
    }
  };

  const addSpec = () => {
    if (!specKey.trim() || !specValue.trim()) return;
    setSpecs((prev) => [...prev, { key: specKey.trim(), value: specValue.trim() }]);
    setSpecKey(''); setSpecValue('');
  };

  const validateStep = (s: Step): string | null => {
    if (s === 0) {
      if (!primaryType) return 'Selecione o tipo principal.';
      if (!name.trim()) return 'Informe o nome / descrição.';
      if (!unitName.trim()) return 'Selecione a unidade.';
      if (!room.trim()) return 'Selecione o departamento / setor.';
    }
    return null;
  };

  const next = () => {
    const err = validateStep(step);
    if (err) { setError(err); return; }
    setError(null);
    if (step < 3) setStep((step + 1) as Step);
    else goToValidation();
  };

  const goToValidation = () => {
    const code = labelCode || resumeLabelCode;
    if (!code) { setError('Cadastro só pode iniciar pela leitura de uma etiqueta.'); return; }
    const form: PendingForm = {
      primaryType, name, itemType: isEquip ? 'equipment' : 'consumable', category,
      unitName, room, sku, assetTag, serialNumber, brand, model, equipmentStatus, operatingSystem,
      unit, minQty: Number(minQty) || 0, maxQty: Number(maxQty) || 0, initialQty: Number(initialQty) || 0,
      technicalSpecs: specs, notes,
      mainPhotoUri, attachmentUris,
      // Promove a máquina a patrimônio na MESMA transação do item (§5.7).
      machineId: linkedMachine?.id,
    };
    const validated = resumeValidated ?? (firstCopy >= 1 && firstCopy <= copies ? [firstCopy] : []);
    nav.replace('InventoryCopyValidation', { labelCode: code, copies, validated, form });
  };

  // ── Câmera em tela cheia ──
  if (capturing) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        {permission?.granted ? (
          <CameraView ref={camRef} style={{ flex: 1 }} facing="back" />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <Text style={{ color: '#fff' }}>Permita a câmera para fotografar.</Text>
            <Pressable onPress={requestPermission} style={{ paddingVertical: 10, paddingHorizontal: 18, borderRadius: 12, backgroundColor: T.primary }}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>Permitir câmera</Text>
            </Pressable>
          </View>
        )}
        <View style={{ position: 'absolute', top: insets.top + 8, left: 16 }}>
          <Pressable onPress={() => setCapturing(null)} style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,.15)', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={20} color="#fff" />
          </Pressable>
        </View>
        {permission?.granted && (
          <View style={{ position: 'absolute', bottom: insets.bottom + 26, left: 0, right: 0, paddingHorizontal: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Pressable onPress={pickFromGallery} style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.16)', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="archive" size={22} color="#fff" />
            </Pressable>
            <Pressable onPress={capturePhoto} style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: '#fff', borderWidth: 4, borderColor: 'rgba(255,255,255,.4)' }} />
            <View style={{ width: 52 }} />
          </View>
        )}
      </View>
    );
  }

  // Confirmação da foto antes de guardar.
  if (preview) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0A0E18' }}>
        <Image source={{ uri: preview.uri }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} resizeMode="contain" />
        <View style={{ position: 'absolute', top: insets.top + 8, left: 0, right: 0, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>Confirmar foto</Text>
        </View>
        <View style={{ position: 'absolute', bottom: insets.bottom + 30, left: 20, right: 20, flexDirection: 'row', gap: 12 }}>
          <Pressable onPress={() => { const r = preview.role; setPreview(null); setCapturing(r); }}
            style={{ flex: 1, height: 50, borderRadius: 13, borderWidth: 1, borderColor: 'rgba(255,255,255,.4)', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 }}>
            <Icon name="refresh" size={16} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 14.5, fontWeight: '700' }}>Refazer</Text>
          </Pressable>
          <Pressable onPress={confirmPhoto}
            style={{ flex: 1.4, height: 50, borderRadius: 13, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 }}>
            <Icon name="check" size={17} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 14.5, fontWeight: '800' }}>Usar foto</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <DetailScaffold onBack={() => (step === 0 ? nav.goBack() : setStep((step - 1) as Step))} eyebrow="Novo equipamento" title={STEPS[step]} compact>
      {!!labelCode && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12, backgroundColor: `${T.primary}12`, borderRadius: 12, padding: 11 }}>
          <Icon name="qr" size={15} color={T.primary} />
          <Text style={{ fontSize: 12.5, color: T.text }}>Etiqueta <Text style={{ fontWeight: '800', color: T.primary }}>{labelCode}</Text> · {copies} cópia(s)</Text>
        </View>
      )}

      {/* Stepper */}
      <View style={{ flexDirection: 'row', gap: 6, marginBottom: 14 }}>
        {STEPS.map((s, i) => (
          <View key={s} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
            <View style={{ width: '100%', height: 4, borderRadius: 2, backgroundColor: i <= step ? T.primary : T.border }} />
            <Text style={{ fontSize: 9.5, fontWeight: i === step ? '800' : '600', color: i === step ? T.primary : T.faint }}>{s}</Text>
          </View>
        ))}
      </View>

      {/* Fica no TOPO do cadastro, não nas Especificações: é ele que preenche
          nome, marca, modelo, série, categoria e unidade. Escondido na aba
          seguinte, o técnico digitava tudo à mão e só depois descobria que a
          máquina teria preenchido. É o complemento do cadastro — vem primeiro. */}
      {step === 0 && isEquip && (linkedMachine ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: '#22C55E14', borderWidth: 1, borderColor: '#22C55E55', borderRadius: 11, padding: 12, marginBottom: 12 }}>
          <Icon name="check-circle" size={18} color="#22C55E" />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: T.text }}>
              Máquina vinculada{linkedMachine.hostname ? ` · ${linkedMachine.hostname}` : ''}
            </Text>
            <Text style={{ fontSize: 11, color: T.muted }}>
              {[linkedMachine.brand, linkedMachine.model].filter(Boolean).join(' ') || 'dados preenchidos'}
            </Text>
            {/* O Nuntius entrega o que a máquina sabe de si; o resto só
                existe no mundo físico e ninguém além do técnico ali na
                frente pode informar. Listar o que falta evita cadastro
                salvo pela metade por parecer "já preenchido". */}
            {pendingBlocks.length > 0 && (
              <Text style={{ fontSize: 11, color: '#B45309', marginTop: 3 }}>
                Falta preencher: {pendingBlocks.join(' · ')}
              </Text>
            )}
          </View>
          <Pressable onPress={() => setLinkedMachine(null)} hitSlop={8}>
            <Icon name="x" size={16} color={T.muted} />
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={() => setLinkingMachine(true)}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: `${T.primary}0E`, borderWidth: 1, borderColor: `${T.primary}44`, borderRadius: 11, padding: 12, marginBottom: 12 }}
        >
          <Icon name="monitor" size={18} color={T.primary} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: T.primary }}>Vincular máquina</Text>
            <Text style={{ fontSize: 11, color: T.muted }}>Se ela tem o SDX Nuntius: preenche tudo sozinho</Text>
          </View>
          <Icon name="chevron-right" size={16} color={T.primary} />
        </Pressable>
      ))}

      {step === 0 && (
        <SectionCard title="Dados do item">
          <View style={{ gap: 14 }}>
            <View>
              <FieldLabel required>Tipo principal</FieldLabel>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 7 }}>
                {PRIMARY_TYPES.map((t) => {
                  const on = primaryType === t;
                  return (
                    <Pressable key={t} onPress={() => setPrimaryType(t)} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1.5, borderColor: on ? T.primary : T.border, backgroundColor: on ? `${T.primary}12` : T.surface }}>
                      <Text style={{ fontSize: 11.5, fontWeight: '700', color: on ? T.primary : T.muted }}>{t}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
            <View><FieldLabel required>Nome / descrição curta</FieldLabel><Field value={name} onChangeText={setName} placeholder="Ex.: GABINETE DELL OPTIPLEX" /></View>
            <SuggestedInput label="Tipo do equipamento" value={category} onChangeText={setCategory} placeholder="Monitor, tablet, switch…" options={opts('inventory_equipment_category')} />
            <View><FieldLabel>SKU / código interno</FieldLabel><Field value={sku} onChangeText={setSku} placeholder="Opcional" onScan={() => setScanField('sku')} /></View>
            <View><FieldLabel>Patrimônio / etiqueta anterior(es)</FieldLabel><Field value={assetTag} onChangeText={setAssetTag} placeholder="Um por linha, ou separe por vírgula" multiline /></View>
            {isEquip && (() => {
              const inCedocStock = unitName.trim().toUpperCase() === 'CEDOC/ESTOQUE';
              return (
                <Pressable
                  onPress={() => {
                    if (inCedocStock) { setUnitName(''); setRoom(''); setEquipmentStatus('FUNCIONANDO'); }
                    else { setUnitName('CEDOC/ESTOQUE'); setRoom('CEDOC/ESTOQUE'); setEquipmentStatus('EM ESTOQUE'); }
                  }}
                  style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                    borderWidth: 1, borderColor: inCedocStock ? T.primary : T.border,
                    backgroundColor: inCedocStock ? T.primary + '15' : T.surface,
                    borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: T.text, fontWeight: '700', fontSize: 14 }}>Em estoque (CEDOC/ESTOQUE)</Text>
                    <Text style={{ color: T.muted, fontSize: 11, marginTop: 2 }}>Sobressalente aguardando uso: local CEDOC/ESTOQUE + estado EM ESTOQUE.</Text>
                  </View>
                  <View style={{
                    width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: inCedocStock ? T.primary : 'transparent', borderWidth: inCedocStock ? 0 : 1, borderColor: T.border,
                  }}>
                    {inCedocStock && <Icon name="check-circle" size={18} color="#fff" />}
                  </View>
                </Pressable>
              );
            })()}
            <SuggestedInput label="Unidade" required value={unitName} onChangeText={setUnitName} placeholder="Selecione a unidade" options={opts('work_order_unit')} />
            <SuggestedInput label="Departamento / Setor" required value={room} onChangeText={setRoom} placeholder="Ex.: CEDOC, Recepção, Centro Cirúrgico" options={opts('work_order_department')} />
            {isEquip ? (
              <>
                <View><FieldLabel>Número de série</FieldLabel><Field value={serialNumber} onChangeText={setSerialNumber} placeholder="Opcional" onScan={() => setScanField('serial')} /></View>
                <SuggestedInput label="Marca / fabricante" value={brand} onChangeText={setBrand} placeholder="Selecione ou digite" options={opts('inventory_brand')} />
                <SuggestedInput label="Modelo" value={model} onChangeText={setModel} placeholder="Digite ou selecione" options={opts('inventory_model')} />
                <SuggestedInput label="Estado operacional" value={equipmentStatus} onChangeText={setEquipmentStatus} placeholder="FUNCIONANDO" options={opts('inventory_equipment_status')} />
                <View><FieldLabel>Sistema operacional</FieldLabel><Field value={operatingSystem} onChangeText={setOperatingSystem} placeholder="Windows, Linux ou N/A" /></View>
              </>
            ) : (
              <>
                <SuggestedInput label="Unidade de medida" value={unit} onChangeText={setUnit} placeholder="UN, CX, M…" options={opts('inventory_unit')} />
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <View style={{ flex: 1 }}><FieldLabel>Qtd. inicial</FieldLabel><Field value={initialQty} onChangeText={setInitialQty} placeholder="0" keyboardType="number-pad" /></View>
                  <View style={{ flex: 1 }}><FieldLabel>Mínimo</FieldLabel><Field value={minQty} onChangeText={setMinQty} placeholder="0" keyboardType="number-pad" /></View>
                  <View style={{ flex: 1 }}><FieldLabel>Máximo</FieldLabel><Field value={maxQty} onChangeText={setMaxQty} placeholder="0" keyboardType="number-pad" /></View>
                </View>
              </>
            )}
          </View>
        </SectionCard>
      )}

      {step === 1 && (
        <SectionCard title="Especificações técnicas">
          {/* Se a máquina está ligada, o PC entrega tudo pronto — série, CPU, RAM,
              discos e até os monitores. Poupa digitar (e errar) na frente do rack. */}
          <Pressable
            onPress={() => setCollectingSpecs(true)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: `${T.primary}0E`, borderWidth: 1, borderColor: `${T.primary}44`, borderRadius: 11, padding: 12, marginBottom: 12 }}
          >
            <Icon name="cpu" size={18} color={T.primary} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: T.primary }}>Puxar dados do PC</Text>
              <Text style={{ fontSize: 11, color: T.muted }}>Se o computador está ligado: série, CPU, RAM, discos e monitores</Text>
            </View>
            <Icon name="chevron-right" size={16} color={T.primary} />
          </Pressable>
          {specTwins.length > 0 && (
            <Pressable
              onPress={() => importSpecsFromTwin(specTwins[0])}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: `${T.primary}12`, borderWidth: 1, borderColor: `${T.primary}55`, borderRadius: 11, padding: 12, marginBottom: 12 }}
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
          <Text style={{ fontSize: 12, color: T.muted, marginBottom: 12 }}>Adicione apenas os atributos úteis para este equipamento (opcional).</Text>
          <View style={{ gap: 10 }}>
            <SuggestedInput label="Atributo" value={specKey} onChangeText={setSpecKey} placeholder="Ex.: Processador, RAM, Armazenamento" options={opts('inventory_spec_key')} />
            <View><FieldLabel>Valor</FieldLabel><Field value={specValue} onChangeText={setSpecValue} placeholder="Ex.: 16 GB" /></View>
            <Pressable onPress={addSpec} disabled={!specKey.trim() || !specValue.trim()} style={{ height: 42, borderRadius: 11, borderWidth: 1, borderColor: T.primary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6, opacity: (!specKey.trim() || !specValue.trim()) ? 0.5 : 1 }}>
              <Icon name="plus" size={15} color={T.primary} />
              <Text style={{ fontSize: 13.5, fontWeight: '800', color: T.primary }}>Adicionar especificação</Text>
            </Pressable>
          </View>
          {specs.length > 0 && (
            <View style={{ marginTop: 14, gap: 8 }}>
              {specs.map((s, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: T.surfaceMuted, borderRadius: 10, padding: 11 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 10, color: T.faint, fontWeight: '700', textTransform: 'uppercase' }}>{s.key}</Text>
                    <Text style={{ fontSize: 13, color: T.text, fontWeight: '600' }}>{s.value}</Text>
                  </View>
                  <Pressable onPress={() => setSpecs((prev) => prev.filter((_, idx) => idx !== i))} hitSlop={8}><Icon name="x" size={16} color={T.danger} /></Pressable>
                </View>
              ))}
            </View>
          )}
        </SectionCard>
      )}

      {step === 2 && (
        <SectionCard title="Fotos do equipamento">
          <Text style={{ fontSize: 12, color: T.muted, marginBottom: 12 }}>A foto principal aparece no card do inventário. As anexas ficam ligadas ao cadastro.</Text>
          <FieldLabel>Foto principal</FieldLabel>
          <Pressable onPress={() => setCapturing('main')} style={{ height: 150, borderRadius: 12, borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 14 }}>
            {mainPhotoUri ? <Image source={{ uri: mainPhotoUri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" /> : (
              <View style={{ alignItems: 'center', gap: 6 }}><Icon name="camera" size={24} color={T.faint} /><Text style={{ fontSize: 12, color: T.faint }}>Tirar foto principal</Text></View>
            )}
          </Pressable>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <FieldLabel>Anexos ({attachmentUris.length})</FieldLabel>
            <Pressable onPress={() => setCapturing('attachment')} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <Icon name="plus" size={14} color={T.primary} /><Text style={{ fontSize: 12.5, fontWeight: '700', color: T.primary }}>Adicionar</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {attachmentUris.map((uri, i) => (
              <View key={uri} style={{ width: 76, height: 76, borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: T.border }}>
                <Image source={{ uri }} style={{ width: '100%', height: '100%' }} />
                <Pressable onPress={() => setAttachmentUris((prev) => prev.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: 2, right: 2, width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(0,0,0,.6)', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="x" size={12} color="#fff" />
                </Pressable>
              </View>
            ))}
          </View>
        </SectionCard>
      )}

      {step === 3 && (
        <SectionCard title="Observações">
          <View><FieldLabel>Observação</FieldLabel><Field value={notes} onChangeText={setNotes} placeholder="Observações gerais sobre o item." multiline /></View>
          <Text style={{ marginTop: 12, fontSize: 12, color: T.muted }}>Ao continuar, você valida as {copies} cópia(s) da etiqueta escaneando cada uma; só então o item é salvo.</Text>
        </SectionCard>
      )}

      {!!error && <Text style={{ color: T.danger, fontSize: 13, marginBottom: 10 }}>{error}</Text>}
      <PrimaryButton label={step < 3 ? 'Próximo' : 'Continuar para validação'} icon={step < 3 ? 'chevron-right' : 'check'} accent={T.primary} onPress={next} />
      <View style={{ height: 12 }} />

      <ScanFieldModal
        visible={scanField !== null}
        title={scanField === 'serial' ? 'Ler número de série' : 'Ler SKU / código'}
        onClose={() => setScanField(null)}
        onPick={(value) => {
          if (scanField === 'serial') setSerialNumber(value);
          else if (scanField === 'sku') setSku(value);
        }}
      />

      <SpecCollectModal
        visible={collectingSpecs}
        onClose={() => setCollectingSpecs(false)}
        onApply={(collected) => {
          // Só preenche o que está VAZIO — nunca sobrescreve o que o técnico
          // já digitou olhando a etiqueta.
          if (collected.serialNumber && !serialNumber.trim()) setSerialNumber(collected.serialNumber);
          if (collected.brand && !brand.trim()) setBrand(collected.brand);
          if (collected.model && !model.trim()) setModel(collected.model);
          if (collected.operatingSystem && !operatingSystem.trim()) setOperatingSystem(collected.operatingSystem);
          // Specs: mescla por chave, mantendo o que já existe.
          setSpecs((prev) => {
            const seen = new Set(prev.map(s => s.key.trim().toUpperCase()));
            const novas = (collected.technicalSpecs ?? []).filter(s => !seen.has(s.key.trim().toUpperCase()));
            return [...prev, ...novas];
          });
          // Monitores vão pra observação: são equipamentos próprios, não specs
          // do gabinete — quem decide se viram patrimônio é o técnico.
          if (collected.monitores?.length) {
            const linhas = collected.monitores.map(m => `Monitor: ${m.fabricante} ${m.nome} — série ${m.serie}`).join('\n');
            setNotes((prev) => (prev.trim() ? `${prev}\n${linhas}` : linhas));
          }
        }}
      />

      <MachineLinkModal
        visible={linkingMachine}
        onClose={() => setLinkingMachine(false)}
        onLinked={(m) => {
          setLinkedMachine(m);
          // Só preenche o que está VAZIO — o que o técnico já digitou olhando o
          // equipamento tem precedência sobre o que a máquina informa.
          if (m.biosSerial && !serialNumber.trim()) setSerialNumber(m.biosSerial);
          if (m.brand && !brand.trim()) setBrand(m.brand);
          if (m.model && !model.trim()) setModel(m.model);
          if (m.operatingSystem && !operatingSystem.trim()) setOperatingSystem(m.operatingSystem);
          // Patrimônio gravado na BIOS vira sugestão de patrimônio ANTERIOR.
          if (m.biosAssetTag && !assetTag.trim()) setAssetTag(m.biosAssetTag);
          if (m.chassisType && !category.trim()) setCategory(m.chassisType);
          if (m.unitName && !unitName.trim()) setUnitName(m.unitName);
          if (!name.trim()) {
            const auto = [m.brand, m.model].filter(Boolean).join(' ').trim();
            if (auto) setName(auto);
          }
          setSpecs((prev) => {
            const seen = new Set(prev.map((s) => s.key.trim().toUpperCase()));
            const novas = (m.technicalSpecs ?? []).filter((s) => !seen.has(s.key.trim().toUpperCase()));
            return [...prev, ...novas];
          });
          // Monitores ficam na observação até alguém decidir promovê-los a
          // patrimônio próprio — o que exige etiqueta própria neles.
          const naoCadastrados = (m.devices ?? []).filter((d) => !d.itemId);
          if (naoCadastrados.length) {
            const linhas = naoCadastrados
              .map((d) => `Monitor: ${d.manufacturer} ${d.name} — série ${d.serial}`)
              .join('\n');
            setNotes((prev) => (prev.trim() ? `${prev}\n${linhas}` : linhas));
          }
        }}
      />
    </DetailScaffold>
  );
}
