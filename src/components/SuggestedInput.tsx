import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Icon } from './Icon';
import { FieldLabel } from './ui';
import { T } from '../theme/theme';
import type { SelectOption } from '../api/mobile';

function norm(value: string) {
  return value.toUpperCase().trim();
}

function inputStyle(multiline?: boolean) {
  return {
    minHeight: multiline ? 94 : 44,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: T.border,
    backgroundColor: T.surface,
    paddingHorizontal: 13,
    paddingVertical: multiline ? 11 : 0,
    fontSize: 14,
    color: T.text,
  } as const;
}

/**
 * Campo com catálogo: digitação livre (aceita valores novos) + botão de lista
 * que abre um modal de seleção com busca. Substitui a antiga régua horizontal
 * de chips, melhor para listas grandes.
 */
export function SuggestedInput({
  label,
  value,
  onChangeText,
  placeholder,
  options,
  required,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  options: SelectOption[];
  required?: boolean;
  multiline?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = norm(query);
    if (!q) return options;
    return options.filter(o => norm(o.label).includes(q) || norm(o.value).includes(q));
  }, [options, query]);

  const pick = (next: string) => {
    onChangeText(next);
    setQuery('');
    setOpen(false);
  };

  return (
    <View>
      <FieldLabel required={required}>{label}</FieldLabel>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: multiline ? 'flex-start' : 'center' }}>
        <View style={{ flex: 1 }}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={T.faint}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'center'}
            style={inputStyle(multiline)}
          />
        </View>
        {options.length > 0 && (
          <Pressable
            onPress={() => { setQuery(''); setOpen(true); }}
            style={{ width: 46, height: 44, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted, alignItems: 'center', justifyContent: 'center' }}
          >
            <Icon name="list" size={19} color={T.primary} />
          </Pressable>
        )}
      </View>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable onPress={() => setOpen(false)} style={{ flex: 1, backgroundColor: 'rgba(15,23,42,.45)', justifyContent: 'flex-end' }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Pressable onPress={() => {}} style={{ backgroundColor: T.bg, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: 520, paddingTop: 10 }}>
              <View style={{ alignItems: 'center', paddingBottom: 8 }}>
                <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: T.border }} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 10 }}>
                <Text style={{ fontSize: 15.5, fontWeight: '800', color: T.text }}>{label}</Text>
                <Pressable onPress={() => setOpen(false)} hitSlop={10}><Icon name="x" size={20} color={T.muted} /></Pressable>
              </View>
              <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Buscar..."
                  placeholderTextColor={T.faint}
                  autoFocus
                  style={inputStyle(false)}
                />
              </View>
              <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28 }}>
                {filtered.length === 0 ? (
                  <Text style={{ fontSize: 13, color: T.muted, paddingVertical: 18, textAlign: 'center' }}>Nenhuma opção encontrada.</Text>
                ) : (
                  filtered.map(option => {
                    const selected = value === option.value;
                    return (
                      <Pressable
                        key={`${option.kind}-${option.value}`}
                        onPress={() => pick(option.value)}
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, paddingVertical: 13, paddingHorizontal: 13, borderRadius: 11, marginBottom: 6, borderWidth: 1, borderColor: selected ? T.primary : T.border, backgroundColor: selected ? `${T.primary}10` : T.surface }}
                      >
                        <Text style={{ flex: 1, fontSize: 14, fontWeight: selected ? '700' : '500', color: selected ? T.primary : T.text }}>{option.label}</Text>
                        {selected && <Icon name="check" size={17} color={T.primary} />}
                      </Pressable>
                    );
                  })
                )}
              </ScrollView>
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </View>
  );
}
