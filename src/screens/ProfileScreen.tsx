import { Pressable, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../components/Icon';
import { BlueHeader } from '../components/ui';
import { Wordmark } from '../components/Brand';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import type { RootStackParamList } from '../navigation/types';

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

export function ProfileScreen() {
  const { user, signOut } = useAuth();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const accent = T.primary;

  if (!user) return null;

  const rows: Array<{ icon: string; label: string; note?: string; onPress?: () => void }> = [
    { icon: 'user', label: 'Meus dados', onPress: () => nav.navigate('MyData') },
    { icon: 'bell', label: 'Notificações', note: 'Em breve' },
    { icon: 'qr', label: 'Etiquetas e impressão', note: 'Em breve' },
    { icon: 'download', label: 'Dados offline', note: 'Em breve' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <BlueHeader>
        <Text style={{ color: '#fff', fontSize: 23, fontWeight: '800' }}>Perfil</Text>
      </BlueHeader>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 24 }}>
        <View style={{ backgroundColor: T.surface, borderWidth: 1, borderColor: T.border, borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <View style={{ width: 52, height: 52, borderRadius: 15, backgroundColor: `${accent}15`, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: accent }}>{initials(user.name)}</Text>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: T.text }}>{user.name}</Text>
            <Text style={{ fontSize: 12.5, color: T.muted }}>{user.dept} · {user.role}</Text>
          </View>
        </View>

        <View style={{ backgroundColor: T.surface, borderWidth: 1, borderColor: T.border, borderRadius: 14, overflow: 'hidden', marginBottom: 18 }}>
          {rows.map((r, i) => (
            <Pressable key={r.label} onPress={r.onPress} disabled={!r.onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 14, paddingHorizontal: 15, borderBottomWidth: i < rows.length - 1 ? 1 : 0, borderBottomColor: T.surfaceMuted }}>
              <Icon name={r.icon} size={18} color={T.muted} />
              <Text style={{ flex: 1, fontSize: 14, color: T.text }}>{r.label}</Text>
              {r.note && <Text style={{ fontSize: 11, color: T.faint, marginRight: 4 }}>{r.note}</Text>}
              <Icon name="chevron-right" size={16} color={T.faint} />
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={signOut}
          style={{ height: 48, borderRadius: 13, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          <Icon name="logout" size={17} color={T.danger} />
          <Text style={{ fontSize: 14, fontWeight: '600', color: T.danger }}>Sair do ScandexPRO™</Text>
        </Pressable>

        <View style={{ alignItems: 'center', gap: 8, marginTop: 22 }}>
          <Wordmark width={120} />
          <Text style={{ fontSize: 11, color: T.faint }}>ScandexPRO™ Mobile · v1.0 · build demo</Text>
        </View>
      </ScrollView>
    </View>
  );
}
