import { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { T } from '../theme/theme';

// Toast custom (substitui o ToastAndroid "quadrado" do sistema): mensagem
// estilizada, deslizando de baixo, com o visual do app. É emitido por uma
// função de módulo (showToast) e renderizado pelo <ToastHost/> montado no root.

type Emit = (message: string) => void;
let emit: Emit | null = null;

/** Mostra um toast estilizado. Sem no-op se o host ainda não montou. */
export function showToast(message: string) {
  if (emit) emit(message);
}

export function ToastHost() {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState<string | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    emit = (msg: string) => {
      setMessage(msg);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      opacity.setValue(0);
      translateY.setValue(16);
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, friction: 8, tension: 80 }),
      ]).start();
      hideTimer.current = setTimeout(() => {
        Animated.timing(opacity, { toValue: 0, duration: 240, useNativeDriver: true }).start(({ finished }) => {
          if (finished) setMessage(null);
        });
      }, 2400);
    };
    return () => {
      emit = null;
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [opacity, translateY]);

  if (!message) return null;

  return (
    <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', paddingBottom: insets.bottom + 24, paddingHorizontal: 20 }}>
      <Animated.View
        style={{
          maxWidth: 460,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 9,
          backgroundColor: '#0F172A',
          borderRadius: 14,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,.12)',
          opacity,
          transform: [{ translateY }],
          ...Platform.select({
            android: { elevation: 8 },
            default: { shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
          }),
        }}
      >
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: T.primary }} />
        <Text style={{ color: '#fff', fontSize: 13.5, fontWeight: '600', flexShrink: 1 }}>{message}</Text>
      </Animated.View>
    </View>
  );
}
