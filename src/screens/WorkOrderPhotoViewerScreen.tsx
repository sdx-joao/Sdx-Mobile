import { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../components/Icon';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { getWorkOrderAttachments, type WorkOrderAttachment } from '../api/mobile';
import { API_BASE_URL } from '../api/client';
import { useResource } from '../api/use-resource';
import type { RootStackParamList } from '../navigation/types';

const ATTACHMENT_LABELS: Record<string, string> = {
  before: 'Antes', after: 'Depois', document: 'Documento', general: 'Geral',
};

function fmt(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

/** Galeria fullscreen das fotos anexadas — swipe horizontal + pinch-zoom (iOS). */
export function WorkOrderPhotoViewerScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'WorkOrderPhotoViewer'>>();
  const { id, startId } = route.params;
  const { token } = useAuth();
  const authHeaders = useMemo(() => (token ? { Authorization: `Bearer ${token}` } : undefined), [token]);
  const { width, height } = Dimensions.get('window');

  const loader = useCallback(() => getWorkOrderAttachments(token, id), [token, id]);
  const { data, loading } = useResource(loader);
  const photos = useMemo(
    () => (data ?? []).filter((a) => a.mimeType.startsWith('image/')),
    [data],
  );
  const startIndex = Math.max(0, photos.findIndex((p) => p.id === startId));
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<WorkOrderAttachment>>(null);
  const current = photos[index];

  const onScroll = (e: { nativeEvent: { contentOffset: { x: number } } }) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== index && i >= 0 && i < photos.length) setIndex(i);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      ) : photos.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <Icon name="camera" size={40} color="rgba(255,255,255,.5)" />
          <Text style={{ color: 'rgba(255,255,255,.7)', fontSize: 14 }}>Nenhuma foto anexada.</Text>
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={photos}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(p) => p.id}
          initialScrollIndex={startIndex}
          getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
          onMomentumScrollEnd={onScroll}
          onLayout={() => { if (startIndex > 0) setIndex(startIndex); }}
          renderItem={({ item }) => (
            <ScrollView
              style={{ width, height }}
              contentContainerStyle={{ flex: 1 }}
              maximumZoomScale={4}
              minimumZoomScale={1}
              centerContent
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <Image
                source={{ uri: `${API_BASE_URL}${item.url}`, headers: authHeaders }}
                style={{ width, height, resizeMode: 'contain' }}
              />
            </ScrollView>
          )}
        />
      )}

      {/* Topo: fechar + contador */}
      <View style={{ position: 'absolute', top: 46, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
        <Pressable
          onPress={() => nav.goBack()}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 11, borderRadius: 999, backgroundColor: 'rgba(0,0,0,.5)' }}
        >
          <Icon name="x" size={17} color="#fff" />
          <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>Fechar</Text>
        </Pressable>
        {photos.length > 1 && (
          <View style={{ paddingVertical: 6, paddingHorizontal: 12, borderRadius: 999, backgroundColor: 'rgba(0,0,0,.5)' }}>
            <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>{index + 1} / {photos.length}</Text>
          </View>
        )}
      </View>

      {/* Rodapé: legenda (categoria · data + comentário) */}
      {current && (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 18, paddingBottom: 34, backgroundColor: 'rgba(0,0,0,.55)' }}>
          <Text style={{ color: '#fff', fontSize: 12.5, fontWeight: '800', letterSpacing: 0.3 }}>
            {(ATTACHMENT_LABELS[current.category] || current.category).toUpperCase()} · {fmt(current.createdAt)}
          </Text>
          {!!current.comment && (
            <Text style={{ color: 'rgba(255,255,255,.85)', fontSize: 13.5, marginTop: 4, lineHeight: 19 }}>{current.comment}</Text>
          )}
        </View>
      )}
    </View>
  );
}
