import { apiFetch } from './client';
import type { WorkOrder, WorkOrderPriority, WorkOrderStatus, InventoryItem, Movement, TimelineEvent } from '../data/mock';

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
  | 'work_order_material_unit';

export type SelectOption = {
  kind: SelectOptionKind;
  value: string;
  label: string;
  sortOrder?: number;
};

export function getSummary(token: string | null) {
  return apiFetch<Summary>('/api/mobile/summary', { token });
}

export async function getWorkOrders(
  token: string | null,
  opts: { status?: string; q?: string } = {},
): Promise<WorkOrder[]> {
  const params = new URLSearchParams();
  if (opts.status && opts.status !== 'all') params.set('status', opts.status);
  if (opts.q) params.set('q', opts.q);
  const qs = params.toString();
  const res = await apiFetch<{ orders: WorkOrder[] }>(`/api/mobile/work-orders${qs ? `?${qs}` : ''}`, { token });
  return res.orders ?? [];
}

export function getWorkOrder(token: string | null, id: string) {
  return apiFetch<{ workOrder: WorkOrder; timeline: TimelineEvent[] }>(`/api/mobile/work-orders/${id}`, { token });
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
};

export function createWorkOrder(token: string | null, input: CreateWorkOrderInput) {
  return apiFetch<{ id: string; code: string }>('/api/mobile/work-orders', {
    method: 'POST',
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
  } = {},
) {
  return apiFetch<{ ok: true; printRequested?: boolean }>(`/api/mobile/work-orders/${id}`, {
    method: 'PATCH',
    token,
    body: { status, ...opts },
  });
}

export async function getOptions(token: string | null, kinds: SelectOptionKind[]) {
  const qs = kinds.map(encodeURIComponent).join(',');
  const res = await apiFetch<{ options: SelectOption[] }>(`/api/mobile/options?kinds=${qs}`, { token });
  return res.options ?? [];
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

export function resolveAsset(token: string | null, code: string) {
  return apiFetch<{ item: InventoryItem; movements: Movement[] }>(
    `/api/mobile/inventory/assets/${encodeURIComponent(code)}`,
    { token },
  );
}
