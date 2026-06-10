import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../components/Icon';
import { DetailScaffold, EmptyState, FieldLabel, LoadingState, PrimaryButton, SectionCard } from '../components/ui';
import { T, WO_PRIORITY } from '../theme/theme';
import { getOptions, getWorkOrder, updateWorkOrder, type SelectOption, type SelectOptionKind } from '../api/mobile';
import { useResource } from '../api/use-resource';
import { useAuth } from '../auth/auth-context';
import type { WorkOrder, WorkOrderMaterial, WorkOrderPriority } from '../data/mock';
import type { RootStackParamList } from '../navigation/types';

const OPTION_KINDS: SelectOptionKind[] = [
  'work_order_service_type',
  'work_order_category',
  'work_order_unit',
  'work_order_department',
  'work_order_technical_team',
  'work_order_responsible_technician',
  'work_order_material',
  'work_order_material_unit',
];

type MaterialDraft = {
  description: string;
  quantity: string;
  unit: string;
};

function Input({
  value,
  onChangeText,
  placeholder,
  multiline,
  keyboardType,
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric';
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={T.faint}
      multiline={multiline}
      keyboardType={keyboardType}
      textAlignVertical={multiline ? 'top' : 'center'}
      style={{
        minHeight: multiline ? 92 : 44,
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
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  options: SelectOption[];
  required?: boolean;
  multiline?: boolean;
}) {
  const normalized = value.trim().toUpperCase();
  const suggestions = options
    .filter(option => !normalized || option.label.toUpperCase().includes(normalized) || option.value.toUpperCase().includes(normalized))
    .slice(0, 8);
  return (
    <View>
      <FieldLabel required={required}>{label}</FieldLabel>
      <Input value={value} onChangeText={onChangeText} placeholder={placeholder} multiline={multiline} />
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

function materialToDraft(material: WorkOrderMaterial): MaterialDraft {
  return {
    description: material.description,
    quantity: String(material.quantity || 1),
    unit: material.unit || '',
  };
}

export function WorkOrderEditScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'WorkOrderEdit'>>();
  const { token } = useAuth();
  const loader = useCallback(async () => {
    const [detail, options] = await Promise.all([
      getWorkOrder(token, route.params.id),
      getOptions(token, OPTION_KINDS),
    ]);
    return { detail, options };
  }, [token, route.params.id]);
  const { data, loading, error } = useResource(loader);
  const order = data?.detail.workOrder;
  const [hydratedId, setHydratedId] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState('');
  const [category, setCategory] = useState('');
  const [unitName, setUnitName] = useState('');
  const [department, setDepartment] = useState('');
  const [technicalTeam, setTechnicalTeam] = useState('');
  const [responsibleTechnicianName, setResponsibleTechnicianName] = useState('');
  const [requestedByName, setRequestedByName] = useState('');
  const [requesterContact, setRequesterContact] = useState('');
  const [technicianRequest, setTechnicianRequest] = useState('');
  const [attendanceNotes, setAttendanceNotes] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [priority, setPriority] = useState<WorkOrderPriority>('normal');
  const [materials, setMaterials] = useState<MaterialDraft[]>([]);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const optionsByKind = useMemo(() => {
    const grouped = new Map<SelectOptionKind, SelectOption[]>();
    for (const option of data?.options ?? []) {
      const current = grouped.get(option.kind) ?? [];
      current.push(option);
      grouped.set(option.kind, current);
    }
    return grouped;
  }, [data?.options]);

  useEffect(() => {
    if (!order || hydratedId === order.id) return;
    setHydratedId(order.id);
    setServiceType(order.serviceType || '');
    setCategory(order.category || '');
    setUnitName(order.unitName || '');
    setDepartment(order.department || '');
    setTechnicalTeam(order.technicalTeam || '');
    setResponsibleTechnicianName(order.responsibleTechnicianName || '');
    setRequestedByName(order.requestedByName || '');
    setRequesterContact(order.requesterContact || '');
    setTechnicianRequest(order.technicianRequest || '');
    setAttendanceNotes(order.attendanceNotes || '');
    setResolutionNotes(order.resolutionNotes || '');
    setPriority(order.priority || 'normal');
    setMaterials((order.materials || []).map(materialToDraft));
  }, [hydratedId, order]);

  if (loading) {
    return (
      <DetailScaffold onBack={() => nav.goBack()} title="Carregando edição">
        <LoadingState />
      </DetailScaffold>
    );
  }

  if (error || !order) {
    return (
      <DetailScaffold onBack={() => nav.goBack()} title="Editar OS">
        <EmptyState icon="clipboard" text={error || 'Ordem de serviço não encontrada.'} />
      </DetailScaffold>
    );
  }

  const setMaterial = (index: number, patch: Partial<MaterialDraft>) => {
    setMaterials(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  };

  const addMaterial = () => setMaterials(current => [...current, { description: '', quantity: '1', unit: 'UN' }]);
  const removeMaterial = (index: number) => setMaterials(current => current.filter((_, itemIndex) => itemIndex !== index));

  const save = async () => {
    const missing = [
      ['Tipo de serviço', serviceType],
      ['Categoria', category],
      ['Unidade', unitName],
      ['Setor', department],
      ['Solicitante', requestedByName],
      ['Solicitação', technicianRequest],
    ].filter(([, value]) => !String(value).trim()).map(([label]) => label);
    if (missing.length) {
      setFormError(`Preencha: ${missing.join(', ')}.`);
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      await updateWorkOrder(token, order.id, {
        serviceType,
        category,
        unitName,
        department,
        requestedByName,
        requesterContact,
        technicalTeam,
        responsibleTechnicianName,
        technicianRequest,
        attendanceNotes,
        resolutionNotes,
        priority,
        materials: materials
          .filter(item => item.description.trim())
          .map(item => ({
            description: item.description,
            quantity: Number(item.quantity.replace(',', '.')) || 1,
            unit: item.unit || null,
          })),
      });
      Alert.alert('OS atualizada', `${order.code} foi salva com sucesso.`);
      nav.goBack();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Não foi possível salvar a OS.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DetailScaffold onBack={() => nav.goBack()} eyebrow={order.code} title="Editar OS" compact>
      <SectionCard title="Identificação">
        <View style={{ gap: 14 }}>
          <SuggestedInput label="Tipo de serviço" required value={serviceType} onChangeText={setServiceType} placeholder="Tipo" options={optionsByKind.get('work_order_service_type') ?? []} />
          <SuggestedInput label="Categoria" required value={category} onChangeText={setCategory} placeholder="Categoria" options={optionsByKind.get('work_order_category') ?? []} />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}><SuggestedInput label="Unidade" required value={unitName} onChangeText={setUnitName} placeholder="Unidade" options={optionsByKind.get('work_order_unit') ?? []} /></View>
            <View style={{ flex: 1 }}><SuggestedInput label="Setor" required value={department} onChangeText={setDepartment} placeholder="Setor" options={optionsByKind.get('work_order_department') ?? []} /></View>
          </View>
          <SuggestedInput label="Equipe técnica" value={technicalTeam} onChangeText={setTechnicalTeam} placeholder="Equipe" options={optionsByKind.get('work_order_technical_team') ?? []} />
          <SuggestedInput label="Técnico responsável" value={responsibleTechnicianName} onChangeText={setResponsibleTechnicianName} placeholder="Responsável" options={optionsByKind.get('work_order_responsible_technician') ?? []} />
        </View>
      </SectionCard>

      <SectionCard title="Prioridade">
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {Object.entries(WO_PRIORITY).map(([key, meta]) => {
            const active = priority === key;
            return (
              <Pressable
                key={key}
                onPress={() => setPriority(key as WorkOrderPriority)}
                style={{
                  flex: 1,
                  paddingVertical: 9,
                  borderRadius: 11,
                  borderWidth: 1.5,
                  alignItems: 'center',
                  borderColor: active ? meta.color : T.border,
                  backgroundColor: active ? meta.soft : T.surface,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: '600', color: active ? meta.color : T.muted }}>{meta.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </SectionCard>

      <SectionCard title="Solicitante e atendimento">
        <View style={{ gap: 14 }}>
          <View><FieldLabel required>Solicitante</FieldLabel><Input value={requestedByName} onChangeText={setRequestedByName} placeholder="Solicitante" /></View>
          <View><FieldLabel>Contato</FieldLabel><Input value={requesterContact} onChangeText={setRequesterContact} placeholder="Contato" /></View>
          <View><FieldLabel required>Solicitação</FieldLabel><Input value={technicianRequest} onChangeText={setTechnicianRequest} placeholder="Descrição da solicitação" multiline /></View>
          <View><FieldLabel>Observação do atendimento</FieldLabel><Input value={attendanceNotes} onChangeText={setAttendanceNotes} placeholder="Anotações do atendimento" multiline /></View>
          <View><FieldLabel>Solução adotada</FieldLabel><Input value={resolutionNotes} onChangeText={setResolutionNotes} placeholder="Solução executada" multiline /></View>
        </View>
      </SectionCard>

      <SectionCard
        title={`Materiais (${materials.length})`}
        action={<Pressable onPress={addMaterial} hitSlop={8}><Text style={{ color: T.primary, fontSize: 12.5, fontWeight: '700' }}>Adicionar</Text></Pressable>}
      >
        <View style={{ gap: 12 }}>
          {materials.length === 0 && <Text style={{ fontSize: 12.5, color: T.muted }}>Nenhum material informado.</Text>}
          {materials.map((material, index) => (
            <View key={index} style={{ borderWidth: 1, borderColor: T.border, borderRadius: 12, padding: 10, gap: 9 }}>
              <SuggestedInput label="Material" value={material.description} onChangeText={(value) => setMaterial(index, { description: value })} placeholder="Descrição" options={optionsByKind.get('work_order_material') ?? []} />
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <FieldLabel>Quantidade</FieldLabel>
                  <Input value={material.quantity} onChangeText={(value) => setMaterial(index, { quantity: value })} placeholder="1" keyboardType="numeric" />
                </View>
                <View style={{ flex: 1 }}>
                  <SuggestedInput label="Unidade" value={material.unit} onChangeText={(value) => setMaterial(index, { unit: value })} placeholder="UN" options={optionsByKind.get('work_order_material_unit') ?? []} />
                </View>
              </View>
              <Pressable onPress={() => removeMaterial(index)} style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Icon name="trash" size={14} color={T.danger} />
                <Text style={{ color: T.danger, fontSize: 12.5, fontWeight: '700' }}>Remover material</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </SectionCard>

      {!!formError && <Text style={{ color: T.danger, fontSize: 13, marginBottom: 12 }}>{formError}</Text>}
      {saving ? (
        <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={T.primary} />
        </View>
      ) : (
        <PrimaryButton label="Salvar alterações" icon="check" onPress={save} />
      )}
      <View style={{ height: 12 }} />
    </DetailScaffold>
  );
}
