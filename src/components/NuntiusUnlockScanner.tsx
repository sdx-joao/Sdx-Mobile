import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, Text, View } from 'react-native';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import { Icon } from './Icon';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { unlockNuntiusMachine } from '../api/mobile';
import { parseMachineUnlockScan } from '../lib/label-scan';
import { authenticateBiometric, biometricLabel, isBiometricAvailable } from '../auth/biometrics';

/**
 * FAB de QR do Servus (§6.2) — hoje só destranca a janela do Nuntius.
 *
 * Ordem deliberada: câmera → biometria → servidor.
 *
 * 1) A câmera fica no primeiro plano porque é a razão de o técnico ter aberto.
 * 2) A biometria vem DEPOIS de reconhecer o QR: pedir digital para depois
 *    descobrir que era um QR errado seria atritar à toa. Ela ainda vem ANTES da
 *    chamada de rede — é o gate que prova quem está com o celular na mão, e
 *    "destranquei uma tela e depois vi que era outra máquina" precisa ser
 *    impossível.
 * 3) O servidor confere a permissão do usuário. Biometria e permissão são coisas
 *    diferentes: celular desbloqueado de um usuário sem canManageInventory não
 *    pode abrir tela de máquina nenhuma.
 */
export function NuntiusUnlockScanner({
  visible, onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { token } = useAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const [busy, setBusy] = useState(false);
  const [scanLock, setScanLock] = useState(false);
  const [status, setStatus] = useState<{ kind: 'idle' | 'ok' | 'err'; text: string }>({ kind: 'idle', text: '' });
  const [bioLabel, setBioLabel] = useState('biometria');

  useEffect(() => {
    if (visible) {
      setStatus({ kind: 'idle', text: '' });
      setScanLock(false);
      setBusy(false);
      biometricLabel().then(setBioLabel);
    }
  }, [visible]);

  const onScan = async ({ data }: BarcodeScanningResult) => {
    if (scanLock || busy) return;
    const unlockToken = parseMachineUnlockScan(String(data || ''));
    if (!unlockToken) return; // provavelmente é outro tipo de QR — ignora sem reclamar
    setScanLock(true);
    setBusy(true);

    // Biometria antes do servidor: sem ela, quem quer que estivesse com o
    // celular na mão destrancaria a tela ao mirar um QR alheio.
    if (await isBiometricAvailable()) {
      const ok = await authenticateBiometric('Confirme para desbloquear a tela');
      if (!ok) {
        setStatus({ kind: 'err', text: 'Autenticação cancelada.' });
        setBusy(false);
        setScanLock(false);
        return;
      }
    }

    try {
      const res = await unlockNuntiusMachine(token, unlockToken);
      const nome = res.machine.hostname
        || [res.machine.brand, res.machine.model].filter(Boolean).join(' ')
        || 'a máquina';
      setStatus({ kind: 'ok', text: `Desbloqueada: ${nome}` });
      // Deixa 1s na tela para o técnico ver de qual máquina foi, depois fecha.
      setTimeout(() => { onClose(); }, 1000);
    } catch (err) {
      setStatus({ kind: 'err', text: err instanceof Error ? err.message : 'Falha ao desbloquear.' });
      setBusy(false);
      // 2s de trava evitam refire com o mesmo frame; depois pode tentar de novo.
      setTimeout(() => setScanLock(false), 2000);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        {permission?.granted ? (
          <CameraView
            style={{ flex: 1 }}
            facing="back"
            onBarcodeScanned={onScan}
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 14 }}>
            <Icon name="camera" size={40} color="#fff" />
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 15 }}>
              Precisamos da câmera para ler o código de desbloqueio.
            </Text>
            <Pressable
              onPress={requestPermission}
              style={{ backgroundColor: T.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10 }}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>Liberar câmera</Text>
            </Pressable>
          </View>
        )}

        <View style={{ position: 'absolute', top: 48, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#0009', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 }}>
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>Desbloquear a tela do PC</Text>
          </View>
          <Pressable onPress={onClose} hitSlop={12} style={{ backgroundColor: '#0009', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={18} color="#fff" />
          </Pressable>
        </View>

        <View style={{ position: 'absolute', bottom: 48, left: 20, right: 20, gap: 10 }}>
          <View style={{ backgroundColor: '#0009', padding: 12, borderRadius: 12 }}>
            <Text style={{ color: '#fff', fontSize: 12.5, lineHeight: 18 }}>
              Aponte para o QR do SDX Nuntius. Vamos pedir sua {bioLabel} antes de destrancar.
            </Text>
          </View>
          {status.kind !== 'idle' && (
            <View style={{ backgroundColor: status.kind === 'ok' ? '#22C55Ecc' : '#DC2626cc', padding: 12, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 9 }}>
              {busy ? <ActivityIndicator color="#fff" /> : <Icon name={status.kind === 'ok' ? 'check' : 'x'} size={16} color="#fff" />}
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13.5, flex: 1 }}>{status.text}</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

/**
 * Botão flutuante no canto inferior direito. Só quem tem canManageInventory
 * vê — para os demais o botão seria uma porta permanentemente fechada, o que é
 * pior que não existir.
 */
export function NuntiusUnlockFab() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const canUnlock = user?.role === 'SuperAdministrador' || user?.permissions?.canManageInventory === true;
  if (!canUnlock) return null;

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        // bottom leva em conta a altura do TabBar; à direita fica um pouco
        // acima da margem para não brigar com a lista rolando por baixo.
        style={{
          position: 'absolute',
          right: 18,
          bottom: 96,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: T.primary,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 6,
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
        }}
        accessibilityLabel="Ler QR de desbloqueio"
      >
        <Icon name="maximize" size={22} color="#fff" />
      </Pressable>
      <NuntiusUnlockScanner visible={open} onClose={() => setOpen(false)} />
    </>
  );
}
