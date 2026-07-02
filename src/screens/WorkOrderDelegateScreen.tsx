import { useCallback, useMemo, useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DetailScaffold, SearchField, FieldLabel, EmptyState, LoadingState, PrimaryButton } from '../components/ui';
import { Icon } from '../components/Icon';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { delegateWorkOrder, getDelegatableUsers, type DelegatableUser } from '../api/mobile';
import { useResource } from '../api/use-resource';
import type { RootStackParamList } from '../navigation/types';

const DELEGATION_COLOR = '#6D28D9';

export function WorkOrderDelegateScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'WorkOrderDelegate'>>();
  const { id, code } = route.params;
  const { token, user } = useAuth();

  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<DelegatableUser | null>(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loader = useCallback(() => getDelegatableUsers(token), [token]);
  const { data, loading, error } = useResource(loader);

  const users = useMemo(() => {
    const all = (data ?? []).filter((u) => u.id !== user?.id);
    if (!q) return all;
    const needle = q.toLowerCase();
    return all.filter((u) =>
      (u.fullName || u.username).toLowerCase().includes(needle) ||
      (u.department || '').toLowerCase().includes(needle),
    );
  }, [data, q, user?.id]);

  async function submit() {
    if (!selected || submitting) return;
    setSubmitting(true);
    try {
      await delegateWorkOrder(token, id, selected.id, message.trim() || undefined);
      Alert.alert('OS delegada', `Encaminhada para ${selected.fullName || selected.username}.`);
      nav.goBack();
    } catch (e) {
      Alert.alert('Não foi possível delegar', e instanceof Error ? e.message : 'Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <DetailScaffold
      onBack={() => nav.goBack()}
      eyebrow={code ? `OS ${code}` : 'ORDEM DE SERVIÇO'}
      title="Delegar"
    >
      <View style={{ marginBottom: 12 }}>
        <FieldLabel required>Encaminhar para</FieldLabel>
        <SearchField value={q} onChange={setQ} placeholder="Buscar por nome ou setor…" />
      </View>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <EmptyState icon="alert" text={error} />
      ) : users.length === 0 ? (
        <EmptyState icon="user" text="Nenhum usuário disponível para delegação." />
      ) : (
        <View style={{ gap: 8, marginBottom: 16 }}>
          {users.map((u) => {
            const active = selected?.id === u.id;
            return (
              <Pressable
                key={u.id}
                onPress={() => setSelected(u)}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 12, padding: 13, borderRadius: 12,
                  backgroundColor: active ? `${DELEGATION_COLOR}0E` : T.surface,
                  borderWidth: 1, borderColor: active ? DELEGATION_COLOR : T.border,
                }}
              >
                <View style={{
                  width: 22, height: 22, borderRadius: 11, borderWidth: 2,
                  borderColor: active ? DELEGATION_COLOR : T.border,
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  {active && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: DELEGATION_COLOR }} />}
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: T.text }} numberOfLines={1}>
                    {u.fullName || u.username}
                  </Text>
                  <Text style={{ fontSize: 12, color: T.faint }} numberOfLines={1}>
                    {u.department || 'Sem setor'}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}

      <View style={{ marginBottom: 20 }}>
        <FieldLabel>Mensagem (opcional)</FieldLabel>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Ex.: priorizar, verificar cabo, falar com o setor…"
          placeholderTextColor={T.faint}
          multiline
          maxLength={500}
          style={{
            minHeight: 90, borderRadius: 12, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface,
            padding: 13, fontSize: 14, color: T.text, textAlignVertical: 'top',
          }}
        />
      </View>

      <PrimaryButton
        label={submitting ? 'Delegando…' : 'Delegar OS'}
        icon="send"
        accent={selected ? DELEGATION_COLOR : T.faint}
        onPress={submit}
      />
    </DetailScaffold>
  );
}
