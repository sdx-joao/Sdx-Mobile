import { useCallback, useState } from 'react';
import { Alert, Pressable, RefreshControl, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../components/Icon';
import { DetailScaffold, EmptyState } from '../components/ui';
import { T } from '../theme/theme';
import { listPending, removePending, type PendingRegistration } from '../lib/pending-registrations';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function PendingRegistrationsScreen() {
  const nav = useNavigation<Nav>();
  const [items, setItems] = useState<PendingRegistration[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setRefreshing(true);
    setItems(await listPending());
    setRefreshing(false);
  }, []);
  useFocusEffect(useCallback(() => { void load(); }, [load]));

  const discard = (labelCode: string) => {
    Alert.alert('Descartar pendência', `Descartar o cadastro pendente da etiqueta ${labelCode}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Descartar', style: 'destructive', onPress: async () => { await removePending(labelCode); void load(); } },
    ]);
  };

  return (
    <DetailScaffold onBack={() => nav.goBack()} eyebrow="Inventário" title="Cadastros pendentes" compact
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} tintColor={T.primary} colors={[T.primary]} />}
    >
      {items.length === 0 ? (
        <EmptyState icon="check" text="Nenhum cadastro pendente. Tudo validado!" />
      ) : (
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 12.5, color: T.muted, marginBottom: 2 }}>
            Cadastros aguardando a validação de todas as cópias da etiqueta. Reimprima a cópia que falta no Electron e retome aqui.
          </Text>
          {items.map((p) => (
            <View key={p.labelCode} style={{ borderWidth: 1, borderColor: T.border, borderRadius: 14, backgroundColor: T.surface, padding: 14 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Icon name="qr" size={15} color={T.primary} />
                <Text style={{ fontSize: 13.5, fontWeight: '800', color: T.primary }}>{p.labelCode}</Text>
                <Text style={{ marginLeft: 'auto', fontSize: 11.5, color: T.faint }}>{p.validated.length}/{p.copies} cópias</Text>
              </View>
              <Text style={{ fontSize: 14, fontWeight: '700', color: T.text }}>{p.form.name || 'Sem nome'}</Text>
              <Text style={{ fontSize: 12.5, color: T.muted, marginTop: 2 }}>{p.form.unitName} · {p.form.room}</Text>
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
                <Pressable
                  onPress={() => nav.navigate('NewInventoryItem', { resumeLabelCode: p.labelCode, copies: p.copies })}
                  style={{ flex: 1, height: 42, borderRadius: 11, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 }}
                >
                  <Icon name="chevron-right" size={15} color="#fff" />
                  <Text style={{ fontSize: 13.5, fontWeight: '800', color: '#fff' }}>Retomar</Text>
                </Pressable>
                <Pressable onPress={() => discard(p.labelCode)} style={{ paddingHorizontal: 16, height: 42, borderRadius: 11, borderWidth: 1, borderColor: T.border, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 13.5, fontWeight: '700', color: T.danger }}>Descartar</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}
    </DetailScaffold>
  );
}
