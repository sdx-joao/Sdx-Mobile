import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, PanResponder, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cropPhotoRegion, getPhotoSize } from '../lib/photo-crop';
import { Icon } from './Icon';
import { T } from '../theme/theme';

type Box = { x: number; y: number; side: number };
type Size = { width: number; height: number };

export function PhotoCropper({ uri, onCancel, onDone }: { uri: string; onCancel: () => void; onDone: (uri: string) => void }) {
  const insets = useSafeAreaInsets();
  const [source, setSource] = useState<Size | null>(null);
  const [viewport, setViewport] = useState<Size | null>(null);
  const [box, setBox] = useState<Box | null>(null);
  const [busy, setBusy] = useState(false);

  const imageRect = useMemo(() => {
    if (!source || !viewport) return null;
    const scale = Math.min(viewport.width / source.width, viewport.height / source.height);
    const width = source.width * scale;
    const height = source.height * scale;
    return { x: (viewport.width - width) / 2, y: (viewport.height - height) / 2, width, height, scale };
  }, [source, viewport]);

  useEffect(() => { getPhotoSize(uri).then(setSource).catch(() => setSource(null)); }, [uri]);
  useEffect(() => {
    if (!imageRect) return;
    const side = Math.min(imageRect.width, imageRect.height) * 0.72;
    setBox({ x: imageRect.x + (imageRect.width - side) / 2, y: imageRect.y + (imageRect.height - side) / 2, side });
  }, [imageRect]);

  // PanResponder entrega deslocamento acumulado. Estes callbacks usam a posição
  // inicial para evitar somar o mesmo deslocamento em quadros sucessivos.
  const drag = useMemo(() => {
    let initial: Box | null = null;
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => { initial = box; },
      onPanResponderMove: (_event, gesture) => {
        if (!initial || !imageRect) return;
        setBox({
          ...initial,
          x: Math.max(imageRect.x, Math.min(imageRect.x + imageRect.width - initial.side, initial.x + gesture.dx)),
          y: Math.max(imageRect.y, Math.min(imageRect.y + imageRect.height - initial.side, initial.y + gesture.dy)),
        });
      },
    });
  }, [box, imageRect]);

  const resize = (factor: number) => setBox(current => {
    if (!current || !imageRect) return current;
    const maxSide = Math.min(imageRect.width, imageRect.height);
    const side = Math.max(80, Math.min(maxSide, current.side * factor));
    const centerX = current.x + current.side / 2;
    const centerY = current.y + current.side / 2;
    return {
      side,
      x: Math.max(imageRect.x, Math.min(imageRect.x + imageRect.width - side, centerX - side / 2)),
      y: Math.max(imageRect.y, Math.min(imageRect.y + imageRect.height - side, centerY - side / 2)),
    };
  });

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
        <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 15, fontWeight: '800' }}>Selecione a área da foto</Text>
        <View style={{ width: 21 }} />
      </View>
      <View style={{ flex: 1 }} onLayout={e => setViewport(e.nativeEvent.layout)}>
        <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        {box && (
          <>
            <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: box.y, backgroundColor: 'rgba(0,0,0,.58)' }} />
            <View pointerEvents="none" style={{ position: 'absolute', left: 0, top: box.y, width: box.x, height: box.side, backgroundColor: 'rgba(0,0,0,.58)' }} />
            <View pointerEvents="none" style={{ position: 'absolute', left: box.x + box.side, right: 0, top: box.y, height: box.side, backgroundColor: 'rgba(0,0,0,.58)' }} />
            <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: box.y + box.side, bottom: 0, backgroundColor: 'rgba(0,0,0,.58)' }} />
          <View {...drag.panHandlers} style={{ position: 'absolute', left: box.x, top: box.y, width: box.side, height: box.side, borderWidth: 3, borderColor: '#fff' }}>
            {(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map((corner) => (
              <View key={corner} style={{ position: 'absolute', width: 22, height: 22, borderColor: T.primary, borderTopWidth: corner.startsWith('top') ? 5 : 0, borderBottomWidth: corner.startsWith('bottom') ? 5 : 0, borderLeftWidth: corner.endsWith('Left') ? 5 : 0, borderRightWidth: corner.endsWith('Right') ? 5 : 0, top: corner.startsWith('top') ? -4 : undefined, bottom: corner.startsWith('bottom') ? -4 : undefined, left: corner.endsWith('Left') ? -4 : undefined, right: corner.endsWith('Right') ? -4 : undefined }} />
            ))}
          </View>
          </>
        )}
      </View>
      <Text style={{ color: '#CBD5E1', textAlign: 'center', fontSize: 12, marginTop: 12 }}>Arraste o quadrado e ajuste seu tamanho</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 14, marginVertical: 12 }}>
        <Pressable onPress={() => resize(0.82)} style={{ width: 46, height: 40, borderRadius: 12, backgroundColor: '#FFFFFF18', alignItems: 'center', justifyContent: 'center' }}><Icon name="minus" size={18} color="#fff" /></Pressable>
        <Pressable onPress={() => resize(1.22)} style={{ width: 46, height: 40, borderRadius: 12, backgroundColor: '#FFFFFF18', alignItems: 'center', justifyContent: 'center' }}><Icon name="plus" size={18} color="#fff" /></Pressable>
      </View>
      <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}>
        <Pressable onPress={onCancel} disabled={busy} style={{ flex: 1, height: 50, borderRadius: 13, borderWidth: 1, borderColor: '#FFFFFF55', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#fff', fontWeight: '700' }}>Cancelar</Text></Pressable>
        <Pressable onPress={() => void apply()} disabled={busy || !box} style={{ flex: 1.4, height: 50, borderRadius: 13, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, opacity: !box ? .5 : 1 }}>
          {busy ? <ActivityIndicator color="#fff" /> : <Icon name="check" size={17} color="#fff" />}
          <Text style={{ color: '#fff', fontWeight: '800' }}>{busy ? 'Recortando…' : 'Aplicar recorte'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
