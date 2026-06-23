// ScandexPRO Mobile — Inventário module

// ── Item card ───────────────────────────────────────────────────────────────
function InvCard({ item, cfg, onOpen }) {
  const tone = stockStatusOf(item);
  const ty = INV_TYPE[item.primaryType];
  const isEquip = item.itemType === 'equipment';
  const low = !isEquip && item.minQty > 0 && item.currentQty < item.minQty;
  const pct = item.maxQty > 0 ? Math.min(100, Math.round((item.currentQty / item.maxQty) * 100))
    : item.minQty > 0 ? Math.min(100, Math.round((item.currentQty / (item.minQty * 1.5)) * 100)) : 100;

  return (
    <button onClick={() => onOpen(item)} style={{
      width: '100%', textAlign: 'left', cursor: 'pointer', display: 'block',
      background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 13,
      boxShadow: cfg.cardStyle === 'elevated' ? '0 1px 3px rgba(15,23,42,.06), 0 6px 16px -8px rgba(15,23,42,.12)' : 'none',
      fontFamily: T.font, marginBottom: 10,
    }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 11, flexShrink: 0,
          background: `${cfg.accent}12`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={ty.icon} size={21} color={cfg.accent} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontSize: 14.5, fontWeight: 600, color: T.text, lineHeight: 1.3 }}>{item.name}</span>
            <Badge tone={tone} style={cfg.badgeStyle} size="sm" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 4 }}>
            <span style={{ fontSize: 11.5, color: cfg.accent, fontWeight: 600, fontFamily: T.font }}>{item.sku || item.assetTag}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: T.faint }} />
            <span style={{ fontSize: 11.5, color: T.faint }}>{ty.label}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 7 }}>
            <Icon name="map-pin" size={13} color={T.faint} />
            <span style={{ fontSize: 12, color: T.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.currentLocation || 'Sem localização'}</span>
          </div>
        </div>
      </div>
      {/* qty bar for consumables */}
      {!isEquip && (
        <div style={{ marginTop: 11, paddingTop: 11, borderTop: `1px solid ${T.surfaceMuted}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: T.muted }}>
              <b style={{ color: low ? T.danger : T.text, fontSize: 14 }}>{item.currentQty}</b> {item.unit} em estoque
            </span>
            <span style={{ fontSize: 11.5, color: T.faint }}>mín. {item.minQty}</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: T.surfaceMuted, overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', borderRadius: 3, background: tone.solid }} />
          </div>
        </div>
      )}
      {isEquip && (
        <div style={{ marginTop: 11, paddingTop: 11, borderTop: `1px solid ${T.surfaceMuted}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="hash" size={13} color={T.faint} />
          <span style={{ fontSize: 12, color: T.muted }}>{item.brand} {item.model} · Série {item.serialNumber}</span>
        </div>
      )}
    </button>
  );
}

// ── Movement row ────────────────────────────────────────────────────────────
function MovementRow({ m }) {
  const tone = MOVE_TONE[m.movementType];
  const sign = m.movementType === 'in' ? '+' : m.movementType === 'out' ? '−' : '±';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: `1px solid ${T.surfaceMuted}` }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: `${tone.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={tone.icon} size={17} color={tone.color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.itemName}</div>
        <div style={{ fontSize: 11.5, color: T.faint, marginTop: 1 }}>{tone.label} · {m.sourceLabel} · {fmtDate(m.createdAt)} {fmtTime(m.createdAt)}</div>
      </div>
      <span style={{ fontSize: 14, fontWeight: 700, color: tone.color, flexShrink: 0 }}>{sign}{m.qty}</span>
    </div>
  );
}

// ── Restock row ─────────────────────────────────────────────────────────────
function RestockCard({ r, cfg }) {
  const tone = RESTOCK_STATUS[r.status];
  const totalOrdered = r.items.reduce((s, i) => s + i.qtyOrdered, 0);
  const totalReceived = r.items.reduce((s, i) => s + i.qtyReceived, 0);
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 13, marginBottom: 10, fontFamily: T.font }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 9 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: cfg.accent }}>{r.code}</span>
        <Badge tone={tone} style={cfg.badgeStyle} size="sm" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
        <Icon name="truck" size={14} color={T.faint} />
        <span style={{ fontSize: 12.5, color: T.muted }}>{r.supplierName}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {r.items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <span style={{ fontSize: 12.5, color: T.textSoft, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.itemName}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: it.qtyReceived >= it.qtyOrdered ? '#047857' : T.muted, flexShrink: 0 }}>{it.qtyReceived}/{it.qtyOrdered}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 11, paddingTop: 10, borderTop: `1px solid ${T.surfaceMuted}` }}>
        <span style={{ fontSize: 11.5, color: T.faint, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <Icon name="calendar" size={12} color={T.faint} /> Prev. {new Date(r.expectedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
        </span>
        {r.status !== 'received' && r.status !== 'cancelled' && (
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 9, border: 'none', cursor: 'pointer', background: `${cfg.accent}14`, color: cfg.accent, fontSize: 12, fontWeight: 700, fontFamily: T.font }}>
            <Icon name="check" size={13} color={cfg.accent} /> Receber
          </button>
        )}
      </div>
    </div>
  );
}

// ── Inventory screen (read-only): list + scan entry ─────────────────────────
function InventoryScreen({ cfg, onOpen, onScan }) {
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('all');

  const counts = React.useMemo(() => {
    const c = { all: INVENTORY.length };
    INVENTORY.forEach(i => { c[i.primaryType] = (c[i.primaryType] || 0) + 1; });
    return c;
  }, []);
  const chips = [
    { key: 'all', label: 'Todos', count: counts.all },
    { key: 'EQUIPAMENTO', label: 'Equipamentos', count: counts.EQUIPAMENTO },
    { key: 'MATERIAL', label: 'Materiais', count: counts.MATERIAL },
    { key: 'SUPRIMENTO', label: 'Suprimentos', count: counts.SUPRIMENTO },
    { key: 'PERIFERICO', label: 'Periféricos', count: counts.PERIFERICO },
    { key: 'FERRAMENTA', label: 'Ferramentas', count: counts.FERRAMENTA },
  ].filter(c => c.count);

  const list = INVENTORY.filter(i => {
    if (filter !== 'all' && i.primaryType !== filter) return false;
    if (q) {
      const t = (i.name + (i.sku || '') + (i.assetTag || '') + (i.brand || '') + (i.currentLocation || '')).toLowerCase();
      if (!t.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <ModuleScreen
      cfg={cfg}
      title="Inventário"
      subtitle={`${INV_STATS.totalItems} itens · somente consulta`}
      onNew={onScan}
      newLabel="Escanear QR Code"
      newIcon="scan"
    >
      <div style={{ padding: '4px 16px 12px' }}>
        <SearchField value={q} onChange={setQ} placeholder="Buscar item, SKU, patrimônio…" />
      </div>
      <ChipRow chips={chips} active={filter} onPick={setFilter} accent={cfg.accent} />
      <div style={{ padding: '14px 16px 24px' }}>
        {list.length === 0 ? <EmptyState icon="package" text="Nenhum item encontrado." />
          : list.map(it => <InvCard key={it.id} item={it} cfg={cfg} onOpen={onOpen} />)}
      </div>
    </ModuleScreen>
  );
}

// ── Scan view (camera QR reader → opens item) ───────────────────────────────
function ScanView({ cfg, onClose, onDetected }) {
  const [detecting, setDetecting] = React.useState(null); // item being "read"
  const scannable = INVENTORY;

  const read = (item) => {
    if (detecting) return;
    setDetecting(item);
    setTimeout(() => onDetected(item), 780);
  };

  const corner = (pos) => {
    const base = { position: 'absolute', width: 30, height: 30, border: `3px solid ${cfg.accent}` };
    const map = {
      tl: { top: -2, left: -2, borderRight: 'none', borderBottom: 'none', borderTopLeftRadius: 10 },
      tr: { top: -2, right: -2, borderLeft: 'none', borderBottom: 'none', borderTopRightRadius: 10 },
      bl: { bottom: -2, left: -2, borderRight: 'none', borderTop: 'none', borderBottomLeftRadius: 10 },
      br: { bottom: -2, right: -2, borderLeft: 'none', borderTop: 'none', borderBottomRightRadius: 10 },
    };
    return <span style={{ ...base, ...map[pos] }} />;
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 70, background: '#0A0E18', display: 'flex', flexDirection: 'column', fontFamily: T.font }}>
      <style>{`
        @keyframes sdxScanLine { 0%{ top: 6%; } 50%{ top: 88%; } 100%{ top: 6%; } }
        @keyframes sdxFadeUp { from{ opacity:0; transform: translateY(8px);} to{opacity:1; transform:none;} }
      `}</style>
      {/* faux camera environment */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 30%, #243153 0%, #131a2b 45%, #080b14 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5, background: 'repeating-linear-gradient(115deg, rgba(255,255,255,.015) 0 2px, transparent 2px 9px)' }} />

      {/* top bar */}
      <div style={{ position: 'relative', zIndex: 3, padding: '46px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onClose} style={{ width: 38, height: 38, borderRadius: 11, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="x" size={19} color="#fff" />
        </button>
        <span style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>Escanear etiqueta</span>
        <button style={{ width: 38, height: 38, borderRadius: 11, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="zap" size={18} color="#fff" />
        </button>
      </div>

      {/* viewfinder */}
      <div style={{ position: 'relative', zIndex: 3, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 24px' }}>
        <div style={{ position: 'relative', width: 234, height: 234, borderRadius: 12 }}>
          {corner('tl')}{corner('tr')}{corner('bl')}{corner('br')}
          <div style={{ position: 'absolute', inset: 6, borderRadius: 8, background: 'rgba(255,255,255,.03)' }} />
          {!detecting && (
            <div style={{ position: 'absolute', left: '5%', right: '5%', height: 2, borderRadius: 2, background: cfg.accent, boxShadow: `0 0 14px 1px ${cfg.accent}`, animation: 'sdxScanLine 2.4s ease-in-out infinite' }} />
          )}
          {detecting && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, animation: 'sdxFadeUp .2s ease' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 8px rgba(5,150,105,.18)' }}>
                <Icon name="check" size={28} color="#fff" strokeWidth={3} />
              </div>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>Etiqueta reconhecida</span>
            </div>
          )}
        </div>
        <p style={{ color: 'rgba(255,255,255,.72)', fontSize: 13.5, textAlign: 'center', lineHeight: 1.5, margin: 0, maxWidth: 240 }}>
          {detecting ? `Abrindo ${detecting.name}…` : 'Aponte a câmera para o QR Code da etiqueta do item para abrir os detalhes.'}
        </p>
      </div>

      {/* bottom sheet — simulate (prototype) */}
      <div style={{ position: 'relative', zIndex: 3, background: T.surface, borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: '16px 0 28px', boxShadow: '0 -8px 30px rgba(0,0,0,.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 16px 11px' }}>
          <Icon name="qr" size={14} color={T.faint} />
          <span style={{ fontSize: 11.5, color: T.faint, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>Simular leitura (protótipo)</span>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 16px', scrollbarWidth: 'none' }}>
          {scannable.map(it => {
            const ty = INV_TYPE[it.primaryType];
            return (
              <button key={it.id} onClick={() => read(it)} style={{
                flexShrink: 0, width: 118, textAlign: 'left', cursor: 'pointer',
                background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12, padding: 11, fontFamily: T.font,
              }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${cfg.accent}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 9 }}>
                  <Icon name={ty.icon} size={17} color={cfg.accent} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: cfg.accent, fontFamily: "'Courier New', monospace" }}>{it.assetTag || it.sku}</div>
                <div style={{ fontSize: 12, color: T.textSoft, marginTop: 3, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{it.name}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Item detail ─────────────────────────────────────────────────────────────
function InventoryDetail({ item, cfg, onBack }) {
  const tone = stockStatusOf(item);
  const ty = INV_TYPE[item.primaryType];
  const isEquip = item.itemType === 'equipment';
  const itemMoves = MOVEMENTS.filter(m => m.itemName === item.name);

  return (
    <DetailScaffold
      cfg={cfg}
      onBack={onBack}
      eyebrow={item.sku || item.assetTag || ty.label}
      title={item.name}
      badge={<Badge tone={tone} style="solid" />}
      headerExtra={
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.78)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <Icon name={ty.icon} size={14} color="rgba(255,255,255,.78)" /> {ty.label}
          </span>
          <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.78)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <Icon name="map-pin" size={14} color="rgba(255,255,255,.78)" /> {item.currentLocation}
          </span>
        </div>
      }
    >
      {/* photo placeholder */}
      <div style={{
        height: 150, borderRadius: 14, marginBottom: 12, overflow: 'hidden', position: 'relative',
        background: `repeating-linear-gradient(135deg, ${T.surfaceMuted}, ${T.surfaceMuted} 11px, #FFF 11px, #FFF 22px)`,
        border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
          <Icon name="camera" size={24} color={T.faint} />
          <span style={{ fontSize: 11.5, color: T.faint, fontFamily: "'Courier New', monospace" }}>foto do item / patrimônio</span>
        </div>
        <button style={{ position: 'absolute', bottom: 10, right: 10, display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 11px', borderRadius: 9, border: 'none', cursor: 'pointer', background: 'rgba(15,23,42,.78)', color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: T.font }}>
          <Icon name="qr" size={13} color="#fff" /> QR
        </button>
      </div>

      {/* qty / stock summary */}
      {!isEquip ? (
        <SectionCard title="Estoque">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
            <span style={{ fontSize: 34, fontWeight: 800, color: tone.solid, lineHeight: 1 }}>{item.currentQty}</span>
            <span style={{ fontSize: 14, color: T.muted, marginBottom: 3 }}>{item.unit}</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: T.surfaceMuted, overflow: 'hidden', margin: '12px 0 8px' }}>
            <div style={{ width: `${item.maxQty ? Math.min(100, (item.currentQty / item.maxQty) * 100) : 100}%`, height: '100%', background: tone.solid, borderRadius: 4 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: T.faint }}>
            <span>Mínimo {item.minQty}</span>
            <span>Máximo {item.maxQty || '—'}</span>
          </div>
        </SectionCard>
      ) : (
        <SectionCard title="Patrimônio">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <StatItem label="Etiqueta">{item.assetTag}</StatItem>
            <StatItem label="Nº de série">{item.serialNumber}</StatItem>
            <StatItem label="Marca">{item.brand}</StatItem>
            <StatItem label="Modelo">{item.model}</StatItem>
            {item.operatingSystem && <StatItem label="Sistema">{item.operatingSystem}</StatItem>}
            <StatItem label="Estado">{item.equipmentStatus}</StatItem>
          </div>
        </SectionCard>
      )}

      {item.technicalSpecs.length > 0 && (
        <SectionCard title="Especificações técnicas">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {item.technicalSpecs.map((s, i) => (
              <div key={i} style={{ background: T.surfaceMuted, borderRadius: 9, padding: '8px 11px' }}>
                <div style={{ fontSize: 10, color: T.faint, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>{s.key}</div>
                <div style={{ fontSize: 12.5, color: T.text, fontWeight: 600, marginTop: 2 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      <SectionCard title="Identificação">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <StatItem label="SKU">{item.sku || '—'}</StatItem>
          <StatItem label="Unidade">{item.unit}</StatItem>
          <StatItem label="Categoria">{ty.label}</StatItem>
          <StatItem label="Localização">{item.currentLocation || '—'}</StatItem>
        </div>
        {item.notes && (
          <div style={{ marginTop: 14, fontSize: 13, color: T.textSoft, lineHeight: 1.5, background: T.surfaceMuted, borderRadius: 10, padding: 11 }}>{item.notes}</div>
        )}
      </SectionCard>

      {itemMoves.length > 0 && (
        <SectionCard title="Histórico de movimentações">
          {itemMoves.map(m => <MovementRow key={m.id} m={m} />)}
        </SectionCard>
      )}

      <div style={{ height: 8 }} />
    </DetailScaffold>
  );
}

Object.assign(window, { InventoryScreen, ScanView, InventoryDetail, InvCard, MovementRow, RestockCard });
