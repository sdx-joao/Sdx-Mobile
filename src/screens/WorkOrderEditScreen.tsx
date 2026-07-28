import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../components/Icon';
import { DetailScaffold, EmptyState, FieldLabel, LoadingState, PrimaryButton, SectionCard } from '../components/ui';
import { SuggestedInput } from '../components/SuggestedInput';
import { RequesterPicker } from '../components/RequesterPicker';
import { WorkOrderEquipmentEditor, buildEquipmentActionsPayload, type EquipActionDraft } from '../components/WorkOrderEquipmentEditor';
import { T, WO_PRIORITY, WO_RESOLUTION, WO_STATUS } from '../theme/theme';
import {
  fetchServiceStock,
  fetchServiceEquipment,
  getInventory,
  getOptions,
  getWorkOrder,
  getWorkOrderRequesters,
  updateWorkOrder,
  type InvolvedEquipmentInput,
  type SelectOption,
  type SelectOptionKind,
  type StockMaterialInput,
  type WorkOrderRequester,
} from '../api/mobile';
import { InvolvedEquipmentBlock } from '../components/InvolvedEquipmentBlock';
import { StockMaterialsBlock, buildStockMaterialsPayload } from '../components/StockMaterialsBlock';
import { useResource } from '../api/use-resource';
import { useAuth } from '../auth/auth-context';
import { showToast } from '../lib/toast';
import type { InventoryItem, WorkOrder, WorkOrderMaterial, WorkOrderPriority, WorkOrderResolution, WorkOrderStatus } from '../data/mock';
import type { RootStackParamList } from '../navigation/types';

const EDITABLE_STATUS: WorkOrderStatus[] = ['open', 'in_progress', 'waiting'];
const COMPLETION_PERIOD_OPTIONS = [
  { hours: 1, label: '1h' },
  { hours: 2, label: '2h' },
  { hours: 4, label: '4h' },
  { hours: 8, label: '8h' },
  { hours: 24, label: '24h' },
];
const OPTION_KINDS: SelectOptionKind[] = [
  'work_order_service_type',
  'work_order_category',
  'work_order_unit',
  'work_order_department',
  'work_order_technical_team',
  'work_order_responsible_technician',
  'work_order_material',
  'work_order_material_unit',
  'work_order_movement_reason',
  'work_order_retirement_reason',
  'work_order_maintenance_reason',
  'work_order_reversal_reason',
];

type MaterialDraft = {
  description: string;
  quantity: string;
  unit: string;
  inventoryItemId?: string | null;
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

function materialToDraft(material: WorkOrderMaterial): MaterialDraft {
  return {
    description: material.description,
    quantity: String(material.quantity || 1),
    unit: material.unit || '',
    inventoryItemId: material.inventoryItemId ?? null,
  };
}

function addHours(hours: number) {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}

function toDateTimeInput(value?: string | null) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function fromDateTimeInput(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})$/);
  if (!match) return undefined;
  const [, dd, mm, yyyy, hh, min] = match;
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd), Number(hh), Number(min));
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

// Formata progressivamente enquanto o usuário digita só os números: DD/MM/AAAA HH:mm
function maskDateTimeInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 12);
  let out = '';
  for (let i = 0; i < digits.length; i += 1) {
    if (i === 2 || i === 4) out += '/';
    else if (i === 8) out += ' ';
    else if (i === 10) out += ':';
    out += digits[i];
  }
  return out;
}

function isClosedStatus(status: WorkOrderStatus) {
  return status === 'completed' || status === 'delivered' || status === 'cancelled';
}

function isDeliveryOrCollectionService(value: string) {
  const normalized = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  return normalized.includes('ENTREGA') || normalized.includes('COLETA') || normalized.includes('TRANSPORTE');
}

export function WorkOrderEditScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'WorkOrderEdit'>>();
  const { token, user } = useAuth();
  const canUploadPhotos = user?.permissions?.canUploadWorkOrderPhotos !== false;
  const loader = useCallback(async () => {
    const [detail, options, requesters, stock, equip] = await Promise.all([
      getWorkOrder(token, route.params.id),
      getOptions(token, OPTION_KINDS),
      getWorkOrderRequesters(token),
      fetchServiceStock(token).catch(() => ({ links: [], consumables: [] })),
      fetchServiceEquipment(token).catch(() => ({ links: [] })),
    ]);
    return { detail, options, requesters, stock, equip };
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
  const [status, setStatus] = useState<WorkOrderStatus>('open');
  const [expectedCompletionAt, setExpectedCompletionAt] = useState<string | null>(null);
  const [finishedAtText, setFinishedAtText] = useState('');
  const [attendanceNotesRequired, setAttendanceNotesRequired] = useState(true);
  const [attendanceNotes, setAttendanceNotes] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [resolutionStatus, setResolutionStatus] = useState<WorkOrderResolution | null>(null);
  const [priority, setPriority] = useState<WorkOrderPriority>('normal');
  const [materials, setMaterials] = useState<MaterialDraft[]>([]);
  const [equipmentActions, setEquipmentActions] = useState<EquipActionDraft[]>([]);
  const [involvedEquipment, setInvolvedEquipment] = useState<InvolvedEquipmentInput[]>([]);
  const [consumables, setConsumables] = useState<InventoryItem[]>([]);
  const [stockMaterials, setStockMaterials] = useState<StockMaterialInput[]>([]);
  // Snapshot ao carregar — só reenvia o estoque (estorno+reaplica) se o usuário mexeu.
  const initialStockRef = useRef<string>('[]');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const list = await getInventory(token);
        if (!cancelled) setConsumables(list.filter(i => i.itemType === 'consumable'));
      } catch { /* offline — segue sem vínculo de estoque */ }
    })();
    return () => { cancelled = true; };
  }, [token]);

  const optionsByKind = useMemo(() => {
    const grouped = new Map<SelectOptionKind, SelectOption[]>();
    for (const option of data?.options ?? []) {
      const current = grouped.get(option.kind) ?? [];
      current.push(option);
      grouped.set(option.kind, current);
    }
    return grouped;
  }, [data?.options]);

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
  // Vínculo de estoque ativo do serviço atual (entrega/coleta).
  const stockLink = useMemo(
    () => (data?.stock?.links ?? []).find((l) => l.serviceType === serviceType && l.isActive !== false)
      ?? (serviceType === order?.serviceType ? data?.detail.serviceStock ?? null : null),
    [data?.stock?.links, data?.detail.serviceStock, serviceType, order?.serviceType],
  );
  const equipmentFlow = useMemo(
    () => (data?.equip?.links ?? []).find((l) => l.serviceType === serviceType && l.isActive && l.allowRetire) ?? null,
    [data?.equip?.links, serviceType],
  );
  const retireDefault = equipmentFlow?.operation === 'collect_to_stock'
    ? 'estoque'
    : equipmentFlow?.operation === 'install_from_stock' || equipmentFlow?.operation === 'deliver_from_stock' || equipmentFlow?.operation === 'move_between_locations' || equipmentFlow?.operation === 'exchange_between_locations'
      ? 'setor'
      : equipmentFlow?.defaultDestination ?? null;
  const isGenericEquipmentFlow = !!equipmentFlow && equipmentFlow.operation !== 'retire_involved';
  const isExchangeFlow = equipmentFlow?.operation === 'exchange_between_locations';
  const onChangeCategory = (v: string) => {
    setCategory(v);
    const all = optionsByKind.get('work_order_service_type') ?? [];
    const a = v.trim().toUpperCase();
    const stillValid = all.some((o) => {
      if (o.value !== serviceType) return false;
      const bv = String(o.backendValue || '').trim();
      return !bv || bv.split(',').map((s) => s.trim().toUpperCase()).includes(a);
    });
    if (!stillValid) setServiceType('');
  };

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
    setStatus(isClosedStatus(order.status) ? order.status : order.status || 'open');
    setExpectedCompletionAt(order.expectedCompletionAt || null);
    setFinishedAtText(toDateTimeInput(order.finishedAt));
    setAttendanceNotesRequired(Boolean(order.attendanceNotes));
    setAttendanceNotes(order.attendanceNotes || '');
    setResolutionNotes(order.resolutionNotes || '');
    setResolutionStatus(order.resolutionStatus || null);
    setPriority(order.priority || 'normal');
    setMaterials((order.materials || []).map(materialToDraft));
    // Materiais de estoque atuais da OS (entrega/coleta).
    {
      const rows = (data?.detail.stockMaterials ?? []).map((m) => ({ itemId: m.itemId, qty: m.qty }));
      setStockMaterials(rows);
      initialStockRef.current = JSON.stringify(rows);
    }
    // Reconstrói a retirada dos envolvidos a partir das ações 'retire' pendentes.
    const retireByItem = new Map<string, 'estoque' | 'setor' | 'manutencao'>();
    for (const a of (data?.detail.equipmentActions ?? [])) {
      if (a.action !== 'retire' || a.appliedAt || !a.outgoing?.id) continue;
      const dest = a.outgoingDestination === 'cedoc' ? 'estoque'
        : a.outgoingDestination === 'setor' ? 'setor'
        : a.outgoingDestination === 'manutencao' ? 'manutencao' : null;
      if (dest) retireByItem.set(String(a.outgoing.id), dest);
    }
    setInvolvedEquipment((order.involvedEquipment ?? []).map((e) => {
      const to = e.itemId ? retireByItem.get(String(e.itemId)) : undefined;
      return {
        itemId: e.itemId, labelCode: e.labelCode, freeText: e.freeText,
        problemNote: e.problemNote, itemName: e.itemName, itemAssetTag: e.itemAssetTag,
        retire: to ? { to, unit: e.itemUnitName ?? null, room: e.itemRoom ?? null } : null,
      };
    }));
    // Ações de equipamento já registradas (web ou app) — carrega pra editar sem
    // apagar. Só as não aplicadas são editáveis; as aplicadas ficam no histórico.
    setEquipmentActions((data?.detail.equipmentActions ?? [])
      // 'retire' é gerido pelo bloco de envolvidos, não pelo editor de ações.
      .filter(a => !a.appliedAt && a.action !== 'retire')
      .map((a): EquipActionDraft => ({
        action: a.action as EquipActionDraft['action'],
        incoming: a.incoming,
        outgoing: a.outgoing,
        reason: a.reason || '',
        reasonNotes: a.reasonNotes || '',
        outgoingDestination: a.outgoingDestination || (a.action === 'swap' ? 'manutencao' : ''),
      })));
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
  const locked = isClosedStatus(order.status);
  const canEditStatus = !locked;
  const pickRequester = (requester: WorkOrderRequester) => {
    setRequestedByName(requester.name);
    if (requester.department) setDepartment(requester.department);
    if (requester.phone) setRequesterContact(requester.phone);
  };

  // Editar = só CORRIGIR dados da OS. Status andam sozinhos e a CONCLUSÃO (situação,
  // solução, hora final, assinaturas) é pelo botão "Concluir OS" no detalhe. Aqui
  // não mexemos em status/resolução/hora final — o backend preserva o que existe.
  const save = async () => {
    const missing = [
      ['Tipo de serviço', serviceType],
      ['Categoria', category],
      ['Unidade', unitName],
      ['Setor', department],
      ['Solicitante', requestedByName],
      ['Solicitação', technicianRequest],
      ...(isGenericEquipmentFlow ? [['Equipamento', involvedEquipment.some(item => !!item.itemId) ? 'ok' : '']] : []),
      ...(equipmentFlow?.operation === 'deliver_from_stock'
        ? [['Motivo da baixa', involvedEquipment.every(item => !item.itemId || !!item.retire?.reason) ? 'ok' : '']]
        : []),
    ].filter(([, value]) => !String(value).trim()).map(([label]) => label);
    if (missing.length) {
      setFormError(`Preencha: ${missing.join(', ')}.`);
      return;
    }
    if (isExchangeFlow) {
      if (!equipmentActions.length || equipmentActions.some((action) =>
        action.action !== 'swap' || !action.incoming || !action.outgoing || !action.reason
      )) {
        setFormError('Na troca, leia os dois equipamentos de cada conjunto e informe o motivo.');
        return;
      }
      const normalize = (value?: string | null) => String(value || '').trim().toUpperCase();
      for (const action of equipmentActions) {
        const incomingPlace = `${normalize(action.incoming?.unitName)}|${normalize(action.incoming?.room)}`;
        const outgoingPlace = `${normalize(action.outgoing?.unitName)}|${normalize(action.outgoing?.room)}`;
        if (incomingPlace === outgoingPlace) {
          setFormError('Os equipamentos da troca precisam estar em locais diferentes.');
          return;
        }
        const requested = `${normalize(unitName)}|${normalize(department)}`;
        if (incomingPlace !== requested && outgoingPlace !== requested) {
          setFormError('Um dos lados da troca deve corresponder ao local solicitado na O.S.');
          return;
        }
      }
    }
    setSaving(true);
    setFormError(null);
    // Estoque: só reenvia se o usuário mexeu (estorno+reaplica no servidor).
    const stockChanged = JSON.stringify(stockMaterials.map((r) => ({ itemId: r.itemId, qty: r.qty }))) !== initialStockRef.current;
    try {
      await updateWorkOrder(token, order.id, {
        serviceType,
        category,
        unitName,
        department,
        requestedByName,
        requesterContact,
        technicalTeam,
        technicianRequest,
        attendanceNotes: attendanceNotesRequired ? attendanceNotes : '',
        attendanceNotesRequired,
        priority,
        materials: materials
          .filter(item => item.description.trim())
          .map(item => ({
            description: item.description,
            quantity: Number(item.quantity.replace(',', '.')) || 1,
            unit: item.unit || null,
            inventoryItemId: item.inventoryItemId ?? null,
          })),
        equipmentActions: buildEquipmentActionsPayload(equipmentActions, unitName, department, isExchangeFlow),
        involvedEquipment,
        ...(stockChanged ? { stockMaterials: buildStockMaterialsPayload(stockMaterials, stockLink) } : {}),
      });
      showToast(`${order.code} salva.`);
      nav.goBack();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Não foi possível salvar a OS.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DetailScaffold onBack={() => nav.goBack()} eyebrow={order.code} title="Editar OS" compact>
      {locked && (
        <SectionCard title="Somente leitura">
          <View style={{ flexDirection: 'row', gap: 9, alignItems: 'flex-start' }}>
            <Icon name="alert" size={17} color={T.danger} />
            <Text style={{ flex: 1, color: T.textSoft, fontSize: 12.5, lineHeight: 18 }}>
              Esta OS já foi fechada e não pode mais ser editada.
            </Text>
          </View>
        </SectionCard>
      )}

      <SectionCard title="Identificação">
        <View style={{ gap: 14 }}>
          <SuggestedInput label="Categoria (área)" required value={category} onChangeText={onChangeCategory} placeholder="Ex.: TI, Predial…" options={optionsByKind.get('work_order_category') ?? []} />
          <SuggestedInput label="Tipo de serviço" required value={serviceType} onChangeText={setServiceType} placeholder={category ? 'Ex.: Manutenção de impressora' : 'Escolha a área primeiro'} options={serviceTypeOptions} />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}><SuggestedInput label="Unidade" required value={unitName} onChangeText={setUnitName} placeholder="Unidade" options={optionsByKind.get('work_order_unit') ?? []} /></View>
            <View style={{ flex: 1 }}><SuggestedInput label="Setor" required value={department} onChangeText={setDepartment} placeholder="Setor" options={optionsByKind.get('work_order_department') ?? []} /></View>
          </View>
          <SuggestedInput label="Equipe técnica" value={technicalTeam} onChangeText={setTechnicalTeam} placeholder="Equipe" options={optionsByKind.get('work_order_technical_team') ?? []} />
          <View>
            <FieldLabel>Técnico responsável</FieldLabel>
            <View style={{ height: 46, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Icon name="lock" size={13} color={T.muted} />
              <Text style={{ fontSize: 14, fontWeight: '700', color: T.text }}>{responsibleTechnicianName || '—'}</Text>
            </View>
          </View>
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
          <RequesterPicker
            value={requestedByName}
            department={department}
            requesters={data?.requesters ?? []}
            onPick={pickRequester}
          />
          <View><FieldLabel>Contato</FieldLabel><Input value={requesterContact} onChangeText={setRequesterContact} placeholder="Contato" /></View>
          <View><FieldLabel required>Solicitação</FieldLabel><Input value={technicianRequest} onChangeText={setTechnicianRequest} placeholder="Descrição da solicitação" multiline /></View>
          <Pressable
            onPress={() => {
              setAttendanceNotesRequired(current => !current);
              if (attendanceNotesRequired) setAttendanceNotes('');
            }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
          >
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 7,
                borderWidth: 1.5,
                borderColor: attendanceNotesRequired ? T.primary : T.border,
                backgroundColor: attendanceNotesRequired ? T.primary : T.surface,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {attendanceNotesRequired && <Icon name="check" size={14} color="#fff" />}
            </View>
            <Text style={{ color: T.textSoft, fontSize: 12.5, fontWeight: '600' }}>Informar observação do atendimento</Text>
          </Pressable>
          {attendanceNotesRequired ? (
            <View><FieldLabel>Observação do atendimento</FieldLabel><Input value={attendanceNotes} onChangeText={setAttendanceNotes} placeholder="Anotações do atendimento" multiline /></View>
          ) : (
            <Text style={{ color: T.muted, fontSize: 12.5 }}>Sem observação registrada para esta OS.</Text>
          )}
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start', backgroundColor: `${T.primary}0A`, borderRadius: 11, padding: 11 }}>
            <Icon name="info" size={15} color={T.primary} />
            <Text style={{ flex: 1, fontSize: 12, color: T.textSoft, lineHeight: 17 }}>
              Solução adotada, hora final e assinaturas são preenchidas ao tocar em
              <Text style={{ fontWeight: '800', color: T.primary }}> Concluir OS</Text> no detalhe.
            </Text>
          </View>
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
              {consumables.length > 0 && (() => {
                const linked = material.inventoryItemId ? consumables.find(c => c.id === material.inventoryItemId) : null;
                if (linked) {
                  return (
                    <Pressable
                      onPress={() => setMaterial(index, { inventoryItemId: null })}
                      style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: `${T.primary}12`, borderWidth: 1, borderColor: `${T.primary}55`, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 10 }}
                    >
                      <Icon name="box" size={14} color={T.primary} />
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 12.5, fontWeight: '700', color: T.primary }}>{linked.name}</Text>
                        <Text style={{ fontSize: 10.5, color: T.muted }}>Baixa do estoque na conclusão · {linked.currentQty} {linked.unit} em estoque</Text>
                      </View>
                      <Icon name="x" size={13} color={T.muted} />
                    </Pressable>
                  );
                }
                return (
                  <View>
                    <Text style={{ fontSize: 10.5, color: T.faint, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 6 }}>Vincular ao estoque</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
                      {consumables.slice(0, 30).map(c => (
                        <Pressable
                          key={c.id}
                          onPress={() => setMaterial(index, { inventoryItemId: c.id, description: c.name, unit: c.unit })}
                          style={{ borderWidth: 1, borderColor: T.border, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 11 }}
                        >
                          <Text style={{ fontSize: 12, color: T.textSoft }}>{c.name} · {c.currentQty} {c.unit}</Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                );
              })()}
              <Pressable onPress={() => removeMaterial(index)} style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Icon name="trash" size={14} color={T.danger} />
                <Text style={{ color: T.danger, fontSize: 12.5, fontWeight: '700' }}>Remover material</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Equipamentos envolvidos">
        <InvolvedEquipmentBlock
          token={token}
          value={involvedEquipment}
          onChange={setInvolvedEquipment}
          highlight={serviceIsEquip || isGenericEquipmentFlow}
          retireDefault={retireDefault}
          sourcePolicy={equipmentFlow?.sourcePolicy}
          destinationUnit={unitName}
          destinationRoom={department}
          title={equipmentFlow?.operation === 'install_from_stock' ? 'Equipamento a instalar'
            : equipmentFlow?.operation === 'deliver_from_stock' ? 'Equipamento a entregar'
            : equipmentFlow?.operation === 'collect_to_stock' ? 'Equipamento a coletar'
              : equipmentFlow?.operation === 'move_between_locations' ? 'Equipamento a mudar de local'
                : equipmentFlow?.operation === 'exchange_between_locations' ? 'Equipamentos a trocar'
                : 'Equipamento envolvido'}
          description={isGenericEquipmentFlow
            ? 'Estoque primeiro, com busca global e leitura do QR da etiqueta.'
            : undefined}
          allowFreeText={!isGenericEquipmentFlow}
          externalDelivery={equipmentFlow?.operation === 'deliver_from_stock'}
          reasonOptions={(optionsByKind.get(
            equipmentFlow?.operation === 'deliver_from_stock'
              ? 'work_order_retirement_reason'
              : 'work_order_movement_reason',
          ) ?? []).map(o => ({ value: o.value, label: o.label || o.value }))}
        />
      </SectionCard>

      {stockLink && !isGenericEquipmentFlow && (
        <SectionCard title="Materiais de estoque">
          <StockMaterialsBlock
            link={stockLink}
            consumables={data?.stock?.consumables ?? []}
            value={stockMaterials}
            onChange={setStockMaterials}
          />
        </SectionCard>
      )}

      <SectionCard title={`Ações de equipamento (${equipmentActions.length})`}>
        <Text style={{ fontSize: 12, color: T.muted, marginBottom: 10 }}>
          Instalar, mover ou trocar máquina — escaneie a etiqueta de patrimônio. Aplica na conclusão da OS.
        </Text>
        <WorkOrderEquipmentEditor
          actions={equipmentActions}
          onChange={setEquipmentActions}
          unitName={unitName}
          department={department}
          token={token}
          exchangeMode={isExchangeFlow}
          reasonOptions={(optionsByKind.get('work_order_movement_reason') ?? []).map(o => ({ value: o.value, label: o.label || o.value }))}
        />
      </SectionCard>

      {!locked && canUploadPhotos && (
        <SectionCard title="Fotos">
          <Text style={{ fontSize: 12, color: T.muted, marginBottom: 10 }}>Capture fotos do atendimento. Elas aparecem nos anexos da OS.</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {([
              ['before', 'Foto antes'],
              ['after', 'Foto depois'],
              ['general', 'Foto geral'],
            ] as Array<['before' | 'after' | 'general', string]>).map(([category, label]) => (
              <Pressable
                key={category}
                onPress={() => nav.navigate('WorkOrderAttachmentCapture', { id: order.id, category })}
                style={{ flex: 1, minHeight: 44, borderRadius: 11, borderWidth: 1, borderColor: T.primary, backgroundColor: `${T.primary}10`, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8 }}
              >
                <Text style={{ color: T.primary, fontSize: 11.5, fontWeight: '800', textAlign: 'center' }}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </SectionCard>
      )}

      {!!formError && <Text style={{ color: T.danger, fontSize: 13, marginBottom: 12 }}>{formError}</Text>}
      {locked ? null : saving ? (
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
