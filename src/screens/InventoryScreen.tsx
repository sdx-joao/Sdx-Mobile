import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ModuleScreen, SearchField, ChipRow, EmptyState, type Chip } from '../components/ui';
import { InvCard } from '../components/cards';
import { T } from '../theme/theme';
import { INVENTORY, INV_STATS, type InventoryItem } from '../data/mock';
import type { RootStackParamList } from '../navigation/types';

export function InventoryScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: INVENTORY.length };
    INVENTORY.forEach((i) => { c[i.primaryType] = (c[i.primaryType] || 0) + 1; });
    return c;
  }, []);

  const chips: Chip[] = [
    { key: 'all', label: 'Todos', count: counts.all },
    { key: 'EQUIPAMENTO', label: 'Equipamentos', count: counts.EQUIPAMENTO },
    { key: 'MATERIAL', label: 'Materiais', count: counts.MATERIAL },
    { key: 'SUPRIMENTO', label: 'Suprimentos', count: counts.SUPRIMENTO },
    { key: 'PERIFERICO', label: 'Periféricos', count: counts.PERIFERICO },
    { key: 'FERRAMENTA', label: 'Ferramentas', count: counts.FERRAMENTA },
  ].filter((c) => c.count);

  const list = INVENTORY.filter((i) => {
    if (filter !== 'all' && i.primaryType !== filter) return false;
    if (q) {
      const t = (i.name + (i.sku || '') + (i.assetTag || '') + (i.brand || '') + (i.currentLocation || '')).toLowerCase();
      if (!t.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  const openItem = (it: InventoryItem) => nav.navigate('InventoryDetail', { id: it.id });

  return (
    <ModuleScreen
      title="Inventário"
      subtitle={`${INV_STATS.totalItems} itens · somente consulta`}
      onNew={() => nav.navigate('Scan')}
      newLabel="Escanear QR Code"
      newIcon="scan"
    >
      <View style={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12 }}>
        <SearchField value={q} onChange={setQ} placeholder="Buscar item, SKU, patrimônio…" />
      </View>
      <ChipRow chips={chips} active={filter} onPick={setFilter} accent={T.primary} />
      <View style={{ padding: 16, paddingBottom: 24 }}>
        {list.length === 0
          ? <EmptyState icon="package" text="Nenhum item encontrado." />
          : list.map((it) => <InvCard key={it.id} item={it} onOpen={openItem} />)}
      </View>
    </ModuleScreen>
  );
}
