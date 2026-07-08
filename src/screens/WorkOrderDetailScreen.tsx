import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { useFocusEffect, useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../components/Icon';
import { Badge, DetailScaffold, EmptyState, LoadingState, SectionCard, StatItem } from '../components/ui';
import { T, WO_STATUS, WO_PRIORITY } from '../theme/theme';
import { fmtDate, fmtTime, type WorkOrderStatus } from '../data/mock';
import { useAuth } from '../auth/auth-context';
import {
  getWorkOrder,
  getWorkOrderAttachments,
  getWorkOrderPrintHtml,
  updateWorkOrderStatus,
  type WorkOrderAttachment,
  type WorkOrderAttachmentCategory,
} from '../api/mobile';
import { useResource } from '../api/use-resource';
import { API_BASE_URL } from '../api/client';
import type { RootStackParamList } from '../navigation/types';

const FLOW: WorkOrderStatus[] = ['open', 'in_progress', 'waiting', 'delivered', 'completed'];
const COMPLETION_PERIOD_OPTIONS = [
  { hours: 1, label: '1h' },
  { hours: 2, label: '2h' },
  { hours: 4, label: '4h' },
  { hours: 8, label: '8h' },
  { hours: 24, label: '24h' },
];
const ATTACHMENT_LABELS: Record<WorkOrderAttachmentCategory, string> = {
  before: 'Antes',
  after: 'Depois',
  document: 'Documento',
  general: 'Geral',
};
const DELEGATION_COLOR = '#6D28D9';

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 KB';
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function WorkOrderDetailScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'WorkOrderDetail'>>();
  const { token, user } = useAuth();
  const canDelegate = !!user?.capabilities?.canDelegateWorkOrders;
  const canUploadPhotos = user?.permissions?.canUploadWorkOrderPhotos !== false;
  const loader = useCallback(async () => {
    const [detail, attachments] = await Promise.all([
      getWorkOrder(token, route.params.id),
      getWorkOrderAttachments(token, route.params.id),
    ]);
    return { ...detail, attachments };
  }, [token, route.params.id]);
  const { data, loading, refreshing, error, reload } = useResource(loader, { reloadOnFocus: true });
  const wo = data?.workOrder;
  const timeline = data?.timeline;
  const attachments = data?.attachments ?? [];
  const [status, setStatus] = useState<WorkOrderStatus>(wo?.status ?? 'open');
  const [savingStatus, setSavingStatus] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [expectedCompletionHours, setExpectedCompletionHours] = useState(4);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (wo) setStatus(wo.status);
  }, [wo]);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  if (loading) {
    return (
      <DetailScaffold onBack={() => nav.goBack()} title="Carregando OS">
        <LoadingState />
      </DetailScaffold>
    );
  }

  if (error || !wo) {
    return (
      <DetailScaffold onBack={() => nav.goBack()} title="OS não encontrada">
        <EmptyState icon="clipboard" text={error || 'Esta ordem de serviço não existe mais.'} />
      </DetailScaffold>
    );
  }

  const st = WO_STATUS[status];
  const pr = WO_PRIORITY[wo.priority];
  const accent = T.primary;
  // OS finalizada é somente leitura: nenhum botão de ação fica clicável.
  const finished = wo.status === 'completed' || wo.status === 'delivered' || wo.status === 'cancelled';
  const cancelled = wo.status === 'cancelled';
  const isDelivery = /ENTREGA|COLETA|TRANSPORTE|RETIRADA/.test((wo.serviceType || '').toUpperCase());
  // Estágio na linha do tempo (Aberta • Em andamento • Concluída/Entregue).
  const currentStage = cancelled ? -1
    : (status === 'completed' || status === 'delivered') ? 2
    : status === 'in_progress' ? 1 : 0;

  // Gera o PDF da OS (mesmo layout da impressão de produção) e abre o
  // compartilhamento nativo. Usado nas OS finalizadas. A assinatura desenhada
  // não fica disponível aqui (é capturada no fluxo de finalização), então o
  // PDF sai sem a imagem da assinatura — o restante do conteúdo é idêntico.
  const shareOrderPdf = async () => {
    if (!wo || sharing) return;
    setSharing(true);
    try {
      // Molde ÚNICO: puxa o HTML canônico do servidor (mesmo builder da estação /
      // impressão de produção) — marca d'água, assinatura salva embutida e origem
      // já vêm prontas. Sem 2º layout local pra divergir.
      const html = await getWorkOrderPrintHtml(token, wo.id);
      const { uri } = await Print.printToFileAsync({ html });
      // printToFileAsync gera um nome temporário aleatório; renomeia para o
      // código da OS antes de compartilhar (o nome exibido = nome do arquivo).
      const safeName = (wo.code || 'ordem-servico').replace(/[^\w.-]+/g, '_');
      const dest = `${FileSystem.cacheDirectory}${safeName}.pdf`;
      let shareUri = uri;
      try {
        await FileSystem.deleteAsync(dest, { idempotent: true });
        await FileSystem.copyAsync({ from: uri, to: dest });
        shareUri = dest;
      } catch {
        // Se a cópia falhar por algum motivo, compartilha o arquivo original.
        shareUri = uri;
      }
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(shareUri, { mimeType: 'application/pdf', dialogTitle: `OS ${wo.code}`, UTI: 'com.adobe.pdf' });
      } else {
        Alert.alert('Compartilhar indisponível', 'Este dispositivo não suporta compartilhamento de arquivos.');
      }
    } catch (e) {
      Alert.alert('Erro ao gerar PDF', e instanceof Error ? e.message : 'Não foi possível gerar o PDF da OS.');
    } finally {
      setSharing(false);
    }
  };

  return (
    <DetailScaffold
      onBack={() => nav.goBack()}
      eyebrow={wo.code}
      title={wo.serviceType}
      badge={<Badge tone={st} badgeStyle="solid" />}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={reload} tintColor={T.primary} colors={[T.primary]} />}
      headerExtra={
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,.16)', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999 }}>
            <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: pr.color }} />
            <Text style={{ fontSize: 12.5, fontWeight: '600', color: '#fff' }}>Prioridade {pr.label}</Text>
          </View>
          <Text style={{ fontSize: 12.5, color: 'rgba(255,255,255,.75)' }}>{wo.category}</Text>
          <Pressable
            onPress={() => nav.navigate('WorkOrderEdit', { id: wo.id })}
            disabled={finished}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#fff',
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 999,
              opacity: finished ? 0.4 : 1,
            }}
          >
            <Icon name="sliders" size={13} color={T.primary} />
            <Text style={{ fontSize: 12.5, fontWeight: '700', color: T.primary }}>Editar</Text>
          </Pressable>
        </View>
      }
    >
      {/* OS finalizada: botão para gerar o PDF e compartilhar. */}
      {finished && (
        <Pressable
          onPress={shareOrderPdf}
          disabled={sharing}
          style={{
            marginBottom: 6,
            height: 48,
            borderRadius: 12,
            backgroundColor: T.primary,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            opacity: sharing ? 0.6 : 1,
          }}
        >
          {sharing ? <ActivityIndicator color="#fff" /> : <Icon name="send" size={16} color="#fff" />}
          <Text style={{ fontSize: 14, fontWeight: '800', color: '#fff' }}>
            {sharing ? 'Gerando PDF…' : 'Compartilhar OS (PDF)'}
          </Text>
        </Pressable>
      )}

      {/* Ação primária: concluir a OS (situação → solução → assinaturas). */}
      {!finished && (
        <Pressable
          onPress={() => nav.navigate('WorkOrderSignature', { id: wo.id })}
          style={{
            marginBottom: 12, height: 54, borderRadius: 14, backgroundColor: T.primary,
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9,
          }}
        >
          <Icon name="check-circle" size={19} color="#fff" />
          <Text style={{ fontSize: 15.5, fontWeight: '800', color: '#fff' }}>Concluir OS</Text>
        </Pressable>
      )}

      {/* Delegação: quem encaminhou a OS e o recado anexo. */}
      {wo.delegatedToName && (
        <View style={{
          marginBottom: 12, borderRadius: 14, borderWidth: 1,
          borderColor: `${DELEGATION_COLOR}44`, backgroundColor: `${DELEGATION_COLOR}0C`, padding: 14,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 8 }}>
            <Icon name="send" size={15} color={DELEGATION_COLOR} />
            <Text style={{ fontSize: 13, fontWeight: '800', color: DELEGATION_COLOR }}>Delegação</Text>
          </View>
          <Text style={{ fontSize: 13, color: T.text, lineHeight: 19 }}>
            Encaminhada para <Text style={{ fontWeight: '700' }}>{wo.delegatedToName}</Text>
            {wo.delegatedByName ? <Text> por <Text style={{ fontWeight: '700' }}>{wo.delegatedByName}</Text></Text> : null}
            {wo.delegatedAt ? <Text style={{ color: T.faint }}>{` · ${fmtDate(wo.delegatedAt)} ${fmtTime(wo.delegatedAt)}`}</Text> : null}
          </Text>
          {!!wo.delegationMessage && (
            <Text style={{
              marginTop: 9, fontSize: 13, color: T.textSoft, lineHeight: 20,
              backgroundColor: '#fff', borderRadius: 10, padding: 11, borderWidth: 1, borderColor: `${DELEGATION_COLOR}22`,
            }}>
              “{wo.delegationMessage}”
            </Text>
          )}
        </View>
      )}

      {/* Ação de delegar (só quem tem permissão e OS não finalizada). */}
      {!finished && canDelegate && (
        <Pressable
          onPress={() => nav.navigate('WorkOrderDelegate', { id: wo.id, code: wo.code })}
          style={{
            marginBottom: 12, height: 46, borderRadius: 12, borderWidth: 1, borderColor: DELEGATION_COLOR,
            backgroundColor: `${DELEGATION_COLOR}0E`, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <Icon name="send" size={16} color={DELEGATION_COLOR} />
          <Text style={{ fontSize: 14, fontWeight: '800', color: DELEGATION_COLOR }}>
            {wo.delegatedToName ? 'Redelegar OS' : 'Delegar OS'}
          </Text>
        </Pressable>
      )}

      {/* Andamento — linha do tempo read-only. Os status andam sozinhos; concluir
          é pelo botão "Concluir OS" acima. */}
      <SectionCard title="Andamento">
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
          {[{ k: 'open', l: 'Aberta' }, { k: 'in_progress', l: 'Em andamento' }, { k: 'done', l: isDelivery ? 'Entregue' : 'Concluída' }].map((s, i, arr) => {
            const done = i < currentStage;
            const active = i === currentStage;
            const on = done || active;
            const nodeColor = cancelled ? T.danger : on ? T.primary : T.border;
            return (
              <View key={s.k} style={{ flex: i < arr.length - 1 ? 1 : 0, flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ alignItems: 'center', width: 78 }}>
                  <View style={{ width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: on && !cancelled ? T.primary : T.surface, borderWidth: 1.5, borderColor: nodeColor }}>
                    {done && !cancelled ? <Icon name="check" size={13} color="#fff" /> : <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: active ? (cancelled ? T.danger : '#fff') : T.border }} />}
                  </View>
                  <Text style={{ fontSize: 10.5, fontWeight: '700', color: on ? T.text : T.muted, marginTop: 5, textAlign: 'center' }}>{s.l}</Text>
                </View>
                {i < arr.length - 1 && <View style={{ flex: 1, height: 2, backgroundColor: i < currentStage ? T.primary : T.border, marginTop: 12 }} />}
              </View>
            );
          })}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <View style={{ backgroundColor: st.soft, borderRadius: 999, paddingVertical: 4, paddingHorizontal: 11 }}>
            <Text style={{ fontSize: 12, fontWeight: '800', color: st.fg }}>{st.label}</Text>
          </View>
          <Text style={{ fontSize: 12, color: T.muted }}>Aberta {fmtDate(wo.openedAt)} · {fmtTime(wo.openedAt)}</Text>
          {finished && wo.finishedAt ? <Text style={{ fontSize: 12, color: T.muted }}>· Finalizada {fmtDate(wo.finishedAt)}</Text> : null}
        </View>
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
            disabled={finished}
            style={{
              marginTop: 2, height: 42, borderRadius: 11, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface,
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: finished ? 0.4 : 1,
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

      <SectionCard title={`Anexos (${attachments.length})`}>
        {/* Captura de fotos só pela tela de Edição — aqui os anexos são só
            leitura. Aponta o usuário pro fluxo de Editar. */}
        {!finished && canUploadPhotos && (
          <Pressable
            onPress={() => nav.navigate('WorkOrderEdit', { id: wo.id })}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: attachments.length ? 12 : 10 }}
          >
            <Icon name="camera" size={13} color={accent} />
            <Text style={{ fontSize: 12, color: accent, fontWeight: '700' }}>Toque em Editar para adicionar fotos</Text>
          </Pressable>
        )}
        {attachments.length === 0 ? (
          <Text style={{ fontSize: 12.5, color: T.muted }}>Nenhum anexo registrado.</Text>
        ) : (() => {
          const images = attachments.filter((a) => a.mimeType.startsWith('image/'));
          const docs = attachments.filter((a) => !a.mimeType.startsWith('image/'));
          const imgHeaders = token ? { Authorization: `Bearer ${token}` } : undefined;
          return (
            <>
              {/* Fotos: grade de miniaturas — toque abre o visualizador em tela cheia */}
              {images.length > 0 && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: docs.length ? 12 : 0 }}>
                  {images.map((att) => (
                    <Pressable
                      key={att.id}
                      onPress={() => nav.navigate('WorkOrderPhotoViewer', { id: wo.id, startId: att.id })}
                      style={{ width: 76, height: 76, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: T.border, backgroundColor: T.surfaceMuted }}
                    >
                      <Image
                        source={{ uri: `${API_BASE_URL}${att.url}`, headers: imgHeaders }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    </Pressable>
                  ))}
                </View>
              )}
              {/* Documentos (não-imagem): linhas */}
              {docs.length > 0 && (
                <View style={{ gap: 9 }}>
                  {docs.map((attachment) => (
                    <View
                      key={attachment.id}
                      style={{ flexDirection: 'row', gap: 10, borderWidth: 1, borderColor: T.border, borderRadius: 12, padding: 10, backgroundColor: T.surfaceMuted }}
                    >
                      <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="download" size={16} color={T.primary} />
                      </View>
                      <View style={{ flex: 1, minWidth: 0 }}>
                        <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: '700', color: T.text }}>
                          {attachment.originalFileName || `Anexo ${attachment.id}`}
                        </Text>
                        <Text style={{ marginTop: 2, fontSize: 11.5, color: T.muted }}>
                          {ATTACHMENT_LABELS[attachment.category] || attachment.category} · {formatBytes(attachment.fileSize)}
                        </Text>
                        {!!attachment.comment && (
                          <Text numberOfLines={2} style={{ marginTop: 4, fontSize: 12, color: T.textSoft }}>{attachment.comment}</Text>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </>
          );
        })()}
      </SectionCard>

      {timeline && timeline.length > 0 && (
        <SectionCard title="Histórico">
          {timeline.map((ev, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 11 }}>
              <View style={{ alignItems: 'center' }}>
                <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: WO_STATUS[ev.tone].solid, marginTop: 4 }} />
                {i < timeline.length - 1 && <View style={{ width: 2, flex: 1, backgroundColor: T.border, marginVertical: 2 }} />}
              </View>
              <View style={{ flex: 1, paddingBottom: i < timeline.length - 1 ? 14 : 0 }}>
                {!!ev.title && (
                  <Text style={{ fontSize: 13.5, color: T.text, fontWeight: '800' }}>{ev.title}</Text>
                )}
                <Text style={{ fontSize: 13, color: T.textSoft, marginTop: ev.title ? 1 : 0 }}>{ev.label}</Text>
                <Text style={{ fontSize: 11.5, color: T.faint, marginTop: 2 }}>{ev.at} · {ev.by}</Text>
              </View>
            </View>
          ))}
        </SectionCard>
      )}
    </DetailScaffold>
  );
}
