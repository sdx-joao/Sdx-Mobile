import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { Icon } from '../components/Icon';
import { Badge, DetailScaffold, SectionCard, StatItem } from '../components/ui';
import { T, WO_STATUS, WO_PRIORITY } from '../theme/theme';
import { WORK_ORDERS, WO_TIMELINE, fmtDate, fmtTime, type WorkOrderStatus } from '../data/mock';
import type { RootStackParamList } from '../navigation/types';

const FLOW: WorkOrderStatus[] = ['open', 'in_progress', 'waiting', 'completed'];

export function WorkOrderDetailScreen() {
  const nav = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'WorkOrderDetail'>>();
  const wo = WORK_ORDERS.find((w) => w.id === route.params.id);
  const [status, setStatus] = useState<WorkOrderStatus>(wo?.status ?? 'open');

  if (!wo) {
    return (
      <DetailScaffold onBack={() => nav.goBack()} title="OS não encontrada">
        <Text style={{ color: T.muted }}>Esta ordem de serviço não existe mais.</Text>
      </DetailScaffold>
    );
  }

  const st = WO_STATUS[status];
  const pr = WO_PRIORITY[wo.priority];
  const timeline = WO_TIMELINE[wo.id];
  const accent = T.primary;

  return (
    <DetailScaffold
      onBack={() => nav.goBack()}
      eyebrow={wo.code}
      title={wo.serviceType}
      badge={<Badge tone={st} badgeStyle="solid" />}
      headerExtra={
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,.16)', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999 }}>
            <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: pr.color }} />
            <Text style={{ fontSize: 12.5, fontWeight: '600', color: '#fff' }}>Prioridade {pr.label}</Text>
          </View>
          <Text style={{ fontSize: 12.5, color: 'rgba(255,255,255,.75)' }}>{wo.category}</Text>
        </View>
      }
    >
      {/* Status changer */}
      <SectionCard title="Atualizar status">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 7 }}>
          {FLOW.map((s) => {
            const on = status === s;
            const tone = WO_STATUS[s];
            return (
              <Pressable
                key={s}
                onPress={() => setStatus(s)}
                style={{
                  paddingVertical: 8, paddingHorizontal: 13, borderRadius: 10, borderWidth: 1,
                  borderColor: on ? tone.solid : T.border, backgroundColor: on ? tone.soft : T.surface,
                }}
              >
                <Text style={{ fontSize: 12.5, fontWeight: '600', color: on ? tone.fg : T.muted }}>{tone.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        {status !== wo.status && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 11 }}>
            <Icon name="check-circle" size={14} color={accent} />
            <Text style={{ fontSize: 12, color: T.muted }}>Novo status pronto para registrar (demo).</Text>
          </View>
        )}
      </SectionCard>

      <SectionCard title="Solicitação">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {[
            ['Unidade', wo.unitName], ['Setor', wo.department],
            ['Solicitante', wo.requestedByName], ['Contato', wo.requesterContact || '—'],
            ['Abertura', `${fmtDate(wo.openedAt)} · ${fmtTime(wo.openedAt)}`],
            ['Previsão', wo.expectedCompletionAt ? `${fmtDate(wo.expectedCompletionAt)} · ${fmtTime(wo.expectedCompletionAt)}` : '—'],
          ].map(([label, value], i) => (
            <View key={i} style={{ width: '50%', marginBottom: 14, paddingRight: i % 2 === 0 ? 8 : 0 }}>
              <StatItem label={label as string}>{value}</StatItem>
            </View>
          ))}
        </View>
        {!!wo.requesterContact && (
          <Pressable
            style={{
              marginTop: 2, height: 42, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface,
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Icon name={wo.source === 'whatsapp' ? 'whatsapp' : 'phone'} size={16} color={wo.source === 'whatsapp' ? '#16A34A' : accent} />
            <Text style={{ fontSize: 13.5, fontWeight: '600', color: T.textSoft }}>Contatar solicitante</Text>
          </Pressable>
        )}
      </SectionCard>

      <SectionCard title="Atendimento">
        <View style={{ gap: 14 }}>
          <StatItem label="Responsável">{wo.responsibleTechnicianName || 'Não atribuída'}</StatItem>
          <StatItem label="Equipe">{wo.technicalTeam || '—'}</StatItem>
          <View>
            <Text style={{ fontSize: 11, color: T.faint, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 5 }}>Observações</Text>
            <Text style={{ fontSize: 13.5, color: T.textSoft, lineHeight: 20, backgroundColor: T.surfaceMuted, borderRadius: 10, padding: 11 }}>
              {wo.attendanceNotes || 'Sem observações registradas.'}
            </Text>
          </View>
        </View>
      </SectionCard>

      {wo.materials.length > 0 && (
        <SectionCard title={`Materiais (${wo.materials.length})`}>
          <View style={{ gap: 9 }}>
            {wo.materials.map((m, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9, flex: 1, minWidth: 0 }}>
                  <View style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: T.surfaceMuted, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="box" size={15} color={T.muted} />
                  </View>
                  <Text numberOfLines={1} style={{ fontSize: 13.5, color: T.text, flexShrink: 1 }}>{m.description}</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: '700', color: T.textSoft }}>{m.quantity} {m.unit}</Text>
              </View>
            ))}
          </View>
        </SectionCard>
      )}

      {timeline && (
        <SectionCard title="Histórico">
          {timeline.map((ev, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 11 }}>
              <View style={{ alignItems: 'center' }}>
                <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: WO_STATUS[ev.tone].solid, marginTop: 4 }} />
                {i < timeline.length - 1 && <View style={{ width: 2, flex: 1, backgroundColor: T.border, marginVertical: 2 }} />}
              </View>
              <View style={{ paddingBottom: i < timeline.length - 1 ? 14 : 0 }}>
                <Text style={{ fontSize: 13, color: T.text, fontWeight: '500' }}>{ev.label}</Text>
                <Text style={{ fontSize: 11.5, color: T.faint, marginTop: 1 }}>{ev.at} · {ev.by}</Text>
              </View>
            </View>
          ))}
        </SectionCard>
      )}
    </DetailScaffold>
  );
}
