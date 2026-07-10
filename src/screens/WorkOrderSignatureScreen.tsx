import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, PanResponder, Platform, Pressable, Text, TextInput, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as NavigationBar from 'expo-navigation-bar';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import Svg, { Path, Line } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../components/Icon';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { getWorkOrder, getWorkOrderPrintHtml, updateWorkOrderStatus } from '../api/mobile';
import { IS_TEST_BUILD } from '../api/client';
import { showToast } from '../lib/toast';
import type { RootStackParamList } from '../navigation/types';

type Point = { x: number; y: number };

const PAD_WIDTH = 720;
const PAD_HEIGHT = 320;
// 1,5 cm em dp (160 dp = 1 pol = 2,54 cm) — posição da linha-guia acima do fundo.
const BASELINE_FROM_BOTTOM = 1.5 * (160 / 2.54);

function pointsToPath(points: Point[]) {
  if (points.length < 2) return '';
  return points.map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
}

function svgDataUrl(strokes: Point[][], width: number, height: number) {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  const paths = strokes
    .map(pointsToPath)
    .filter(Boolean)
    .map(path => `<path d="${path}" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="white"/>${paths}</svg>`;
  return `data:image/svg+xml;base64,${asciiBase64(svg)}`;
}

function asciiBase64(value: string) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  let index = 0;
  while (index < value.length) {
    const c1 = value.charCodeAt(index++);
    const c2 = value.charCodeAt(index++);
    const c3 = value.charCodeAt(index++);
    output += chars.charAt(c1 >> 2);
    output += chars.charAt(((c1 & 3) << 4) | (c2 >> 4));
    output += Number.isNaN(c2) ? '=' : chars.charAt(((c2 & 15) << 2) | (c3 >> 6));
    output += Number.isNaN(c3) ? '=' : chars.charAt(c3 & 63);
  }
  return output;
}

// SVG da assinatura (markup cru, embutido direto no HTML do PDF).
function svgMarkup(strokes: Point[][], width: number, height: number) {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  const paths = strokes
    .map(pointsToPath)
    .filter(Boolean)
    .map(path => `<path d="${path}" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${paths}</svg>`;
}

// Gera um PDF da OS (molde ÚNICO, vindo do servidor) e abre o compartilhamento —
// usado no build de teste. A assinatura já foi salva no servidor antes daqui, então
// o HTML canônico já vem com a assinatura embutida.
async function shareWorkOrderPdf(token: string | null, id: string) {
  const { workOrder: wo } = await getWorkOrder(token, id);
  const html = await getWorkOrderPrintHtml(token, id);
  const { uri } = await Print.printToFileAsync({ html });
  // Renomeia para o código da OS antes de compartilhar (nome exibido = arquivo).
  const safeName = (wo.code || 'ordem-servico').replace(/[^\w.-]+/g, '_');
  const dest = `${FileSystem.cacheDirectory}${safeName}.pdf`;
  let shareUri = uri;
  try {
    await FileSystem.deleteAsync(dest, { idempotent: true });
    await FileSystem.copyAsync({ from: uri, to: dest });
    shareUri = dest;
  } catch {
    shareUri = uri;
  }
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(shareUri, { mimeType: 'application/pdf', dialogTitle: `OS ${wo.code}`, UTI: 'com.adobe.pdf' });
  }
}

type DocType = 'cpf' | 'rg' | 'matricula';
const DOC_TYPES: Array<{ key: DocType; label: string }> = [
  { key: 'cpf', label: 'CPF' }, { key: 'rg', label: 'RG' }, { key: 'matricula', label: 'Matrícula' },
];

// Mascara para exibição na tela (espelha o backend): CPF/RG mascarados, matrícula inteira.
function maskDoc(value: string, type: DocType | null): string {
  const raw = value.trim();
  if (!raw || type === 'matricula') return raw;
  const chars = raw.split('');
  const alnum = chars.map((c, i) => (/[0-9A-Za-z]/.test(c) ? i : -1)).filter(i => i >= 0);
  const reveal = new Set(alnum.slice(alnum.length - Math.min(2, alnum.length)));
  return chars.map((c, i) => (/[0-9A-Za-z]/.test(c) ? (reveal.has(i) ? c : '•') : c)).join('');
}

type Step = 'resolution' | 'tech' | 'document' | 'requester' | 'review';
type Resolution = 'resolved' | 'partial' | 'unresolved';
const RESOLUTIONS: Array<{ key: Resolution; label: string; color: string }> = [
  { key: 'resolved', label: 'Resolvida', color: '#059669' },
  { key: 'partial', label: 'Parcial', color: '#D97706' },
  { key: 'unresolved', label: 'Não resolvida', color: '#DC2626' },
];

function fmtNow(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

export function WorkOrderSignatureScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'WorkOrderSignature'>>();
  const { token, user } = useAuth();
  const insets = useSafeAreaInsets();
  // Documento do técnico = CPF do cadastro dele (usuário logado), mascarado.
  const techCpfDigits = String(user?.cpf ?? '').replace(/\D/g, '');
  const techDocMasked = techCpfDigits ? maskDoc(techCpfDigits, 'cpf') : '';

  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<Step>('resolution');
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [saving, setSaving] = useState(false);
  const [padSize, setPadSize] = useState({ width: PAD_WIDTH, height: PAD_HEIGHT });

  // Dados coletados ao longo do assistente.
  const [resolution, setResolution] = useState<Resolution>('resolved');
  const [solution, setSolution] = useState('');
  const [code, setCode] = useState('');
  const [techName, setTechName] = useState(user?.name || '');
  const [techSig, setTechSig] = useState<string | null>(null);
  const [reqName, setReqName] = useState('');
  const [reqSig, setReqSig] = useState<string | null>(null);
  const [docType, setDocType] = useState<DocType | null>(null);
  const [docValue, setDocValue] = useState('');
  const existingDoc = useRef<{ document: string; documentType: DocType | null } | null>(null);
  const isDelivery = useRef(false);
  const finishedAt = useRef(new Date().toISOString());

  const current = useRef<Point[]>([]);
  const padRef = useRef<View>(null);
  const padBox = useRef({ x: 0, y: 0, width: PAD_WIDTH, height: PAD_HEIGHT });

  // Só os passos de ASSINATURA vão para paisagem (mais espaço pra assinar). Os
  // campos pré-assinatura (situação, documento, revisão) ficam na vertical.
  useEffect(() => {
    const signing = step === 'tech' || step === 'requester';
    void ScreenOrientation.lockAsync(
      signing ? ScreenOrientation.OrientationLock.LANDSCAPE : ScreenOrientation.OrientationLock.PORTRAIT_UP,
    ).catch(() => undefined);
  }, [step]);
  useEffect(() => () => { void ScreenOrientation.unlockAsync().catch(() => undefined); }, []);

  // Nos passos de ASSINAR, some com a barra de navegação do Android (imersivo) —
  // libera a tela toda pro quadro e evita toque acidental nos botões do celular.
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const signing = step === 'tech' || step === 'requester';
    (async () => {
      try {
        await NavigationBar.setBehaviorAsync('overlay-swipe');
        await NavigationBar.setVisibilityAsync(signing ? 'hidden' : 'visible');
      } catch { /* noop */ }
    })();
  }, [step]);
  useEffect(() => () => { if (Platform.OS === 'android') void NavigationBar.setVisibilityAsync('visible').catch(() => undefined); }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { workOrder, requesterDocument } = await getWorkOrder(token, route.params.id);
        if (!alive) return;
        setCode(workOrder.code || '');
        // O técnico responsável pela conclusão é SEMPRE o dono do celular que está
        // colhendo a assinatura (não o responsável salvo na OS — que pode ser quem
        // delegou). O backend também grava o concluinte como responsável.
        setReqName(workOrder.requestedByName || '');
        isDelivery.current = /ENTREGA|COLETA|TRANSPORTE|RETIRADA/.test((workOrder.serviceType || '').toUpperCase());
        if (requesterDocument?.document) {
          const dt = (requesterDocument.documentType as DocType | null) || null;
          existingDoc.current = { document: requesterDocument.document, documentType: dt };
        }
      } catch { /* segue com defaults */ }
      finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, [token, route.params.id]);

  const measurePad = () => {
    padRef.current?.measureInWindow((x, y, width, height) => {
      if (width > 0 && height > 0) { padBox.current = { x, y, width, height }; setPadSize({ width, height }); }
    });
  };
  const toLocal = (pageX: number, pageY: number): Point => {
    const { x, y, width, height } = padBox.current;
    return { x: Math.max(0, Math.min(width, pageX - x)), y: Math.max(0, Math.min(height, pageY - y)) };
  };
  const pan = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const { pageX, pageY } = event.nativeEvent;
      current.current = [toLocal(pageX, pageY)];
      setStrokes(prev => [...prev, current.current]);
    },
    onPanResponderMove: (event) => {
      const { pageX, pageY } = event.nativeEvent;
      current.current = [...current.current, toLocal(pageX, pageY)];
      setStrokes(prev => [...prev.slice(0, -1), current.current]);
    },
  }), []);

  const docForSignature = existingDoc.current
    ? { value: existingDoc.current.document, type: existingDoc.current.documentType }
    : (docType ? { value: docValue, type: docType } : null);

  // Passo 0: situação + solução adotada.
  function advanceFromResolution() {
    if (!solution.trim()) { Alert.alert('Solução adotada', 'Descreva a solução adotada.'); return; }
    setStep('tech');
  }
  // Passo 1: técnico assina.
  function advanceFromTech() {
    if (!techName.trim()) { Alert.alert('Assinatura', 'Informe o nome do técnico responsável.'); return; }
    if (strokes.flat().length < 8) { Alert.alert('Assinatura', 'O técnico precisa assinar no quadro.'); return; }
    setTechSig(svgDataUrl(strokes, padSize.width, padSize.height));
    setStrokes([]);
    setStep(existingDoc.current ? 'requester' : 'document');
  }
  // Passo 2 (se necessário): documento do solicitante.
  function advanceFromDocument() {
    if (!docType) { Alert.alert('Documento', 'Selecione o tipo de documento.'); return; }
    if (docValue.trim().length < 3) { Alert.alert('Documento', 'Informe o documento do solicitante.'); return; }
    setStep('requester');
  }
  // Passo 3: solicitante assina → vai para a revisão.
  function advanceFromRequester() {
    if (!reqName.trim()) { Alert.alert('Assinatura', 'Informe o nome do solicitante.'); return; }
    if (strokes.flat().length < 8) { Alert.alert('Assinatura', 'O solicitante precisa assinar no quadro.'); return; }
    setReqSig(svgDataUrl(strokes, padSize.width, padSize.height));
    setStrokes([]);
    setStep('review');
  }

  // Passo 4: revisão → confirma e conclui (irreversível).
  async function finish() {
    if (!reqSig) { setStep('requester'); return; }
    setSaving(true);
    try {
      const finalStatus = isDelivery.current ? 'delivered' : 'completed';
      await updateWorkOrderStatus(token, route.params.id, finalStatus, {
        signatureDataUrl: reqSig,
        signerName: reqName.trim(),
        resolutionStatus: resolution,
        resolutionNotes: solution.trim(),
        finishedAt: finishedAt.current,
        ...(techSig ? { techSignatureDataUrl: techSig, techSignerName: techName.trim() } : {}),
        ...(!existingDoc.current && docType && docValue.trim()
          ? { requesterDocument: docValue.trim(), requesterDocumentType: docType }
          : {}),
      });
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).catch(() => undefined);
      if (IS_TEST_BUILD) {
        try { await shareWorkOrderPdf(token, route.params.id); }
        catch (pdfErr) { showToast('OS salva, mas não foi possível gerar o PDF.'); console.warn('Falha ao gerar/compartilhar PDF da OS:', pdfErr); }
      } else {
        showToast(`${code || 'OS'} concluída — impressão solicitada.`);
      }
      nav.popToTop();
    } catch (e) {
      Alert.alert('Erro', e instanceof Error ? e.message : 'Não foi possível concluir a OS.');
    } finally {
      setSaving(false);
    }
  }

  const isSignStep = step === 'tech' || step === 'requester';
  const title = step === 'resolution' ? 'Situação e solução'
    : step === 'tech' ? 'Assinatura do técnico'
    : step === 'document' ? 'Documento do solicitante'
    : step === 'requester' ? 'Assinatura do solicitante'
    : 'Revisar e concluir';
  const primaryLabel = step === 'resolution' ? 'Avançar — assinatura do técnico'
    : step === 'tech' ? 'Avançar'
    : step === 'document' ? 'Avançar — assinatura'
    : step === 'requester' ? 'Avançar — revisão'
    : 'Confirmar e concluir OS';
  const onPrimary = step === 'resolution' ? advanceFromResolution
    : step === 'tech' ? advanceFromTech
    : step === 'document' ? advanceFromDocument
    : step === 'requester' ? advanceFromRequester
    : finish;

  // Tema claro e minimalista (pouca área escura).
  const BG = '#F1F5F9', CARD = '#FFFFFF', BORDER = '#E2E8F0';
  const TXT = '#0F172A', MUTED = '#64748B', SUBTLE = '#94A3B8';
  const signDoc = step === 'tech'
    ? (techDocMasked ? `CPF ${techDocMasked}` : '')
    : (docForSignature?.value ? `${DOC_TYPES.find(d => d.key === docForSignature.type)?.label || 'Doc'} ${maskDoc(docForSignature.value, docForSignature.type)}` : '');

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: BG, paddingHorizontal: 14, paddingTop: insets.top + 6, paddingBottom: 12 + insets.bottom, gap: 10 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Cabeçalho enxuto */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Pressable onPress={() => nav.goBack()} hitSlop={8} style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="arrow-left" size={18} color={MUTED} />
        </Pressable>
        <Text style={{ color: TXT, fontSize: 15, fontWeight: '800', flex: 1 }}>{title}</Text>
        {!!code && <Text style={{ color: SUBTLE, fontSize: 12, fontWeight: '700' }}>{code}</Text>}
      </View>

      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color={T.primary} /></View>
      ) : step === 'resolution' ? (
        <View style={{ flex: 1, gap: 12, justifyContent: 'center' }}>
          <Text style={{ color: MUTED, fontSize: 13, fontWeight: '600' }}>Como a OS foi concluída?</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {RESOLUTIONS.map(r => (
              <Pressable key={r.key} onPress={() => setResolution(r.key)}
                style={{ flex: 1, height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: resolution === r.key ? r.color : BORDER, backgroundColor: resolution === r.key ? `${r.color}18` : CARD }}>
                <Text style={{ color: resolution === r.key ? r.color : MUTED, fontWeight: '800', fontSize: 12.5 }}>{r.label}</Text>
              </Pressable>
            ))}
          </View>
          <TextInput
            value={solution} onChangeText={setSolution} multiline
            placeholder="Solução adotada / o que foi feito" placeholderTextColor={SUBTLE}
            style={{ minHeight: 100, borderRadius: 12, padding: 14, backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, color: TXT, fontSize: 15, textAlignVertical: 'top' }}
          />
          <Text style={{ color: SUBTLE, fontSize: 12 }}>Hora final: {fmtNow(finishedAt.current)} (agora)</Text>
        </View>
      ) : step === 'document' ? (
        <View style={{ flex: 1, gap: 14, justifyContent: 'center' }}>
          <Text style={{ color: MUTED, fontSize: 13 }}>
            Documento do solicitante para constar na OS. CPF e RG saem mascarados; matrícula por completo.
          </Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {DOC_TYPES.map(dt => (
              <Pressable key={dt.key} onPress={() => setDocType(dt.key)}
                style={{ flex: 1, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: docType === dt.key ? T.primary : BORDER, backgroundColor: docType === dt.key ? `${T.primary}14` : CARD }}>
                <Text style={{ color: docType === dt.key ? T.primary : MUTED, fontWeight: '800' }}>{dt.label}</Text>
              </Pressable>
            ))}
          </View>
          <TextInput
            value={docValue} onChangeText={setDocValue}
            placeholder={docType === 'matricula' ? 'Número da matrícula' : docType === 'rg' ? 'Número do RG' : 'Número do CPF'}
            placeholderTextColor={SUBTLE}
            keyboardType={docType === 'cpf' ? 'number-pad' : 'default'}
            style={{ height: 52, borderRadius: 12, paddingHorizontal: 14, backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, color: TXT, fontSize: 16 }}
          />
        </View>
      ) : step === 'review' ? (
        <View style={{ flex: 1, gap: 8, justifyContent: 'center' }}>
          {[
            ['Situação', RESOLUTIONS.find(r => r.key === resolution)?.label || '—'],
            ['Solução', solution.trim() || '—'],
            ['Técnico', `${techName || '—'}${techSig ? '  ✓' : ''}`],
            ['Solicitante', `${reqName || '—'}${reqSig ? '  ✓' : ''}`],
            ['Documento', docForSignature?.value ? `${DOC_TYPES.find(d => d.key === docForSignature.type)?.label || 'Doc'} ${maskDoc(docForSignature.value, docForSignature.type)}` : '—'],
            ['Hora final', fmtNow(finishedAt.current)],
          ].map(([label, value]) => (
            <View key={label} style={{ flexDirection: 'row', gap: 10, paddingVertical: 3 }}>
              <Text style={{ width: 96, color: SUBTLE, fontSize: 13, fontWeight: '700' }}>{label}</Text>
              <Text style={{ flex: 1, color: TXT, fontSize: 13.5, fontWeight: '600' }}>{value}</Text>
            </View>
          ))}
          <Text style={{ color: SUBTLE, fontSize: 12, marginTop: 4 }}>Confira antes de concluir — a OS será fechada e não poderá mais ser editada.</Text>
        </View>
      ) : (
        // ── Passos de ASSINAR: quadro gigante, dados sutis ──
        <>
          <View style={{ flex: 1, position: 'relative' }}>
            <View ref={padRef} style={{ backgroundColor: CARD, borderRadius: 16, borderWidth: 1, borderColor: BORDER, flex: 1, overflow: 'hidden' }} onLayout={measurePad} {...pan.panHandlers}>
              <Svg width="100%" height="100%" viewBox={`0 0 ${padSize.width} ${padSize.height}`} preserveAspectRatio="none">
                {/* Linha-guia (baseline) 1,5 cm acima do fundo — orienta a assinatura. */}
                {padSize.height > BASELINE_FROM_BOTTOM + 16 && (
                  <Line
                    x1={16} y1={padSize.height - BASELINE_FROM_BOTTOM}
                    x2={padSize.width - 16} y2={padSize.height - BASELINE_FROM_BOTTOM}
                    stroke="#CBD5E1" strokeWidth={1.5} strokeDasharray="8 6"
                  />
                )}
                {strokes.map((points, index) => <Path key={index} d={pointsToPath(points)} fill="none" stroke="#0F172A" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />)}
              </Svg>
            </View>
            {/* Dica central bem sutil, some ao começar a assinar. */}
            {strokes.flat().length < 2 && (
              <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#CBD5E1', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 }}>Assine no quadro</Text>
              </View>
            )}
            {/* Limpar — FORA da View do PanResponder (senão o pad engole o toque). */}
            <Pressable
              onPress={() => setStrokes([])}
              hitSlop={12}
              style={{ position: 'absolute', top: 10, right: 10, flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: BORDER, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 12 }}
            >
              <Icon name="refresh" size={13} color={MUTED} />
              <Text style={{ color: MUTED, fontSize: 12, fontWeight: '700' }}>Limpar</Text>
            </Pressable>
          </View>
          {/* Dados sutis: nome (linha discreta) + documento minúsculo */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <TextInput
                value={step === 'tech' ? techName : reqName}
                onChangeText={step === 'tech' ? setTechName : setReqName}
                placeholder={step === 'tech' ? 'Nome do técnico' : 'Nome do solicitante'}
                placeholderTextColor={SUBTLE}
                style={{ height: 40, borderBottomWidth: 1, borderBottomColor: BORDER, color: TXT, fontSize: 14, fontWeight: '600', paddingHorizontal: 2 }}
              />
            </View>
            {!!signDoc && <Text style={{ color: SUBTLE, fontSize: 12, fontWeight: '700' }}>{signDoc}</Text>}
          </View>
        </>
      )}

      <Pressable
        onPress={onPrimary}
        disabled={saving || loading}
        style={{ height: 50, borderRadius: 14, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, opacity: (saving || loading) ? 0.75 : 1 }}
      >
        {saving ? <ActivityIndicator color="#fff" /> : <Icon name={step === 'review' ? 'check' : 'arrow-right'} size={18} color="#fff" />}
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '800' }}>{primaryLabel}</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
