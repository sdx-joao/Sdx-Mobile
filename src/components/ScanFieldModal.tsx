import { useRef, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { CameraView, useCameraPermissions, type BarcodeScanningResult, type BarcodeType } from 'expo-camera';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { Icon } from './Icon';
import { T } from '../theme/theme';

/**
 * Leitor de campo (SKU / nº de série) pela câmera. Dois caminhos:
 *
 * 1. CÓDIGO DE BARRAS — confiável. Etiqueta de fabricante quase sempre traz
 *    code128/datamatrix. Leu, preencheu, acabou.
 * 2. OCR (ML Kit, on-device) — para etiqueta sem código. É falível: confunde
 *    0/O, 1/I, 5/S, 8/B. Por isso NUNCA preenche direto — o técnico escolhe a
 *    linha lida e confere/edita antes de confirmar. Serial errado é pior que
 *    serial nenhum: vira patrimônio com identidade falsa.
 *
 * A imagem não sai do aparelho (ML Kit roda offline).
 */

/** Etiqueta de fabricante quase sempre é code128 ou datamatrix; os demais cobrem o resto. */
const BARCODE_TYPES: BarcodeType[] = ['qr', 'code128', 'code39', 'code93', 'codabar', 'ean13', 'ean8', 'upc_a', 'upc_e', 'itf14', 'datamatrix', 'pdf417'];

/** Linhas plausíveis para SKU/serial: alfanuméricas, 4–30 chars, com algum dígito. */
function candidatesFrom(raw: string): string[] {
  return Array.from(new Set(
    raw
      .split(/\r?\n/)
      .flatMap(line => line.split(/\s{2,}/))
      .map(s => s.trim())
      .filter(s => s.length >= 4 && s.length <= 30)
      .filter(s => /\d/.test(s))
      .filter(s => /^[A-Za-z0-9][A-Za-z0-9\-._/ ]*$/.test(s)),
  )).slice(0, 12);
}

export function ScanFieldModal({
  visible, title, onClose, onPick,
}: {
  visible: boolean;
  title: string;
  onClose: () => void;
  onPick: (value: string) => void;
}) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<string[] | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const locked = useRef(false);

  const reset = () => {
    locked.current = false;
    setCandidates(null);
    setConfirming(null);
    setError(null);
    setBusy(false);
  };

  const close = () => { reset(); onClose(); };
  const accept = (value: string) => {
    const clean = value.trim();
    if (!clean) return;
    onPick(clean);
    reset();
    onClose();
  };

  // Código de barras: confiável o bastante pra preencher direto.
  const onBarcode = ({ data }: BarcodeScanningResult) => {
    if (locked.current || candidates || confirming) return;
    const value = String(data || '').trim();
    if (!value) return;
    locked.current = true;
    accept(value);
  };

  // OCR: tira a foto, reconhece e OFERECE as linhas — nunca preenche sozinho.
  const readNumbers = async () => {
    if (busy || !cameraRef.current) return;
    setBusy(true);
    setError(null);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.9, skipProcessing: true });
      if (!photo?.uri) throw new Error('Falha ao capturar a imagem.');
      const result = await TextRecognition.recognize(photo.uri);
      const found = candidatesFrom(result?.text || '');
      if (!found.length) {
        setError('Nada legível. Aproxime a câmera da etiqueta, com boa luz e sem reflexo.');
        return;
      }
      setCandidates(found);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível ler os números.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={close}>
      <View style={{ flex: 1, backgroundColor: '#0A0E18' }}>
        {/* CÂMERA — só enquanto não há resultado na tela */}
        {!candidates && !confirming && permission?.granted && (
          <CameraView
            ref={cameraRef}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: BARCODE_TYPES }}
            onBarcodeScanned={onBarcode}
          />
        )}
        {!candidates && !confirming && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(8,11,20,.45)' }} />
        )}

        <View style={{ paddingTop: 52, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable onPress={close} style={{ width: 38, height: 38, borderRadius: 11, backgroundColor: 'rgba(255,255,255,.14)', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={19} color="#fff" />
          </Pressable>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>{title}</Text>
          <View style={{ width: 38 }} />
        </View>

        {/* 1) Câmera + ação de OCR */}
        {!candidates && !confirming && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, gap: 18 }}>
            <View style={{ width: '92%', height: 130, borderRadius: 12, borderWidth: 2, borderColor: T.primary }} />
            <Text style={{ color: 'rgba(255,255,255,.75)', fontSize: 13.5, textAlign: 'center', lineHeight: 20, maxWidth: 280 }}>
              Aponte para o <Text style={{ fontWeight: '700' }}>código de barras</Text> da etiqueta — preenche sozinho.
              Se a etiqueta não tiver código, toque abaixo para ler os números.
            </Text>
            {!!error && <Text style={{ color: '#FECACA', fontSize: 12.5, textAlign: 'center', maxWidth: 280 }}>{error}</Text>}
            {permission?.granted ? (
              <Pressable
                onPress={readNumbers}
                disabled={busy}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, backgroundColor: T.primary, opacity: busy ? 0.6 : 1 }}
              >
                {busy ? <ActivityIndicator color="#fff" size="small" /> : <Icon name="scan" size={17} color="#fff" />}
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>{busy ? 'Lendo…' : 'Ler números (sem código)'}</Text>
              </Pressable>
            ) : (
              <Pressable onPress={requestPermission} style={{ paddingVertical: 10, paddingHorizontal: 18, borderRadius: 12, backgroundColor: T.primary }}>
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>Permitir câmera</Text>
              </Pressable>
            )}
          </View>
        )}

        {/* 2) OCR leu — o técnico escolhe a linha certa (nunca adivinhamos) */}
        {candidates && !confirming && (
          <View style={{ flex: 1, backgroundColor: T.bg, marginTop: 12, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: T.text }}>Qual é o valor certo?</Text>
            <Text style={{ fontSize: 12, color: T.muted, marginTop: 4, marginBottom: 12 }}>
              A leitura pode confundir 0/O, 1/I e 5/S — confira antes de confirmar.
            </Text>
            <ScrollView contentContainerStyle={{ gap: 8 }}>
              {candidates.map((c, i) => (
                <Pressable
                  key={`${c}-${i}`}
                  onPress={() => setConfirming(c)}
                  style={{ borderWidth: 1, borderColor: T.border, borderRadius: 11, padding: 12 }}
                >
                  <Text style={{ fontSize: 15, fontWeight: '700', color: T.text, letterSpacing: 0.5 }}>{c}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable onPress={reset} style={{ marginTop: 12, alignItems: 'center', paddingVertical: 12 }}>
              <Text style={{ color: T.primary, fontWeight: '700', fontSize: 13.5 }}>Tentar de novo</Text>
            </Pressable>
          </View>
        )}

        {/* 3) Conferência — editável antes de aceitar */}
        {confirming !== null && (
          <View style={{ flex: 1, backgroundColor: T.bg, marginTop: 12, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: T.text }}>Confirme o valor</Text>
            <Text style={{ fontSize: 12, color: T.muted, marginTop: 4, marginBottom: 12 }}>
              Compare com a etiqueta. Pode corrigir aqui.
            </Text>
            <TextInput
              value={confirming}
              onChangeText={setConfirming}
              autoCapitalize="characters"
              autoCorrect={false}
              style={{
                borderWidth: 1, borderColor: T.primary, borderRadius: 11, paddingHorizontal: 12, paddingVertical: 12,
                fontSize: 17, fontWeight: '700', letterSpacing: 1, color: T.text, backgroundColor: T.surface,
              }}
            />
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
              <Pressable onPress={() => setConfirming(null)} style={{ flex: 1, alignItems: 'center', paddingVertical: 13, borderRadius: 11, borderWidth: 1, borderColor: T.border }}>
                <Text style={{ color: T.textSoft, fontWeight: '700', fontSize: 14 }}>Voltar</Text>
              </Pressable>
              <Pressable onPress={() => accept(confirming)} style={{ flex: 1, alignItems: 'center', paddingVertical: 13, borderRadius: 11, backgroundColor: T.primary }}>
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>Usar este valor</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}
