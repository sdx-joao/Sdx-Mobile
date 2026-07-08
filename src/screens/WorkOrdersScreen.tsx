import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { TabParamList } from '../navigation/types';
import { ModuleScreen, SearchField, ChipRow, EmptyState, LoadingState, type Chip } from '../components/ui';
import { WOCard } from '../components/cards';
import { T } from '../theme/theme';
import type { WorkOrder } from '../data/mock';
import { useAuth } from '../auth/auth-context';
import { getWorkOrders } from '../api/mobile';
import { useResource } from '../api/use-resource';
import type { RootStackParamList } from '../navigation/types';

export function WorkOrdersScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<TabParamList, 'Orders'>>();
  const { token, user } = useAuth();
  const myId = user?.id ?? null;
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState(route.params?.filter ?? 'all');
  const loader = useCallback(() => getWorkOrders(token), [token]);
  const { data, loading, refreshing, error, reload } = useResource(loader, { reloadOnFocus: true });
  const orders = data ?? [];

  // Vindo da Home (drill-down): aplica o filtro que a métrica pediu.
  useEffect(() => {
    if (route.params?.filter) setFilter(route.params.filter);
  }, [route.params?.filter]);

  const ACTIVE = ['open', 'in_progress', 'waiting'];
  const isMine = useCallback((w: WorkOrder) => !!myId && (
    w.responsibleTechnicianUserId === myId || w.delegatedToUserId === myId || w.createdByUserId === myId
  ), [myId]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    c.mine = orders.filter(isMine).length;
    c.active = orders.filter((w) => ACTIVE.includes(w.status)).length;
    orders.forEach((w) => { c[w.status] = (c[w.status] || 0) + 1; });
    return c;
  }, [orders, isMine]);

  const chips: Chip[] = [
    { key: 'mine', label: 'Minhas', count: counts.mine },
    { key: 'active', label: 'Ativas', count: counts.active },
    { key: 'all', label: 'Todas', count: counts.all },
    { key: 'open', label: 'Abertas', count: counts.open },
    { key: 'in_progress', label: 'Em andamento', count: counts.in_progress },
    { key: 'waiting', label: 'Aguardando', count: counts.waiting },
    { key: 'completed', label: 'Concluídas', count: counts.completed },
  ];

  const list = orders.filter((w) => {
    if (filter === 'mine') { if (!isMine(w)) return false; }
    else if (filter === 'active') { if (!ACTIVE.includes(w.status)) return false; }
    else if (filter !== 'all' && w.status !== filter) return false;
    if (q) {
      const t = (w.code + w.serviceType + w.department + (w.responsibleTechnicianName || '') + w.requestedByName).toLowerCase();
      if (!t.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  const openWO = (wo: WorkOrder) => nav.navigate('WorkOrderDetail', { id: wo.id });
  const editWO = (wo: WorkOrder) => nav.navigate('WorkOrderEdit', { id: wo.id });

  return (
    <ModuleScreen
      title="Ordens de Serviço"
      subtitle={`${(counts.open || 0) + (counts.in_progress || 0) + (counts.waiting || 0)} ativas · ${orders.length} carregadas`}
      onNew={() => nav.navigate('NewWorkOrder')}
      newLabel="Nova OS"
      secondaryAction={{ label: 'Histórico', icon: 'clock', onPress: () => nav.navigate('WorkOrderHistory') }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={reload} tintColor={T.primary} colors={[T.primary]} />}
    >
      <View style={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12 }}>
        <SearchField value={q} onChange={setQ} placeholder="Buscar por código, setor, técnico…" />
      </View>
      <ChipRow chips={chips} active={filter} onPick={setFilter} accent={T.primary} />
      <View style={{ padding: 16, paddingBottom: 24 }}>
        {loading
          ? <LoadingState />
          : error
            ? <EmptyState icon="alert" text={error} />
            : list.length === 0
          ? <EmptyState icon="clipboard" text="Nenhuma ordem encontrada." />
          : list.map((wo) => (
            <WOCard
              key={wo.id}
              wo={wo}
              onOpen={openWO}
              onEdit={editWO}
              delegatedToMe={!!myId && wo.delegatedToUserId === myId}
            />
          ))}
      </View>
    </ModuleScreen>
  );
}
