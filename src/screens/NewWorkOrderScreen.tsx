import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../components/Icon';
import { DetailScaffold, SectionCard, FieldLabel, FakeInput, PrimaryButton } from '../components/ui';
import { T, WO_PRIORITY } from '../theme/theme';

export function NewWorkOrderScreen() {
  const nav = useNavigation();
  const [priority, setPriority] = useState('normal');
  const accent = T.primary;

  return (
    <DetailScaffold onBack={() => nav.goBack()} eyebrow="Nova ordem" title="Abrir OS" compact>
      <SectionCard title="Detalhes do serviço">
        <View style={{ gap: 14 }}>
          <View><FieldLabel required>Tipo de serviço</FieldLabel><FakeInput placeholder="Selecionar tipo" chevron /></View>
          <View><FieldLabel>Categoria</FieldLabel><FakeInput placeholder="Selecionar categoria" chevron /></View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}><FieldLabel required>Unidade</FieldLabel><FakeInput value="HO — JCB" chevron /></View>
            <View style={{ flex: 1 }}><FieldLabel required>Setor</FieldLabel><FakeInput placeholder="Setor" chevron /></View>
          </View>
        </View>
      </SectionCard>

      <SectionCard title="Prioridade">
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {Object.entries(WO_PRIORITY).map(([k, p]) => {
            const on = priority === k;
            return (
              <Pressable
                key={k}
                onPress={() => setPriority(k)}
                style={{
                  flex: 1, paddingVertical: 9, borderRadius: 11, borderWidth: 1.5, alignItems: 'center',
                  borderColor: on ? p.color : T.border, backgroundColor: on ? p.soft : T.surface,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: '600', color: on ? p.color : T.muted }}>{p.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </SectionCard>

      <SectionCard title="Solicitante">
        <View style={{ gap: 14 }}>
          <View><FieldLabel required>Nome</FieldLabel><FakeInput placeholder="Quem solicitou" chevron /></View>
          <View><FieldLabel>Contato</FieldLabel><FakeInput placeholder="(85) 9 0000-0000" /></View>
          <View>
            <FieldLabel>Descrição</FieldLabel>
            <View style={{ minHeight: 86, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, padding: 12 }}>
              <Text style={{ fontSize: 14, color: T.faint }}>Descreva o problema ou a solicitação…</Text>
            </View>
          </View>
        </View>
      </SectionCard>

      <SectionCard title="Anexos">
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {[{ icon: 'camera', label: 'Foto' }, { icon: 'scan', label: 'Escanear ativo' }].map((b) => (
            <Pressable
              key={b.label}
              style={{
                flex: 1, height: 76, borderRadius: 12, borderWidth: 1.5, borderStyle: 'dashed', borderColor: T.borderStrong,
                backgroundColor: T.surfaceMuted, alignItems: 'center', justifyContent: 'center', gap: 5,
              }}
            >
              <Icon name={b.icon} size={20} color={accent} />
              <Text style={{ fontSize: 11.5, fontWeight: '600', color: T.muted }}>{b.label}</Text>
            </Pressable>
          ))}
        </View>
      </SectionCard>

      <View style={{ height: 4 }} />
      <PrimaryButton label="Abrir ordem de serviço" icon="check" accent={accent} onPress={() => nav.goBack()} />
      <View style={{ height: 12 }} />
    </DetailScaffold>
  );
}
