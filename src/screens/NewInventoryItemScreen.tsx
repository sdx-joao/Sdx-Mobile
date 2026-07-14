import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, TextInput, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef } from 'react';
import { DetailScaffold, FieldLabel, PrimaryButton, SectionCard } from '../components/ui';
import { SuggestedInput } from '../components/SuggestedInput';
import { Icon } from '../components/Icon';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { getOptions, type SelectOption } from '../api/mobile';
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

function Field({ value, onChangeText, placeholder, multiline, keyboardType }: {
  value: string; onChangeText: (v: string) => void; placeholder: string; multiline?: boolean; keyboardType?: 'default' | 'number-pad';
}) {
  return (
    <TextInput
      value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={T.faint}
      multiline={multiline} keyboardType={keyboardType}
      style={{ minHeight: multiline ? 76 : 44, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, paddingHorizontal: 13, paddingVertical: multiline ? 11 : 0, fontSize: 14, color: T.text }}
    />
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

  // Câmera
  const [capturing, setCapturing] = useState<null | 'main' | 'attachment'>(null);
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

  const capturePhoto = async () => {
    try {
      const shot = await camRef.current?.takePictureAsync({ quality: 0.6 });
      if (!shot?.uri) return;
      const resized = await ImageManipulator.manipulateAsync(shot.uri, [{ resize: { width: 1280 } }], { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG });
      if (capturing === 'main') setMainPhotoUri(resized.uri);
      else setAttachmentUris((prev) => [...prev, resized.uri]);
      setCapturing(null);
    } catch {
      setCapturing(null);
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
          <View style={{ position: 'absolute', bottom: insets.bottom + 26, left: 0, right: 0, alignItems: 'center' }}>
            <Pressable onPress={capturePhoto} style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: '#fff', borderWidth: 4, borderColor: 'rgba(255,255,255,.4)' }} />
          </View>
        )}
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
            <View><FieldLabel>SKU / código interno</FieldLabel><Field value={sku} onChangeText={setSku} placeholder="Opcional" /></View>
            <View><FieldLabel>Patrimônio / etiqueta anterior(es)</FieldLabel><Field value={assetTag} onChangeText={setAssetTag} placeholder="Um por linha, ou separe por vírgula" multiline /></View>
            <SuggestedInput label="Unidade" required value={unitName} onChangeText={setUnitName} placeholder="Selecione a unidade" options={opts('work_order_unit')} />
            <SuggestedInput label="Departamento / Setor" required value={room} onChangeText={setRoom} placeholder="Ex.: CEDOC, Recepção, Centro Cirúrgico" options={opts('work_order_department')} />
            {isEquip ? (
              <>
                <View><FieldLabel>Número de série</FieldLabel><Field value={serialNumber} onChangeText={setSerialNumber} placeholder="Opcional" /></View>
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
    </DetailScaffold>
  );
}
