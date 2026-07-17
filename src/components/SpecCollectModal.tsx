import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { Icon } from './Icon';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { createSpecSession, pollSpecSession, closeSpecSession, type CollectedSpecs } from '../api/mobile';

/**
 * "Puxar do PC": mostra um código curto; o técnico roda o script no computador
 * (compartilhamento de rede) e digita o código. As specs chegam aqui.
 *
 * Por que não um link/página: o navegador é sandbox — não enxerga série, modelo,
 * CPU nem monitores. Só código nativo lê isso. Ver scripts/coletar-specs.ps1.
 *
 * Polling (2s) em vez de SSE: o app não tem event source, e a espera é curta.
 * As specs NUNCA entram sozinhas — o técnico revisa e confirma.
 */
export function SpecCollectModal({
  visible, onClose, onApply, sharePath = '\\\\servidor\\sdx\\coletar.bat',
}: {
  visible: boolean;
  onClose: () => void;
  onApply: (specs: CollectedSpecs) => void;
  /** Caminho do script no compartilhamento — o que o técnico digita no Executar. */
  sharePath?: string;
}) {
  const { token } = useAuth();
  const [code, setCode] = useState<string | null>(null);
  const [collectUrl, setCollectUrl] = useState<string | null>(null);
  const [specs, setSpecs] = useState<CollectedSpecs | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = () => { if (timer.current) { clearInterval(timer.current); timer.current = null; } };

  const reset = () => {
    stopPolling();
    if (code) void closeSpecSession(token, code).catch(() => undefined);
    setCode(null); setCollectUrl(null); setSpecs(null); setError(null); setBusy(false);
  };

  const close = () => { reset(); onClose(); };

  // Abre a sessão ao aparecer; encerra ao sair (não deixa sessão órfã viva).
  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    setBusy(true); setError(null); setSpecs(null);
    void (async () => {
      try {
        const res = await createSpecSession(token);
        if (cancelled) return;
        setCode(res.code);
        setCollectUrl(res.collectUrl);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Não foi possível abrir a coleta.');
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();
    return () => { cancelled = true; stopPolling(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Enquanto há código e ainda não chegaram specs, pergunta a cada 2s.
  useEffect(() => {
    if (!code || specs) return;
    timer.current = setInterval(() => {
      void (async () => {
        try {
          const res = await pollSpecSession(token, code);
          if (res.status === 'ready' && res.specs) {
            setSpecs(res.specs);
            stopPolling();
          }
        } catch (e) {
          const msg = e instanceof Error ? e.message : '';
          if (msg.includes('410') || /expir/i.test(msg)) {
            setError('O código expirou. Feche e tente de novo.');
            stopPolling();
          }
        }
      })();
    }, 2000);
    return stopPolling;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, specs]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={close}>
      <View style={{ flex: 1, backgroundColor: T.bg }}>
        <View style={{ paddingTop: 52, paddingHorizontal: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: T.border }}>
          <Pressable onPress={close} style={{ width: 38, height: 38, borderRadius: 11, backgroundColor: T.surfaceMuted, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={19} color={T.text} />
          </Pressable>
          <Text style={{ fontSize: 15, fontWeight: '700', color: T.text }}>Puxar dados do PC</Text>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
          {busy && !code && <ActivityIndicator color={T.primary} style={{ marginTop: 30 }} />}

          {!!error && (
            <View style={{ backgroundColor: `${T.danger}12`, borderWidth: 1, borderColor: `${T.danger}44`, borderRadius: 11, padding: 12 }}>
              <Text style={{ color: T.danger, fontSize: 13 }}>{error}</Text>
            </View>
          )}

          {/* 1) Instrução + código */}
          {code && !specs && (
            <>
              <View style={{ alignItems: 'center', backgroundColor: `${T.primary}0E`, borderWidth: 1, borderColor: `${T.primary}44`, borderRadius: 14, paddingVertical: 20 }}>
                <Text style={{ fontSize: 11.5, color: T.muted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6 }}>Código da coleta</Text>
                <Text style={{ fontSize: 40, fontWeight: '800', color: T.primary, letterSpacing: 6, marginTop: 6 }}>{code}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 10 }}>
                  <ActivityIndicator size="small" color={T.muted} />
                  <Text style={{ fontSize: 12, color: T.muted }}>Aguardando o computador…</Text>
                </View>
              </View>

              <View style={{ backgroundColor: T.surface, borderWidth: 1, borderColor: T.border, borderRadius: 12, padding: 14, gap: 8 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: T.text }}>No computador que você está cadastrando:</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: `${T.primary}18`, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 11, fontWeight: '800', color: T.primary }}>1</Text>
                  </View>
                  <Text style={{ flex: 1, fontSize: 12.5, color: T.textSoft }}>Abra o navegador e digite o endereço:</Text>
                </View>
                {!!collectUrl && (
                  <View style={{ backgroundColor: T.bg, borderWidth: 1, borderColor: T.border, borderRadius: 9, paddingVertical: 9, paddingHorizontal: 11 }}>
                    <Text selectable style={{ fontSize: 13.5, fontWeight: '700', color: T.primary, letterSpacing: 0.3 }}>
                      {collectUrl.replace(/^https?:\/\//, '')}
                    </Text>
                  </View>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: `${T.primary}18`, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 11, fontWeight: '800', color: T.primary }}>2</Text>
                  </View>
                  <Text style={{ flex: 1, fontSize: 12.5, color: T.textSoft }}>Na página, siga uma das opções (colar comando, baixar ou pela rede).</Text>
                </View>
                <Text style={{ fontSize: 11, color: T.faint, marginTop: 2 }}>
                  O código já vai no endereço. Vale alguns minutos e serve uma vez só.
                </Text>
              </View>
            </>
          )}

          {/* 2) Chegou — revisar antes de aplicar */}
          {specs && (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Icon name="check-circle" size={18} color="#059669" />
                <Text style={{ fontSize: 14.5, fontWeight: '700', color: T.text }}>Dados recebidos</Text>
              </View>
              <Text style={{ fontSize: 12, color: T.muted, marginTop: -6 }}>
                Confira antes de aplicar. Nada é preenchido sem você confirmar.
              </Text>

              <View style={{ backgroundColor: T.surface, borderWidth: 1, borderColor: T.border, borderRadius: 12, padding: 14, gap: 8 }}>
                {[
                  ['Série', specs.serialNumber],
                  ['Marca', specs.brand],
                  ['Modelo', specs.model],
                  ['Sistema', specs.operatingSystem],
                  ['Nome na rede', specs.hostname],
                ].filter(([, v]) => !!v).map(([k, v]) => (
                  <View key={String(k)} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                    <Text style={{ fontSize: 12.5, color: T.muted }}>{k}</Text>
                    <Text style={{ flex: 1, textAlign: 'right', fontSize: 12.5, fontWeight: '600', color: T.text }}>{String(v)}</Text>
                  </View>
                ))}
                {(specs.technicalSpecs ?? []).map((s, i) => (
                  <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                    <Text style={{ fontSize: 12.5, color: T.muted }}>{s.key}</Text>
                    <Text style={{ flex: 1, textAlign: 'right', fontSize: 12.5, fontWeight: '600', color: T.text }}>{s.value}</Text>
                  </View>
                ))}
              </View>

              {(specs.monitores?.length ?? 0) > 0 && (
                <View style={{ backgroundColor: T.surface, borderWidth: 1, borderColor: T.border, borderRadius: 12, padding: 14, gap: 6 }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: T.text }}>Monitores conectados ({specs.monitores!.length})</Text>
                  <Text style={{ fontSize: 11, color: T.faint }}>
                    Vão como observação — cadastre cada um separadamente se precisar de patrimônio próprio.
                  </Text>
                  {specs.monitores!.map((m, i) => (
                    <Text key={i} style={{ fontSize: 12.5, color: T.textSoft }}>• {m.fabricante} {m.nome} — série {m.serie}</Text>
                  ))}
                </View>
              )}

              <Pressable
                onPress={() => { onApply(specs); reset(); onClose(); }}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12, backgroundColor: T.primary }}
              >
                <Icon name="check" size={17} color="#fff" strokeWidth={3} />
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>Aplicar no cadastro</Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}
