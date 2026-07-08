import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, PanResponder, Platform, Pressable, Text, TextInput, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import Svg, { Path } from 'react-native-svg';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../components/Icon';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { getWorkOrder, getWorkOrderPrintHtml, updateWorkOrderStatus } from '../api/mobile';
import { IS_TEST_BUILD } from '../api/client';
import type { RootStackParamList } from '../navigation/types';

type Point = { x: number; y: number };

const PAD_WIDTH = 720;
const PAD_HEIGHT = 320;

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

type Step = 'tech' | 'document' | 'requester';

export function WorkOrderSignatureScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'WorkOrderSignature'>>();
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<Step>('tech');
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [saving, setSaving] = useState(false);
  const [padSize, setPadSize] = useState({ width: PAD_WIDTH, height: PAD_HEIGHT });

  // Dados coletados ao longo do assistente.
  const [techName, setTechName] = useState('');
  const [techSig, setTechSig] = useState<string | null>(null);
  const [reqName, setReqName] = useState(route.params.signerName || '');
  const [docType, setDocType] = useState<DocType | null>(null);
  const [docValue, setDocValue] = useState('');
  // Documento já cadastrado do solicitante (pula o passo de documento se houver).
  const existingDoc = useRef<{ document: string; documentType: DocType | null } | null>(null);

  const current = useRef<Point[]>([]);
  const padRef = useRef<View>(null);
  const padBox = useRef({ x: 0, y: 0, width: PAD_WIDTH, height: PAD_HEIGHT });

  useEffect(() => {
    void ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).catch(() => undefined);
    return () => { void ScreenOrientation.unlockAsync().catch(() => undefined); };
  }, []);

  // Carrega técnico responsável + documento existente do solicitante.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { workOrder, requesterDocument } = await getWorkOrder(token, route.params.id);
        if (!alive) return;
        setTechName(workOrder.responsibleTechnicianName || '');
        if (!route.params.signerName) setReqName(workOrder.requestedByName || '');
        if (requesterDocument?.document) {
          const dt = (requesterDocument.documentType as DocType | null) || null;
          existingDoc.current = { document: requesterDocument.document, documentType: dt };
        }
      } catch {
        // segue com defaults
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [token, route.params.id, route.params.signerName]);

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

  // Passo 1: técnico assina → salva a assinatura do técnico e avança.
  function advanceFromTech() {
    if (!techName.trim()) { Alert.alert('Assinatura', 'Informe o nome do técnico responsável.'); return; }
    if (strokes.flat().length < 8) { Alert.alert('Assinatura', 'O técnico precisa assinar no quadro.'); return; }
    setTechSig(svgDataUrl(strokes, padSize.width, padSize.height));
    setStrokes([]);
    // Se já há documento cadastrado, pula direto para a assinatura do solicitante.
    setStep(existingDoc.current ? 'requester' : 'document');
  }

  // Passo 2 (se necessário): documento do solicitante.
  function advanceFromDocument() {
    if (!docType) { Alert.alert('Documento', 'Selecione o tipo de documento.'); return; }
    if (docValue.trim().length < 3) { Alert.alert('Documento', 'Informe o documento do solicitante.'); return; }
    setStep('requester');
  }

  // Passo 3: solicitante assina → salva tudo.
  async function finish() {
    if (!reqName.trim()) { Alert.alert('Assinatura', 'Informe o nome do solicitante.'); return; }
    if (strokes.flat().length < 8) { Alert.alert('Assinatura', 'O solicitante precisa assinar no quadro.'); return; }
    setSaving(true);
    try {
      const typedNotes = (route.params.resolutionNotes || '').trim();
      const signatureNote = 'OS concluída com assinatura coletada no app.';
      const resolutionNotes = typedNotes ? `${typedNotes}\n\n${signatureNote}` : signatureNote;
      await updateWorkOrderStatus(token, route.params.id, route.params.status, {
        signatureDataUrl: svgDataUrl(strokes, padSize.width, padSize.height),
        signerName: reqName.trim(),
        resolutionNotes,
        ...(techSig ? { techSignatureDataUrl: techSig, techSignerName: techName.trim() } : {}),
        // Só envia documento novo se foi coletado agora (não havia cadastrado).
        ...(!existingDoc.current && docType && docValue.trim()
          ? { requesterDocument: docValue.trim(), requesterDocumentType: docType }
          : {}),
      });
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).catch(() => undefined);
      if (IS_TEST_BUILD) {
        try { await shareWorkOrderPdf(token, route.params.id); }
        catch (pdfErr) { Alert.alert('OS concluída', 'OS salva, mas não foi possível gerar/compartilhar o PDF.'); console.warn('Falha ao gerar/compartilhar PDF da OS:', pdfErr); }
      } else {
        Alert.alert('OS concluída', 'Assinaturas salvas e impressão solicitada ao Electron.');
      }
      nav.popToTop();
    } catch (e) {
      Alert.alert('Erro', e instanceof Error ? e.message : 'Não foi possível concluir a OS.');
    } finally {
      setSaving(false);
    }
  }

  const isSignStep = step === 'tech' || step === 'requester';
  const title = step === 'tech' ? 'Assinatura do técnico responsável'
    : step === 'document' ? 'Documento do solicitante'
    : 'Assinatura do solicitante';
  const docForSignature = existingDoc.current
    ? { value: existingDoc.current.document, type: existingDoc.current.documentType }
    : (docType ? { value: docValue, type: docType } : null);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#0F172A', padding: 16, gap: 12 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 }}>
        <Pressable onPress={() => nav.goBack()} style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(255,255,255,.12)', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="arrow-left" size={19} color="#fff" />
        </Pressable>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>{title}</Text>
        {isSignStep ? (
          <Pressable onPress={() => setStrokes([])} style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(255,255,255,.12)', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="refresh" size={18} color="#fff" />
          </Pressable>
        ) : <View style={{ width: 42 }} />}
      </View>

      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color="#fff" /></View>
      ) : step === 'document' ? (
        <View style={{ flex: 1, gap: 14, justifyContent: 'center' }}>
          <Text style={{ color: 'rgba(255,255,255,.7)', fontSize: 13 }}>
            Informe o documento do solicitante para constar na OS. CPF e RG saem mascarados; matrícula sai por completo.
          </Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {DOC_TYPES.map(dt => (
              <Pressable key={dt.key} onPress={() => setDocType(dt.key)}
                style={{ flex: 1, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: docType === dt.key ? T.primary : 'rgba(255,255,255,.12)' }}>
                <Text style={{ color: '#fff', fontWeight: '800' }}>{dt.label}</Text>
              </Pressable>
            ))}
          </View>
          <TextInput
            value={docValue} onChangeText={setDocValue}
            placeholder={docType === 'matricula' ? 'Número da matrícula' : docType === 'rg' ? 'Número do RG' : 'Número do CPF'}
            placeholderTextColor="rgba(255,255,255,.45)"
            keyboardType={docType === 'cpf' ? 'number-pad' : 'default'}
            style={{ height: 52, borderRadius: 12, paddingHorizontal: 14, backgroundColor: 'rgba(255,255,255,.12)', color: '#fff', fontSize: 16 }}
          />
        </View>
      ) : (
        <>
          <View ref={padRef} style={{ backgroundColor: '#fff', borderRadius: 12, flex: 1, overflow: 'hidden' }} onLayout={measurePad} {...pan.panHandlers}>
            <Svg width="100%" height="100%" viewBox={`0 0 ${padSize.width} ${padSize.height}`} preserveAspectRatio="none">
              {strokes.map((points, index) => <Path key={index} d={pointsToPath(points)} fill="none" stroke="#111827" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />)}
            </Svg>
          </View>
          {step === 'requester' && docForSignature?.value ? (
            <Text style={{ color: 'rgba(255,255,255,.85)', fontSize: 13, fontWeight: '700' }}>
              {(DOC_TYPES.find(d => d.key === docForSignature.type)?.label || 'Documento')}: {maskDoc(docForSignature.value, docForSignature.type)}
            </Text>
          ) : null}
          <TextInput
            value={step === 'tech' ? techName : reqName}
            onChangeText={step === 'tech' ? setTechName : setReqName}
            placeholder={step === 'tech' ? 'Nome do técnico responsável' : 'Nome do solicitante'}
            placeholderTextColor="rgba(255,255,255,.45)"
            style={{ height: 48, borderRadius: 12, paddingHorizontal: 14, backgroundColor: 'rgba(255,255,255,.12)', color: '#fff', fontSize: 15 }}
          />
        </>
      )}

      <Pressable
        onPress={step === 'tech' ? advanceFromTech : step === 'document' ? advanceFromDocument : finish}
        disabled={saving || loading}
        style={{ height: 52, borderRadius: 14, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, opacity: (saving || loading) ? 0.75 : 1 }}
      >
        {saving ? <ActivityIndicator color="#fff" /> : <Icon name={step === 'requester' ? 'check' : 'arrow-right'} size={18} color="#fff" />}
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '800' }}>
          {step === 'tech' ? 'Avançar — documento/solicitante' : step === 'document' ? 'Avançar — assinatura do solicitante' : 'Concluir e solicitar impressão'}
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
