import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DetailScaffold, FieldLabel, PrimaryButton, SectionCard } from '../components/ui';
import { SuggestedInput } from '../components/SuggestedInput';
import { Icon } from '../components/Icon';
import { showToast } from '../lib/toast';
import { RequesterPicker } from '../components/RequesterPicker';
import { T, WO_PRIORITY } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import {
  createWorkOrder,
  fetchServiceStock,
  getInventory,
  getOptions,
  getWorkOrderRequesters,
  type InvolvedEquipmentInput,
  type SelectOption,
  type SelectOptionKind,
  type StockMaterialInput,
  type WorkOrderRequester,
} from '../api/mobile';
import { InvolvedEquipmentBlock } from '../components/InvolvedEquipmentBlock';
import { StockMaterialsBlock, buildStockMaterialsPayload } from '../components/StockMaterialsBlock';
import { useResource } from '../api/use-resource';
import type { WorkOrderPriority } from '../data/mock';
import type { RootStackParamList } from '../navigation/types';

const WORK_ORDER_OPTION_KINDS: SelectOptionKind[] = [
  'work_order_service_type',
  'work_order_category',
  'work_order_unit',
  'work_order_department',
  'work_order_technical_team',
  'work_order_responsible_technician',
];

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

function normalizeForSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().trim();
}

function getRequesterRank(item: WorkOrderRequester) {
  if (item.source === 'catalog' && item.phone) return 0;
  if (item.source === 'catalog') return 1;
  if (item.phone) return 2;
  return 3;
}

function findRequesterForDepartment(department: string, requesters: WorkOrderRequester[]) {
  const dept = normalizeForSearch(department);
  if (!dept) return null;
  return [...requesters]
    .filter(item => item.department && normalizeForSearch(item.department) === dept)
    .sort((a, b) => getRequesterRank(a) - getRequesterRank(b) || a.name.localeCompare(b.name, 'pt-BR'))[0] ?? null;
}

export function NewWorkOrderScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { token, user } = useAuth();
  const optionsLoader = useCallback(async () => {
    const [options, requesters, stock] = await Promise.all([
      getOptions(token, WORK_ORDER_OPTION_KINDS),
      getWorkOrderRequesters(token),
      fetchServiceStock(token).catch(() => ({ links: [], consumables: [] })),
    ]);
    return { options, requesters, stock };
  }, [token]);
  const { data } = useResource(optionsLoader);
  const [serviceType, setServiceType] = useState('');
  const [category, setCategory] = useState('');
  // Padrão = nome CANÔNICO do catálogo (antes era 'HO JCB', que não existia no
  // catálogo de unidades e travava o fechamento da OS na web: "Use apenas itens
  // cadastrados em Catálogos — Unidade").
  const [unitName, setUnitName] = useState('HOSPITAL DO OLHO');
  const [department, setDepartment] = useState('');
  const [technicalTeam, setTechnicalTeam] = useState('');
  const [responsibleTechnicianName, setResponsibleTechnicianName] = useState('');
  const [requestedByName, setRequestedByName] = useState('');
  const [requesterContact, setRequesterContact] = useState('');
  const [technicianRequest, setTechnicianRequest] = useState('');
  const [priority, setPriority] = useState<WorkOrderPriority>('normal');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [involvedEquipment, setInvolvedEquipment] = useState<InvolvedEquipmentInput[]>([]);
  const [stockMaterials, setStockMaterials] = useState<StockMaterialInput[]>([]);
  const accent = T.primary;
  // Vínculo de estoque ativo do serviço escolhido (entrega/coleta).
  const stockLink = useMemo(
    () => (data?.stock?.links ?? []).find((l) => l.serviceType === serviceType && l.isActive !== false) ?? null,
    [data?.stock?.links, serviceType],
  );
  const optionsByKind = useMemo(() => {
    const grouped = new Map<SelectOptionKind, SelectOption[]>();
    for (const option of data?.options ?? []) {
      const current = grouped.get(option.kind) ?? [];
      current.push(option);
      grouped.set(option.kind, current);
    }
    return grouped;
  }, [data?.options]);

  // Cascata: tipos da área (categoria). backend_value = áreas CSV; vazio = todas.
  const serviceTypeOptions = useMemo(() => {
    const all = optionsByKind.get('work_order_service_type') ?? [];
    const a = category.trim().toUpperCase();
    if (!a) return all;
    return all.filter((o) => {
      const bv = String(o.backendValue || '').trim();
      if (!bv) return true;
      return bv.split(',').map((s) => s.trim().toUpperCase()).includes(a);
    });
  }, [optionsByKind, category]);
  const serviceIsEquip = useMemo(
    () => (optionsByKind.get('work_order_service_type') ?? []).find((o) => o.value === serviceType)?.code === 'EQUIP',
    [optionsByKind, serviceType],
  );
  const onChangeCategory = (v: string) => {
    setCategory(v);
    // Limpa o tipo se ele não pertencer mais à nova área.
    const all = optionsByKind.get('work_order_service_type') ?? [];
    const a = v.trim().toUpperCase();
    const stillValid = all.some((o) => {
      if (o.value !== serviceType) return false;
      const bv = String(o.backendValue || '').trim();
      return !bv || bv.split(',').map((s) => s.trim().toUpperCase()).includes(a);
    });
    if (!stillValid) setServiceType('');
  };

  const pickRequester = (requester: WorkOrderRequester) => {
    setRequestedByName(requester.name);
    if (requester.department) setDepartment(requester.department);
    if (requester.phone) setRequesterContact(requester.phone);
  };

  const selectDepartment = (value: string) => {
    setDepartment(value);
    const requester = findRequesterForDepartment(value, data?.requesters ?? []);
    if (requester) {
      setRequestedByName(requester.name);
      setRequesterContact(requester.phone || '');
    } else {
      setRequestedByName('');
      setRequesterContact('');
    }
  };

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
        technicalTeam,
        responsibleTechnicianName,
        technicianRequest,
        priority,
        involvedEquipment,
        stockMaterials: buildStockMaterialsPayload(stockMaterials, stockLink),
      });
      showToast(`${result.code} aberta.`);
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
          <SuggestedInput label="Categoria (área)" required value={category} onChangeText={onChangeCategory} placeholder="Ex.: TI, Predial…" options={optionsByKind.get('work_order_category') ?? []} />
          <SuggestedInput label="Tipo de serviço" required value={serviceType} onChangeText={setServiceType} placeholder={category ? 'Ex.: Manutenção de impressora' : 'Escolha a área primeiro'} options={serviceTypeOptions} />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}><SuggestedInput label="Unidade" required value={unitName} onChangeText={setUnitName} placeholder="Unidade" options={optionsByKind.get('work_order_unit') ?? []} /></View>
            <View style={{ flex: 1 }}><SuggestedInput label="Setor" required value={department} onChangeText={selectDepartment} placeholder="Setor" options={optionsByKind.get('work_order_department') ?? []} /></View>
          </View>
          <SuggestedInput label="Equipe técnica" value={technicalTeam} onChangeText={setTechnicalTeam} placeholder="Ex.: TI INTERNO" options={optionsByKind.get('work_order_technical_team') ?? []} />
          <View>
            <FieldLabel>Técnico responsável</FieldLabel>
            <View style={{ height: 46, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Icon name="lock" size={13} color={T.muted} />
              <Text style={{ fontSize: 14, fontWeight: '700', color: T.text }}>{user?.name || '—'}</Text>
            </View>
            <Text style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>Fixado no seu login — a OS é aberta em seu nome.</Text>
          </View>
        </View>
      </SectionCard>

      <SectionCard title="Equipamentos envolvidos">
        <InvolvedEquipmentBlock token={token} value={involvedEquipment} onChange={setInvolvedEquipment} highlight={serviceIsEquip} />
      </SectionCard>

      {stockLink && (
        <SectionCard title="Materiais de estoque">
          <StockMaterialsBlock
            link={stockLink}
            consumables={data?.stock?.consumables ?? []}
            value={stockMaterials}
            onChange={setStockMaterials}
          />
        </SectionCard>
      )}

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
          <RequesterPicker
            value={requestedByName}
            department={department}
            requesters={data?.requesters ?? []}
            onPick={pickRequester}
          />
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
