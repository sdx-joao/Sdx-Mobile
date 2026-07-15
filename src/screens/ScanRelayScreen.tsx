import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../components/Icon';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { postWorkOrderScanHit } from '../api/mobile';
import { parseLabelScan, isLabelCode } from '../lib/label-scan';
import type { RootStackParamList } from '../navigation/types';

type Hit = { code: string; name: string; ok: boolean; at: number };

/**
 * Modo "celular como scanner" (relay): o web abre uma sessão e mostra um QR; o
 * técnico escaneia esse QR pra chegar aqui e então escaneia as etiquetas dos
 * equipamentos em sequência — cada leitura aparece ao vivo na OS aberta no web.
 */
export function ScanRelayScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ScanRelay'>>();
  const insets = useSafeAreaInsets();
  const { token } = useAuth();
  const sessionToken = route.params.token;
  const [permission, requestPermission] = useCameraPermissions();
  const [hits, setHits] = useState<Hit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const lastCode = useRef<string>('');
  const cooldown = useRef(false);
  const accent = T.primary;

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) requestPermission();
  }, [permission, requestPermission]);

  const onScanned = async (raw: string) => {
    if (cooldown.current) return;
    const scan = parseLabelScan(raw);
    const code = scan?.code || raw.trim();
    if (!code || !isLabelCode(code)) return;
    if (code === lastCode.current) return; // evita reenvio do mesmo frame
    cooldown.current = true;
    lastCode.current = code;
    setError(null);
    try {
      const res = await postWorkOrderScanHit(token, sessionToken, code);
      if (res.status === 'unregistered') {
        setError('Etiqueta não cadastrada. Cadastre a máquina no CEDOC/TI antes.');
      } else {
        const name = res.item?.name || code;
        setHits((prev) => [{ code, name, ok: true, at: Date.now() }, ...prev].slice(0, 12));
        setFlash(name);
        setTimeout(() => setFlash(null), 900);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Falha ao enviar leitura.';
      setError(msg.includes('410') || /expir/i.test(msg) ? 'Sessão expirada. Reabra o QR no computador.' : msg);
    } finally {
      setTimeout(() => { cooldown.current = false; lastCode.current = ''; }, 1200);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0E18' }}>
      {permission?.granted && (
        <CameraView
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={({ data }: BarcodeScanningResult) => void onScanned(data)}
        />
      )}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(8,11,20,.5)' }} />

      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Pressable onPress={() => nav.goBack()} style={{ width: 38, height: 38, borderRadius: 11, backgroundColor: 'rgba(255,255,255,.12)', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="x" size={19} color="#fff" />
        </Pressable>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>Escanear p/ o computador</Text>
          <Text style={{ color: 'rgba(255,255,255,.6)', fontSize: 11 }}>Modo estação · leituras ao vivo</Text>
        </View>
        <View style={{ width: 38 }} />
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
        <View style={{ width: 226, height: 226, borderRadius: 14, borderWidth: 2, borderColor: flash ? '#059669' : accent }}>
          {flash && (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: '#059669', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="check" size={26} color="#fff" strokeWidth={3} />
              </View>
              <Text style={{ color: '#fff', fontSize: 12.5, fontWeight: '700', textAlign: 'center', paddingHorizontal: 8 }} numberOfLines={2}>{flash}</Text>
            </View>
          )}
        </View>
        <Text style={{ color: 'rgba(255,255,255,.72)', fontSize: 13.5, textAlign: 'center', lineHeight: 20, maxWidth: 250, marginTop: 20 }}>
          {permission?.granted ? 'Aponte para a etiqueta do equipamento. Escaneie quantos precisar — cada um aparece na OS do computador.' : 'Permita a câmera para escanear.'}
        </Text>
        {!!error && <Text style={{ color: '#FECACA', fontSize: 12.5, textAlign: 'center', maxWidth: 270, marginTop: 12 }}>{error}</Text>}
        {permission && !permission.granted && (
          <Pressable onPress={requestPermission} style={{ paddingVertical: 10, paddingHorizontal: 18, borderRadius: 12, backgroundColor: accent, marginTop: 14 }}>
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>Permitir câmera</Text>
          </Pressable>
        )}
      </View>

      <View style={{ backgroundColor: T.surface, borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingTop: 14, paddingBottom: insets.bottom + 14, maxHeight: 220 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingBottom: 10 }}>
          <Icon name="check-circle" size={14} color={T.faint} />
          <Text style={{ fontSize: 11.5, color: T.faint, fontWeight: '700', letterSpacing: 0.4, textTransform: 'uppercase' }}>Enviados ({hits.length})</Text>
        </View>
        {hits.length === 0 ? (
          <Text style={{ paddingHorizontal: 16, fontSize: 12.5, color: T.faint }}>Nenhuma leitura enviada ainda.</Text>
        ) : (
          <ScrollView contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
            {hits.map((h, i) => (
              <View key={`${h.code}-${h.at}-${i}`} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: T.bg, borderWidth: 1, borderColor: T.border, borderRadius: 11, padding: 10 }}>
                <Icon name="monitor" size={16} color={accent} />
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: '600', color: T.text }}>{h.name}</Text>
                  <Text style={{ fontSize: 10.5, color: T.faint }}>{h.code}</Text>
                </View>
                <Icon name="check" size={15} color="#059669" strokeWidth={3} />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
