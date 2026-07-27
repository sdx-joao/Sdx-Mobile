import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ChipRow,
  EmptyState,
  FieldLabel,
  LoadingState,
  ModuleScreen,
  SearchField,
  SectionCard,
  type Chip,
} from '../components/ui';
import { Icon } from '../components/Icon';
import { T, INV_TYPE } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { useResource } from '../api/use-resource';
import { API_BASE_URL } from '../api/client';
import {
  createStockMovement,
  getInventory,
  getStockMovements,
  type StockMovement,
} from '../api/mobile';
import type { InventoryItem } from '../data/mock';
import type { RootStackParamList } from '../navigation/types';

const TYPE_LABEL: Record<InventoryItem['primaryType'], string> = {
  EQUIPAMENTO: 'Equipamentos',
  PERIFERICO: 'Periféricos',
  FERRAMENTA: 'Ferramentas',
  MATERIAL: 'Materiais',
  SUPRIMENTO: 'Suprimentos',
};

const TYPE_COLOR: Record<InventoryItem['primaryType'], { color: string; soft: string }> = {
  EQUIPAMENTO: { color: '#2563EB', soft: '#DBEAFE' },
  PERIFERICO: { color: '#7C3AED', soft: '#EDE9FE' },
  FERRAMENTA: { color: '#C2410C', soft: '#FFEDD5' },
  MATERIAL: { color: '#047857', soft: '#D1FAE5' },
  SUPRIMENTO: { color: '#B45309', soft: '#FEF3C7' },
};

function isStockItem(item: InventoryItem) {
  return item.itemType !== 'equipment' || item.lifecycleStatus === 'in_stock';
}

function fmtQty(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace('.', ',');
}

function StockCard({
  item,
  canMove,
  onOpen,
  onMove,
}: {
  item: InventoryItem;
  canMove: boolean;
  onOpen: (item: InventoryItem) => void;
  onMove: (item: InventoryItem) => void;
}) {
  const { token } = useAuth();
  const type = INV_TYPE[item.primaryType];
  const typeColor = TYPE_COLOR[item.primaryType];
  const available = item.currentQty - (item.reservedQty || 0);
  const low = available <= 0 || (item.minQty > 0 && available <= item.minQty);
  // Miniatura (w=144) com Bearer — igual ao InvCard. Reconhecer pela foto é rápido.
  const photoUri = item.mainPhotoUrl
    ? `${API_BASE_URL}${item.mainPhotoUrl}${item.mainPhotoUrl.includes('?') ? '&' : '?'}w=144`
    : null;
  return (
    <Pressable
      onPress={() => onOpen(item)}
      style={{
        // Tint suave por tipo — diferencia equipamento/suprimento/material de relance.
        backgroundColor: `${typeColor.color}0A`,
        borderWidth: 1,
        borderColor: low ? '#F59E0B55' : `${typeColor.color}33`,
        borderLeftWidth: 4,
        borderLeftColor: typeColor.color,
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 11 }}>
        <View style={{ width: 42, height: 42, borderRadius: 12, overflow: 'hidden', backgroundColor: typeColor.soft, alignItems: 'center', justifyContent: 'center' }}>
          {photoUri ? (
            <Image
              source={{ uri: photoUri, headers: token ? { Authorization: `Bearer ${token}` } : undefined }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          ) : (
            <Icon name={type?.icon || 'archive'} size={20} color={typeColor.color} />
          )}
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text numberOfLines={2} style={{ color: T.text, fontSize: 14.5, fontWeight: '700', lineHeight: 19 }}>{item.name}</Text>
          <Text style={{ color: T.muted, fontSize: 11.5, marginTop: 3 }}>
            {TYPE_LABEL[item.primaryType]}{item.category ? ` · ${item.category}` : ''}
          </Text>
          {!!item.locationLabel && <Text numberOfLines={1} style={{ color: T.faint, fontSize: 11.5, marginTop: 3 }}>{item.locationLabel}</Text>}
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: low ? '#B45309' : T.text, fontSize: 20, fontWeight: '900' }}>{fmtQty(available)}</Text>
          <Text style={{ color: T.faint, fontSize: 10.5 }}>{item.unit} disponível</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: T.surfaceMuted }}>
        <Text style={{ color: low ? '#B45309' : '#047857', fontSize: 11.5, fontWeight: '700' }}>
          {available <= 0 ? 'Sem saldo' : low ? 'Estoque baixo' : 'Disponível'}
          {item.reservedQty ? ` · ${fmtQty(item.reservedQty)} reservado` : ''}
        </Text>
        {canMove && (
          <Pressable
            onPress={event => { event.stopPropagation(); onMove(item); }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 9, backgroundColor: `${T.primary}12` }}
          >
            <Icon name="shuffle" size={14} color={T.primary} />
            <Text style={{ color: T.primary, fontSize: 11.5, fontWeight: '800' }}>Movimentar</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

function MovementRow({ movement }: { movement: StockMovement }) {
  const incoming = movement.movementType === 'in';
  return (
    <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: T.surfaceMuted }}>
      <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: incoming ? '#DCFCE7' : '#FEF3C7', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={incoming ? 'arrow-down-circle' : 'arrow-up-circle'} size={17} color={incoming ? '#047857' : '#B45309'} />
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text numberOfLines={1} style={{ color: T.text, fontSize: 12.5, fontWeight: '700' }}>{movement.itemName || 'Item'}</Text>
        <Text numberOfLines={1} style={{ color: T.muted, fontSize: 11, marginTop: 2 }}>
          {[movement.reason, movement.destinationLabel, movement.userName].filter(Boolean).join(' · ') || 'Movimentação'}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ color: incoming ? '#047857' : '#B45309', fontSize: 13, fontWeight: '900' }}>{incoming ? '+' : '−'}{fmtQty(Math.abs(movement.qty))}</Text>
        <Text style={{ color: T.faint, fontSize: 9.5 }}>{new Date(movement.createdAt).toLocaleDateString('pt-BR')}</Text>
      </View>
    </View>
  );
}

export function StockScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { token, user } = useAuth();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<InventoryItem | null>(null);
  const [movementType, setMovementType] = useState<'in' | 'out'>('out');
  const [qty, setQty] = useState('1');
  const [reason, setReason] = useState('');
  const [destination, setDestination] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const canMove = user?.role === 'SuperAdministrador' || user?.permissions?.canManageInventory === true;
  const canEntry = user?.role === 'SuperAdministrador' || user?.permissions?.canManageInventoryStock === true;

  const loader = useCallback(async () => {
    const [items, movements] = await Promise.all([
      getInventory(token),
      getStockMovements(token, 40),
    ]);
    return { items, movements };
  }, [token]);
  const { data, loading, refreshing, error, reload } = useResource(loader, { reloadOnFocus: true });
  const stock = useMemo(() => (data?.items ?? []).filter(isStockItem), [data?.items]);
  const counts = useMemo(() => {
    const result: Record<string, number> = { all: stock.length };
    stock.forEach(item => { result[item.primaryType] = (result[item.primaryType] || 0) + 1; });
    return result;
  }, [stock]);
  const chips: Chip[] = [
    { key: 'all', label: 'Todos', count: counts.all },
    ...Object.entries(TYPE_LABEL).map(([key, label]) => ({ key, label, count: counts[key] })).filter(chip => chip.count),
  ];
  const list = useMemo(() => stock.filter(item => {
    if (filter !== 'all' && item.primaryType !== filter) return false;
    const text = `${item.name} ${item.category || ''} ${item.sku || ''} ${item.brand || ''} ${item.locationLabel || ''}`.toLowerCase();
    return !q || text.includes(q.toLowerCase());
  }), [stock, filter, q]);
  const totalUnits = stock.reduce((sum, item) => sum + Math.max(0, item.currentQty - (item.reservedQty || 0)), 0);
  const lowCount = stock.filter(item => {
    const available = item.currentQty - (item.reservedQty || 0);
    return available <= 0 || (item.minQty > 0 && available <= item.minQty);
  }).length;

  const openMovement = (item: InventoryItem) => {
    setSelected(item);
    setMovementType('out');
    setQty('1');
    setReason('');
    setDestination('');
    setNotes('');
    setFormError('');
  };

  const submit = async () => {
    if (!selected) return;
    const amount = Number(qty.replace(',', '.'));
    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError('Informe uma quantidade válida.');
      return;
    }
    if (movementType === 'out' && amount > selected.currentQty - (selected.reservedQty || 0)) {
      setFormError('A quantidade supera o saldo disponível.');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      await createStockMovement(token, {
        itemId: selected.id,
        movementType,
        qty: amount,
        reason,
        destinationLabel: destination,
        notes,
      });
      setSelected(null);
      await reload();
      Alert.alert('Movimentação registrada', movementType === 'in' ? 'A entrada foi adicionada ao saldo.' : 'A saída foi descontada do saldo.');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Não foi possível movimentar o estoque.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModuleScreen
      title="Estoque"
      subtitle={`${stock.length} itens · ${fmtQty(totalUnits)} unidades disponíveis`}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={reload} tintColor={T.primary} colors={[T.primary]} />}
    >
      <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingTop: 2, paddingBottom: 12 }}>
        <View style={{ flex: 1, backgroundColor: '#ECFDF5', borderRadius: 13, padding: 12 }}>
          <Text style={{ color: '#047857', fontSize: 20, fontWeight: '900' }}>{stock.length}</Text>
          <Text style={{ color: '#047857', fontSize: 11.5, fontWeight: '600' }}>itens em estoque</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: lowCount ? '#FFF7ED' : '#EFF6FF', borderRadius: 13, padding: 12 }}>
          <Text style={{ color: lowCount ? '#B45309' : T.primary, fontSize: 20, fontWeight: '900' }}>{lowCount}</Text>
          <Text style={{ color: lowCount ? '#B45309' : T.primary, fontSize: 11.5, fontWeight: '600' }}>atenções de saldo</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
        <SearchField value={q} onChange={setQ} placeholder="Buscar item, categoria ou local…" />
      </View>
      <ChipRow chips={chips} active={filter} onPick={setFilter} accent={T.primary} />
      <View style={{ padding: 16, paddingBottom: 4 }}>
        {loading ? <LoadingState /> : error ? <EmptyState icon="alert" text={error} /> : list.length === 0
          ? <EmptyState icon="archive" text="Nenhum item disponível neste grupo." />
          : list.map(item => (
            <StockCard
              key={item.id}
              item={item}
              canMove={canMove}
              onOpen={current => nav.navigate('InventoryDetail', { id: current.id })}
              onMove={openMovement}
            />
          ))}
      </View>
      {!!data?.movements?.length && (
        <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
          <SectionCard title="Movimentações recentes">
            {data.movements.slice(0, 8).map(movement => <MovementRow key={movement.id} movement={movement} />)}
          </SectionCard>
        </View>
      )}

      <Modal visible={!!selected} transparent animationType="slide" onRequestClose={() => setSelected(null)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(15,23,42,.48)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: T.bg, borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: 18, paddingBottom: 32 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: T.text, fontSize: 17, fontWeight: '800' }}>Movimentar estoque</Text>
                <Text numberOfLines={1} style={{ color: T.muted, fontSize: 12, marginTop: 3 }}>{selected?.name}</Text>
              </View>
              <Pressable onPress={() => setSelected(null)} hitSlop={10}><Icon name="x" size={20} color={T.muted} /></Pressable>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 14 }}>
              {(['out', 'in'] as const).map(type => {
                const disabled = type === 'in' && !canEntry;
                const active = movementType === type;
                return (
                  <Pressable
                    key={type}
                    disabled={disabled}
                    onPress={() => setMovementType(type)}
                    style={{ flex: 1, height: 44, borderRadius: 11, borderWidth: 1.5, borderColor: active ? T.primary : T.border, backgroundColor: active ? `${T.primary}12` : T.surface, alignItems: 'center', justifyContent: 'center', opacity: disabled ? 0.45 : 1 }}
                  >
                    <Text style={{ color: active ? T.primary : T.muted, fontSize: 13, fontWeight: '800' }}>{type === 'in' ? 'Entrada' : 'Saída'}</Text>
                  </Pressable>
                );
              })}
            </View>
            <View style={{ gap: 12 }}>
              <View>
                <FieldLabel required>Quantidade</FieldLabel>
                <TextInput value={qty} onChangeText={setQty} keyboardType="decimal-pad" placeholder="1" placeholderTextColor={T.faint} style={{ height: 44, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, paddingHorizontal: 13, color: T.text }} />
              </View>
              <View>
                <FieldLabel>Motivo</FieldLabel>
                <TextInput value={reason} onChangeText={setReason} placeholder="Ex.: entrega, devolução, reposição" placeholderTextColor={T.faint} style={{ height: 44, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, paddingHorizontal: 13, color: T.text }} />
              </View>
              {movementType === 'out' && (
                <View>
                  <FieldLabel>Destino / responsável</FieldLabel>
                  <TextInput value={destination} onChangeText={setDestination} placeholder="Para onde ou para quem saiu" placeholderTextColor={T.faint} style={{ height: 44, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, paddingHorizontal: 13, color: T.text }} />
                </View>
              )}
              <View>
                <FieldLabel>Observação</FieldLabel>
                <TextInput value={notes} onChangeText={setNotes} placeholder="Detalhes opcionais" placeholderTextColor={T.faint} multiline style={{ minHeight: 66, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, paddingHorizontal: 13, paddingVertical: 10, color: T.text, textAlignVertical: 'top' }} />
              </View>
              {!!formError && <Text style={{ color: T.danger, fontSize: 12.5 }}>{formError}</Text>}
              <Pressable disabled={saving} onPress={submit} style={{ height: 48, borderRadius: 13, backgroundColor: T.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: saving ? 0.7 : 1 }}>
                {saving ? <ActivityIndicator color="#fff" /> : <Icon name="check" size={18} color="#fff" />}
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '800' }}>{saving ? 'Salvando…' : 'Confirmar movimentação'}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ModuleScreen>
  );
}
