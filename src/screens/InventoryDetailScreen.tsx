import { useCallback, useMemo, useState } from 'react';
import { Dimensions, Image, Modal, NativeScrollEvent, NativeSyntheticEvent, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { Icon } from '../components/Icon';
import { Badge, DetailScaffold, EmptyState, LoadingState, SectionCard, StatItem } from '../components/ui';
import { MovementRow } from '../components/cards';
import { T, INV_TYPE } from '../theme/theme';
import { fmtDate, fmtTime, stockStatusOf, type InventoryItem } from '../data/mock';
import { useAuth } from '../auth/auth-context';
import { getInventoryItem } from '../api/mobile';
import { API_BASE_URL } from '../api/client';
import { useResource } from '../api/use-resource';
import type { RootStackParamList } from '../navigation/types';

type ImgHeaders = Record<string, string> | undefined;
type DetailTab = 'details' | 'history';
type PhotoEntry = { uri: string; name: string; createdAt?: string; role?: string };

function toAbsoluteApiUrl(path?: string | null): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function buildPhotoEntries(item: InventoryItem): PhotoEntry[] {
  const photos: PhotoEntry[] = [];
  const seen = new Set<string>();
  const add = (input: { url?: string | null; name?: string | null; createdAt?: string | null; role?: string | null }) => {
    const uri = toAbsoluteApiUrl(input.url);
    if (!uri || seen.has(uri)) return;
    seen.add(uri);
    photos.push({
      uri,
      name: input.name || (input.role === 'main' ? 'Foto principal' : `Foto ${photos.length + 1}`),
      createdAt: input.createdAt || undefined,
      role: input.role || undefined,
    });
  };

  item.photos?.forEach(photo => add(photo));
  add({ url: item.mainPhotoUrl, name: 'Foto principal', role: 'main', createdAt: item.updatedAt });
  item.attachmentPhotos?.forEach((photo, index) => add({
    url: photo.url,
    name: photo.name || `Foto ${index + 1}`,
    role: 'attachment',
    createdAt: photo.createdAt,
  }));

  return photos;
}

function itemLocationLabel(item: InventoryItem): string {
  const backendLabel = item.locationLabel?.trim();
  if (backendLabel) return backendLabel;
  const parts = [item.unitName, item.room, item.currentLocation]
    .map(value => value?.trim())
    .filter(Boolean);
  return parts.length ? parts.join(' • ') : 'Sem local informado';
}

/** Carrossel de fotos (principal + anexos) com indicadores e viewer em tela cheia. */
function PhotoCarousel({ photos, headers, width }: { photos: PhotoEntry[]; headers: ImgHeaders; width: number }) {
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState(false);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / Math.max(1, width));
    setActive(Math.max(0, Math.min(next, photos.length - 1)));
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
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onMomentumScrollEnd={onScroll} scrollEventThrottle={16}>
          {photos.map((photo, i) => (
            <Pressable key={`${photo.uri}-${i}`} onPress={() => setViewer(true)} style={{ width, height: 200 }}>
              <Image source={{ uri: photo.uri, headers }} resizeMode="cover" style={{ width, height: 200 }} />
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
      {photos.length > 1 && (
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 8 }}>
          {photos.map((_, i) => (
            <View key={i} style={{ width: i === active ? 18 : 6, height: 6, borderRadius: 3, backgroundColor: i === active ? T.primary : T.border }} />
          ))}
        </View>
      )}

      <Modal visible={viewer} transparent animationType="fade" onRequestClose={() => setViewer(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.92)' }}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentOffset={{ x: active * Dimensions.get('window').width, y: 0 }}>
            {photos.map((photo, i) => (
              <View key={`${photo.uri}-viewer-${i}`} style={{ width: Dimensions.get('window').width, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{ uri: photo.uri, headers }} resizeMode="contain" style={{ width: '100%', height: '80%' }} />
              </View>
            ))}
          </ScrollView>
          <View style={{ position: 'absolute', left: 18, right: 72, top: 48 }}>
            <Text numberOfLines={1} style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>{photos[active]?.name || 'Foto'}</Text>
            {photos.length > 1 && <Text style={{ color: 'rgba(255,255,255,.72)', fontSize: 12, marginTop: 2 }}>{active + 1} de {photos.length}</Text>}
          </View>
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

function TabButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        height: 38,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: active ? T.primary : 'transparent',
      }}
    >
      <Text style={{ color: active ? '#fff' : T.textSoft, fontSize: 13, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );
}

function LocationHighlight({ item }: { item: InventoryItem }) {
  return (
    <View style={{ marginBottom: 12, padding: 14, borderRadius: 14, borderWidth: 1, borderColor: '#BFD3FF', backgroundColor: '#EAF1FE' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 7 }}>
        <View style={{ width: 30, height: 30, borderRadius: 9, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="map-pin" size={16} color={T.primary} />
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ fontSize: 10.5, color: T.primary, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.4 }}>Local do equipamento</Text>
          <Text style={{ marginTop: 2, fontSize: 15, color: T.text, fontWeight: '800', lineHeight: 20 }}>{itemLocationLabel(item)}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {!!item.unitName && <Text style={{ fontSize: 11.5, color: T.textSoft, fontWeight: '600' }}>Unidade: {item.unitName}</Text>}
        {!!item.room && <Text style={{ fontSize: 11.5, color: T.textSoft, fontWeight: '600' }}>Setor: {item.room}</Text>}
      </View>
    </View>
  );
}

function AuditRow({ icon, title, detail, at, color = T.primary }: { icon: string; title: string; detail: string; at?: string | null; color?: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: 12, paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: T.surfaceMuted }}>
      <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: `${color}14`, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={17} color={color} />
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={{ fontSize: 13.5, fontWeight: '700', color: T.text }}>{title}</Text>
        <Text style={{ fontSize: 11.8, color: T.faint, marginTop: 2, lineHeight: 16 }}>{detail}</Text>
      </View>
      {!!at && (
        <Text style={{ fontSize: 11, color: T.faint, fontWeight: '600', marginTop: 2 }}>{fmtDate(at)} {fmtTime(at)}</Text>
      )}
    </View>
  );
}

export function InventoryDetailScreen() {
  const nav = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'InventoryDetail'>>();
  const { token } = useAuth();
  const [tab, setTab] = useState<DetailTab>('details');
  const loader = useCallback(() => getInventoryItem(token, route.params.id), [token, route.params.id]);
  const { data, loading, refreshing, error, reload } = useResource(loader, { reloadOnFocus: true });
  const item = data?.item;

  const photos = useMemo(() => (item ? buildPhotoEntries(item) : []), [item]);

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
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : undefined;
  const carouselWidth = Dimensions.get('window').width - 32;
  const historyCount = moves.length + (item.createdAt ? 1 : 0) + (item.updatedAt && item.updatedAt !== item.createdAt ? 1 : 0);

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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 1 }}>
            <Icon name="map-pin" size={14} color="rgba(255,255,255,.78)" />
            <Text numberOfLines={1} style={{ fontSize: 12.5, color: 'rgba(255,255,255,.78)', flexShrink: 1 }}>{item.room || item.currentLocation || item.unitName || 'Sem local'}</Text>
          </View>
        </View>
      }
    >
      <PhotoCarousel photos={photos} headers={authHeaders} width={carouselWidth} />
      <LocationHighlight item={item} />

      <View style={{ flexDirection: 'row', gap: 6, padding: 4, borderRadius: 13, backgroundColor: T.surfaceMuted, marginBottom: 12 }}>
        <TabButton label="Detalhes" active={tab === 'details'} onPress={() => setTab('details')} />
        <TabButton label={historyCount > 0 ? `Histórico (${historyCount})` : 'Histórico'} active={tab === 'history'} onPress={() => setTab('history')} />
      </View>

      {tab === 'details' ? (
        <>
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

          {(item.technicalSpecs?.length ?? 0) > 0 && (
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
              {/* Local completo (Unidade • Setor • detalhe) — currentLocation
                  sozinho é o detalhe livre e quase sempre vem nulo. */}
              <Half label="Localização" value={itemLocationLabel(item)} />
              <Half label="Unidade / origem" value={item.unitName} />
              <Half label="Departamento / Setor" value={item.room} />
            </View>
            {!!item.notes && (
              <Text style={{ marginTop: 2, fontSize: 13, color: T.textSoft, lineHeight: 20, backgroundColor: T.surfaceMuted, borderRadius: 10, padding: 11 }}>{item.notes}</Text>
            )}
          </SectionCard>
        </>
      ) : (
        <SectionCard title="Histórico">
          {item.createdAt && (
            <AuditRow
              icon="plus"
              title="Cadastro do item"
              detail="Registro inicial do patrimônio no inventário."
              at={item.createdAt}
              color="#059669"
            />
          )}
          {item.updatedAt && item.updatedAt !== item.createdAt && (
            <AuditRow
              icon="history"
              title="Última alteração"
              detail="Cadastro, fotos, local ou dados técnicos foram atualizados."
              at={item.updatedAt}
              color="#2563EB"
            />
          )}
          {moves.map((m) => <MovementRow key={m.id} m={m} />)}
          {!historyCount && <EmptyState icon="history" text="Nenhum histórico registrado para este item." />}
        </SectionCard>
      )}
    </DetailScaffold>
  );
}
