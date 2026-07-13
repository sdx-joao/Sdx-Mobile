import * as FileSystem from 'expo-file-system/legacy';

/**
 * Cadastros de equipamento pendentes — quando o operador não consegue validar
 * todas as cópias da etiqueta (uma faltou/rasgou), os dados NÃO se perdem: ficam
 * salvos localmente aguardando ele reimprimir a cópia e concluir depois.
 * O item só vai ao servidor quando todas as cópias são validadas.
 */
export type PendingForm = {
  name: string;
  itemType: 'equipment' | 'consumable';
  category?: string;
  unitName: string;
  room: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
};

export type PendingRegistration = {
  labelCode: string;
  copies: number;
  validated: number[]; // índices de cópia já validados
  form: PendingForm;
  savedAt: number;
};

const FILE = `${FileSystem.documentDirectory ?? ''}pending-registrations.json`;

export async function listPending(): Promise<PendingRegistration[]> {
  try {
    const info = await FileSystem.getInfoAsync(FILE);
    if (!info.exists) return [];
    const raw = await FileSystem.readAsStringAsync(FILE);
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export async function savePending(entry: PendingRegistration): Promise<void> {
  try {
    const list = await listPending();
    const next = [{ ...entry, savedAt: Date.now() }, ...list.filter((p) => p.labelCode !== entry.labelCode)];
    await FileSystem.writeAsStringAsync(FILE, JSON.stringify(next));
  } catch {
    /* best-effort */
  }
}

export async function removePending(labelCode: string): Promise<void> {
  try {
    const list = await listPending();
    await FileSystem.writeAsStringAsync(FILE, JSON.stringify(list.filter((p) => p.labelCode !== labelCode)));
  } catch {
    /* noop */
  }
}
