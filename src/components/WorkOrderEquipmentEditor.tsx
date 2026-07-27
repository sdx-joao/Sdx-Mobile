import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import { Icon } from './Icon';
import { T } from '../theme/theme';
import { getInventoryItem, resolveInventoryLabel, type WorkOrderEquipmentActionInput } from '../api/mobile';
import { parseLabelScan, isLabelCode } from '../lib/label-scan';

export type EquipSlot = {
  id: string; name: string; assetTag?: string | null;
  unitName?: string | null; room?: string | null;
};

export type EquipActionKind = 'install' | 'move' | 'swap';

export type EquipActionDraft = {
  action: EquipActionKind;
  incoming: EquipSlot | null;
  outgoing: EquipSlot | null;
  reason: string;
  reasonNotes: string;
  outgoingDestination: string;
};

const ACTION_LABEL: Record<EquipActionKind, string> = { install: 'Instalar', move: 'Mover', swap: 'Trocar' };

/**
 * Fallback usado só se o catálogo (work_order_movement_reason) vier vazio — a
 * fonte de verdade é Catálogos → Motivos, editável pelo Admin sem deploy.
 */
const FALLBACK_REASONS: Array<{ value: string; label: string }> = [
  { value: 'defeito', label: 'Defeito' },
  { value: 'fim_de_vida', label: 'Fim de vida útil' },
  { value: 'upgrade', label: 'Upgrade / melhoria' },
  { value: 'realocacao', label: 'Realocação' },
  { value: 'novo_posto', label: 'Novo posto' },
  { value: 'reposicao', label: 'Reposição' },
];

const DESTINATIONS = [
  { value: 'manutencao', label: 'Manutenção' },
  { value: 'cedoc', label: 'CEDOC/TI' },
  { value: 'baixa', label: 'Baixa' },
];

export function newEquipAction(action: EquipActionKind): EquipActionDraft {
  return { action, incoming: null, outgoing: null, reason: '', reasonNotes: '', outgoingDestination: action === 'swap' ? 'manutencao' : '' };
}

/** Mapeia os rascunhos para o payload da API (igual ao web). */
export function buildEquipmentActionsPayload(
  actions: EquipActionDraft[], unitName: string, department: string, exchangeMode = false,
): WorkOrderEquipmentActionInput[] {
  return actions
    .filter(a => a.incoming || a.outgoing)
    .map(a => {
      const outStatus = a.outgoingDestination === 'baixa' ? 'BAIXADO'
        : a.outgoingDestination === 'cedoc' ? 'FUNCIONANDO'
          : (a.reason === 'defeito' ? 'DEFEITO' : a.reason === 'fim_de_vida' ? 'FIM DE VIDA' : 'MANUTENÇÃO');
      const outRoom = a.outgoingDestination === 'cedoc' ? 'CEDOC/TI' : a.outgoingDestination === 'baixa' ? 'BAIXA' : 'MANUTENÇÃO';
      return {
        action: a.action,
        incomingItemId: a.incoming?.id ?? null,
        outgoingItemId: a.outgoing?.id ?? null,
        reason: a.reason || null,
        reasonNotes: a.reasonNotes || null,
        // Na troca, cada equipamento vai para o local de origem do outro.
        // Fora dela, o destino continua sendo o setor solicitado na O.S.
        toUnit: exchangeMode && a.outgoing ? a.outgoing.unitName || null : unitName || null,
        toRoom: exchangeMode && a.outgoing ? a.outgoing.room || null : department || null,
        toStatus: 'FUNCIONANDO',
        outgoingDestination: a.action === 'swap' ? (exchangeMode ? 'setor' : a.outgoingDestination) : null,
        outgoingToUnit: a.action === 'swap' && exchangeMode ? a.incoming?.unitName || null : null,
        outgoingToRoom: a.action === 'swap' ? (exchangeMode ? a.incoming?.room || null : outRoom) : null,
        outgoingToStatus: a.action === 'swap' ? (exchangeMode ? null : outStatus) : null,
      };
    });
}

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderWidth: 1, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 11,
        borderColor: active ? T.primary : T.border,
        backgroundColor: active ? `${T.primary}14` : 'transparent',
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: active ? '700' : '500', color: active ? T.primary : T.textSoft }}>{label}</Text>
    </Pressable>
  );
}

function SlotRow({ item, label, onScan, onClear }: { item: EquipSlot | null; label: string; onScan: () => void; onClear: () => void }) {
  if (item) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: `${T.primary}0E`, borderWidth: 1, borderColor: `${T.primary}44`, borderRadius: 11, padding: 10 }}>
        <Icon name="monitor" size={16} color={T.primary} />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: '700', color: T.text }}>{item.name}</Text>
          <Text numberOfLines={1} style={{ fontSize: 10.5, color: T.muted }}>
            {[item.assetTag, [item.unitName, item.room].filter(Boolean).join(' · ')].filter(Boolean).join(' • ') || '—'}
          </Text>
        </View>
        <Pressable onPress={onClear} hitSlop={8}><Icon name="x" size={15} color={T.muted} /></Pressable>
      </View>
    );
  }
  return (
    <Pressable
      onPress={onScan}
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1, borderStyle: 'dashed', borderColor: T.border, borderRadius: 11, paddingVertical: 12 }}
    >
      <Icon name="qr" size={16} color={T.primary} />
      <Text style={{ fontSize: 13, fontWeight: '700', color: T.primary }}>Escanear {label}</Text>
    </Pressable>
  );
}

export function WorkOrderEquipmentEditor({
  actions, onChange, unitName, department, token, reasonOptions, exchangeMode = false,
}: {
  actions: EquipActionDraft[];
  onChange: (next: EquipActionDraft[]) => void;
  unitName: string;
  department: string;
  token: string | null;
  /** Motivos vindos de Catálogos (work_order_movement_reason). Vazio = fallback. */
  reasonOptions?: Array<{ value: string; label: string }>;
  exchangeMode?: boolean;
}) {
  const reasons = reasonOptions?.length ? reasonOptions : FALLBACK_REASONS;
  const actionsRef = useRef(actions);
  actionsRef.current = actions;

  const [permission, requestPermission] = useCameraPermissions();
  const [scanFor, setScanFor] = useState<{ index: number; slot: 'incoming' | 'outgoing' } | null>(null);
  const [resolving, setResolving] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    if (scanFor && permission && !permission.granted && permission.canAskAgain) requestPermission();
  }, [scanFor, permission, requestPermission]);

  const update = (index: number, patch: Partial<EquipActionDraft>) =>
    onChange(actionsRef.current.map((a, i) => (i === index ? { ...a, ...patch } : a)));

  const onScanned = async (raw: string) => {
    if (busy.current || !scanFor) return;
    const parsed = parseLabelScan(raw);
    const code = parsed?.code || raw.trim();
    if (!code || !isLabelCode(code)) return;
    busy.current = true;
    setResolving(true);
    setScanError(null);
    try {
      const label = await resolveInventoryLabel(token, code);
      if (label.status !== 'assigned' || !label.itemId) {
        setScanError('Etiqueta não cadastrada. Cadastre a máquina no CEDOC/TI antes de movimentar.');
        return;
      }
      const { item } = await getInventoryItem(token, label.itemId);
      if (item.itemType !== 'equipment') {
        setScanError('Essa etiqueta não é de um equipamento.');
        return;
      }
      update(scanFor.index, {
        [scanFor.slot]: {
          id: item.id, name: item.name, assetTag: item.assetTag,
          unitName: item.unitName ?? null, room: item.room ?? null,
        },
      } as Partial<EquipActionDraft>);
      setScanFor(null);
    } catch {
      setScanError('Não foi possível resolver a etiqueta.');
    } finally {
      setResolving(false);
      setTimeout(() => { busy.current = false; }, 900);
    }
  };

  const addAction = (action: EquipActionKind) => onChange([...actionsRef.current, newEquipAction(action)]);
  const removeAction = (index: number) => onChange(actionsRef.current.filter((_, i) => i !== index));

  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {(exchangeMode ? ['swap'] : ['install', 'move', 'swap'] as EquipActionKind[]).map((k) => {
          const kind = k as EquipActionKind;
          return (
          <Pressable
            key={kind}
            onPress={() => addAction(kind)}
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, borderWidth: 1, borderColor: T.border, borderRadius: 10, paddingVertical: 9 }}
          >
            <Icon name={kind === 'swap' ? 'shuffle' : kind === 'move' ? 'chevron-right' : 'plus'} size={14} color={T.primary} />
            <Text style={{ fontSize: 12.5, fontWeight: '700', color: T.primary }}>{ACTION_LABEL[kind]}</Text>
          </Pressable>
          );
        })}
      </View>

      {actions.length === 0 && (
        <Text style={{ fontSize: 12.5, color: T.muted }}>Nenhuma movimentação. Toque acima e escaneie a etiqueta da máquina.</Text>
      )}

      {actions.map((action, index) => (
        <View key={index} style={{ borderWidth: 1, borderColor: T.border, borderRadius: 12, padding: 11, gap: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ backgroundColor: `${T.primary}14`, borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 11.5, fontWeight: '700', color: T.primary }}>{ACTION_LABEL[action.action]}</Text>
            </View>
            <Pressable onPress={() => removeAction(index)} hitSlop={8}><Icon name="trash" size={15} color={T.danger} /></Pressable>
          </View>

          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 10.5, color: T.faint, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4 }}>
              {action.action === 'swap' ? 'Máquina nova (entra)' : 'Máquina'}
            </Text>
            <SlotRow item={action.incoming} label={action.action === 'swap' ? 'a nova' : 'a máquina'} onScan={() => setScanFor({ index, slot: 'incoming' })} onClear={() => update(index, { incoming: null })} />
            <Text style={{ fontSize: 10.5, color: T.faint }}>
              Destino: {exchangeMode && action.outgoing
                ? [action.outgoing.unitName, action.outgoing.room].filter(Boolean).join(' · ')
                : [unitName, department].filter(Boolean).join(' · ') || 'Setor da OS'}
            </Text>
          </View>

          {action.action === 'swap' && (
            <View style={{ gap: 5 }}>
              <Text style={{ fontSize: 10.5, color: T.faint, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4 }}>Máquina antiga (sai)</Text>
              <SlotRow item={action.outgoing} label="a antiga" onScan={() => setScanFor({ index, slot: 'outgoing' })} onClear={() => update(index, { outgoing: null })} />
              {exchangeMode && action.incoming && (
                <Text style={{ fontSize: 10.5, color: T.faint }}>
                  Destino: {[action.incoming.unitName, action.incoming.room].filter(Boolean).join(' · ') || 'Origem da primeira máquina'}
                </Text>
              )}
            </View>
          )}

          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 10.5, color: T.faint, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4 }}>Motivo</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
              {reasons.map(r => (
                <Chip key={r.value} label={r.label} active={action.reason === r.value} onPress={() => update(index, { reason: r.value })} />
              ))}
              <Chip label="Outro" active={action.reason === 'outro'} onPress={() => update(index, { reason: 'outro' })} />
            </ScrollView>
          </View>

          {action.action === 'swap' && !exchangeMode && (
            <View style={{ gap: 6 }}>
              <Text style={{ fontSize: 10.5, color: T.faint, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4 }}>Antiga vai para</Text>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                {DESTINATIONS.map(d => (
                  <Chip key={d.value} label={d.label} active={action.outgoingDestination === d.value} onPress={() => update(index, { outgoingDestination: d.value })} />
                ))}
              </View>
            </View>
          )}
        </View>
      ))}

      <Modal visible={!!scanFor} animationType="slide" onRequestClose={() => setScanFor(null)}>
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
          <View style={{ paddingTop: 52, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Pressable onPress={() => setScanFor(null)} style={{ width: 38, height: 38, borderRadius: 11, backgroundColor: 'rgba(255,255,255,.12)', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="x" size={19} color="#fff" />
            </Pressable>
            <Text style={{ color: '#fff', fontSize: 14.5, fontWeight: '700' }}>
              Escanear {scanFor?.slot === 'outgoing' ? 'a antiga' : 'a máquina'}
            </Text>
            <View style={{ width: 38 }} />
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 18, paddingHorizontal: 26 }}>
            <View style={{ width: 224, height: 224, borderRadius: 14, borderWidth: 2, borderColor: T.primary }} />
            {resolving && <ActivityIndicator color="#fff" />}
            <Text style={{ color: 'rgba(255,255,255,.75)', fontSize: 13.5, textAlign: 'center', lineHeight: 20 }}>
              {permission?.granted ? 'Aponte para o QR da etiqueta de patrimônio.' : 'Permita a câmera para escanear.'}
            </Text>
            {!!scanError && <Text style={{ color: '#FECACA', fontSize: 12.5, textAlign: 'center' }}>{scanError}</Text>}
            {permission && !permission.granted && (
              <Pressable onPress={requestPermission} style={{ paddingVertical: 10, paddingHorizontal: 18, borderRadius: 12, backgroundColor: T.primary }}>
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>Permitir câmera</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
