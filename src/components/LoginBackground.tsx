import { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';

const { width: W, height: H } = Dimensions.get('window');

type BubbleConfig = {
  size: number;
  startX: number;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
};

/** Uma bolha translúcida que sobe lentamente, com leve balanço e fade nas bordas. */
function Bubble({ size, startX, duration, delay, sway, opacity }: BubbleConfig) {
  const p = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.sequence([
      Animated.delay(delay),
      Animated.loop(
        Animated.timing(p, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: true }),
      ),
    ]);
    anim.start();
    return () => anim.stop();
  }, [p, duration, delay]);

  const translateY = p.interpolate({ inputRange: [0, 1], outputRange: [H + size, -size] });
  const translateX = p.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, sway, 0] });
  const op = p.interpolate({ inputRange: [0, 0.12, 0.82, 1], outputRange: [0, opacity, opacity, 0] });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: startX,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.16)',
        opacity: op,
        transform: [{ translateY }, { translateX }],
      }}
    />
  );
}

/**
 * Fundo da tela de login: bolhas translúcidas subindo bem devagar. Discreto de
 * propósito (baixa opacidade, movimento lento) para não competir com o login.
 * Não captura toques (pointerEvents none).
 */
export function LoginBackground() {
  const bubbles = useMemo<BubbleConfig[]>(
    () =>
      Array.from({ length: 16 }).map(() => {
        const size = 8 + Math.random() * 30;
        return {
          size,
          startX: Math.random() * W,
          duration: 10000 + Math.random() * 11000,
          delay: Math.random() * 12000,
          sway: (Math.random() * 2 - 1) * 36,
          opacity: 0.05 + Math.random() * 0.11,
        };
      }),
    [],
  );

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {bubbles.map((b, i) => (
        <Bubble key={i} {...b} />
      ))}
    </View>
  );
}
