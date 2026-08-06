import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../components/Icon';
import { showToast } from '../lib/toast';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { createInventoryItem, uploadInventoryPhoto } from '../api/mobile';
import { parseLabelScan } from '../lib/label-scan';
import { savePending, removePending } from '../lib/pending-registrations';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type R = RouteProp<RootStackParamList, 'InventoryCopyValidation'>;

export function InventoryCopyValidationScreen() {
  const nav = useNavigation<Nav>();
  const { labelCode, copies, validated: initial, form } = useRoute<R>().params;
  const { token } = useAuth();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [validated, setValidated] = useState<number[]>(initial ?? []);
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [scannerEnabled, setScannerEnabled] = useState(true);
  const [cameraEpoch, setCameraEpoch] = useState(0);
  const lastScan = useRef(0);

  const remaining = useMemo(
    () => Array.from({ length: copies }, (_, i) => i + 1).filter((c) => !validated.includes(c)),
    [copies, validated],
  );
  const complete = remaining.length === 0;

  const onScanned = (raw: string) => {
    if (complete || Date.now() - lastScan.current < 900) return;
    lastScan.current = Date.now();
    const scan = parseLabelScan(raw);
    if (!scan || scan.code !== labelCode) {
      setFlash('Etiqueta de outro equipamento — escaneie as cópias desta.');
      return;
    }
    if (scan.copy < 1 || scan.copy > copies) {
      setFlash('Cópia fora do esperado.');
      return;
    }
    if (validated.includes(scan.copy)) {
      // Compatibilidade com etiquetas emitidas antes da numeração acumulada:
      // disparos separados de uma cópia geravam sempre o mesmo QR c=1. Nesses
      // lotes, cada nova leitura física preenche a próxima posição pendente.
      const legacySlot = remaining[0];
      if (scan.copy === 1 && legacySlot) {
        setValidated((prev) => [...prev, legacySlot].sort((a, b) => a - b));
        setFlash(`Cópia física validada como #${legacySlot} (etiqueta legada).`);
        setScannerEnabled(false);
        return;
      }
      setFlash(`Cópia ${scan.copy} já validada.`);
      return;
    }
    setValidated((prev) => [...prev, scan.copy].sort((a, b) => a - b));
    setFlash(null);
    setScannerEnabled(false);
  };

  // Rearma automaticamente entre cópias. A pausa curta dá tempo de afastar a
  // etiqueta já lida e a remontagem limpa o cache nativo dos QRs legados iguais.
  useEffect(() => {
    if (scannerEnabled || complete) return;
    const timer = setTimeout(() => {
      lastScan.current = 0;
      setFlash(null);
      setCameraEpoch((value) => value + 1);
      setScannerEnabled(true);
    }, 850);
    return () => clearTimeout(timer);
  }, [scannerEnabled, complete]);

  const finish = async () => {
    if (!complete || saving) return;
    setSaving(true);
    try {
      // Fotos são locais (URIs) — enviadas separadamente após criar o item.
      const { mainPhotoUri, attachmentUris, ...fields } = form;
      const res = await createInventoryItem(token, {
        ...fields, labelCode, validatedCopies: validated,
      });
      const itemId = res.item.id;
      // Upload das fotos (best-effort; não bloqueia o cadastro se uma falhar).
      try {
        if (mainPhotoUri) await uploadInventoryPhoto(token, itemId, { uri: mainPhotoUri, role: 'main' });
        for (const uri of attachmentUris ?? []) await uploadInventoryPhoto(token, itemId, { uri, role: 'attachment' });
      } catch { /* foto falhou — item já foi cadastrado */ }
      await removePending(labelCode);
      showToast(`${form.name} cadastrado.`);
      nav.replace('InventoryDetail', { id: itemId });
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Falha ao concluir o cadastro.');
      setSaving(false);
    }
  };

  const savePendingAndLeave = async () => {
    await savePending({ labelCode, copies, validated, form, savedAt: Date.now() });
    showToast('Cadastro salvo como pendente.');
    nav.navigate('Tabs', { screen: 'Inventory' });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0E18' }}>
      {permission?.granted && !complete && scannerEnabled && (
        <CameraView
          key={cameraEpoch}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={({ data }: BarcodeScanningResult) => onScanned(data)}
        />
      )}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(8,11,20,.6)' }} />

      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Pressable onPress={savePendingAndLeave} style={{ width: 38, height: 38, borderRadius: 11, backgroundColor: 'rgba(255,255,255,.14)', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="arrow-left" size={18} color="#fff" />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '800' }}>Validar cópias da etiqueta</Text>
          <Text style={{ color: 'rgba(255,255,255,.7)', fontSize: 12 }}>{labelCode} · {validated.length}/{copies} validadas</Text>
        </View>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, gap: 18 }}>
        {complete ? (
          <View style={{ alignItems: 'center', gap: 12 }}>
            <View style={{ width: 66, height: 66, borderRadius: 33, backgroundColor: '#059669', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="check" size={32} color="#fff" strokeWidth={3} />
            </View>
            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>Todas as {copies} cópias validadas</Text>
          </View>
        ) : (
          <>
            <View style={{ width: 220, height: 220, borderRadius: 14, borderWidth: 2, borderColor: 'rgba(255,255,255,.35)' }} />
            <Text style={{ color: 'rgba(255,255,255,.8)', fontSize: 13.5, textAlign: 'center', lineHeight: 20 }}>
              Escaneie cada cópia da etiqueta colada no equipamento. Faltam: {remaining.map((c) => `#${c}`).join(', ')}.
            </Text>
            {!!flash && <Text style={{ color: '#FCD34D', fontSize: 12.5, textAlign: 'center' }}>{flash}</Text>}
            {!scannerEnabled && remaining.length > 0 && (
              <Text style={{ color: '#93C5FD', fontSize: 12.5, fontWeight: '700' }}>Preparando a próxima leitura…</Text>
            )}
            {permission && !permission.granted && (
              <Pressable onPress={requestPermission} style={{ paddingVertical: 10, paddingHorizontal: 18, borderRadius: 12, backgroundColor: T.primary }}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>Permitir câmera</Text>
              </Pressable>
            )}
          </>
        )}
      </View>

      {/* Progresso das cópias */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 16, paddingBottom: 10 }}>
        {Array.from({ length: copies }, (_, i) => i + 1).map((c) => {
          const ok = validated.includes(c);
          return (
            <View key={c} style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 999, backgroundColor: ok ? '#05966922' : 'rgba(255,255,255,.1)', borderWidth: 1, borderColor: ok ? '#10B981' : 'rgba(255,255,255,.18)' }}>
              <Icon name={ok ? 'check' : 'qr'} size={13} color={ok ? '#34D399' : 'rgba(255,255,255,.7)'} />
              <Text style={{ color: ok ? '#34D399' : 'rgba(255,255,255,.8)', fontSize: 12.5, fontWeight: '700' }}>Cópia {c}</Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 14, gap: 10 }}>
        <Pressable
          onPress={finish}
          disabled={!complete || saving}
          style={{ height: 52, borderRadius: 14, backgroundColor: complete ? T.primary : 'rgba(255,255,255,.15)', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 }}
        >
          {saving ? <ActivityIndicator color="#fff" /> : <Icon name="check" size={18} color="#fff" />}
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '800' }}>Concluir cadastro</Text>
        </Pressable>
        <Pressable onPress={savePendingAndLeave} style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'rgba(255,255,255,.8)', fontSize: 13.5, fontWeight: '700' }}>Salvar como pendente e sair</Text>
        </Pressable>
      </View>
    </View>
  );
}
