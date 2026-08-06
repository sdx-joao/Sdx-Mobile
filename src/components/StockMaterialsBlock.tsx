import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from './Icon';
import { T } from '../theme/theme';
import type { StockConsumable, StockMaterialInput, StockServiceLink } from '../api/mobile';

// CAIXA ALTA sem acento — mesma convenção dos selects.
const upper = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().trim().replace(/\s+/g, ' ');
const round2 = (n: number) => Math.round(n * 100) / 100;

function tonerColor(name: string) {
  const value = upper(name);
  if (/AMARELO|YELLOW/.test(value)) return '#F5C400';
  if (/CIANO|CYAN/.test(value)) return '#00A6C7';
  if (/MAGENTA/.test(value)) return '#D81B60';
  if (/PRETO|BLACK/.test(value)) return '#16181D';
  return '#94A3B8';
}

/** Nome longo em marquee lento; nomes curtos permanecem imóveis. */
function MarqueeName({ children }: { children: string }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const overflow = Math.max(0, textWidth - containerWidth);

  useEffect(() => {
    translateX.stopAnimation();
    translateX.setValue(0);
    if (overflow < 4) return;
    const animation = Animated.loop(Animated.sequence([
      Animated.delay(1400),
      Animated.timing(translateX, {
        toValue: -overflow,
        duration: Math.max(4500, Math.round((overflow / 24) * 1000)),
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.delay(1800),
      Animated.timing(translateX, { toValue: 0, duration: 650, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.delay(900),
    ]));
    animation.start();
    return () => animation.stop();
  }, [overflow, translateX]);

  return (
    <View onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)} style={{ flex: 1, overflow: 'hidden', height: 21, justifyContent: 'center' }}>
      <Text onLayout={(event) => setTextWidth(event.nativeEvent.layout.width)} style={{ position: 'absolute', opacity: 0, fontWeight: '600', fontSize: 14 }}>{children}</Text>
      <Animated.Text numberOfLines={1} style={{ color: T.text, fontWeight: '600', fontSize: 14, flexShrink: 0, transform: [{ translateX }] }}>{children}</Animated.Text>
    </View>
  );
}

/**
 * Bloco "Materiais de estoque" da OS (app) — só aparece quando o serviço tem
 * vínculo de estoque. A direção (entrega=saída / coleta=entrada) vem do serviço;
 * com item fixo só pede a quantidade, senão o técnico escolhe o consumível.
 * Ver docs/modules/work-orders/WORK_ORDER_STOCK_LINK.md (repo do servidor).
 */
export function StockMaterialsBlock({
  link, consumables, value, onChange, title = 'Materiais de estoque', itemNoun = 'material',
}: {
  link: StockServiceLink | null | undefined;
  consumables: StockConsumable[];
  value: StockMaterialInput[];
  onChange: (next: StockMaterialInput[]) => void;
  title?: string;
  itemNoun?: string;
}) {
  const [pickerFor, setPickerFor] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const insets = useSafeAreaInsets();

  const isOut = link?.direction === 'out';
  const fixed = !!link?.itemId;
  const accent = isOut ? '#d97706' : '#059669';

  // Garante ao menos uma linha quando há vínculo.
  const rows = useMemo<StockMaterialInput[]>(
    () => (value.length ? value : [{ itemId: link?.itemId ?? '', qty: 0 }]),
    [value, link?.itemId],
  );

  if (!link) return null;

  const update = (index: number, patch: Partial<StockMaterialInput>) =>
    onChange(rows.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  const remove = (index: number) => onChange(rows.filter((_, i) => i !== index));
  const add = () => onChange([...rows, { itemId: link.itemId ?? '', qty: 0 }]);

  const consumableOf = (id: string) => consumables.find((c) => c.id === id);
  const filtered = useMemo(() => {
    const term = upper(query);
    return consumables.filter((c) => !term || upper(c.name).includes(term)).slice(0, 40);
  }, [consumables, query]);

  return (
    <View style={{ borderWidth: 1, borderColor: T.border, borderStyle: 'dashed', borderRadius: 12, padding: 12, gap: 8, backgroundColor: T.surface }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Icon name={isOut ? 'arrow-up-circle' : 'arrow-down-circle'} size={18} color={accent} />
          <Text style={{ color: T.text, fontWeight: '700', fontSize: 14 }}>{title}</Text>
        </View>
        <View style={{ backgroundColor: accent + '22', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 }}>
          <Text style={{ color: accent, fontSize: 11, fontWeight: '700' }}>{isOut ? 'SAÍDA (ENTREGA)' : 'ENTRADA (COLETA)'}</Text>
        </View>
      </View>
      <Text style={{ color: T.muted, fontSize: 12 }}>
        {isOut
          ? 'A quantidade é descontada do saldo ao salvar a O.S.'
          : 'A quantidade é acrescentada ao saldo ao salvar a O.S.'}
      </Text>

      {rows.map((row, index) => {
        const bal = consumableOf(fixed ? (link.itemId ?? '') : row.itemId);
        const available = bal ? bal.currentQty - bal.reservedQty : null;
        const shortfall = isOut && available != null && available - row.qty < 0;
        return (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
            <View style={{ flex: 1 }}>
              {fixed ? (
                <View style={{ borderWidth: 1, borderColor: T.border, borderRadius: 10, backgroundColor: T.surfaceMuted, paddingHorizontal: 10, paddingVertical: 10 }}>
                  <Text style={{ color: T.text, fontWeight: '600' }}>{upper(link.itemName || '')}</Text>
                </View>
              ) : (
                <Pressable
                  onPress={() => { setQuery(''); setPickerFor(index); }}
                  style={{ borderWidth: 1, borderColor: T.border, borderRadius: 10, backgroundColor: T.bg, paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Text style={{ color: row.itemId ? T.text : T.faint, fontWeight: row.itemId ? '600' : '400' }} numberOfLines={1}>
                    {row.itemId ? upper(consumableOf(row.itemId)?.name || 'Item') : `Escolher ${itemNoun}`}
                  </Text>
                  <Icon name="chevron-down" size={16} color={T.muted} />
                </Pressable>
              )}
              {available != null && (
                <Text style={{ color: shortfall ? T.danger : T.faint, fontSize: 11, marginTop: 3 }}>
                  saldo {round2(available)}{bal?.unit ? ` ${bal.unit}` : ''}{shortfall ? ' — ficará negativo' : ''}
                </Text>
              )}
            </View>
            <View style={{ width: 92 }}>
              <TextInput
                value={row.qty > 0 ? String(row.qty) : ''}
                onChangeText={(t) => update(index, { qty: Math.max(0, Number(t.replace(',', '.')) || 0) })}
                keyboardType="decimal-pad"
                placeholder="Qtd. *"
                placeholderTextColor={T.faint}
                accessibilityLabel="Quantidade solicitada obrigatória"
                style={{ borderWidth: 1, borderColor: T.border, borderRadius: 10, backgroundColor: T.bg, color: T.text, paddingHorizontal: 10, paddingVertical: 10, textAlign: 'right' }}
              />
            </View>
            {!fixed && rows.length > 1 && (
              <Pressable onPress={() => remove(index)} style={{ paddingHorizontal: 8, paddingVertical: 11 }}>
                <Icon name="trash" size={18} color={T.muted} />
              </Pressable>
            )}
          </View>
        );
      })}

      {!fixed && (
        <Pressable onPress={add} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingVertical: 4 }}>
          <Icon name="plus" size={16} color={T.primary} />
          <Text style={{ color: T.primary, fontWeight: '600' }}>Adicionar {itemNoun}</Text>
        </Pressable>
      )}

      {/* Seletor de consumível */}
      <Modal visible={pickerFor != null} animationType="slide" transparent onRequestClose={() => setPickerFor(null)}>
        <View style={{ flex: 1, backgroundColor: '#0008', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: T.bg, borderTopLeftRadius: 18, borderTopRightRadius: 18, maxHeight: '82%', paddingTop: 16, paddingHorizontal: 16, paddingBottom: Math.max(20, insets.bottom + 10) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ color: T.text, fontWeight: '700', fontSize: 16 }}>Escolher {itemNoun}</Text>
              <Pressable onPress={() => setPickerFor(null)}><Icon name="x" size={22} color={T.muted} /></Pressable>
            </View>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder={`Buscar ${itemNoun}…`}
              placeholderTextColor={T.faint}
              style={{ borderWidth: 1, borderColor: T.border, borderRadius: 10, backgroundColor: T.surface, color: T.text, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10 }}
            />
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: Math.max(12, insets.bottom) }}>
              {filtered.map((c) => {
                const avail = round2(c.currentQty - c.reservedQty);
                return (
                  <Pressable
                    key={c.id}
                    onPress={() => { if (pickerFor != null) update(pickerFor, { itemId: c.id }); setPickerFor(null); }}
                    style={{ minHeight: 48, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: T.border, flexDirection: 'row', alignItems: 'center' }}
                  >
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: tonerColor(c.name), borderWidth: 1, borderColor: '#0002', marginRight: 9 }} />
                    <MarqueeName>{upper(c.name)}</MarqueeName>
                    <Text style={{ color: avail < 0 ? T.danger : T.muted, fontSize: 12, marginLeft: 10, flexShrink: 0 }}>{avail} {c.unit} disp.</Text>
                  </Pressable>
                );
              })}
              {!filtered.length && (
                <Text style={{ color: T.faint, textAlign: 'center', paddingVertical: 20 }}>Nenhum {itemNoun} encontrado.</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/** Filtra as linhas válidas (item + qty>0) para enviar no payload da OS. */
export function buildStockMaterialsPayload(rows: StockMaterialInput[], link: StockServiceLink | null | undefined): StockMaterialInput[] {
  if (!link) return [];
  return rows
    .map((r) => ({ itemId: link.itemId ?? r.itemId, qty: Math.abs(Number(r.qty) || 0) }))
    .filter((r) => r.itemId && r.qty > 0);
}
