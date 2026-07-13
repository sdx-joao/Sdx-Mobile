import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DetailScaffold, FieldLabel, PrimaryButton, SectionCard } from '../components/ui';
import { SuggestedInput } from '../components/SuggestedInput';
import { Icon } from '../components/Icon';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { getOptions, type SelectOption } from '../api/mobile';
import { listPending } from '../lib/pending-registrations';
import { useResource } from '../api/use-resource';
import type { RootStackParamList } from '../navigation/types';

function Field({ value, onChangeText, placeholder, multiline }: { value: string; onChangeText: (v: string) => void; placeholder: string; multiline?: boolean }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={T.faint}
      multiline={multiline}
      style={{ minHeight: multiline ? 80 : 44, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, paddingHorizontal: 13, paddingVertical: multiline ? 11 : 0, fontSize: 14, color: T.text }}
    />
  );
}

export function NewInventoryItemScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'NewInventoryItem'>>();
  const labelCode = route.params?.labelCode;
  const copies = Math.max(1, route.params?.copies ?? 1);
  const firstCopy = route.params?.firstCopy ?? 1; // a cópia escaneada para iniciar já conta
  const resumeLabelCode = route.params?.resumeLabelCode;
  const { token } = useAuth();

  const optionsLoader = useCallback(() => getOptions(token, ['work_order_unit', 'inventory_location']), [token]);
  const { data: options } = useResource(optionsLoader);
  const unitOptions = useMemo<SelectOption[]>(() => (options ?? []).filter((o) => o.kind === 'work_order_unit'), [options]);
  const roomOptions = useMemo<SelectOption[]>(() => (options ?? []).filter((o) => o.kind === 'inventory_location'), [options]);

  const [name, setName] = useState('');
  const [itemType, setItemType] = useState<'equipment' | 'consumable'>('equipment');
  const [category, setCategory] = useState('');
  const [unitName, setUnitName] = useState('');
  const [room, setRoom] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [resumeValidated, setResumeValidated] = useState<number[] | null>(null);

  // Retomar um cadastro pendente: prefill do formulário + cópias já validadas.
  useEffect(() => {
    if (!resumeLabelCode) return;
    let active = true;
    listPending().then((list) => {
      const d = list.find((p) => p.labelCode === resumeLabelCode);
      if (!d || !active) return;
      setName(d.form.name); setItemType(d.form.itemType); setCategory(d.form.category || '');
      setUnitName(d.form.unitName); setRoom(d.form.room);
      setBrand(d.form.brand || ''); setModel(d.form.model || ''); setSerialNumber(d.form.serialNumber || '');
      setResumeValidated(d.validated);
    });
    return () => { active = false; };
  }, [resumeLabelCode]);

  // Vai para a validação das cópias (Modelo B) — o cadastro só é salvo lá, após
  // escanear todas as cópias. A cópia usada para iniciar já entra como validada.
  const continueToValidation = () => {
    if (!name.trim()) { setError('Informe o nome do equipamento.'); return; }
    if (!unitName.trim() || !room.trim()) { setError('Informe a unidade e o cômodo.'); return; }
    setError(null);
    const code = labelCode || resumeLabelCode;
    if (!code) { setError('Cadastro só pode iniciar pela leitura de uma etiqueta.'); return; }
    const form = { name, itemType, category, unitName, room, brand, model, serialNumber };
    const validated = resumeValidated ?? (firstCopy >= 1 && firstCopy <= copies ? [firstCopy] : []);
    nav.replace('InventoryCopyValidation', { labelCode: code, copies, validated, form });
  };

  return (
    <DetailScaffold onBack={() => nav.goBack()} eyebrow="Novo equipamento" title="Cadastrar item" compact>
      {!!labelCode && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14, backgroundColor: `${T.primary}12`, borderRadius: 12, padding: 12 }}>
          <Icon name="qr" size={16} color={T.primary} />
          <Text style={{ fontSize: 13, color: T.text }}>Etiqueta <Text style={{ fontWeight: '800', color: T.primary }}>{labelCode}</Text></Text>
        </View>
      )}

      <SectionCard title="Equipamento">
        <View style={{ gap: 14 }}>
          <View><FieldLabel required>Nome</FieldLabel><Field value={name} onChangeText={setName} placeholder="Ex.: Monitor Dell 24''" /></View>
          <View>
            <FieldLabel>Tipo</FieldLabel>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {(['equipment', 'consumable'] as const).map((t) => {
                const on = itemType === t;
                return (
                  <Pressable key={t} onPress={() => setItemType(t)} style={{ flex: 1, paddingVertical: 10, borderRadius: 11, borderWidth: 1.5, alignItems: 'center', borderColor: on ? T.primary : T.border, backgroundColor: on ? `${T.primary}12` : T.surface }}>
                    <Text style={{ fontSize: 12.5, fontWeight: '700', color: on ? T.primary : T.muted }}>{t === 'equipment' ? 'Equipamento' : 'Consumível'}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
          <View><FieldLabel>Categoria</FieldLabel><Field value={category} onChangeText={setCategory} placeholder="Ex.: PERIFERICO" /></View>
        </View>
      </SectionCard>

      <SectionCard title="Local (Mapa)">
        <View style={{ gap: 14 }}>
          <SuggestedInput label="Unidade" required value={unitName} onChangeText={setUnitName} placeholder="Ex.: HOSPITAL DO OLHO" options={unitOptions} />
          <SuggestedInput label="Cômodo / sala" required value={room} onChangeText={setRoom} placeholder="Ex.: Recepção, Sala de cirurgia 2" options={roomOptions} />
          <Text style={{ fontSize: 11, color: T.muted, marginTop: -6 }}>Pode escolher da lista ou digitar um novo — entra no catálogo.</Text>
        </View>
      </SectionCard>

      {itemType === 'equipment' && (
        <SectionCard title="Detalhes (opcional)">
          <View style={{ gap: 14 }}>
            <View><FieldLabel>Marca</FieldLabel><Field value={brand} onChangeText={setBrand} placeholder="Ex.: Dell" /></View>
            <View><FieldLabel>Modelo</FieldLabel><Field value={model} onChangeText={setModel} placeholder="Ex.: P2419H" /></View>
            <View><FieldLabel>Nº de série</FieldLabel><Field value={serialNumber} onChangeText={setSerialNumber} placeholder="Série do equipamento" /></View>
          </View>
        </SectionCard>
      )}

      {!!error && <Text style={{ color: T.danger, fontSize: 13, marginBottom: 12 }}>{error}</Text>}
      <Text style={{ fontSize: 12, color: T.muted, marginBottom: 10 }}>
        Ao continuar, você valida as {copies} cópia(s) da etiqueta escaneando cada uma no equipamento.
      </Text>
      <PrimaryButton label="Continuar para validação" icon="chevron-right" accent={T.primary} onPress={continueToValidation} />
      <View style={{ height: 12 }} />
    </DetailScaffold>
  );
}
