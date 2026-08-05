import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Image, PanResponder, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cropPhotoRegion, getPhotoSize } from '../lib/photo-crop';
import { Icon } from './Icon';
import { T } from '../theme/theme';

type Size = { width: number; height: number };
type Box = { x: number; y: number; side: number };
type Point = { x: number; y: number };
type ImageRect = { x: number; y: number; width: number; height: number; scale: number };

const MIN_SIDE = 64;
const distance = (a: Point, b: Point) => Math.hypot(b.x - a.x, b.y - a.y);
const midpoint = (a: Point, b: Point): Point => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

export function PhotoCropper({ uri, onCancel, onDone }: { uri: string; onCancel: () => void; onDone: (uri: string) => void }) {
  const insets = useSafeAreaInsets();
  const [source, setSource] = useState<Size | null>(null);
  const [viewport, setViewport] = useState<Size | null>(null);
  const [box, setBoxState] = useState<Box | null>(null);
  const [busy, setBusy] = useState(false);
  const boxRef = useRef<Box | null>(null);
  const imageRectRef = useRef<ImageRect | null>(null);
  const gesture = useRef<{ count: number; box: Box; point: Point; distance: number }>({
    count: 0, box: { x: 0, y: 0, side: MIN_SIDE }, point: { x: 0, y: 0 }, distance: 1,
  });

  const imageRect = useMemo<ImageRect | null>(() => {
    if (!source || !viewport) return null;
    const scale = Math.min(viewport.width / source.width, viewport.height / source.height);
    const width = source.width * scale;
    const height = source.height * scale;
    return { x: (viewport.width - width) / 2, y: (viewport.height - height) / 2, width, height, scale };
  }, [source, viewport]);

  const clampBox = (next: Box) => {
    const rect = imageRectRef.current;
    if (!rect) return next;
    const side = Math.max(Math.min(MIN_SIDE, Math.min(rect.width, rect.height)), Math.min(Math.min(rect.width, rect.height), next.side));
    return {
      side,
      x: Math.max(rect.x, Math.min(rect.x + rect.width - side, next.x)),
      y: Math.max(rect.y, Math.min(rect.y + rect.height - side, next.y)),
    };
  };

  const setBox = (next: Box) => {
    const safe = clampBox(next);
    boxRef.current = safe;
    setBoxState(safe);
  };

  useEffect(() => { getPhotoSize(uri).then(setSource).catch(() => setSource(null)); }, [uri]);
  useEffect(() => {
    imageRectRef.current = imageRect;
    if (!imageRect) return;
    const side = Math.min(imageRect.width, imageRect.height) * 0.7;
    setBox({ x: imageRect.x + (imageRect.width - side) / 2, y: imageRect.y + (imageRect.height - side) / 2, side });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageRect]);

  const pointsOf = (event: { nativeEvent: { touches: Array<{ locationX: number; locationY: number }> } }) =>
    event.nativeEvent.touches.map(touch => ({ x: touch.locationX, y: touch.locationY }));

  const begin = (points: Point[]) => {
    let current = boxRef.current;
    const rect = imageRectRef.current;
    if (!current || !rect || !points.length) return;
    if (points.length === 1) {
      const point = points[0];
      const inside = point.x >= current.x && point.x <= current.x + current.side
        && point.y >= current.y && point.y <= current.y + current.side;
      // Um toque fora do quadro leva o seletor até aquele ponto da foto.
      if (!inside && point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height) {
        current = clampBox({ x: point.x - current.side / 2, y: point.y - current.side / 2, side: current.side });
        setBox(current);
      }
      gesture.current = { count: 1, box: current, point, distance: 1 };
      return;
    }
    const center = midpoint(points[0], points[1]);
    gesture.current = { count: 2, box: current, point: center, distance: Math.max(1, distance(points[0], points[1])) };
  };

  const pan = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => false,
    onPanResponderGrant: event => begin(pointsOf(event)),
    onPanResponderMove: event => {
      const points = pointsOf(event);
      const count = points.length >= 2 ? 2 : points.length;
      if (!count) return;
      if (gesture.current.count !== count) { begin(points); return; }
      const start = gesture.current;
      if (count === 1) {
        setBox({ ...start.box, x: start.box.x + points[0].x - start.point.x, y: start.box.y + points[0].y - start.point.y });
        return;
      }
      const center = midpoint(points[0], points[1]);
      const side = start.box.side * distance(points[0], points[1]) / start.distance;
      // A pinça dimensiona o quadrado e o mantém centralizado entre os dedos.
      setBox({ x: center.x - side / 2, y: center.y - side / 2, side });
    },
  // O responder usa refs para permanecer estável durante toda a pinça.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  const apply = async () => {
    if (!box || !imageRect || busy) return;
    setBusy(true);
    try {
      const cropped = await cropPhotoRegion(uri, {
        originX: (box.x - imageRect.x) / imageRect.scale,
        originY: (box.y - imageRect.y) / imageRect.scale,
        width: box.side / imageRect.scale,
        height: box.side / imageRect.scale,
      });
      onDone(cropped);
    } finally { setBusy(false); }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#090D16', paddingTop: insets.top }}>
      <View style={{ height: 52, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
        <Pressable onPress={onCancel} hitSlop={8}><Icon name="x" size={21} color="#fff" /></Pressable>
        <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 15, fontWeight: '800' }}>Selecionar área</Text>
        <View style={{ width: 21 }} />
      </View>

      <View style={{ flex: 1, overflow: 'hidden' }} onLayout={event => setViewport(event.nativeEvent.layout)} {...pan.panHandlers}>
        <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        {box && <>
          <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: box.y, backgroundColor: 'rgba(0,0,0,.62)' }} />
          <View pointerEvents="none" style={{ position: 'absolute', left: 0, top: box.y, width: box.x, height: box.side, backgroundColor: 'rgba(0,0,0,.62)' }} />
          <View pointerEvents="none" style={{ position: 'absolute', left: box.x + box.side, right: 0, top: box.y, height: box.side, backgroundColor: 'rgba(0,0,0,.62)' }} />
          <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: box.y + box.side, bottom: 0, backgroundColor: 'rgba(0,0,0,.62)' }} />
          <View pointerEvents="none" style={{ position: 'absolute', left: box.x, top: box.y, width: box.side, height: box.side, borderWidth: 2, borderColor: '#fff' }}>
            {[1 / 3, 2 / 3].map(part => <View key={`v${part}`} style={{ position: 'absolute', left: `${part * 100}%`, top: 0, bottom: 0, width: 1, backgroundColor: '#FFFFFF70' }} />)}
            {[1 / 3, 2 / 3].map(part => <View key={`h${part}`} style={{ position: 'absolute', top: `${part * 100}%`, left: 0, right: 0, height: 1, backgroundColor: '#FFFFFF70' }} />)}
            {(['tl', 'tr', 'bl', 'br'] as const).map(corner => <View key={corner} style={{ position: 'absolute', width: 20, height: 20, borderColor: T.primary, borderTopWidth: corner.startsWith('t') ? 5 : 0, borderBottomWidth: corner.startsWith('b') ? 5 : 0, borderLeftWidth: corner.endsWith('l') ? 5 : 0, borderRightWidth: corner.endsWith('r') ? 5 : 0, top: corner.startsWith('t') ? -4 : undefined, bottom: corner.startsWith('b') ? -4 : undefined, left: corner.endsWith('l') ? -4 : undefined, right: corner.endsWith('r') ? -4 : undefined }} />)}
          </View>
        </>}
      </View>

      <Text style={{ color: '#CBD5E1', textAlign: 'center', fontSize: 12.5, marginVertical: 14, paddingHorizontal: 20 }}>
        Toque para posicionar · Arraste para mover · Use a pinça para dimensionar o quadrado
      </Text>
      <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}>
        <Pressable onPress={onCancel} disabled={busy} style={{ flex: 1, height: 50, borderRadius: 13, borderWidth: 1, borderColor: '#FFFFFF55', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#fff', fontWeight: '700' }}>Cancelar</Text></Pressable>
        <Pressable onPress={() => void apply()} disabled={busy || !box} style={{ flex: 1.4, height: 50, borderRadius: 13, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, opacity: !box ? .5 : 1 }}>
          {busy ? <ActivityIndicator color="#fff" /> : <Icon name="check" size={17} color="#fff" />}
          <Text style={{ color: '#fff', fontWeight: '800' }}>{busy ? 'Recortando…' : 'Usar recorte'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
