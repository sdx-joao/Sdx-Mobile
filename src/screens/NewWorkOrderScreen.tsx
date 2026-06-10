import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DetailScaffold, FieldLabel, PrimaryButton, SectionCard } from '../components/ui';
import { T, WO_PRIORITY } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { createWorkOrder, getOptions, type SelectOption, type SelectOptionKind } from '../api/mobile';
import { useResource } from '../api/use-resource';
import type { WorkOrderPriority } from '../data/mock';
import type { RootStackParamList } from '../navigation/types';

const WORK_ORDER_OPTION_KINDS: SelectOptionKind[] = ['work_order_service_type', 'work_order_category', 'work_order_unit', 'work_order_department'];

function Input({
  value,
  onChangeText,
  placeholder,
  multiline,
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={T.faint}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'}
      style={{
        minHeight: multiline ? 94 : 44,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: T.border,
        backgroundColor: T.surface,
        paddingHorizontal: 13,
        paddingVertical: multiline ? 11 : 0,
        fontSize: 14,
        color: T.text,
      }}
    />
  );
}

function SuggestedInput({
  label,
  value,
  onChangeText,
  placeholder,
  options,
  required,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  options: SelectOption[];
  required?: boolean;
}) {
  const normalized = value.trim().toUpperCase();
  const suggestions = options
    .filter(option => !normalized || option.label.toUpperCase().includes(normalized) || option.value.toUpperCase().includes(normalized))
    .slice(0, 8);
  return (
    <View>
      <FieldLabel required={required}>{label}</FieldLabel>
      <Input value={value} onChangeText={onChangeText} placeholder={placeholder} />
      {suggestions.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 7, paddingTop: 8 }}>
          {suggestions.map(option => (
            <Pressable
              key={`${option.kind}-${option.value}`}
              onPress={() => onChangeText(option.value)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: value === option.value ? T.primary : T.border,
                backgroundColor: value === option.value ? `${T.primary}12` : T.surfaceMuted,
              }}
            >
              <Text style={{ fontSize: 11.5, fontWeight: '600', color: value === option.value ? T.primary : T.muted }}>{option.label}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

export function NewWorkOrderScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { token, user } = useAuth();
  const optionsLoader = useCallback(() => getOptions(token, WORK_ORDER_OPTION_KINDS), [token]);
  const { data: options } = useResource(optionsLoader);
  const [serviceType, setServiceType] = useState('');
  const [category, setCategory] = useState('');
  const [unitName, setUnitName] = useState('HO JCB');
  const [department, setDepartment] = useState('');
  const [requestedByName, setRequestedByName] = useState(user?.name || '');
  const [requesterContact, setRequesterContact] = useState('');
  const [technicianRequest, setTechnicianRequest] = useState('');
  const [priority, setPriority] = useState<WorkOrderPriority>('normal');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const accent = T.primary;
  const optionsByKind = useMemo(() => {
    const grouped = new Map<SelectOptionKind, SelectOption[]>();
    for (const option of options ?? []) {
      const current = grouped.get(option.kind) ?? [];
      current.push(option);
      grouped.set(option.kind, current);
    }
    return grouped;
  }, [options]);

  async function submit() {
    const missing = [
      ['Tipo de serviço', serviceType],
      ['Categoria', category],
      ['Unidade', unitName],
      ['Setor', department],
      ['Solicitante', requestedByName],
      ['Descrição', technicianRequest],
    ].filter(([, value]) => !String(value).trim()).map(([label]) => label);
    if (missing.length) {
      setError(`Preencha: ${missing.join(', ')}.`);
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const result = await createWorkOrder(token, {
        serviceType,
        category,
        unitName,
        department,
        requestedByName,
        requesterContact,
        technicianRequest,
        priority,
      });
      Alert.alert('OS criada', `${result.code} foi aberta com sucesso.`);
      nav.replace('WorkOrderDetail', { id: result.id });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível abrir a OS.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <DetailScaffold onBack={() => nav.goBack()} eyebrow="Nova ordem" title="Abrir OS" compact>
      <SectionCard title="Detalhes do serviço">
        <View style={{ gap: 14 }}>
          <SuggestedInput label="Tipo de serviço" required value={serviceType} onChangeText={setServiceType} placeholder="Ex.: Manutenção corretiva" options={optionsByKind.get('work_order_service_type') ?? []} />
          <SuggestedInput label="Categoria" required value={category} onChangeText={setCategory} placeholder="Ex.: TI / Infraestrutura" options={optionsByKind.get('work_order_category') ?? []} />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}><SuggestedInput label="Unidade" required value={unitName} onChangeText={setUnitName} placeholder="Unidade" options={optionsByKind.get('work_order_unit') ?? []} /></View>
            <View style={{ flex: 1 }}><SuggestedInput label="Setor" required value={department} onChangeText={setDepartment} placeholder="Setor" options={optionsByKind.get('work_order_department') ?? []} /></View>
          </View>
        </View>
      </SectionCard>

      <SectionCard title="Prioridade">
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {Object.entries(WO_PRIORITY).map(([k, p]) => {
            const on = priority === k;
            return (
              <Pressable
                key={k}
                onPress={() => setPriority(k as WorkOrderPriority)}
                style={{
                  flex: 1, paddingVertical: 9, borderRadius: 11, borderWidth: 1.5, alignItems: 'center',
                  borderColor: on ? p.color : T.border, backgroundColor: on ? p.soft : T.surface,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: '600', color: on ? p.color : T.muted }}>{p.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </SectionCard>

      <SectionCard title="Solicitante">
        <View style={{ gap: 14 }}>
          <View><FieldLabel required>Nome</FieldLabel><Input value={requestedByName} onChangeText={setRequestedByName} placeholder="Quem solicitou" /></View>
          <View><FieldLabel>Contato</FieldLabel><Input value={requesterContact} onChangeText={setRequesterContact} placeholder="(85) 9 0000-0000" /></View>
          <View><FieldLabel required>Descrição</FieldLabel><Input value={technicianRequest} onChangeText={setTechnicianRequest} placeholder="Descreva o problema ou a solicitação" multiline /></View>
        </View>
      </SectionCard>

      {!!error && <Text style={{ color: T.danger, fontSize: 13, marginBottom: 12 }}>{error}</Text>}
      {saving ? (
        <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={accent} />
        </View>
      ) : (
        <PrimaryButton label="Abrir ordem de serviço" icon="check" accent={accent} onPress={submit} />
      )}
      <View style={{ height: 12 }} />
    </DetailScaffold>
  );
}
