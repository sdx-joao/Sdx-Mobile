import { useCallback } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Avatar } from '../components/Avatar';
import { DetailScaffold, EmptyState, LoadingState, SectionCard } from '../components/ui';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { getMyProfile } from '../api/mobile';
import { useResource } from '../api/use-resource';
import type { RootStackParamList } from '../navigation/types';

const ROLE_LABELS: Record<string, string> = {
  SuperAdministrador: 'Super Administrador',
  Admin: 'Administrador',
  Gerente: 'Gerente',
  Colaborador: 'Colaborador',
  User: 'Usuário',
};

function formatCpf(value?: string | null) {
  if (!value) return null;
  const d = String(value).replace(/\D/g, '');
  if (d.length !== 11) return value;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function formatDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date);
}

function Row({ label, value }: { label: string; value?: string | null }) {
  const filled = value != null && String(value).trim().length > 0;
  return (
    <View style={{ paddingVertical: 9 }}>
      <Text style={{ fontSize: 11.5, fontWeight: '600', color: T.muted, marginBottom: 2 }}>{label}</Text>
      <Text style={{ fontSize: 14.5, fontWeight: '600', color: filled ? T.text : T.faint }}>
        {filled ? value : '—'}
      </Text>
    </View>
  );
}

export function MyDataScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { token } = useAuth();
  const loader = useCallback(() => getMyProfile(token), [token]);
  const { data, loading, refreshing, error, reload } = useResource(loader);

  return (
    <DetailScaffold
      onBack={() => nav.goBack()}
      eyebrow="Perfil"
      title="Meus dados"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={reload} tintColor={T.primary} colors={[T.primary]} />}
    >
      {loading ? (
        <LoadingState />
      ) : error ? (
        <EmptyState icon="alert" text={error} />
      ) : !data ? (
        <EmptyState icon="user" text="Sem dados de perfil." />
      ) : (
        <View style={{ gap: 14 }}>
          <View style={{ alignItems: 'center', gap: 10, marginBottom: 2 }}>
            <Avatar name={data.fullName || data.username} avatarUrl={data.avatarUrl} size={88} radius={26} />
            <Text style={{ fontSize: 16.5, fontWeight: '800', color: T.text }}>{data.fullName || data.username}</Text>
          </View>
          <SectionCard title="Identificação">
            <Row label="Nome completo" value={data.fullName} />
            <Row label="Usuário" value={data.username} />
            <Row label="Função" value={ROLE_LABELS[data.role] ?? data.role} />
            <Row label="Setor" value={data.department} />
          </SectionCard>
          <SectionCard title="Contato">
            <Row label="E-mail" value={data.email} />
            <Row label="Telefone" value={data.phone} />
          </SectionCard>
          <SectionCard title="Documentos e conta">
            <Row label="CPF" value={formatCpf(data.cpf)} />
            <Row label="Registrado desde" value={formatDate(data.registeredSince)} />
            <Row label="Impressora de OS" value={data.workOrderPrinterName} />
          </SectionCard>
          <Text style={{ fontSize: 11, color: T.faint, textAlign: 'center', marginTop: 2 }}>
            Para alterar estes dados, fale com um administrador.
          </Text>
        </View>
      )}
    </DetailScaffold>
  );
}
