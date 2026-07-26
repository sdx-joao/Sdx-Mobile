import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Icon } from './Icon';
import { T } from '../theme/theme';
import type { StockConsumable, StockMaterialInput, StockServiceLink } from '../api/mobile';

// CAIXA ALTA sem acento — mesma convenção dos selects.
const upper = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().trim().replace(/\s+/g, ' ');
const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Bloco "Materiais de estoque" da OS (app) — só aparece quando o serviço tem
 * vínculo de estoque. A direção (entrega=saída / coleta=entrada) vem do serviço;
 * com item fixo só pede a quantidade, senão o técnico escolhe o consumível.
 * Ver docs/WORK_ORDER_STOCK_LINK.md (repo do servidor).
 */
export function StockMaterialsBlock({
  link, consumables, value, onChange,
}: {
  link: StockServiceLink | null | undefined;
  consumables: StockConsumable[];
  value: StockMaterialInput[];
  onChange: (next: StockMaterialInput[]) => void;
}) {
  const [pickerFor, setPickerFor] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  const isOut = link?.direction === 'out';
  const fixed = !!link?.itemId;
  const accent = isOut ? '#d97706' : '#059669';

  // Garante ao menos uma linha quando há vínculo.
  const rows = useMemo<StockMaterialInput[]>(
    () => (value.length ? value : [{ itemId: link?.itemId ?? '', qty: 1 }]),
    [value, link?.itemId],
  );

  if (!link) return null;

  const update = (index: number, patch: Partial<StockMaterialInput>) =>
    onChange(rows.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  const remove = (index: number) => onChange(rows.filter((_, i) => i !== index));
  const add = () => onChange([...rows, { itemId: link.itemId ?? '', qty: 1 }]);

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
          <Text style={{ color: T.text, fontWeight: '700', fontSize: 14 }}>Materiais de estoque</Text>
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
          <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
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
                    {row.itemId ? upper(consumableOf(row.itemId)?.name || 'Item') : 'Escolher material'}
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
                value={String(row.qty)}
                onChangeText={(t) => update(index, { qty: Math.max(0, Number(t.replace(',', '.')) || 0) })}
                keyboardType="decimal-pad"
                placeholder="Qtd."
                placeholderTextColor={T.faint}
                style={{ borderWidth: 1, borderColor: T.border, borderRadius: 10, backgroundColor: T.bg, color: T.text, paddingHorizontal: 10, paddingVertical: 10, textAlign: 'right' }}
              />
            </View>
            {!fixed && rows.length > 1 && (
              <Pressable onPress={() => remove(index)} style={{ padding: 8 }}>
                <Icon name="trash" size={18} color={T.muted} />
              </Pressable>
            )}
          </View>
        );
      })}

      {!fixed && (
        <Pressable onPress={add} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingVertical: 4 }}>
          <Icon name="plus" size={16} color={T.primary} />
          <Text style={{ color: T.primary, fontWeight: '600' }}>Adicionar material</Text>
        </Pressable>
      )}

      {/* Seletor de consumível */}
      <Modal visible={pickerFor != null} animationType="slide" transparent onRequestClose={() => setPickerFor(null)}>
        <View style={{ flex: 1, backgroundColor: '#0008', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: T.bg, borderTopLeftRadius: 18, borderTopRightRadius: 18, maxHeight: '75%', padding: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ color: T.text, fontWeight: '700', fontSize: 16 }}>Escolher material</Text>
              <Pressable onPress={() => setPickerFor(null)}><Icon name="x" size={22} color={T.muted} /></Pressable>
            </View>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Buscar consumível…"
              placeholderTextColor={T.faint}
              style={{ borderWidth: 1, borderColor: T.border, borderRadius: 10, backgroundColor: T.surface, color: T.text, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10 }}
            />
            <ScrollView keyboardShouldPersistTaps="handled">
              {filtered.map((c) => {
                const avail = round2(c.currentQty - c.reservedQty);
                return (
                  <Pressable
                    key={c.id}
                    onPress={() => { if (pickerFor != null) update(pickerFor, { itemId: c.id }); setPickerFor(null); }}
                    style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: T.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Text style={{ color: T.text, fontWeight: '600', flex: 1 }} numberOfLines={1}>{upper(c.name)}</Text>
                    <Text style={{ color: avail < 0 ? T.danger : T.muted, fontSize: 12, marginLeft: 8 }}>{avail} {c.unit} disp.</Text>
                  </Pressable>
                );
              })}
              {!filtered.length && (
                <Text style={{ color: T.faint, textAlign: 'center', paddingVertical: 20 }}>Nenhum consumível encontrado.</Text>
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
