import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { apiFetch } from '../api/client';
import { useAuth } from '../auth/auth-context';
import type { WorkOrderSummary } from '../features/work-orders/types';
import { colors, statusColors } from '../theme/colors';

const STATUS_LABEL: Record<string, string> = {
  open: 'Aberta',
  in_progress: 'Em andamento',
  waiting: 'Aguardando',
  delivered: 'Entregue',
  completed: 'Concluída',
  cancelled: 'Cancelada',
};

export function WorkOrdersScreen() {
  const { token, user, signOut } = useAuth();
  const [orders, setOrders] = useState<WorkOrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await apiFetch<{ orders: WorkOrderSummary[] }>(
        '/api/mobile/work-orders',
        { token },
      );
      setOrders(data.orders ?? []);
    } catch {
      setError('Não foi possível carregar as ordens de serviço.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  function onRefresh() {
    setRefreshing(true);
    load();
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.hello}>Olá, {user?.fullName ?? user?.username}</Text>
          {user?.department && <Text style={styles.dept}>{user.department}</Text>}
        </View>
        <TouchableOpacity onPress={signOut} style={styles.signOut}>
          <Text style={styles.signOutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.empty}>
                {error ?? 'Nenhuma ordem de serviço encontrada.'}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.rowHeader}>
                <Text style={styles.code}>{item.code}</Text>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: statusColors[item.status] ?? colors.muted },
                  ]}
                >
                  <Text style={styles.badgeText}>
                    {STATUS_LABEL[item.status] ?? item.status}
                  </Text>
                </View>
              </View>
              {!!item.department && <Text style={styles.meta}>{item.department}</Text>}
              {!!item.requester && (
                <Text style={styles.meta}>Solicitante: {item.requester}</Text>
              )}
              {!!item.technician && (
                <Text style={styles.meta}>Técnico: {item.technician}</Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  hello: { fontSize: 15, fontWeight: '700', color: colors.text },
  dept: { fontSize: 12, color: colors.muted, marginTop: 2 },
  signOut: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.dangerSoft,
  },
  signOutText: { color: colors.danger, fontWeight: '700', fontSize: 13 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  empty: { color: colors.muted, fontSize: 15, textAlign: 'center' },
  listContent: { padding: 12, flexGrow: 1 },
  row: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  code: { fontSize: 16, fontWeight: '800', color: colors.primary },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999 },
  badgeText: { color: '#0F172A', fontSize: 11, fontWeight: '700' },
  meta: { fontSize: 13, color: colors.muted, marginTop: 2 },
});
