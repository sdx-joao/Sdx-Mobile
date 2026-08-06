import { useCallback, useEffect, useMemo, useState } from 'react';
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
  fetchServiceEquipment,
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
import { WorkOrderEquipmentEditor, buildEquipmentActionsPayload, newEquipAction, type EquipActionDraft } from '../components/WorkOrderEquipmentEditor';
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
  'work_order_movement_reason',
  'work_order_retirement_reason',
];

const LOGISTICS_UNIT_DEFAULT = 'HOSPITAL DO OLHO';
const LOGISTICS_DEPARTMENT_DEFAULT = 'CEDOC/ESTOQUE';

function logisticsLabels(direction: 'in' | 'out') {
  return direction === 'in'
    ? { internal: 'Quem recebeu / foi buscar', external: 'Quem entregou', unitLabel: 'Unidade (entrada)', unitFixed: true }
    : { internal: 'Quem levou / entregou', external: 'Quem recebeu', unitLabel: 'Unidade de destino', unitFixed: false };
}

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
    const [options, requesters, stock, equip] = await Promise.all([
      getOptions(token, WORK_ORDER_OPTION_KINDS),
      getWorkOrderRequesters(token),
      fetchServiceStock(token).catch(() => ({ links: [], consumables: [], peripherals: [] })),
      fetchServiceEquipment(token).catch(() => ({ links: [] })),
    ]);
    return { options, requesters, stock, equip };
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
  const [equipmentActions, setEquipmentActions] = useState<EquipActionDraft[]>([]);
  const accent = T.primary;
  // Vínculo de estoque ativo do serviço escolhido (entrega/coleta).
  const stockLink = useMemo(
    () => (data?.stock?.links ?? []).find((l) => l.serviceType === serviceType && l.isActive !== false) ?? null,
    [data?.stock?.links, serviceType],
  );
  const isPeripheralExchange = /TROCA.*PERIFERICO/.test(normalizeForSearch(serviceType));
  const logistics = useMemo(
    () => stockLink && !isPeripheralExchange ? { ...logisticsLabels(stockLink.direction), direction: stockLink.direction } : null,
    [stockLink, isPeripheralExchange],
  );
  // Destino padrão de retirada do equipamento envolvido (se o serviço tem vínculo).
  const retireDefault = useMemo(
    () => (data?.equip?.links ?? []).find((l) => l.serviceType === serviceType && l.isActive && l.allowRetire)?.defaultDestination ?? null,
    [data?.equip?.links, serviceType],
  );
  const equipmentFlow = useMemo(
    () => (data?.equip?.links ?? []).find((l) => l.serviceType === serviceType && l.isActive && l.allowRetire) ?? null,
    [data?.equip?.links, serviceType],
  );
  const isGenericEquipmentFlow = !!equipmentFlow && equipmentFlow.operation !== 'retire_involved';
  const isExchangeFlow = equipmentFlow?.operation === 'exchange_between_locations';
  const equipmentDestination = equipmentFlow?.operation === 'collect_to_stock'
    ? 'estoque'
    : equipmentFlow?.operation === 'install_from_stock' || equipmentFlow?.operation === 'deliver_from_stock' || equipmentFlow?.operation === 'move_between_locations'
      ? 'setor'
      : retireDefault;
  const equipmentFlowTitle = equipmentFlow?.operation === 'install_from_stock'
    ? 'Equipamento a instalar'
    : equipmentFlow?.operation === 'deliver_from_stock'
      ? 'Equipamento a entregar'
    : equipmentFlow?.operation === 'collect_to_stock'
      ? 'Equipamento a coletar'
      : equipmentFlow?.operation === 'move_between_locations'
        ? 'Equipamento a mudar de local'
        : equipmentFlow?.operation === 'exchange_between_locations'
          ? 'Troca de equipamentos'
          : 'Equipamentos envolvidos';
  const needsEquipmentDestination = isGenericEquipmentFlow && equipmentDestination === 'setor';
  // Solicitações de materiais/suprimentos são entregas internas: precisam
  // registrar quem solicitou e o setor real do catálogo, não CEDOC/ESTOQUE.
  const isMaterialSupplyFlow = !!stockLink && !isGenericEquipmentFlow && !isPeripheralExchange;
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
    if (isExchangeFlow && equipmentActions.length === 0) setEquipmentActions([newEquipAction('swap')]);
    if (!isExchangeFlow && equipmentActions.length) setEquipmentActions([]);
  }, [isExchangeFlow]);

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
    if (!logistics && requester.department) setDepartment(requester.department);
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
    const stockMaterialsPayload = buildStockMaterialsPayload(stockMaterials, stockLink);
    const catalogHas = (kind: SelectOptionKind, value: string) => {
      const normalized = normalizeForSearch(value);
      return !!normalized && (optionsByKind.get(kind) ?? []).some(option =>
        normalizeForSearch(option.value) === normalized || normalizeForSearch(option.label) === normalized
      );
    };
    const requesterIsCataloged = (data?.requesters ?? []).some(requester =>
      normalizeForSearch(requester.name) === normalizeForSearch(requestedByName)
    );
    const missing = [
      ['Tipo de serviço', serviceType],
      ['Categoria', category],
      [logistics?.unitLabel || 'Unidade', logistics?.unitFixed ? LOGISTICS_UNIT_DEFAULT : unitName],
      [isMaterialSupplyFlow ? 'Solicitante do catálogo' : logistics?.external || 'Solicitante',
        isMaterialSupplyFlow ? (requesterIsCataloged ? 'ok' : '') : requestedByName],
      ...(logistics && !isGenericEquipmentFlow ? [['Material de estoque', stockMaterialsPayload.length ? 'ok' : '']] : []),
      ...(isGenericEquipmentFlow && !isExchangeFlow ? [['Equipamento', involvedEquipment.some(item => !!item.itemId) ? 'ok' : '']] : []),
      ...(equipmentFlow?.operation === 'deliver_from_stock'
        ? [['Motivo da baixa', involvedEquipment.every(item => !item.itemId || !!item.retire?.reason) ? 'ok' : '']]
        : []),
      ...(needsEquipmentDestination ? [['Setor de destino', department]] : []),
      ...(isMaterialSupplyFlow
        ? [['Setor solicitante do catálogo', catalogHas('work_order_department', department) ? 'ok' : '']]
        : []),
      ...(!logistics ? [['Setor', department], ['Descrição', technicianRequest]] : []),
    ].filter(([, value]) => !String(value).trim()).map(([label]) => label);
    if (missing.length) {
      setError(`Preencha: ${missing.join(', ')}.`);
      return;
    }
    if (isExchangeFlow) {
      const action = equipmentActions[0];
      if (equipmentActions.length !== 1 || !action?.incoming || !action.outgoing || !action.reason || !action.outgoingDestination) {
        setError('Leia ou procure o equipamento a retirar, escolha o substituto e informe o motivo e o destino do retirado.');
        return;
      }
      const norm = (value?: string | null) => normalizeForSearch(value || '');
      const requested = `${norm(unitName)}|${norm(department)}`;
      const outgoing = `${norm(action.outgoing.unitName)}|${norm(action.outgoing.room)}`;
      const incoming = `${norm(action.incoming.unitName)}|${norm(action.incoming.room)}`;
      if (outgoing !== requested) {
        setError(`${action.outgoing.name} pertence a ${[action.outgoing.unitName, action.outgoing.room].filter(Boolean).join(' / ') || 'outro local'} e não pode ser retirado desta O.S.`);
        return;
      }
      if (incoming === requested) {
        setError('O equipamento substituto já está no local da O.S. Escolha outro equipamento.');
        return;
      }
    }
    setError(null);
    setSaving(true);
    try {
      const result = await createWorkOrder(token, {
        serviceType,
        category,
        unitName: logistics?.unitFixed ? LOGISTICS_UNIT_DEFAULT : unitName,
        department: isMaterialSupplyFlow ? department : logistics ? LOGISTICS_DEPARTMENT_DEFAULT : department,
        requestedByName,
        requesterContact,
        technicalTeam: logistics ? '' : technicalTeam,
        responsibleTechnicianName: user?.name || responsibleTechnicianName,
        technicianRequest: logistics ? `${serviceType}: ${requestedByName}` : technicianRequest,
        priority,
        involvedEquipment: logistics && !isGenericEquipmentFlow ? [] : involvedEquipment,
        stockMaterials: isGenericEquipmentFlow ? [] : stockMaterialsPayload,
        equipmentActions: isExchangeFlow
          ? buildEquipmentActionsPayload(equipmentActions, unitName, department, true)
          : [],
      });
      showToast(`${result.code} aberta.`);
      nav.replace(isExchangeFlow ? 'WorkOrderSignature' : 'WorkOrderDetail', { id: result.id });
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
          {!logistics?.unitFixed && (
            <SuggestedInput label={logistics?.unitLabel || 'Unidade'} required value={unitName} onChangeText={setUnitName} placeholder="Unidade" options={optionsByKind.get('work_order_unit') ?? []} />
          )}
          {(!logistics || needsEquipmentDestination || isMaterialSupplyFlow) && (
            <>
              <SuggestedInput
                label={needsEquipmentDestination ? 'Setor de destino' : isMaterialSupplyFlow ? 'Setor solicitante' : 'Setor'}
                required
                value={department}
                onChangeText={logistics ? setDepartment : selectDepartment}
                placeholder="Selecione no catálogo"
                options={optionsByKind.get('work_order_department') ?? []}
                allowCreate={!isMaterialSupplyFlow}
              />
              {!logistics && <SuggestedInput label="Equipe técnica" value={technicalTeam} onChangeText={setTechnicalTeam} placeholder="Ex.: TI INTERNO" options={optionsByKind.get('work_order_technical_team') ?? []} />}
            </>
          )}
          <View>
            <FieldLabel>{logistics?.internal || 'Técnico responsável'}</FieldLabel>
            <View style={{ height: 46, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Icon name="lock" size={13} color={T.muted} />
              <Text style={{ fontSize: 14, fontWeight: '700', color: T.text }}>{user?.name || '—'}</Text>
            </View>
            <Text style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>Fixado no seu login — a OS é aberta em seu nome.</Text>
          </View>
        </View>
      </SectionCard>

      {isExchangeFlow ? (
        <SectionCard title="Troca de equipamentos">
          <Text style={{ fontSize: 12.5, color: T.muted, marginBottom: 10 }}>
            Primeiro escolha o equipamento deste local; depois selecione o substituto por QR ou busca. A confirmação segue direto para as assinaturas.
          </Text>
          <WorkOrderEquipmentEditor
            actions={equipmentActions}
            onChange={setEquipmentActions}
            unitName={unitName}
            department={department}
            token={token}
            exchangeMode
            reasonOptions={(optionsByKind.get('work_order_movement_reason') ?? []).map(o => ({ value: o.value, label: o.label || o.value }))}
          />
        </SectionCard>
      ) : (!logistics || isGenericEquipmentFlow) && (
        <SectionCard title={equipmentFlowTitle}>
          <InvolvedEquipmentBlock
            token={token}
            value={involvedEquipment}
            onChange={setInvolvedEquipment}
            highlight={serviceIsEquip || isGenericEquipmentFlow}
            retireDefault={equipmentDestination}
            sourcePolicy={equipmentFlow?.sourcePolicy}
            operation={equipmentFlow?.operation ?? null}
            destinationUnit={unitName}
            destinationRoom={department}
            title={equipmentFlowTitle}
            description={isGenericEquipmentFlow
              ? equipmentFlow?.operation === 'install_from_stock'
                ? 'Leia o QR ou procure o equipamento. Ele precisa estar Funcionando no CEDOC/Estoque; o destino será o local desta O.S.'
                : equipmentFlow?.operation === 'collect_to_stock'
                  ? 'Leia o QR ou procure o equipamento deste local. Ao concluir, ele seguirá para o CEDOC/Estoque.'
                  : 'Escolha um equipamento cadastrado. Itens disponíveis no estoque aparecem primeiro; você também pode buscar ou ler o QR.'
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
      )}

      {stockLink && !isGenericEquipmentFlow && (
        <SectionCard title={isPeripheralExchange ? 'Movimentar periféricos' : 'Materiais de estoque'}>
          <StockMaterialsBlock
            link={stockLink}
            consumables={isPeripheralExchange ? (data?.stock?.peripherals ?? []) : (data?.stock?.consumables ?? [])}
            value={stockMaterials}
            onChange={setStockMaterials}
            title={isPeripheralExchange ? 'Baixa de periférico do estoque' : undefined}
            itemNoun={isPeripheralExchange ? 'periférico' : undefined}
          />
        </SectionCard>
      )}

      {!logistics && <SectionCard title="Prioridade">
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
      </SectionCard>}

      <SectionCard title={logistics && !isMaterialSupplyFlow ? 'De quem → para quem' : 'Solicitante'}>
        <View style={{ gap: 14 }}>
          <RequesterPicker
            value={requestedByName}
            department={department}
            requesters={data?.requesters ?? []}
            onPick={pickRequester}
            label={isMaterialSupplyFlow ? 'Nome do solicitante' : logistics?.external}
            placeholder={isMaterialSupplyFlow ? 'Selecione no catálogo' : logistics?.external}
            showDepartment={!logistics || isMaterialSupplyFlow}
            allowCreate={!isMaterialSupplyFlow}
          />
          <View><FieldLabel>Contato</FieldLabel><Input value={requesterContact} onChangeText={setRequesterContact} placeholder="(85) 9 0000-0000" /></View>
          {!logistics && <View><FieldLabel required>Descrição</FieldLabel><Input value={technicianRequest} onChangeText={setTechnicianRequest} placeholder="Descreva o problema ou a solicitação" multiline /></View>}
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
