import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, PanResponder, Pressable, Text, TextInput, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Svg, { Path } from 'react-native-svg';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../components/Icon';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { updateWorkOrderStatus } from '../api/mobile';
import type { RootStackParamList } from '../navigation/types';

type Point = { x: number; y: number };

const PAD_WIDTH = 720;
const PAD_HEIGHT = 320;

function pointsToPath(points: Point[]) {
  if (points.length < 2) return '';
  return points.map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
}

function svgDataUrl(strokes: Point[][]) {
  const paths = strokes
    .map(pointsToPath)
    .filter(Boolean)
    .map(path => `<path d="${path}" fill="none" stroke="#111827" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${PAD_WIDTH}" height="${PAD_HEIGHT}" viewBox="0 0 ${PAD_WIDTH} ${PAD_HEIGHT}"><rect width="100%" height="100%" fill="white"/>${paths}</svg>`;
  return `data:image/svg+xml;base64,${asciiBase64(svg)}`;
}

function asciiBase64(value: string) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  let index = 0;
  while (index < value.length) {
    const c1 = value.charCodeAt(index++);
    const c2 = value.charCodeAt(index++);
    const c3 = value.charCodeAt(index++);
    output += chars.charAt(c1 >> 2);
    output += chars.charAt(((c1 & 3) << 4) | (c2 >> 4));
    output += Number.isNaN(c2) ? '=' : chars.charAt(((c2 & 15) << 2) | (c3 >> 6));
    output += Number.isNaN(c3) ? '=' : chars.charAt(c3 & 63);
  }
  return output;
}

export function WorkOrderSignatureScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'WorkOrderSignature'>>();
  const { token } = useAuth();
  const [signerName, setSignerName] = useState(route.params.signerName || '');
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [saving, setSaving] = useState(false);
  const [padSize, setPadSize] = useState({ width: PAD_WIDTH, height: PAD_HEIGHT });
  const current = useRef<Point[]>([]);

  useEffect(() => {
    const lock = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } catch {
        // Alguns ambientes do Expo Go podem ignorar o lock; a tela segue utilizável.
      }
    };
    void lock();
    return () => {
      void ScreenOrientation.unlockAsync().catch(() => undefined);
    };
  }, []);
  const scalePoint = (x: number, y: number): Point => ({
    x: Math.max(0, Math.min(PAD_WIDTH, (x / Math.max(1, padSize.width)) * PAD_WIDTH)),
    y: Math.max(0, Math.min(PAD_HEIGHT, (y / Math.max(1, padSize.height)) * PAD_HEIGHT)),
  });

  const pan = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      current.current = [scalePoint(locationX, locationY)];
      setStrokes(prev => [...prev, current.current]);
    },
    onPanResponderMove: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      current.current = [...current.current, scalePoint(locationX, locationY)];
      setStrokes(prev => [...prev.slice(0, -1), current.current]);
    },
  }), [padSize]);

  async function finish() {
    if (!signerName.trim()) {
      Alert.alert('Assinatura', 'Informe o nome de quem está assinando.');
      return;
    }
    if (strokes.flat().length < 8) {
      Alert.alert('Assinatura', 'Assine no quadro antes de concluir a OS.');
      return;
    }
    setSaving(true);
    try {
      await updateWorkOrderStatus(token, route.params.id, route.params.status, {
        signatureDataUrl: svgDataUrl(strokes),
        signerName: signerName.trim(),
        resolutionNotes: 'OS concluída com assinatura coletada no app mobile.',
      });
      Alert.alert('OS concluída', 'Assinatura salva e impressão solicitada ao Electron.');
      nav.popToTop();
    } catch (e) {
      Alert.alert('Erro', e instanceof Error ? e.message : 'Não foi possível concluir a OS.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A', padding: 16, gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 }}>
        <Pressable onPress={() => nav.goBack()} style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(255,255,255,.12)', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="arrow-left" size={19} color="#fff" />
        </Pressable>
        <Text style={{ color: '#fff', fontSize: 17, fontWeight: '800' }}>Assinatura de conclusão</Text>
        <Pressable onPress={() => setStrokes([])} style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(255,255,255,.12)', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="refresh" size={18} color="#fff" />
        </Pressable>
      </View>

      <View
        style={{ backgroundColor: '#fff', borderRadius: 12, padding: 10, flex: 1 }}
        onLayout={(event) => setPadSize({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height })}
        {...pan.panHandlers}
      >
        <Svg width="100%" height="100%" viewBox={`0 0 ${PAD_WIDTH} ${PAD_HEIGHT}`}>
          {strokes.map((points, index) => <Path key={index} d={pointsToPath(points)} fill="none" stroke="#111827" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />)}
        </Svg>
      </View>

      <TextInput
        value={signerName}
        onChangeText={setSignerName}
        placeholder="Nome de quem assinou"
        placeholderTextColor="rgba(255,255,255,.45)"
        style={{ height: 48, borderRadius: 12, paddingHorizontal: 14, backgroundColor: 'rgba(255,255,255,.12)', color: '#fff', fontSize: 15 }}
      />

      <Pressable
        onPress={finish}
        disabled={saving}
        style={{ height: 52, borderRadius: 14, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, opacity: saving ? 0.75 : 1 }}
      >
        {saving ? <ActivityIndicator color="#fff" /> : <Icon name="check" size={18} color="#fff" />}
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '800' }}>Concluir e solicitar impressão</Text>
      </Pressable>
    </View>
  );
}
