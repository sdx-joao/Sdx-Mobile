// ScandexPRO Mobile — Mock data (schema-faithful, pt-BR)

// ── Work Orders (type WorkOrder) ────────────────────────────────────────────
const WORK_ORDERS = [
  {
    id: 'wo1', code: 'OS-2025-0418', serviceType: 'Manutenção corretiva', category: 'TI / Infraestrutura',
    unitName: 'Hospital do Olho — JCB', department: 'Centro Cirúrgico', openedAt: '2025-06-09T08:12:00',
    requestedByName: 'Enf. Patrícia Lemos', requesterContact: '(85) 99812-4471',
    responsibleTechnicianName: 'Carlos Andrade', technicalTeam: 'Suporte TI',
    status: 'in_progress', priority: 'urgent', source: 'whatsapp',
    expectedCompletionAt: '2025-06-09T12:00:00', escalationCount: 1,
    attendanceNotes: 'Monitor do mapa cirúrgico sem sinal. Verificado cabo HDMI rompido, troca em andamento.',
    resolutionStatus: null,
    materials: [
      { description: 'Cabo HDMI 2.0 — 3m', quantity: 1, unit: 'UN' },
      { description: 'Adaptador DisplayPort→HDMI', quantity: 1, unit: 'UN' },
    ],
  },
  {
    id: 'wo2', code: 'OS-2025-0417', serviceType: 'Instalação de equipamento', category: 'Equipamentos',
    unitName: 'Hospital do Olho — JCB', department: 'Recepção Térreo', openedAt: '2025-06-09T07:40:00',
    requestedByName: 'Marcos Vinícius', requesterContact: '(85) 99655-2210',
    responsibleTechnicianName: 'Júlia Tavares', technicalTeam: 'Suporte TI',
    status: 'open', priority: 'high', source: 'web',
    expectedCompletionAt: '2025-06-09T16:00:00', escalationCount: 0,
    attendanceNotes: null, resolutionStatus: null,
    materials: [{ description: 'Impressora térmica Zebra ZD220', quantity: 1, unit: 'UN' }],
  },
  {
    id: 'wo3', code: 'OS-2025-0416', serviceType: 'Transporte / Coleta', category: 'Logística',
    unitName: 'Unidade Moacyr', department: 'Almoxarifado', openedAt: '2025-06-09T06:55:00',
    requestedByName: 'Sandra Beltrão', requesterContact: null,
    responsibleTechnicianName: 'Equipe Logística', technicalTeam: 'Logística',
    status: 'waiting', priority: 'normal', source: 'external',
    expectedCompletionAt: '2025-06-09T18:00:00', escalationCount: 0,
    attendanceNotes: 'Aguardando liberação do setor de origem para coleta dos insumos.',
    resolutionStatus: null,
    materials: [],
  },
  {
    id: 'wo4', code: 'OS-2025-0414', serviceType: 'Manutenção corretiva', category: 'Redes',
    unitName: 'Hospital do Olho — JCB', department: 'Faturamento', openedAt: '2025-06-08T15:22:00',
    requestedByName: 'Renato Gomes', requesterContact: '(85) 98123-7788',
    responsibleTechnicianName: 'Carlos Andrade', technicalTeam: 'Redes',
    status: 'completed', priority: 'high', source: 'web',
    expectedCompletionAt: '2025-06-08T17:00:00', finishedAt: '2025-06-08T16:35:00', escalationCount: 0,
    attendanceNotes: 'Switch do andar reiniciado e porta reconfigurada. Conectividade restabelecida.',
    resolutionStatus: 'resolved', resolutionNotes: 'Porta 14 do switch substituída.',
    materials: [{ description: 'Patch cord Cat6 — 1,5m', quantity: 2, unit: 'UN' }],
  },
  {
    id: 'wo5', code: 'OS-2025-0411', serviceType: 'Preventiva', category: 'Equipamentos',
    unitName: 'Hospital do Olho — JCB', department: 'Diagnóstico', openedAt: '2025-06-08T10:05:00',
    requestedByName: 'Dra. Helena Castro', requesterContact: '(85) 99440-1190',
    responsibleTechnicianName: 'Júlia Tavares', technicalTeam: 'Suporte TI',
    status: 'delivered', priority: 'normal', source: 'web',
    expectedCompletionAt: '2025-06-08T14:00:00', finishedAt: '2025-06-08T13:10:00', escalationCount: 0,
    attendanceNotes: 'Limpeza e atualização do firmware da estação de captura. Entregue ao setor.',
    resolutionStatus: 'resolved',
    materials: [],
  },
  {
    id: 'wo6', code: 'OS-2025-0409', serviceType: 'Suporte software', category: 'TI / Sistemas',
    unitName: 'Unidade Moacyr', department: 'Administrativo', openedAt: '2025-06-07T09:18:00',
    requestedByName: 'Felipe Moura', requesterContact: null,
    responsibleTechnicianName: null, technicalTeam: 'Suporte TI',
    status: 'cancelled', priority: 'low', source: 'whatsapp',
    expectedCompletionAt: null, escalationCount: 0,
    attendanceNotes: 'Solicitante resolveu por conta própria. OS cancelada.',
    resolutionStatus: 'unresolved',
    materials: [],
  },
];

const WO_STATS = { totalGlobal: 1284, openedToday: 12, completedToday: 7, activeNow: 18, overdue: 3 };

// Activity timeline for a WO detail
const WO_TIMELINE = {
  wo1: [
    { at: '08:12', label: 'OS aberta via WhatsApp', by: 'Enf. Patrícia Lemos', tone: 'open' },
    { at: '08:21', label: 'Atribuída a Carlos Andrade', by: 'Triagem automática', tone: 'open' },
    { at: '08:40', label: 'Escalada — prioridade urgente', by: 'Sistema', tone: 'waiting' },
    { at: '09:05', label: 'Atendimento iniciado', by: 'Carlos Andrade', tone: 'in_progress' },
  ],
};

// ── Inventory (type InventoryItem) ──────────────────────────────────────────
const INVENTORY = [
  {
    id: 'it1', sku: 'TI-NTB-0231', name: 'Notebook Dell Latitude 3420', itemType: 'equipment',
    primaryType: 'EQUIPAMENTO', category: 'EQUIPAMENTO', unit: 'UN',
    currentQty: 1, minQty: 0, maxQty: 0, assetTag: 'HMOJCB-002311', serialNumber: 'BR7K2L3',
    currentLocation: 'Faturamento — Sala 4', brand: 'Dell', model: 'Latitude 3420',
    equipmentStatus: 'FUNCIONANDO', operatingSystem: 'Windows 11 Pro',
    technicalSpecs: [
      { key: 'PROCESSADOR', value: 'INTEL CORE I5 1135G7' },
      { key: 'MEMORIA RAM', value: 'DDR4 8GB 1X' },
      { key: 'ARMAZENAMENTO', value: 'SSD NVME 256GB 1X' },
    ],
    notes: 'Patrimônio etiquetado. Em uso pela equipe de faturamento.',
  },
  {
    id: 'it2', sku: 'TI-MON-0102', name: 'Monitor LG 24" Full HD', itemType: 'equipment',
    primaryType: 'EQUIPAMENTO', category: 'EQUIPAMENTO', unit: 'UN',
    currentQty: 1, minQty: 0, maxQty: 0, assetTag: 'HMOJCB-001029', serialNumber: '208NTRA9',
    currentLocation: 'Centro Cirúrgico — Mapa', brand: 'LG', model: '24MK430H',
    equipmentStatus: 'EM MANUTENCAO', operatingSystem: null,
    technicalSpecs: [
      { key: 'POLEGADAS', value: '24"' },
      { key: 'RESOLUCAO', value: '1920x1080' },
      { key: 'PORTAS', value: '1x HDMI' },
    ],
    notes: 'Sem sinal de vídeo. Vinculado à OS-2025-0418.',
  },
  {
    id: 'it3', name: 'Cabo HDMI 2.0 — 3m', sku: 'MAT-CAB-0440', itemType: 'consumable',
    primaryType: 'MATERIAL', category: 'MATERIAL', unit: 'UN',
    currentQty: 3, minQty: 10, maxQty: 60, assetTag: null, serialNumber: null,
    currentLocation: 'Almoxarifado TI — Prateleira B2', brand: 'Multilaser', model: null,
    equipmentStatus: null, operatingSystem: null,
    technicalSpecs: [],
    notes: 'Consumo recorrente em OS de manutenção.',
  },
  {
    id: 'it4', name: 'Patch cord Cat6 — 1,5m', sku: 'MAT-RDE-0220', itemType: 'consumable',
    primaryType: 'MATERIAL', category: 'MATERIAL', unit: 'UN',
    currentQty: 14, minQty: 12, maxQty: 80, assetTag: null, serialNumber: null,
    currentLocation: 'Almoxarifado TI — Prateleira B1', brand: 'Furukawa', model: null,
    equipmentStatus: null, operatingSystem: null,
    technicalSpecs: [],
    notes: '',
  },
  {
    id: 'it5', name: 'Toner HP 26A Preto', sku: 'SUP-TON-0078', itemType: 'consumable',
    primaryType: 'SUPRIMENTO', category: 'SUPRIMENTO', unit: 'UN',
    currentQty: 6, minQty: 8, maxQty: 24, assetTag: null, serialNumber: null,
    currentLocation: 'Almoxarifado Central — A4', brand: 'HP', model: 'CF226A',
    equipmentStatus: null, operatingSystem: null,
    technicalSpecs: [],
    notes: 'Compatível com LaserJet Pro M402.',
  },
  {
    id: 'it6', name: 'Mouse óptico USB', sku: 'PER-MOU-0345', itemType: 'consumable',
    primaryType: 'PERIFERICO', category: 'PERIFERICO', unit: 'UN',
    currentQty: 22, minQty: 10, maxQty: 50, assetTag: null, serialNumber: null,
    currentLocation: 'Almoxarifado TI — Prateleira C3', brand: 'Logitech', model: 'B100',
    equipmentStatus: null, operatingSystem: null,
    technicalSpecs: [{ key: 'PORTAS', value: '1x USB' }],
    notes: '',
  },
  {
    id: 'it7', name: 'Chave de fenda de precisão (kit)', sku: 'FER-KIT-0011', itemType: 'consumable',
    primaryType: 'FERRAMENTA', category: 'FERRAMENTA', unit: 'UN',
    currentQty: 4, minQty: 2, maxQty: 8, assetTag: null, serialNumber: null,
    currentLocation: 'Bancada TI', brand: 'Sata', model: '24-em-1',
    equipmentStatus: null, operatingSystem: null,
    technicalSpecs: [],
    notes: 'Ferramenta de bancada para manutenção de hardware.',
  },
  {
    id: 'it8', name: 'Impressora térmica Zebra ZD220', sku: 'TI-IMP-0067', itemType: 'equipment',
    primaryType: 'EQUIPAMENTO', category: 'EQUIPAMENTO', unit: 'UN',
    currentQty: 1, minQty: 0, maxQty: 0, assetTag: 'HMOJCB-000674', serialNumber: 'ZD2K88X1',
    currentLocation: 'Estoque TI — aguardando instalação', brand: 'Zebra', model: 'ZD220',
    equipmentStatus: 'AGUARDANDO INSTALACAO', operatingSystem: null,
    technicalSpecs: [{ key: 'VELOCIDADE', value: '152MM/S' }, { key: 'RESOLUCAO', value: '203DPI' }],
    notes: 'Vinculada à OS-2025-0417 (instalação na recepção).',
  },
];

const INV_STATS = { totalItems: 612, lowStock: 9, equipment: 184, inMaintenance: 5 };

// ── Movements (type Movement) ───────────────────────────────────────────────
const MOVEMENTS = [
  { id: 'm1', itemName: 'Cabo HDMI 2.0 — 3m', movementType: 'out', qty: 1, sourceKind: 'work_order', sourceLabel: 'OS-2025-0418', userName: 'Carlos Andrade', createdAt: '2025-06-09T09:08:00' },
  { id: 'm2', itemName: 'Patch cord Cat6 — 1,5m', movementType: 'out', qty: 2, sourceKind: 'work_order', sourceLabel: 'OS-2025-0414', userName: 'Carlos Andrade', createdAt: '2025-06-08T16:30:00' },
  { id: 'm3', itemName: 'Toner HP 26A Preto', movementType: 'in', qty: 12, sourceKind: 'restock', sourceLabel: 'PR-2025-0091', userName: 'Almox. Central', createdAt: '2025-06-08T11:02:00' },
  { id: 'm4', itemName: 'Mouse óptico USB', movementType: 'transfer', qty: 5, sourceKind: 'internal_unit', sourceLabel: 'Unidade Moacyr', userName: 'Sandra Beltrão', createdAt: '2025-06-07T14:45:00' },
  { id: 'm5', itemName: 'Notebook Dell Latitude 3420', movementType: 'adjustment', qty: 1, sourceKind: 'adjustment', sourceLabel: 'Inventário físico', userName: 'Júlia Tavares', createdAt: '2025-06-07T09:20:00' },
  { id: 'm6', itemName: 'Cabo HDMI 2.0 — 3m', movementType: 'in', qty: 20, sourceKind: 'supplier', sourceLabel: 'TechSupri LTDA', userName: 'Almox. TI', createdAt: '2025-06-06T08:15:00' },
];

// ── Restock orders (type RestockOrder) ──────────────────────────────────────
const RESTOCK = [
  {
    id: 'r1', code: 'PR-2025-0094', supplierName: 'TechSupri LTDA', status: 'sent',
    expectedAt: '2025-06-12', createdByName: 'Júlia Tavares', createdAt: '2025-06-09',
    items: [
      { itemName: 'Cabo HDMI 2.0 — 3m', qtyOrdered: 30, qtyReceived: 0, unitPrice: 18.9 },
      { itemName: 'Toner HP 26A Preto', qtyOrdered: 12, qtyReceived: 0, unitPrice: 142.0 },
    ],
  },
  {
    id: 'r2', code: 'PR-2025-0092', supplierName: 'Unidade Moacyr', status: 'partially_received',
    expectedAt: '2025-06-10', createdByName: 'Sandra Beltrão', createdAt: '2025-06-08',
    items: [
      { itemName: 'Patch cord Cat6 — 1,5m', qtyOrdered: 40, qtyReceived: 20, unitPrice: null },
    ],
  },
  {
    id: 'r3', code: 'PR-2025-0091', supplierName: 'Office Print Distribuidora', status: 'received',
    expectedAt: '2025-06-08', createdByName: 'Almox. Central', createdAt: '2025-06-06',
    items: [
      { itemName: 'Toner HP 26A Preto', qtyOrdered: 12, qtyReceived: 12, unitPrice: 138.5 },
    ],
  },
];

const RESTOCK_STATUS = {
  draft:              { label: 'Rascunho',          solid: '#64748B', soft: '#EEF2F7', fg: '#475569' },
  sent:               { label: 'Enviado',           solid: '#2563EB', soft: '#EAF1FE', fg: '#1D4ED8' },
  partially_received: { label: 'Recebido parcial',  solid: '#CA8A04', soft: '#FEF7E0', fg: '#A16207' },
  received:           { label: 'Recebido',          solid: '#059669', soft: '#E6F6EF', fg: '#047857' },
  cancelled:          { label: 'Cancelado',         solid: '#DC2626', soft: '#FDECEC', fg: '#B91C1C' },
};

// ── Helpers ─────────────────────────────────────────────────────────────────
function stockStatusOf(item) {
  if (item.itemType === 'equipment') {
    const s = (item.equipmentStatus || '').toUpperCase();
    if (s.includes('NAO FUNC') || s.includes('DEFEIT')) return STOCK_TONE.defeito;
    if (s.includes('MANUT') || s.includes('AGUARD')) return STOCK_TONE.manutencao;
    if (s.includes('BAIX')) return STOCK_TONE.baixado;
    return STOCK_TONE.funcionando;
  }
  if (item.minQty <= 0) return STOCK_TONE.normal;
  if (item.currentQty < item.minQty) return STOCK_TONE.baixo;
  if (item.currentQty < item.minQty * 1.2) return STOCK_TONE.atencao;
  return STOCK_TONE.normal;
}

function fmtTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}
function relDay(iso) {
  if (!iso) return '';
  const d = new Date(iso); const now = new Date('2025-06-09T10:00:00');
  const days = Math.floor((now - d) / 86400000);
  if (days <= 0) return 'Hoje';
  if (days === 1) return 'Ontem';
  return `Há ${days} dias`;
}

Object.assign(window, {
  WORK_ORDERS, WO_STATS, WO_TIMELINE, INVENTORY, INV_STATS, MOVEMENTS, RESTOCK, RESTOCK_STATUS,
  stockStatusOf, fmtTime, fmtDate, relDay,
});
