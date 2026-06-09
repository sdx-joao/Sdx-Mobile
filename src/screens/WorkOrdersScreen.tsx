import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ModuleScreen, SearchField, ChipRow, EmptyState, type Chip } from '../components/ui';
import { WOCard } from '../components/cards';
import { T } from '../theme/theme';
import { WORK_ORDERS, WO_STATS, type WorkOrder } from '../data/mock';
import type { RootStackParamList } from '../navigation/types';

export function WorkOrdersScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: WORK_ORDERS.length };
    WORK_ORDERS.forEach((w) => { c[w.status] = (c[w.status] || 0) + 1; });
    return c;
  }, []);

  const chips: Chip[] = [
    { key: 'all', label: 'Todas', count: counts.all },
    { key: 'open', label: 'Abertas', count: counts.open },
    { key: 'in_progress', label: 'Em andamento', count: counts.in_progress },
    { key: 'waiting', label: 'Aguardando', count: counts.waiting },
    { key: 'completed', label: 'Concluídas', count: counts.completed },
  ];

  const list = WORK_ORDERS.filter((w) => {
    if (filter !== 'all' && w.status !== filter) return false;
    if (q) {
      const t = (w.code + w.serviceType + w.department + (w.responsibleTechnicianName || '') + w.requestedByName).toLowerCase();
      if (!t.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  const openWO = (wo: WorkOrder) => nav.navigate('WorkOrderDetail', { id: wo.id });

  return (
    <ModuleScreen
      title="Ordens de Serviço"
      subtitle={`${WO_STATS.activeNow} ativas · ${WO_STATS.openedToday} abertas hoje`}
      onNew={() => nav.navigate('NewWorkOrder')}
      newLabel="Nova OS"
    >
      <View style={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12 }}>
        <SearchField value={q} onChange={setQ} placeholder="Buscar por código, setor, técnico…" />
      </View>
      <ChipRow chips={chips} active={filter} onPick={setFilter} accent={T.primary} />
      <View style={{ padding: 16, paddingBottom: 24 }}>
        {list.length === 0
          ? <EmptyState icon="clipboard" text="Nenhuma ordem encontrada." />
          : list.map((wo) => <WOCard key={wo.id} wo={wo} onOpen={openWO} />)}
      </View>
    </ModuleScreen>
  );
}
