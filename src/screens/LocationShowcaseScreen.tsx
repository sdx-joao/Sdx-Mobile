import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../components/Icon';
import { API_BASE_URL } from '../api/client';
import { getPublicLocationShowcase, type PublicLocationItem, type PublicLocationShowcase } from '../api/mobile';
import type { RootStackParamList } from '../navigation/types';
import { T } from '../theme/theme';

function photoUri(path: string | null) {
  if (!path) return null;
  return /^https?:\/\//i.test(path) ? path : `${API_BASE_URL}${path}`;
}

function ItemPhoto({ item, height = 82 }: { item: PublicLocationItem; height?: number }) {
  const uri = photoUri(item.photoUrl);
  if (uri) return <Image source={{ uri }} resizeMode="cover" resizeMethod="resize" fadeDuration={0} style={{ width: '100%', height }} />;
  return (
    <View style={{ width: '100%', height, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EFF4FF' }}>
      <Icon name="monitor" size={height > 100 ? 48 : 25} color={T.primary} />
    </View>
  );
}

export function LocationShowcaseScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'LocationShowcase'>>();
  const insets = useSafeAreaInsets();
  const [data, setData] = useState<PublicLocationShowcase | null>(null);
  const [selected, setSelected] = useState<PublicLocationItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getPublicLocationShowcase(route.params.code)
      .then((result) => { if (active) setData(result); })
      .catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : 'Local indisponível.'); });
    return () => { active = false; };
  }, [route.params.code]);

  const totals = useMemo(() => {
    const equipment = data?.items.filter(item => item.itemType === 'equipment').length ?? 0;
    return { total: data?.items.length ?? 0, equipment, others: (data?.items.length ?? 0) - equipment };
  }, [data]);

  const header = (
    <>
      <View style={{ backgroundColor: T.primary, paddingTop: insets.top + 10, paddingHorizontal: 18, paddingBottom: 82, overflow: 'hidden' }}>
        <View style={{ position: 'absolute', width: 230, height: 230, borderRadius: 115, backgroundColor: 'rgba(255,255,255,.08)', right: -80, top: -95 }} />
        <Pressable onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,.13)', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="arrow-left" size={19} color="#fff" />
        </Pressable>
        <Text style={{ marginTop: 23, color: '#BFDBFE', fontSize: 10.5, fontWeight: '900', letterSpacing: 1.7 }}>INVENTÁRIO DO LOCAL</Text>
        <Text style={{ marginTop: 10, color: '#fff', fontSize: 31, fontWeight: '900', lineHeight: 34, textTransform: 'uppercase' }}>
          {data?.location.roomName || data?.location.sectorName || 'CARREGANDO LOCAL'}
        </Text>
        {!!data && (
          <Text style={{ marginTop: 9, color: '#DBEAFE', fontSize: 13.5, fontWeight: '600', textTransform: 'uppercase' }}>
            {[data.location.unitName, data.location.roomName ? data.location.sectorName : null].filter(Boolean).join('  ·  ')}
          </Text>
        )}
      </View>

      <View style={{ marginTop: -55, marginHorizontal: 15, borderRadius: 24, backgroundColor: '#fff', flexDirection: 'row', paddingVertical: 19, shadowColor: '#0F172A', shadowOpacity: .12, shadowRadius: 22, elevation: 7 }}>
        {[
          ['ITENS', totals.total],
          ['EQUIPAMENTOS', totals.equipment],
          ['OUTROS', totals.others],
        ].map(([label, value], index) => (
          <View key={String(label)} style={{ flex: 1, alignItems: 'center', borderLeftWidth: index ? 1 : 0, borderLeftColor: '#EEF2F7' }}>
            <Text style={{ color: '#0F172A', fontSize: 23, fontWeight: '900' }}>{value}</Text>
            <Text style={{ marginTop: 3, color: '#94A3B8', fontSize: 9, fontWeight: '800' }}>{label}</Text>
          </View>
        ))}
      </View>

      <View style={{ paddingHorizontal: 15, paddingTop: 28, paddingBottom: 17 }}>
        <Text style={{ color: T.primary, fontSize: 10.5, fontWeight: '900', letterSpacing: 1.5 }}>NESTE AMBIENTE</Text>
        <Text style={{ marginTop: 5, color: '#0F172A', fontSize: 21, fontWeight: '900' }}>ITENS INVENTARIADOS</Text>
        {!data && !error && <ActivityIndicator color={T.primary} style={{ marginTop: 42 }} />}
        {!!error && (
          <View style={{ marginTop: 18, borderRadius: 20, padding: 22, backgroundColor: '#fff' }}>
            <Text style={{ color: '#64748B', textAlign: 'center', fontWeight: '700', textTransform: 'uppercase' }}>{error}</Text>
          </View>
        )}
      </View>
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F7FB' }}>
      <FlatList
        data={data?.items ?? []}
        keyExtractor={item => item.id}
        ListHeaderComponent={header}
        contentContainerStyle={{ paddingBottom: 36 }}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={7}
        maxToRenderPerBatch={6}
        windowSize={7}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => setSelected(item)}
            style={{ marginHorizontal: 15, flexDirection: 'row', alignItems: 'center', gap: 13, padding: 11, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#EAF0F7', borderBottomWidth: 1, borderBottomColor: '#DCE5EF' }}>
            <View style={{ width: 82, height: 82, borderRadius: 16, overflow: 'hidden' }}><ItemPhoto item={item} /></View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text numberOfLines={1} style={{ color: '#0F172A', fontSize: 14.5, fontWeight: '900', textTransform: 'uppercase' }}>{item.name}</Text>
              <Text numberOfLines={1} style={{ marginTop: 4, color: '#64748B', fontSize: 11.5, fontWeight: '600', textTransform: 'uppercase' }}>
                {[item.brand, item.model].filter(Boolean).join(' · ') || item.category || 'ITEM INVENTARIADO'}
              </Text>
              <View style={{ marginTop: 10, flexDirection: 'row', gap: 6 }}>
                {!!item.assetTag && <Text style={{ borderRadius: 99, backgroundColor: '#EFF4FF', paddingHorizontal: 8, paddingVertical: 4, color: T.primary, fontSize: 9.5, fontWeight: '900' }}>PAT {item.assetTag}</Text>}
                <Text style={{ borderRadius: 99, backgroundColor: item.condition === 'Funcionando' ? '#ECFDF5' : '#FFF1F2', paddingHorizontal: 8, paddingVertical: 4, color: item.condition === 'Funcionando' ? '#047857' : '#BE123C', fontSize: 9.5, fontWeight: '900', textTransform: 'uppercase' }}>{item.condition}</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={18} color="#94A3B8" />
          </Pressable>
        )}
      />

      <Modal visible={!!selected} transparent animationType="slide" onRequestClose={() => setSelected(null)}>
        <Pressable onPress={() => setSelected(null)} style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(15,23,42,.58)' }}>
          {!!selected && (
            <Pressable onPress={() => undefined} style={{ maxHeight: '94%', borderTopLeftRadius: 32, borderTopRightRadius: 32, backgroundColor: '#fff', padding: 15, paddingBottom: Math.max(24, insets.bottom + 12) }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Pressable onPress={() => setSelected(null)} style={{ flexDirection: 'row', alignItems: 'center', gap: 7, padding: 7 }}>
                  <Icon name="arrow-left" size={17} color="#64748B" /><Text style={{ color: '#64748B', fontWeight: '800' }}>VOLTAR</Text>
                </Pressable>
                <Pressable onPress={() => setSelected(null)} style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F5F9' }}><Icon name="x" size={17} color="#64748B" /></Pressable>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ height: 265, overflow: 'hidden', borderRadius: 27, backgroundColor: '#F1F5F9' }}><ItemPhoto item={selected} height={265} /></View>
                <View style={{ paddingHorizontal: 8, paddingTop: 21 }}>
                  <Text style={{ color: T.primary, fontSize: 10.5, fontWeight: '900', letterSpacing: 1.5, textTransform: 'uppercase' }}>{selected.category || 'ITEM INVENTARIADO'}</Text>
                  <Text style={{ marginTop: 8, color: '#0F172A', fontSize: 27, fontWeight: '900', lineHeight: 31, textTransform: 'uppercase' }}>{selected.name}</Text>
                  <Text style={{ marginTop: 7, color: '#64748B', fontSize: 13, fontWeight: '600', textTransform: 'uppercase' }}>{[selected.brand, selected.model].filter(Boolean).join(' · ')}</Text>
                  <View style={{ flexDirection: 'row', gap: 10, marginTop: 21 }}>
                    {[['PATRIMÔNIO', selected.assetTag || 'Sem patrimônio'], ['SITUAÇÃO', selected.situation]].map(([label, value]) => (
                      <View key={label} style={{ flex: 1, borderRadius: 17, backgroundColor: '#F8FAFC', padding: 14 }}>
                        <Text style={{ color: '#94A3B8', fontSize: 9, fontWeight: '900' }}>{label}</Text>
                        <Text style={{ marginTop: 6, color: '#0F172A', fontSize: 14, fontWeight: '900', textTransform: 'uppercase' }}>{value}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={{ marginTop: 10, borderRadius: 17, padding: 15, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: selected.condition === 'Funcionando' ? '#ECFDF5' : '#FFF1F2' }}>
                    <Text style={{ color: selected.condition === 'Funcionando' ? '#047857' : '#BE123C', fontSize: 10, fontWeight: '900' }}>CONDIÇÃO</Text>
                    <Text style={{ color: selected.condition === 'Funcionando' ? '#047857' : '#BE123C', fontWeight: '900', textTransform: 'uppercase' }}>{selected.condition}</Text>
                  </View>
                </View>
              </ScrollView>
            </Pressable>
          )}
        </Pressable>
      </Modal>
    </View>
  );
}
