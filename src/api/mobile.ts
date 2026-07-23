import * as FileSystem from 'expo-file-system/legacy';
import { API_BASE_URL, ApiError, IS_TEST_BUILD, apiFetch, notifyUnauthorized } from './client';
import type { WorkOrder, WorkOrderPriority, WorkOrderStatus, InventoryItem, Movement, TimelineEvent } from '../data/mock';
import type { MobileUser } from '../auth/types';

export type Summary = {
  workOrders: { activeNow: number; openedToday: number };
  inventory: { totalItems: number; lowStock: number; equipment: number; inMaintenance: number };
};

export type SelectOptionKind =
  | 'work_order_service_type'
  | 'work_order_category'
  | 'work_order_unit'
  | 'work_order_department'
  | 'work_order_technical_team'
  | 'work_order_responsible_technician'
  | 'work_order_material'
  | 'work_order_material_unit'
  | 'work_order_movement_reason'
  | 'inventory_item_type'
  | 'inventory_equipment_category'
  | 'inventory_category'
  | 'inventory_unit'
  | 'inventory_location'
  | 'inventory_equipment_status'
  | 'inventory_brand'
  | 'inventory_model'
  | 'inventory_spec_key'
  | 'inventory_operating_system';

export type SelectOption = {
  kind: SelectOptionKind;
  value: string;
  label: string;
  sortOrder?: number;
  /** Áreas (CSV) a que um tipo de serviço pertence — cascata categoria→tipo. */
  backendValue?: string | null;
  /** 'EQUIP' marca tipos que envolvem equipamento (realça o bloco). */
  code?: string | null;
};

export type InvolvedEquipmentInput = {
  itemId?: string | null;
  labelCode?: string | null;
  freeText?: string | null;
  problemNote?: string | null;
  itemName?: string | null;
  itemAssetTag?: string | null;
};

export type WorkOrderRequester = {
  id: string;
  source: 'user' | 'catalog';
  name: string;
  department: string | null;
  phone: string | null;
  linkedUserId: string | null;
};

export type WorkOrderAttachmentCategory = 'before' | 'after' | 'document' | 'general';

export type WorkOrderAttachment = {
  id: string;
  workOrderId: string;
  category: WorkOrderAttachmentCategory;
  comment: string | null;
  originalFileName: string | null;
  mimeType: string;
  fileSize: number;
  uploadedByName: string | null;
  createdAt: string;
  url: string;
};

export function getSummary(token: string | null) {
  return apiFetch<Summary>('/api/mobile/summary', { token });
}

/** Dados completos do perfil do usuário logado (fonte de verdade: backend). */
export function getMyProfile(token: string | null) {
  return apiFetch<MobileUser>('/api/mobile/me', { token });
}

/** Atualiza os próprios dados de contato (espelha a edição do perfil web). */
export function updateMyProfile(
  token: string | null,
  fields: { fullName?: string; email?: string; phone?: string; cpf?: string },
) {
  return apiFetch<{ ok: true }>('/api/mobile/me', { method: 'PATCH', token, body: fields });
}

export type AppNotification = {
  id: string;
  type: 'os_moved' | 'os_assigned' | 'os_delegated' | 'os_escalated' | 'os_new_in_department' | string;
  workOrderId: string | null;
  workOrderCode: string | null;
  title: string;
  body: string | null;
  isRead: boolean;
  createdAt: string | null;
};

/** Registra o token de push (Expo) do aparelho para o usuário logado. */
export function registerPushToken(token: string | null, expoToken: string, app: string) {
  return apiFetch<{ ok: true }>('/api/mobile/push-token', {
    method: 'POST', token, body: { token: expoToken, platform: 'android', app },
  });
}

/** Remove o token de push (logout). Best-effort. */
export function unregisterPushToken(token: string | null, expoToken: string) {
  return apiFetch<{ ok: true }>('/api/mobile/push-token', {
    method: 'DELETE', token, body: { token: expoToken },
  }).catch(() => undefined);
}

export function getNotifications(token: string | null) {
  return apiFetch<{ notifications: AppNotification[]; unreadCount: number }>(
    '/api/mobile/notifications',
    { token },
  );
}

export function markNotificationsRead(token: string | null, ids?: string[]) {
  return apiFetch<{ ok: true }>('/api/mobile/notifications', {
    method: 'POST',
    token,
    body: ids && ids.length ? { ids } : {},
  });
}

export async function getWorkOrders(
  token: string | null,
  opts: { status?: string; q?: string; includeHidden?: boolean } = {},
): Promise<WorkOrder[]> {
  const params = new URLSearchParams();
  if (opts.status && opts.status !== 'all') params.set('status', opts.status);
  if (opts.q) params.set('q', opts.q);
  if (opts.includeHidden) params.set('includeHidden', '1');
  const qs = params.toString();
  const res = await apiFetch<{ orders: WorkOrder[] }>(`/api/mobile/work-orders${qs ? `?${qs}` : ''}`, { token });
  return res.orders ?? [];
}

export type DelegatableUser = {
  id: string;
  username: string;
  fullName: string | null;
  department: string | null;
};

/** Usuários que podem receber uma delegação (só quem pode delegar acessa). */
export async function getDelegatableUsers(
  token: string | null,
  opts: { department?: string } = {},
): Promise<DelegatableUser[]> {
  const qs = opts.department ? `?department=${encodeURIComponent(opts.department)}` : '';
  const res = await apiFetch<{ users: DelegatableUser[] }>(`/api/mobile/work-orders/users${qs}`, { token });
  return res.users ?? [];
}

/** Solicita o cancelamento da OS (motivo obrigatório). Aprovação é de quem gerencia. */
export function requestWorkOrderCancellation(token: string | null, id: string, reason: string) {
  return apiFetch<{ ok: true; code: string }>(`/api/mobile/work-orders/${id}/cancel-request`, {
    method: 'POST', token, body: { reason },
  });
}

/** Aprova ou recusa a solicitação de cancelamento (canManageWorkOrders). */
export function reviewWorkOrderCancellation(token: string | null, id: string, action: 'approve' | 'reject') {
  return apiFetch<{ ok: true; code: string; action: string }>(`/api/mobile/work-orders/${id}/cancel-review`, {
    method: 'POST', token, body: { action },
  });
}

/** Delega/encaminha a OS a um usuário, com mensagem opcional. */
export function delegateWorkOrder(
  token: string | null,
  id: string,
  toUserId: string,
  message?: string,
) {
  return apiFetch<{ ok: true; delegatedTo: { id: string; name: string } }>(
    `/api/mobile/work-orders/${id}/delegate`,
    { method: 'POST', token, body: { toUserId, message: message ?? null } },
  );
}

export function getWorkOrder(token: string | null, id: string) {
  return apiFetch<{
    workOrder: WorkOrder;
    timeline: TimelineEvent[];
    signature: {
      signatureDataUrl: string;
      signerName?: string | null;
      signedAt?: string | null;
      techSignatureDataUrl?: string | null;
      techSignerName?: string | null;
      techSignedAt?: string | null;
      signerDocument?: string | null;
      signerDocumentType?: string | null;
    } | null;
    requesterDocument: { document: string; documentType: string | null } | null;
    /** Ações de equipamento já registradas na OS (para editar sem apagar). */
    equipmentActions?: Array<{
      id: string;
      action: 'install' | 'move' | 'swap';
      incoming: { id: string; name: string; assetTag: string | null; unitName: string | null; room: string | null } | null;
      outgoing: { id: string; name: string; assetTag: string | null; unitName: string | null; room: string | null } | null;
      reason: string | null;
      reasonNotes: string | null;
      outgoingDestination: string | null;
      appliedAt: string | null;
    }>;
  }>(`/api/mobile/work-orders/${id}`, { token });
}

/**
 * HTML canônico da OS gerado pelo SERVIDOR (mesmo molde da impressão de produção
 * / estação). Usado para gerar o PDF de compartilhamento — garante que o PDF do
 * app é IDÊNTICO ao impresso, com marca d'água, assinatura embutida e origem.
 * Já inclui a assinatura salva no servidor (se a OS foi assinada).
 */
export async function getWorkOrderPrintHtml(token: string | null, id: string): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/api/mobile/work-orders/${id}/print-html`, {
    headers: { Accept: 'text/html', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    if (res.status === 401 && token) notifyUnauthorized();
    throw new ApiError(`Erro ${res.status} ao gerar o PDF da OS.`, res.status);
  }
  return res.text();
}

export async function getWorkOrderAttachments(token: string | null, id: string): Promise<WorkOrderAttachment[]> {
  const res = await apiFetch<{ attachments: WorkOrderAttachment[] }>(`/api/mobile/work-orders/${id}/attachments`, { token });
  return res.attachments ?? [];
}

export type CreateWorkOrderInput = {
  serviceType: string;
  category: string;
  unitName: string;
  department: string;
  requestedByName: string;
  requesterContact?: string;
  technicalTeam?: string;
  responsibleTechnicianName?: string;
  technicianRequest: string;
  priority: WorkOrderPriority;
  /** Equipamentos envolvidos (opcional): quem deu problema. Link/QR ou texto. */
  involvedEquipment?: InvolvedEquipmentInput[];
};

/** Ação de equipamento enviada pela OS (mesma forma do web). */
export type WorkOrderEquipmentActionInput = {
  action: 'install' | 'move' | 'swap';
  incomingItemId?: string | null;
  outgoingItemId?: string | null;
  reason?: string | null;
  reasonNotes?: string | null;
  toUnit?: string | null;
  toRoom?: string | null;
  toStatus?: string | null;
  outgoingDestination?: string | null;
  outgoingToRoom?: string | null;
  outgoingToStatus?: string | null;
};

export type UpdateWorkOrderInput = Partial<CreateWorkOrderInput> & {
  status?: WorkOrderStatus;
  attendanceNotes?: string | null;
  attendanceNotesRequired?: boolean;
  resolutionStatus?: WorkOrder['resolutionStatus'];
  resolutionNotes?: string | null;
  expectedCompletionAt?: string | null;
  expectedCompletionHours?: number;
  finishedAt?: string | null;
  materials?: WorkOrder['materials'];
  equipmentActions?: WorkOrderEquipmentActionInput[];
};

export function createWorkOrder(token: string | null, input: CreateWorkOrderInput) {
  return apiFetch<{ id: string; code: string }>('/api/mobile/work-orders', {
    method: 'POST',
    token,
    body: input,
  });
}

export function updateWorkOrder(token: string | null, id: string, input: UpdateWorkOrderInput) {
  return apiFetch<{ ok: true; printRequested?: boolean }>(`/api/mobile/work-orders/${id}`, {
    method: 'PATCH',
    token,
    body: input,
  });
}

export function updateWorkOrderStatus(
  token: string | null,
  id: string,
  status: WorkOrderStatus,
  opts: {
    expectedCompletionHours?: number;
    signatureDataUrl?: string;
    signerName?: string;
    resolutionNotes?: string;
    // 2ª assinatura (técnico) + documento do solicitante, coletados na conclusão.
    techSignatureDataUrl?: string;
    techSignerName?: string;
    requesterDocument?: string;
    requesterDocumentType?: 'cpf' | 'rg' | 'matricula';
    finishedAt?: string | null;
    resolutionStatus?: 'resolved' | 'partial' | 'unresolved';
  } = {},
) {
  return apiFetch<{ ok: true; printRequested?: boolean }>(`/api/mobile/work-orders/${id}`, {
    method: 'PATCH',
    token,
    body: { status, ...opts },
  });
}

export async function uploadWorkOrderAttachment(
  token: string | null,
  id: string,
  input: {
    uri: string;
    name: string;
    type: string;
    category: WorkOrderAttachmentCategory;
    comment?: string;
  },
) {
  // FileSystem.uploadAsync é bem mais confiável que fetch()+FormData no RN Android
  // (que costuma falhar com "Network request failed" ao anexar arquivos).
  const parameters: Record<string, string> = { category: input.category };
  if (input.comment) parameters.comment = input.comment;
  if (IS_TEST_BUILD && input.type.startsWith('image/')) parameters.retentionTag = 'test-photo-4h';

  const res = await FileSystem.uploadAsync(`${API_BASE_URL}/api/mobile/work-orders/${id}/attachments`, input.uri, {
    httpMethod: 'POST',
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    fieldName: 'file',
    mimeType: input.type,
    parameters,
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const payload = (() => { try { return JSON.parse(res.body || 'null'); } catch { return null; } })();
  if (res.status < 200 || res.status >= 300) {
    if (res.status === 401 && token) notifyUnauthorized();
    throw new ApiError((payload && (payload.message || payload.error)) || `Erro ${res.status}`, res.status, payload?.code);
  }
  return payload as { message: string; attachmentId: string };
}

export async function getOptions(token: string | null, kinds: SelectOptionKind[]) {
  const qs = kinds.map(encodeURIComponent).join(',');
  const res = await apiFetch<{ options: SelectOption[] }>(`/api/mobile/options?kinds=${qs}`, { token });
  return res.options ?? [];
}

export async function getWorkOrderRequesters(token: string | null): Promise<WorkOrderRequester[]> {
  const res = await apiFetch<{ requesters: WorkOrderRequester[] }>('/api/mobile/work-orders/requesters', { token });
  return res.requesters ?? [];
}

// Busca todos os itens (filtro por primaryType é feito client-side, pois o
// backend só distingue consumable|equipment).
export async function getInventory(
  token: string | null,
  opts: { q?: string } = {},
): Promise<InventoryItem[]> {
  const qs = opts.q ? `?q=${encodeURIComponent(opts.q)}` : '';
  const res = await apiFetch<{ items: InventoryItem[] }>(`/api/mobile/inventory${qs}`, { token });
  return res.items ?? [];
}

export function getInventoryItem(token: string | null, id: string) {
  return apiFetch<{ item: InventoryItem; movements: Movement[] }>(`/api/mobile/inventory/${id}`, { token });
}

export type SpecTwin = { id: string; name: string; createdAt: string | null; technicalSpecs: Array<{ key: string; value: string }> };

/** Aparelhos-gêmeos (mesma marca+modelo+categoria) com specs, pra importar o molde. */
export async function getSpecSuggestions(
  token: string | null,
  params: { brand: string; model: string; category: string; excludeId?: string },
): Promise<SpecTwin[]> {
  const qs = new URLSearchParams({ brand: params.brand, model: params.model, category: params.category });
  if (params.excludeId) qs.set('excludeId', params.excludeId);
  const res = await apiFetch<{ suggestions: SpecTwin[] }>(`/api/mobile/inventory/spec-suggestions?${qs.toString()}`, { token });
  return res.suggestions ?? [];
}

/** "Só preenche o vazio": adiciona chaves ausentes / preenche vazias; nunca sobrescreve. */
export function mergeSpecsFillEmpty(
  current: Array<{ key: string; value: string }>,
  incoming: Array<{ key: string; value: string }>,
): { merged: Array<{ key: string; value: string }>; applied: number } {
  const norm = (s: string) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().trim().replace(/\s+/g, ' ');
  const byKey = new Map<string, { key: string; value: string }>();
  for (const s of current) {
    const k = norm(s.key);
    if (k && !byKey.has(k)) byKey.set(k, { key: s.key, value: String(s.value ?? '') });
  }
  let applied = 0;
  for (const s of incoming) {
    const k = norm(s.key);
    if (!k) continue;
    const val = String(s.value ?? '').trim();
    if (!val) continue;
    const existing = byKey.get(k);
    if (!existing) { byKey.set(k, { key: s.key, value: val }); applied++; }
    else if (!String(existing.value ?? '').trim()) { existing.value = val; applied++; }
  }
  return { merged: Array.from(byKey.values()), applied };
}

export function resolveAsset(token: string | null, code: string) {
  return apiFetch<{ item: InventoryItem; movements: Movement[] }>(
    `/api/mobile/inventory/assets/${encodeURIComponent(code)}`,
    { token },
  );
}

export type ScanHitResult = {
  token: string;
  code: string;
  status: 'ok' | 'unregistered';
  item: {
    id: string; name: string; itemType?: string | null; assetTag?: string | null;
    unitName?: string | null; room?: string | null; equipmentStatus?: string | null;
  } | null;
};

/**
 * "Celular como scanner": manda uma etiqueta lida para a sessão aberta no web
 * (relay). O servidor resolve o equipamento e publica pro web via SSE.
 */
export function postWorkOrderScanHit(token: string | null, sessionToken: string, code: string) {
  return apiFetch<ScanHitResult>(
    `/api/mobile/work-order-scan-sessions/${encodeURIComponent(sessionToken)}/hit`,
    { method: 'POST', token, body: { code } },
  );
}

/** Resolve uma etiqueta genérica escaneada (ETQ-…): disponível ou já vinculada. */
export function resolveInventoryLabel(token: string | null, code: string) {
  return apiFetch<{ code: string; status: 'available' | 'assigned' | 'void'; itemId: string | null; copies: number; canRegister: boolean }>(
    `/api/mobile/inventory/labels/${encodeURIComponent(code)}`,
    { token },
  );
}

/* ---------------------------------------------------------------------------
 * SDX Nuntius — máquinas que se cadastram sozinhas
 * Desenho: docs/INVENTORY_AGENT_AND_REMOTE.md (repo ScandexGed), §5.12.
 * ------------------------------------------------------------------------- */

export type MachineDevice = {
  kind: string;
  name: string;
  serial: string;
  manufacturer: string;
  /** Preenchido quando o dispositivo JÁ é patrimônio — não oferecer "promover". */
  itemId: string | null;
  itemName: string | null;
  labelCode: string | null;
};

export type DetectedMachine = {
  id: string;
  hostname: string | null;
  biosSerial: string | null;
  biosAssetTag?: string | null;
  chassisType?: string | null;
  macAddress?: string | null;
  brand: string | null;
  model: string | null;
  operatingSystem: string | null;
  technicalSpecs?: InventorySpec[];
  devices?: MachineDevice[];
  unitName: string | null;
  online?: boolean;
  lastSeenAt?: string | null;
};

/** Fila de máquinas detectadas — para escolher qual vincular ao cadastro. */
export async function getDetectedMachines(token: string | null, q?: string) {
  const qs = q ? `?q=${encodeURIComponent(q)}` : '';
  return apiFetch<{ canRegister: boolean; machines: DetectedMachine[] }>(
    `/api/mobile/inventory/machines${qs}`,
    { token },
  );
}

/**
 * Destranca a janela do SDX Nuntius (§6.2).
 *
 * A biometria do celular já rodou ANTES desta chamada — ela prova quem está com
 * o aparelho na mão. Este endpoint confere se essa pessoa tem canManageInventory
 * no sistema. Uma coisa não substitui a outra.
 */
export function unlockNuntiusMachine(token: string | null, scannedToken: string) {
  return apiFetch<{
    ok: true;
    machine: {
      id: string;
      hostname: string | null;
      brand: string | null;
      model: string | null;
      unitName: string | null;
    };
  }>('/api/mobile/inventory/machines/unlock', {
    method: 'POST',
    token,
    body: { token: scannedToken },
  });
}

/** Resolve o QR exibido na tela do PC (URL /i/m/<token>). */
export function resolveMachinePairToken(token: string | null, pairToken: string) {
  return apiFetch<{
    ok: true;
    machine: DetectedMachine;
    itemId: string | null;
    canRegister: boolean;
  }>(`/api/mobile/inventory/machines/pair/${encodeURIComponent(pairToken)}`, { token });
}

/**
 * "Mostre-se": pede que a máquina exiba um código na própria tela. O agente traz
 * a janela para frente em até ~10s. Prova de presença sem depender da câmera
 * acertar um monitor sujo ou torto.
 */
export function requestMachinePairCode(token: string | null, machineId: string) {
  return apiFetch<{
    ok: true;
    code: string;
    hostname: string | null;
    expiresInSeconds: number;
    appearsInSeconds: number;
  }>(`/api/mobile/inventory/machines/${machineId}/show-pair`, { token, method: 'POST', body: {} });
}

/** O técnico confirmou que o código do app é o mesmo da tela do PC. */
export function confirmMachinePair(token: string | null, machineId: string, code: string) {
  return apiFetch<{ ok: true; machine: DetectedMachine }>(
    `/api/mobile/inventory/machines/${machineId}/confirm-pair`,
    { token, method: 'POST', body: { code } },
  );
}

export type InventorySpec = { key: string; value: string };
export type NewInventoryItemInput = {
  labelCode?: string;
  validatedCopies?: number[];
  /** Máquina do Nuntius sendo promovida a patrimônio neste mesmo cadastro. */
  machineId?: string;
  name: string;
  itemType?: 'equipment' | 'consumable';
  category?: string;
  unitName: string;
  room: string;
  currentLocation?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  sku?: string;
  description?: string;
  assetTag?: string;
  equipmentStatus?: string;
  operatingSystem?: string;
  technicalSpecs?: InventorySpec[];
  notes?: string;
  unit?: string;
  minQty?: number;
  maxQty?: number;
  initialQty?: number;
};

/** Envia uma foto do item (principal ou anexo) — usado após o cadastro. */
export async function uploadInventoryPhoto(
  token: string | null,
  itemId: string,
  input: { uri: string; role: 'main' | 'attachment' },
) {
  const res = await FileSystem.uploadAsync(`${API_BASE_URL}/api/mobile/inventory/${itemId}/photo`, input.uri, {
    httpMethod: 'POST',
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    fieldName: 'file',
    mimeType: 'image/jpeg',
    parameters: { role: input.role },
    headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`Falha ao enviar foto (${res.status}).`);
  }
}

export type CollectedSpecs = {
  serialNumber?: string | null;
  brand?: string | null;
  model?: string | null;
  operatingSystem?: string | null;
  hostname?: string | null;
  technicalSpecs?: InventorySpec[];
  monitores?: Array<{ nome: string; serie: string; fabricante: string }>;
};

/** Abre uma sessão de coleta: código + URL da página que o PC abre. */
export function createSpecSession(token: string | null) {
  return apiFetch<{ code: string; collectUrl: string; expiresInMinutes: number }>('/api/mobile/inventory/spec-sessions', {
    method: 'POST', token,
  });
}

/** Polling: 'waiting' até o script do PC enviar; 'ready' com as specs. */
export function pollSpecSession(token: string | null, code: string) {
  return apiFetch<{ status: 'waiting' | 'ready'; specs?: CollectedSpecs }>(
    `/api/mobile/inventory/spec-sessions/${encodeURIComponent(code)}`, { token },
  );
}

export function closeSpecSession(token: string | null, code: string) {
  return apiFetch<{ ok: true }>(`/api/mobile/inventory/spec-sessions/${encodeURIComponent(code)}`, {
    method: 'DELETE', token,
  });
}

/** Campos editáveis de um item já cadastrado (complementar em campo). */
export type UpdateInventoryItemInput = {
  name?: string;
  category?: string | null;
  /** Patrimônio ANTERIOR do hospital (vários: um por linha). */
  assetTag?: string | null;
  serialNumber?: string | null;
  sku?: string | null;
  brand?: string | null;
  model?: string | null;
  equipmentStatus?: string | null;
  operatingSystem?: string | null;
  unitName?: string | null;
  room?: string | null;
  currentLocation?: string | null;
  notes?: string | null;
  technicalSpecs?: InventorySpec[];
};

/** Edita um item já cadastrado. A nossa etiqueta (labelCode) não é editável. */
export function updateInventoryItem(token: string | null, id: string, input: UpdateInventoryItemInput) {
  return apiFetch<{ ok: true }>(`/api/mobile/inventory/${id}`, { method: 'PATCH', token, body: input });
}

/** Cadastra um equipamento pelo celular (vinculando a etiqueta genérica). */
export function createInventoryItem(token: string | null, input: NewInventoryItemInput) {
  return apiFetch<{ ok: true; item: InventoryItem }>('/api/mobile/inventory', {
    method: 'POST', token, body: input,
  });
}
