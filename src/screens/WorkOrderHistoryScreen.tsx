import { useCallback, useMemo, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DetailScaffold, SearchField, ChipRow, EmptyState, LoadingState, type Chip } from '../components/ui';
import { WOCard } from '../components/cards';
import { T } from '../theme/theme';
import type { WorkOrder } from '../data/mock';
import { useAuth } from '../auth/auth-context';
import { getWorkOrders } from '../api/mobile';
import { useResource } from '../api/use-resource';
import type { RootStackParamList } from '../navigation/types';

const FINISHED = new Set<WorkOrder['status']>(['completed', 'delivered', 'cancelled']);

/**
 * Histórico de OS: OS já finalizadas (concluídas/entregues/canceladas), incluindo
 * as que saíram do fluxo diário (auto_hidden). Read-only — abre só para consulta.
 */
export function WorkOrderHistoryScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { token, user } = useAuth();
  const myId = user?.id ?? null;
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const loader = useCallback(() => getWorkOrders(token, { includeHidden: true }), [token]);
  const { data, loading, refreshing, error, reload } = useResource(loader, { reloadOnFocus: true });

  const history = useMemo(() => (data ?? []).filter((w) => FINISHED.has(w.status)), [data]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: history.length };
    history.forEach((w) => { c[w.status] = (c[w.status] || 0) + 1; });
    return c;
  }, [history]);

  const chips: Chip[] = [
    { key: 'all', label: 'Todas', count: counts.all },
    { key: 'completed', label: 'Concluídas', count: counts.completed },
    { key: 'delivered', label: 'Entregues', count: counts.delivered },
    { key: 'cancelled', label: 'Canceladas', count: counts.cancelled },
  ];

  const list = history.filter((w) => {
    if (filter !== 'all' && w.status !== filter) return false;
    if (q) {
      const t = (w.code + w.serviceType + w.department + (w.responsibleTechnicianName || '') + w.requestedByName).toLowerCase();
      if (!t.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  const openWO = (wo: WorkOrder) => nav.navigate('WorkOrderDetail', { id: wo.id });

  return (
    <DetailScaffold
      onBack={() => nav.goBack()}
      eyebrow="ORDENS DE SERVIÇO"
      title="Histórico"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={reload} tintColor="#fff" colors={[T.primary]} />}
    >
      <View style={{ marginBottom: 12 }}>
        <SearchField value={q} onChange={setQ} placeholder="Buscar por código, setor, técnico…" />
      </View>
      <View style={{ marginHorizontal: -16 }}>
        <ChipRow chips={chips} active={filter} onPick={setFilter} accent={T.primary} />
      </View>
      <View style={{ marginTop: 8 }}>
        {loading
          ? <LoadingState />
          : error
            ? <EmptyState icon="alert" text={error} />
            : list.length === 0
              ? <EmptyState icon="clipboard" text="Nenhuma OS finalizada encontrada." />
              : list.map((wo) => (
                <WOCard
                  key={wo.id}
                  wo={wo}
                  onOpen={openWO}
                  delegatedToMe={!!myId && wo.delegatedToUserId === myId}
                />
              ))}
      </View>
    </DetailScaffold>
  );
}
