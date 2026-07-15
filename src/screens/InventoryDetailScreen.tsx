import { useCallback, useState } from 'react';
import { Dimensions, Image, Modal, NativeScrollEvent, NativeSyntheticEvent, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { Icon } from '../components/Icon';
import { Badge, DetailScaffold, EmptyState, LoadingState, SectionCard, StatItem } from '../components/ui';
import { MovementRow } from '../components/cards';
import { T, INV_TYPE } from '../theme/theme';
import { stockStatusOf } from '../data/mock';
import { useAuth } from '../auth/auth-context';
import { getInventoryItem } from '../api/mobile';
import { API_BASE_URL } from '../api/client';
import { useResource } from '../api/use-resource';
import type { RootStackParamList } from '../navigation/types';

type ImgHeaders = Record<string, string> | undefined;

/** Carrossel de fotos (principal + anexos) com indicadores e viewer em tela cheia. */
function PhotoCarousel({ photos, headers, width }: { photos: string[]; headers: ImgHeaders; width: number }) {
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState(false);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActive(Math.round(e.nativeEvent.contentOffset.x / Math.max(1, width)));
  };

  if (photos.length === 0) {
    return (
      <View style={{ height: 190, borderRadius: 14, marginBottom: 12, borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="camera" size={26} color={T.faint} />
        <Text style={{ fontSize: 11.5, color: T.faint, marginTop: 7 }}>Sem foto cadastrada</Text>
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ height: 200, borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted }}>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={onScroll} scrollEventThrottle={16}>
          {photos.map((uri, i) => (
            <Pressable key={i} onPress={() => setViewer(true)} style={{ width, height: 200 }}>
              <Image source={{ uri, headers }} resizeMode="cover" style={{ width, height: 200 }} />
            </Pressable>
          ))}
        </ScrollView>
        {photos.length > 1 && (
          <View style={{ position: 'absolute', top: 10, right: 12, backgroundColor: 'rgba(15,23,42,.7)', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 3 }}>
            <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>{active + 1}/{photos.length}</Text>
          </View>
        )}
        <View style={{ position: 'absolute', bottom: 9, right: 10, flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 9, backgroundColor: 'rgba(15,23,42,.72)' }}>
          <Icon name="search" size={12} color="#fff" />
          <Text style={{ color: '#fff', fontSize: 11.5, fontWeight: '600' }}>Ampliar</Text>
        </View>
      </View>
      {/* Bolinhas indicadoras */}
      {photos.length > 1 && (
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 8 }}>
          {photos.map((_, i) => (
            <View key={i} style={{ width: i === active ? 18 : 6, height: 6, borderRadius: 3, backgroundColor: i === active ? T.primary : T.border }} />
          ))}
        </View>
      )}

      {/* Viewer em tela cheia */}
      <Modal visible={viewer} transparent animationType="fade" onRequestClose={() => setViewer(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.92)' }}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentOffset={{ x: active * Dimensions.get('window').width, y: 0 }}>
            {photos.map((uri, i) => (
              <View key={i} style={{ width: Dimensions.get('window').width, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{ uri, headers }} resizeMode="contain" style={{ width: '100%', height: '80%' }} />
              </View>
            ))}
          </ScrollView>
          <Pressable onPress={() => setViewer(false)} style={{ position: 'absolute', top: 44, right: 20, width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,.15)', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={22} color="#fff" />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

function Half({ label, value }: { label: string; value?: string | null }) {
  return (
    <View style={{ width: '50%', marginBottom: 14 }}>
      <StatItem label={label}>{value || '—'}</StatItem>
    </View>
  );
}

export function InventoryDetailScreen() {
  const nav = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'InventoryDetail'>>();
  const { token } = useAuth();
  const loader = useCallback(() => getInventoryItem(token, route.params.id), [token, route.params.id]);
  const { data, loading, refreshing, error, reload } = useResource(loader, { reloadOnFocus: true });
  const item = data?.item;

  if (loading) {
    return (
      <DetailScaffold onBack={() => nav.goBack()} title="Carregando item">
        <LoadingState />
      </DetailScaffold>
    );
  }

  if (error || !item) {
    return (
      <DetailScaffold onBack={() => nav.goBack()} title="Item não encontrado">
        <EmptyState icon="package" text={error || 'Este item não existe no inventário.'} />
      </DetailScaffold>
    );
  }

  const tone = stockStatusOf(item);
  const ty = INV_TYPE[item.primaryType];
  const isEquip = item.itemType === 'equipment';
  const moves = data?.movements ?? [];
  const pct = item.maxQty ? Math.min(100, (item.currentQty / item.maxQty) * 100) : 100;
  // Fotos: principal + anexos. O endpoint mobile exige Bearer no header do <Image>.
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : undefined;
  const photos = [
    ...(item.mainPhotoUrl ? [`${API_BASE_URL}${item.mainPhotoUrl}`] : []),
    ...((item.attachmentPhotos ?? []).map((p) => `${API_BASE_URL}${p.url}`)),
  ];
  const carouselWidth = Dimensions.get('window').width - 32;

  return (
    <DetailScaffold
      onBack={() => nav.goBack()}
      eyebrow={item.sku || item.assetTag || ty.label}
      title={item.name}
      badge={<Badge tone={tone} badgeStyle="solid" />}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={reload} tintColor={T.primary} colors={[T.primary]} />}
      headerExtra={
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Icon name={ty.icon} size={14} color="rgba(255,255,255,.78)" />
            <Text style={{ fontSize: 12.5, color: 'rgba(255,255,255,.78)' }}>{ty.label}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Icon name="map-pin" size={14} color="rgba(255,255,255,.78)" />
            <Text style={{ fontSize: 12.5, color: 'rgba(255,255,255,.78)' }}>{item.currentLocation}</Text>
          </View>
        </View>
      }
    >
      <PhotoCarousel photos={photos} headers={authHeaders} width={carouselWidth} />

      {!isEquip ? (
        <SectionCard title="Estoque">
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
            <Text style={{ fontSize: 34, fontWeight: '800', color: tone.solid, lineHeight: 36 }}>{item.currentQty}</Text>
            <Text style={{ fontSize: 14, color: T.muted, marginBottom: 4 }}>{item.unit}</Text>
          </View>
          <View style={{ height: 8, borderRadius: 4, backgroundColor: T.surfaceMuted, overflow: 'hidden', marginVertical: 12 }}>
            <View style={{ width: `${pct}%`, height: '100%', backgroundColor: tone.solid, borderRadius: 4 }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 11.5, color: T.faint }}>Mínimo {item.minQty}</Text>
            <Text style={{ fontSize: 11.5, color: T.faint }}>Máximo {item.maxQty || '—'}</Text>
          </View>
        </SectionCard>
      ) : (
        <SectionCard title="Patrimônio">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Half label="Etiqueta" value={item.assetTag} />
            <Half label="Nº de série" value={item.serialNumber} />
            <Half label="Marca" value={item.brand} />
            <Half label="Modelo" value={item.model} />
            {item.operatingSystem && <Half label="Sistema" value={item.operatingSystem} />}
            <Half label="Estado" value={item.equipmentStatus} />
          </View>
        </SectionCard>
      )}

      {item.technicalSpecs.length > 0 && (
        <SectionCard title="Especificações técnicas">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {item.technicalSpecs.map((s, i) => (
              <View key={i} style={{ backgroundColor: T.surfaceMuted, borderRadius: 9, paddingVertical: 8, paddingHorizontal: 11 }}>
                <Text style={{ fontSize: 10, color: T.faint, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4 }}>{s.key}</Text>
                <Text style={{ fontSize: 12.5, color: T.text, fontWeight: '600', marginTop: 2 }}>{s.value}</Text>
              </View>
            ))}
          </View>
        </SectionCard>
      )}

      <SectionCard title="Identificação">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Half label="SKU" value={item.sku} />
          <Half label="Unidade" value={item.unit} />
          <Half label="Categoria" value={ty.label} />
          <Half label="Localização" value={item.currentLocation} />
        </View>
        {!!item.notes && (
          <Text style={{ marginTop: 2, fontSize: 13, color: T.textSoft, lineHeight: 20, backgroundColor: T.surfaceMuted, borderRadius: 10, padding: 11 }}>{item.notes}</Text>
        )}
      </SectionCard>

      {moves.length > 0 && (
        <SectionCard title="Histórico de movimentações">
          {moves.map((m) => <MovementRow key={m.id} m={m} />)}
        </SectionCard>
      )}
    </DetailScaffold>
  );
}
