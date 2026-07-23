import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { Icon } from './Icon';
import { T } from '../theme/theme';
import { getInventory, type InvolvedEquipmentInput } from '../api/mobile';

/**
 * Bloco "Equipamentos envolvidos" da OS (app) — lista opcional 0..N de quem deu
 * problema. Cada entrada vem do inventário (busca por nome/etiqueta/patrimônio)
 * ou por texto livre quando o equipamento ainda não está cadastrado. Ver
 * docs/WORK_ORDER_EQUIPMENT_AND_TAXONOMY.md (repo do servidor).
 */
export function InvolvedEquipmentBlock({
  token, value, onChange, highlight,
}: {
  token: string | null;
  value: InvolvedEquipmentInput[];
  onChange: (next: InvolvedEquipmentInput[]) => void;
  highlight?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{ id: string; name: string; assetTag: string | null; unitName?: string | null; room?: string | null }>>([]);
  const [loading, setLoading] = useState(false);
  const [freeText, setFreeText] = useState('');

  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) { setResults([]); return; }
    let alive = true;
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const items = await getInventory(token, { q: term });
        if (alive) setResults(items.slice(0, 8).map((i) => ({ id: i.id, name: i.name, assetTag: i.assetTag, unitName: i.unitName, room: i.room })));
      } catch {
        if (alive) setResults([]);
      } finally {
        if (alive) setLoading(false);
      }
    }, 350);
    return () => { alive = false; clearTimeout(timer); };
  }, [query, token]);

  const has = (id: string) => value.some((e) => e.itemId === id);
  const addItem = (it: { id: string; name: string; assetTag: string | null }) => {
    if (!has(it.id)) onChange([...value, { itemId: it.id, itemName: it.name, itemAssetTag: it.assetTag, problemNote: null }]);
    setQuery(''); setResults([]);
  };
  const addFree = () => {
    const t = freeText.trim();
    if (!t) return;
    onChange([...value, { freeText: t, problemNote: null }]);
    setFreeText('');
  };
  const removeAt = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const setProblem = (i: number, note: string) => onChange(value.map((e, idx) => (idx === i ? { ...e, problemNote: note } : e)));

  return (
    <View style={{ gap: 10, borderRadius: 12, borderWidth: highlight ? 1.5 : 0, borderColor: highlight ? T.primary : 'transparent', padding: highlight ? 10 : 0, backgroundColor: highlight ? `${T.primary}0D` : 'transparent' }}>
      <Text style={{ fontSize: 12, color: T.muted }}>
        Opcional. Aponte o(s) equipamento(s) que deram problema — do inventário ou por descrição.
      </Text>

      {value.map((e, i) => (
        <View key={i} style={{ gap: 8, borderRadius: 10, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, padding: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icon name="monitor" size={16} color={T.primary} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13.5, fontWeight: '700', color: T.text }} numberOfLines={1}>
                {e.itemName || e.freeText || e.labelCode || 'Equipamento'}
                {e.itemAssetTag ? `  ·  ${e.itemAssetTag}` : ''}
              </Text>
              <Text style={{ fontSize: 10.5, color: T.faint }}>{e.itemId ? 'do inventário' : 'sem cadastro'}</Text>
            </View>
            <Pressable onPress={() => removeAt(i)} hitSlop={8}><Icon name="x" size={16} color={T.danger} /></Pressable>
          </View>
          <TextInput
            value={e.problemNote ?? ''}
            onChangeText={(v) => setProblem(i, v)}
            placeholder="Qual o problema? (opcional)"
            placeholderTextColor={T.faint}
            style={{ height: 38, borderRadius: 9, borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted, paddingHorizontal: 12, fontSize: 13, color: T.text }}
          />
        </View>
      ))}

      {/* Busca no inventário */}
      <View>
        <View style={{ height: 46, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Icon name="search" size={15} color={T.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar no inventário (nome, etiqueta, patrimônio)"
            placeholderTextColor={T.faint}
            style={{ flex: 1, fontSize: 14, color: T.text }}
          />
          {loading && <ActivityIndicator size="small" color={T.primary} />}
        </View>
        {results.length > 0 && (
          <View style={{ marginTop: 6, borderRadius: 10, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, overflow: 'hidden' }}>
            {results.map((it) => (
              <Pressable key={it.id} onPress={() => addItem(it)} disabled={has(it.id)}
                style={{ paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: T.border, opacity: has(it.id) ? 0.4 : 1 }}>
                <Text style={{ fontSize: 13.5, fontWeight: '700', color: T.text }}>{it.name}</Text>
                <Text style={{ fontSize: 11, color: T.faint }}>
                  {[it.assetTag, [it.unitName, it.room].filter(Boolean).join(' / ')].filter(Boolean).join('  ·  ') || 'sem local'}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Sem cadastro (texto livre) */}
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <TextInput
          value={freeText}
          onChangeText={setFreeText}
          placeholder="Sem cadastro? Descreva (ex.: Impressora HP recepção)"
          placeholderTextColor={T.faint}
          onSubmitEditing={addFree}
          style={{ flex: 1, height: 44, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted, paddingHorizontal: 12, fontSize: 13.5, color: T.text }}
        />
        <Pressable onPress={addFree} disabled={!freeText.trim()}
          style={{ height: 44, paddingHorizontal: 14, borderRadius: 11, borderWidth: 1, borderColor: T.primary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 5, opacity: freeText.trim() ? 1 : 0.5 }}>
          <Icon name="plus" size={15} color={T.primary} />
          <Text style={{ fontSize: 13, fontWeight: '800', color: T.primary }}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
}
