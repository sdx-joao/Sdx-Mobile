import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import { Icon } from './Icon';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import {
  confirmMachinePair,
  getDetectedMachines,
  requestMachinePairCode,
  resolveMachinePairToken,
  type DetectedMachine,
} from '../api/mobile';
import { parseMachinePairScan } from '../lib/label-scan';

/**
 * Vincular a máquina (SDX Nuntius) ao cadastro em andamento.
 *
 * A ETIQUETA continua sendo o gatilho do cadastro; isto aqui é um passo
 * opcional dentro dele, que traz série, marca, modelo, sistema e specs prontos.
 *
 * Dois caminhos, de propósito:
 *  • LISTA + CÓDIGO — escolhe a máquina, ela mostra um código na própria tela e
 *    o técnico compara. Funciona com monitor sujo, torto ou escuro, onde a
 *    câmera falha.
 *  • QR — aponta para o QR que já está na janela do agente. Mais rápido quando
 *    a janela está aberta.
 *
 * Em ambos, os dados só chegam APÓS a confirmação: antes disso conhecemos
 * apenas hostname e modelo, o suficiente para escolher na lista.
 */

type Step = 'choose' | 'list' | 'code' | 'scan';

export function MachineLinkModal({
  visible, onClose, onLinked,
}: {
  visible: boolean;
  onClose: () => void;
  onLinked: (machine: DetectedMachine) => void;
}) {
  const { token } = useAuth();
  const [step, setStep] = useState<Step>('choose');
  const [machines, setMachines] = useState<DetectedMachine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<DetectedMachine | null>(null);
  const [expectedCode, setExpectedCode] = useState<string | null>(null);
  const [typedCode, setTypedCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanLock, setScanLock] = useState(false);

  const reset = () => {
    setStep('choose'); setMachines([]); setError(null); setSelected(null);
    setExpectedCode(null); setTypedCode(''); setBusy(false); setScanLock(false);
  };

  const close = () => { reset(); onClose(); };

  useEffect(() => { if (!visible) reset(); }, [visible]);

  const loadMachines = async () => {
    setStep('list'); setLoading(true); setError(null);
    try {
      const res = await getDetectedMachines(token);
      setMachines(res.machines);
      if (!res.machines.length) {
        setError('Nenhuma máquina aguardando cadastro. Instale o SDX Nuntius nela primeiro.');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível carregar as máquinas.');
    } finally {
      setLoading(false);
    }
  };

  /** Pede que a máquina se identifique: a janela dela sobe com o código. */
  const askMachineToShow = async (machine: DetectedMachine) => {
    setSelected(machine); setBusy(true); setError(null);
    try {
      const res = await requestMachinePairCode(token, machine.id);
      setExpectedCode(res.code);
      setTypedCode('');
      setStep('code');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível falar com a máquina.');
      setStep('list');
    } finally {
      setBusy(false);
    }
  };

  const confirmCode = async () => {
    if (!selected) return;
    setBusy(true); setError(null);
    try {
      const res = await confirmMachinePair(token, selected.id, typedCode.trim().toUpperCase());
      onLinked(res.machine);
      close();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Código não confere.');
    } finally {
      setBusy(false);
    }
  };

  const onScan = async ({ data }: BarcodeScanningResult) => {
    if (scanLock || busy) return;
    const pairToken = parseMachinePairScan(String(data || ''));
    if (!pairToken) return;
    setScanLock(true); setBusy(true); setError(null);
    try {
      const res = await resolveMachinePairToken(token, pairToken);
      if (res.itemId) {
        setError('Esta máquina já é patrimônio.');
        setScanLock(false);
        return;
      }
      if (!res.canRegister) {
        setError('Sem permissão para vincular máquina.');
        setScanLock(false);
        return;
      }
      onLinked(res.machine);
      close();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'QR inválido ou expirado.');
      setScanLock(false);
    } finally {
      setBusy(false);
    }
  };

  const label = (m: DetectedMachine) =>
    [m.brand, m.model].filter(Boolean).join(' ') || m.hostname || 'MÁQUINA';

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={close}>
      <View style={{ flex: 1, backgroundColor: T.bg }}>
        <View style={{ paddingTop: 52, paddingHorizontal: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: T.border }}>
          <Pressable onPress={close} style={{ width: 38, height: 38, borderRadius: 11, backgroundColor: T.surfaceMuted, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={19} color={T.text} />
          </Pressable>
          <Text style={{ fontSize: 15, fontWeight: '700', color: T.text }}>Vincular máquina</Text>
          <View style={{ width: 38 }} />
        </View>

        {/* Câmera só na etapa de QR, para não consumir bateria à toa */}
        {step === 'scan' && permission?.granted && (
          <CameraView
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            onBarcodeScanned={onScan}
          />
        )}

        <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
          {!!error && (
            <View style={{ backgroundColor: `${T.danger}12`, borderWidth: 1, borderColor: `${T.danger}44`, borderRadius: 11, padding: 12 }}>
              <Text style={{ color: T.danger, fontSize: 13 }}>{error}</Text>
            </View>
          )}

          {/* 1) Escolha do caminho */}
          {step === 'choose' && (
            <>
              <Text style={{ fontSize: 13, color: T.textSoft, lineHeight: 20 }}>
                A máquina precisa ter o <Text style={{ fontWeight: '700' }}>SDX Nuntius</Text> instalado. Ela traz série,
                marca, modelo, sistema e componentes prontos — você só informa o local.
              </Text>

              <Pressable onPress={loadMachines} style={btn(T.primary)}>
                <Icon name="monitor" size={18} color="#fff" />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>Escolher da lista</Text>
                  <Text style={{ color: '#FFFFFFCC', fontSize: 11.5, marginTop: 2 }}>
                    A máquina mostra um código na tela para você conferir
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={async () => {
                  if (!permission?.granted) await requestPermission();
                  setError(null);
                  setStep('scan');
                }}
                style={btn(T.surface, T.border)}
              >
                <Icon name="scan" size={18} color={T.text} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: T.text, fontWeight: '700', fontSize: 14 }}>Escanear o QR da tela</Text>
                  <Text style={{ color: T.muted, fontSize: 11.5, marginTop: 2 }}>
                    Se a janela do SDX Nuntius já estiver aberta
                  </Text>
                </View>
              </Pressable>
            </>
          )}

          {/* 2) Lista de máquinas aguardando */}
          {step === 'list' && (
            <>
              {loading && <ActivityIndicator color={T.primary} style={{ marginTop: 24 }} />}
              {machines.map((m) => (
                <Pressable
                  key={m.id}
                  onPress={() => askMachineToShow(m)}
                  disabled={busy}
                  style={{ borderWidth: 1, borderColor: T.border, borderRadius: 12, padding: 13, backgroundColor: T.surface, flexDirection: 'row', alignItems: 'center', gap: 11 }}
                >
                  <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: m.online ? '#22C55E' : T.faint }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: T.text }}>{label(m)}</Text>
                    <Text style={{ fontSize: 11.5, color: T.muted, marginTop: 2 }}>
                      {m.hostname || 'sem nome'}{m.biosSerial ? ` · ${m.biosSerial}` : ''}
                      {m.online ? '' : ' · sem contato'}
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={17} color={T.faint} />
                </Pressable>
              ))}
              {!loading && (
                <Pressable onPress={() => setStep('choose')} style={{ alignItems: 'center', paddingVertical: 12 }}>
                  <Text style={{ color: T.primary, fontWeight: '700', fontSize: 13.5 }}>Voltar</Text>
                </Pressable>
              )}
            </>
          )}

          {/* 3) Confirmação pelo código exibido na tela do PC */}
          {step === 'code' && (
            <>
              <View style={{ backgroundColor: `${T.primary}0E`, borderWidth: 1, borderColor: `${T.primary}44`, borderRadius: 14, padding: 16 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: T.text }}>
                  Olhe a tela de {selected ? label(selected) : 'da máquina'}
                </Text>
                <Text style={{ fontSize: 12.5, color: T.textSoft, marginTop: 6, lineHeight: 19 }}>
                  A janela do SDX Nuntius vai abrir sozinha com um código, em alguns segundos.
                  Digite abaixo o código que aparecer lá.
                </Text>
              </View>

              <TextInput
                value={typedCode}
                onChangeText={(t) => setTypedCode(t.toUpperCase())}
                autoCapitalize="characters"
                autoCorrect={false}
                maxLength={6}
                placeholder="CÓDIGO"
                placeholderTextColor={T.faint}
                style={{
                  borderWidth: 1, borderColor: T.primary, borderRadius: 12, paddingVertical: 16,
                  fontSize: 30, fontWeight: '800', letterSpacing: 8, textAlign: 'center',
                  color: T.text, backgroundColor: T.surface,
                }}
              />

              <Pressable
                onPress={confirmCode}
                disabled={busy || typedCode.trim().length < 6}
                style={{ ...btn(T.primary), opacity: busy || typedCode.trim().length < 6 ? 0.5 : 1, justifyContent: 'center' }}
              >
                {busy ? <ActivityIndicator color="#fff" size="small" /> : <Icon name="check" size={17} color="#fff" strokeWidth={3} />}
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>Confirmar</Text>
              </Pressable>

              {/* O código do app fica visível para comparação nos dois sentidos. */}
              {!!expectedCode && (
                <Text style={{ fontSize: 11, color: T.faint, textAlign: 'center' }}>
                  Não apareceu? Confira se a máquina está ligada e tente de novo.
                </Text>
              )}
              <Pressable onPress={() => { setStep('list'); setError(null); }} style={{ alignItems: 'center', paddingVertical: 10 }}>
                <Text style={{ color: T.primary, fontWeight: '700', fontSize: 13.5 }}>Escolher outra máquina</Text>
              </Pressable>
            </>
          )}

          {/* 4) Leitura do QR */}
          {step === 'scan' && (
            <View style={{ marginTop: 120, alignItems: 'center', gap: 16 }}>
              <View style={{ width: 230, height: 230, borderRadius: 16, borderWidth: 3, borderColor: T.primary }} />
              <Text style={{ color: '#fff', fontSize: 13.5, textAlign: 'center', maxWidth: 290, lineHeight: 20, backgroundColor: '#0008', padding: 10, borderRadius: 10 }}>
                Aponte para o QR na janela do SDX Nuntius, na tela do computador.
              </Text>
              {busy && <ActivityIndicator color="#fff" />}
              <Pressable onPress={() => { setStep('choose'); setScanLock(false); }} style={{ paddingVertical: 12, paddingHorizontal: 22, borderRadius: 12, backgroundColor: '#FFFFFF22' }}>
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13.5 }}>Voltar</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

function btn(bg: string, border?: string) {
  return {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: bg,
    borderWidth: border ? 1 : 0,
    borderColor: border,
  };
}
