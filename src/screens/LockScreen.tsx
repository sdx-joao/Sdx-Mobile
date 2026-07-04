import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Icon } from '../components/Icon';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';

/** Tela de desbloqueio por biometria — exibida quando status === 'locked'. */
export function LockScreen() {
  const { unlock, signOut, user } = useAuth();
  const [busy, setBusy] = useState(true);
  const attempted = useRef(false);

  const tryUnlock = async () => {
    setBusy(true);
    await unlock();
    setBusy(false);
  };

  // Pede a biometria automaticamente ao abrir.
  useEffect(() => {
    if (attempted.current) return;
    attempted.current = true;
    void tryUnlock();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center', padding: 28, gap: 22 }}>
      <View style={{ width: 92, height: 92, borderRadius: 26, backgroundColor: 'rgba(255,255,255,.14)', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="lock" size={40} color="#fff" />
      </View>
      <View style={{ alignItems: 'center', gap: 6 }}>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800' }}>Servus bloqueado</Text>
        <Text style={{ color: 'rgba(255,255,255,.8)', fontSize: 14, textAlign: 'center', lineHeight: 20 }}>
          {user?.name ? `Olá, ${user.name.split(' ')[0]}. ` : ''}Use a biometria para desbloquear.
        </Text>
      </View>

      <Pressable
        onPress={tryUnlock}
        disabled={busy}
        style={{ marginTop: 6, height: 52, minWidth: 220, paddingHorizontal: 22, borderRadius: 14, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, opacity: busy ? 0.8 : 1 }}
      >
        {busy ? <ActivityIndicator color={T.primary} /> : <Icon name="fingerprint" size={20} color={T.primary} />}
        <Text style={{ color: T.primary, fontSize: 15.5, fontWeight: '800' }}>{busy ? 'Verificando…' : 'Desbloquear'}</Text>
      </Pressable>

      <Pressable onPress={() => void signOut()} style={{ padding: 10 }}>
        <Text style={{ color: 'rgba(255,255,255,.85)', fontSize: 13.5, fontWeight: '700' }}>Sair da conta</Text>
      </Pressable>
    </View>
  );
}
