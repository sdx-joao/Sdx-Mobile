import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Image, PanResponder, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cropPhotoRegion, getPhotoSize } from '../lib/photo-crop';
import { Icon } from './Icon';
import { T } from '../theme/theme';

type Size = { width: number; height: number };
type Frame = { x: number; y: number; side: number };
type Transform = { x: number; y: number; zoom: number };
type Point = { x: number; y: number };

const MIN_ZOOM = 1;
const MAX_ZOOM = 6;

function distance(a: Point, b: Point) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export function PhotoCropper({ uri, onCancel, onDone }: { uri: string; onCancel: () => void; onDone: (uri: string) => void }) {
  const insets = useSafeAreaInsets();
  const [source, setSource] = useState<Size | null>(null);
  const [viewport, setViewport] = useState<Size | null>(null);
  const [transform, setTransformState] = useState<Transform>({ x: 0, y: 0, zoom: 1 });
  const [busy, setBusy] = useState(false);
  const transformRef = useRef(transform);
  const frameRef = useRef<Frame | null>(null);
  const sourceRef = useRef<Size | null>(null);
  const gesture = useRef<{ count: number; transform: Transform; point: Point; distance: number }>({
    count: 0, transform: { x: 0, y: 0, zoom: 1 }, point: { x: 0, y: 0 }, distance: 1,
  });

  const frame = useMemo<Frame | null>(() => {
    if (!viewport) return null;
    const side = Math.max(180, Math.min(viewport.width - 32, viewport.height - 40));
    return { x: (viewport.width - side) / 2, y: (viewport.height - side) / 2, side };
  }, [viewport]);

  const baseScale = useMemo(() => {
    if (!source || !frame) return 1;
    return Math.max(frame.side / source.width, frame.side / source.height);
  }, [source, frame]);

  const clamp = (next: Transform): Transform => {
    const currentFrame = frameRef.current;
    const currentSource = sourceRef.current;
    if (!currentFrame || !currentSource) return next;
    const base = Math.max(currentFrame.side / currentSource.width, currentFrame.side / currentSource.height);
    const zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, next.zoom));
    const width = currentSource.width * base * zoom;
    const height = currentSource.height * base * zoom;
    const maxX = Math.max(0, (width - currentFrame.side) / 2);
    const maxY = Math.max(0, (height - currentFrame.side) / 2);
    return { x: Math.max(-maxX, Math.min(maxX, next.x)), y: Math.max(-maxY, Math.min(maxY, next.y)), zoom };
  };

  const setTransform = (next: Transform) => {
    const safe = clamp(next);
    transformRef.current = safe;
    setTransformState(safe);
  };

  useEffect(() => {
    getPhotoSize(uri).then((size) => { sourceRef.current = size; setSource(size); }).catch(() => setSource(null));
  }, [uri]);
  useEffect(() => { frameRef.current = frame; setTransform({ x: 0, y: 0, zoom: 1 }); }, [frame, source]);

  const pointsOf = (event: { nativeEvent: { touches: Array<{ locationX: number; locationY: number }> } }) =>
    event.nativeEvent.touches.map(touch => ({ x: touch.locationX, y: touch.locationY }));

  const beginGesture = (points: Point[]) => {
    const current = transformRef.current;
    if (points.length >= 2) {
      gesture.current = { count: 2, transform: current, point: midpoint(points[0], points[1]), distance: Math.max(1, distance(points[0], points[1])) };
    } else if (points.length === 1) {
      gesture.current = { count: 1, transform: current, point: points[0], distance: 1 };
    }
  };

  const pan = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => false,
    onPanResponderGrant: event => beginGesture(pointsOf(event)),
    onPanResponderMove: event => {
      const points = pointsOf(event);
      const count = points.length >= 2 ? 2 : points.length;
      if (!count) return;
      if (gesture.current.count !== count) { beginGesture(points); return; }
      const start = gesture.current;
      if (count === 1) {
        setTransform({
          ...start.transform,
          x: start.transform.x + points[0].x - start.point.x,
          y: start.transform.y + points[0].y - start.point.y,
        });
        return;
      }
      const currentMid = midpoint(points[0], points[1]);
      const ratio = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, start.transform.zoom * distance(points[0], points[1]) / start.distance)) / start.transform.zoom;
      const currentFrame = frameRef.current;
      if (!currentFrame) return;
      const center = { x: currentFrame.x + currentFrame.side / 2, y: currentFrame.y + currentFrame.side / 2 };
      // Mantém sob os dedos o mesmo ponto da foto enquanto amplia e permite
      // mover os dois dedos ao mesmo tempo, como nos editores de mensageria.
      setTransform({
        zoom: start.transform.zoom * ratio,
        x: currentMid.x - center.x - (start.point.x - center.x - start.transform.x) * ratio,
        y: currentMid.y - center.y - (start.point.y - center.y - start.transform.y) * ratio,
      });
    },
  // O responder trabalha apenas com refs para não ser recriado no meio do gesto.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  const displayed = useMemo(() => {
    if (!source || !frame) return null;
    const scale = baseScale * transform.zoom;
    const width = source.width * scale;
    const height = source.height * scale;
    const centerX = frame.x + frame.side / 2 + transform.x;
    const centerY = frame.y + frame.side / 2 + transform.y;
    return { left: centerX - width / 2, top: centerY - height / 2, width, height, scale };
  }, [source, frame, baseScale, transform]);

  const apply = async () => {
    if (!frame || !displayed || busy) return;
    setBusy(true);
    try {
      const cropped = await cropPhotoRegion(uri, {
        originX: (frame.x - displayed.left) / displayed.scale,
        originY: (frame.y - displayed.top) / displayed.scale,
        width: frame.side / displayed.scale,
        height: frame.side / displayed.scale,
      });
      onDone(cropped);
    } finally { setBusy(false); }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#090D16', paddingTop: insets.top }}>
      <View style={{ height: 52, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
        <Pressable onPress={onCancel} hitSlop={8}><Icon name="x" size={21} color="#fff" /></Pressable>
        <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 15, fontWeight: '800' }}>Ajustar foto</Text>
        <View style={{ width: 21 }} />
      </View>

      <View style={{ flex: 1, overflow: 'hidden' }} onLayout={event => setViewport(event.nativeEvent.layout)} {...pan.panHandlers}>
        {displayed && <Image source={{ uri }} style={{ position: 'absolute', left: displayed.left, top: displayed.top, width: displayed.width, height: displayed.height }} />}
        {frame && <>
          <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: frame.y, backgroundColor: 'rgba(0,0,0,.62)' }} />
          <View pointerEvents="none" style={{ position: 'absolute', left: 0, top: frame.y, width: frame.x, height: frame.side, backgroundColor: 'rgba(0,0,0,.62)' }} />
          <View pointerEvents="none" style={{ position: 'absolute', left: frame.x + frame.side, right: 0, top: frame.y, height: frame.side, backgroundColor: 'rgba(0,0,0,.62)' }} />
          <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: frame.y + frame.side, bottom: 0, backgroundColor: 'rgba(0,0,0,.62)' }} />
          <View pointerEvents="none" style={{ position: 'absolute', left: frame.x, top: frame.y, width: frame.side, height: frame.side, borderWidth: 2, borderColor: '#fff' }}>
            {[1 / 3, 2 / 3].map(part => <View key={`v${part}`} style={{ position: 'absolute', left: `${part * 100}%`, top: 0, bottom: 0, width: 1, backgroundColor: '#FFFFFF70' }} />)}
            {[1 / 3, 2 / 3].map(part => <View key={`h${part}`} style={{ position: 'absolute', top: `${part * 100}%`, left: 0, right: 0, height: 1, backgroundColor: '#FFFFFF70' }} />)}
          </View>
        </>}
      </View>

      <Text style={{ color: '#CBD5E1', textAlign: 'center', fontSize: 12.5, marginTop: 14, paddingHorizontal: 20 }}>
        Arraste para posicionar · Use dois dedos para ampliar ou reduzir
      </Text>
      <Pressable onPress={() => setTransform({ x: 0, y: 0, zoom: 1 })} disabled={busy} style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, height: 38, marginVertical: 8 }}>
        <Icon name="refresh" size={15} color="#fff" />
        <Text style={{ color: '#fff', fontSize: 12.5, fontWeight: '700' }}>Redefinir</Text>
      </Pressable>
      <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}>
        <Pressable onPress={onCancel} disabled={busy} style={{ flex: 1, height: 50, borderRadius: 13, borderWidth: 1, borderColor: '#FFFFFF55', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#fff', fontWeight: '700' }}>Cancelar</Text></Pressable>
        <Pressable onPress={() => void apply()} disabled={busy || !displayed} style={{ flex: 1.4, height: 50, borderRadius: 13, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, opacity: !displayed ? .5 : 1 }}>
          {busy ? <ActivityIndicator color="#fff" /> : <Icon name="check" size={17} color="#fff" />}
          <Text style={{ color: '#fff', fontWeight: '800' }}>{busy ? 'Recortando…' : 'Usar recorte'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
