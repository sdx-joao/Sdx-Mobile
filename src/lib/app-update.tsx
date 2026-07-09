import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Updates from 'expo-updates';
import { Icon } from '../components/Icon';
import { T } from '../theme/theme';

// Atualização OTA (Expo Updates): checa/baixa versão nova (mesmo runtimeVersion) em
// segundo plano. Quando pronta, sinaliza o UpdateBanner (aviso discreto no rodapé).
// Best-effort: offline / sem update / dev → não faz nada.

let bannerListener: ((show: boolean) => void) | null = null;
function notifyUpdateReady() { bannerListener?.(true); }

export async function checkForUpdateSilently(): Promise<void> {
  if (__DEV__ || !Updates.isEnabled) return;
  try {
    const res = await Updates.checkForUpdateAsync();
    if (res.isAvailable) {
      await Updates.fetchUpdateAsync();
      notifyUpdateReady();
    }
  } catch {
    /* sem conexão / sem update — ignora */
  }
}

async function applyUpdate(): Promise<void> {
  try { await Updates.reloadAsync(); } catch { /* noop */ }
}

/** Aviso discreto (rodapé) quando há uma versão nova pronta pra aplicar. */
export function UpdateBanner() {
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const y = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    bannerListener = (show: boolean) => {
      setVisible(show);
      Animated.spring(y, { toValue: show ? 0 : 60, useNativeDriver: true, friction: 9, tension: 70 }).start();
    };
    return () => { bannerListener = null; };
  }, [y]);

  if (!visible) return null;
  return (
    <Animated.View
      style={{
        position: 'absolute', left: 12, right: 12, bottom: insets.bottom + 12,
        transform: [{ translateY: y }],
        flexDirection: 'row', alignItems: 'center', gap: 10,
        backgroundColor: '#0F172A', borderRadius: 14, paddingVertical: 11, paddingHorizontal: 14,
        borderWidth: 1, borderColor: 'rgba(255,255,255,.12)', elevation: 8,
      }}
    >
      <View style={{ width: 26, height: 26, borderRadius: 8, backgroundColor: `${T.primary}33`, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="refresh" size={15} color="#fff" />
      </View>
      <Text style={{ flex: 1, color: '#fff', fontSize: 13, fontWeight: '600' }}>Nova versão disponível</Text>
      <Pressable onPress={() => { void applyUpdate(); }} hitSlop={6} style={{ backgroundColor: T.primary, borderRadius: 9, paddingVertical: 6, paddingHorizontal: 12 }}>
        <Text style={{ color: '#fff', fontSize: 12.5, fontWeight: '800' }}>Atualizar</Text>
      </Pressable>
      <Pressable onPress={() => bannerListener?.(false)} hitSlop={8} style={{ padding: 2 }}>
        <Icon name="x" size={16} color="rgba(255,255,255,.55)" />
      </Pressable>
    </Animated.View>
  );
}
