import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';
import Svg, { Defs, Ellipse, RadialGradient, Stop } from 'react-native-svg';

const { width: W, height: H } = Dimensions.get('window');

/** Mancha de gradiente radial suave (borda esmaecida) usada como "blob" flutuante. */
function Blob({ id, size, color, opacity }: { id: string; size: number; color: string; opacity: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <RadialGradient id={id} cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <Stop offset="60%" stopColor={color} stopOpacity={opacity * 0.45} />
          <Stop offset="100%" stopColor={color} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Ellipse cx="50" cy="50" rx="50" ry="50" fill={`url(#${id})`} />
    </Svg>
  );
}

/**
 * Fundo animado da tela de login: blobs de gradiente radial que derivam e
 * pulsam bem devagar, criando um movimento orgânico e sutil (estilo Stripe /
 * Antigravity). Não captura toques (pointerEvents none).
 */
export function LoginBackground() {
  const a = useRef(new Animated.Value(0)).current;
  const b = useRef(new Animated.Value(0)).current;
  const c = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = (val: Animated.Value, duration: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, { toValue: 1, duration, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(val, { toValue: 0, duration, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ]),
      );
    const loops = [loop(a, 9000), loop(b, 13000), loop(c, 17000)];
    loops.forEach(l => l.start());
    return () => loops.forEach(l => l.stop());
  }, [a, b, c]);

  const drift = (val: Animated.Value, x: number, y: number, s1: number, s2: number) => ({
    transform: [
      { translateX: val.interpolate({ inputRange: [0, 1], outputRange: [0, x] }) },
      { translateY: val.interpolate({ inputRange: [0, 1], outputRange: [0, y] }) },
      { scale: val.interpolate({ inputRange: [0, 1], outputRange: [s1, s2] }) },
    ],
  });

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Animated.View style={[{ position: 'absolute', top: -H * 0.12, left: -W * 0.25 }, drift(a, 40, 30, 0.95, 1.12)]}>
        <Blob id="blobA" size={W * 1.05} color="#5B8DEF" opacity={0.5} />
      </Animated.View>
      <Animated.View style={[{ position: 'absolute', bottom: -H * 0.1, right: -W * 0.3 }, drift(b, -36, -28, 1.05, 0.92)]}>
        <Blob id="blobB" size={W * 1.15} color="#6366F1" opacity={0.42} />
      </Animated.View>
      <Animated.View style={[{ position: 'absolute', top: H * 0.34, right: -W * 0.22 }, drift(c, 28, -34, 0.9, 1.08)]}>
        <Blob id="blobC" size={W * 0.8} color="#22D3EE" opacity={0.22} />
      </Animated.View>
    </View>
  );
}
