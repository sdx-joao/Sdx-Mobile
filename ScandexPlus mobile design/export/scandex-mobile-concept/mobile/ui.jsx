// ScandexPRO Mobile — Theme, Icons, Primitives, Phone Shell
// Brand/data source: sdx-joao/ScandexGed + sdx-joao/Sdx-Mobile

// ── Theme (from Sdx-Mobile/src/theme/colors.ts + web globals.css) ──────────
const T = {
  primary: '#0728CA',
  primaryDark: '#051E9B',
  primaryFg: '#FFFFFF',
  teal: '#0F9488',
  bg: '#F5F7FB',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F5FB',
  text: '#0F172A',
  textSoft: '#334155',
  muted: '#64748B',
  faint: '#94A3B8',
  border: '#E2E8F2',
  borderStrong: '#D8E0EF',
  danger: '#DC2626',
  dangerSoft: '#FEE2E2',
  font: "'Inter', system-ui, -apple-system, sans-serif",
};

// Work-order status — labels + tones (mobile STATUS_LABEL + statusColors)
const WO_STATUS = {
  open:        { label: 'Aberta',       solid: '#2563EB', soft: '#EAF1FE', fg: '#1D4ED8' },
  in_progress: { label: 'Em andamento', solid: '#CA8A04', soft: '#FEF7E0', fg: '#A16207' },
  waiting:     { label: 'Aguardando',   solid: '#EA580C', soft: '#FEEFE4', fg: '#C2410C' },
  delivered:   { label: 'Entregue',     solid: '#059669', soft: '#E6F6EF', fg: '#047857' },
  completed:   { label: 'Concluída',    solid: '#059669', soft: '#E6F6EF', fg: '#047857' },
  cancelled:   { label: 'Cancelada',    solid: '#DC2626', soft: '#FDECEC', fg: '#B91C1C' },
};

const WO_PRIORITY = {
  low:    { label: 'Baixa',   color: '#64748B', soft: '#EEF2F7' },
  normal: { label: 'Normal',  color: '#2563EB', soft: '#EAF1FE' },
  high:   { label: 'Alta',    color: '#EA580C', soft: '#FEEFE4' },
  urgent: { label: 'Urgente', color: '#DC2626', soft: '#FDECEC' },
};

// Inventory primary types
const INV_TYPE = {
  EQUIPAMENTO: { label: 'Equipamento', short: 'Equip.', icon: 'monitor' },
  PERIFERICO:  { label: 'Periférico',  short: 'Perif.', icon: 'mouse' },
  FERRAMENTA:  { label: 'Ferramenta',  short: 'Ferr.',  icon: 'wrench' },
  MATERIAL:    { label: 'Material',    short: 'Mat.',   icon: 'cable' },
  SUPRIMENTO:  { label: 'Suprimento',  short: 'Supr.',  icon: 'package' },
};

// Stock status tones (getStockStatus logic)
const STOCK_TONE = {
  funcionando:    { label: 'Funcionando',     solid: '#2563EB', soft: '#EAF1FE', fg: '#1D4ED8' },
  manutencao:     { label: 'Manutenção',      solid: '#CA8A04', soft: '#FEF7E0', fg: '#A16207' },
  defeito:        { label: 'Não funcionando', solid: '#DC2626', soft: '#FDECEC', fg: '#B91C1C' },
  baixado:        { label: 'Baixado',         solid: '#64748B', soft: '#EEF2F7', fg: '#475569' },
  normal:         { label: 'Normal',          solid: '#059669', soft: '#E6F6EF', fg: '#047857' },
  atencao:        { label: 'Atenção',         solid: '#CA8A04', soft: '#FEF7E0', fg: '#A16207' },
  baixo:          { label: 'Baixo',           solid: '#DC2626', soft: '#FDECEC', fg: '#B91C1C' },
};

const MOVE_TONE = {
  in:         { label: 'Entrada',        color: '#059669', icon: 'arrow-down-circle' },
  out:        { label: 'Saída',          color: '#DC2626', icon: 'arrow-up-circle' },
  adjustment: { label: 'Ajuste',         color: '#CA8A04', icon: 'refresh' },
  transfer:   { label: 'Transferência',  color: '#2563EB', icon: 'shuffle' },
};

// ── Icons (Lucide-style stroke paths) ──────────────────────────────────────
const ICONS = {
  home: 'M3 9.5L12 3l9 6.5M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5',
  clipboard: 'M9 4h6a1 1 0 011 1v1h1a2 2 0 012 2v11a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2h1V5a1 1 0 011-1zM9 4a1 1 0 001 1h4a1 1 0 001-1',
  package: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12l8.73-5.04M12 22.08V12',
  user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M16 7a4 4 0 11-8 0 4 4 0 018 0z',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  plus: 'M12 5v14M5 12h14',
  bell: 'M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0',
  'chevron-right': 'M9 18l6-6-6-6',
  'chevron-left': 'M15 18l-6-6 6-6',
  'arrow-left': 'M19 12H5M12 19l-7-7 7-7',
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  'map-pin': 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M15 10a3 3 0 11-6 0 3 3 0 016 0z',
  wrench: 'M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.7-.4-.4-2.7 2.5-2.5z',
  clock: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2',
  alert: 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01',
  check: 'M20 6L9 17l-5-5',
  'check-circle': 'M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3',
  truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7 M5.5 18.5a2 2 0 100-4 2 2 0 000 4z M18.5 18.5a2 2 0 100-4 2 2 0 000 4z',
  box: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
  archive: 'M21 8v13H3V8M1 3h22v5H1zM10 12h4',
  'arrow-up-circle': 'M12 22a10 10 0 100-20 10 10 0 000 20zM16 12l-4-4-4 4M12 16V8',
  'arrow-down-circle': 'M12 22a10 10 0 100-20 10 10 0 000 20zM8 12l4 4 4-4M12 8v8',
  refresh: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15',
  shuffle: 'M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5',
  camera: 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z',
  qr: 'M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h3v3h-3zM21 21v.01M21 15v3M15 21h3',
  phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z',
  tag: 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01',
  layers: 'M12 2l10 6-10 6L2 8l10-6z M2 16l10 6 10-6 M2 12l10 6 10-6',
  history: 'M3 3v5h5 M3.05 13A9 9 0 106 5.3L3 8 M12 7v5l4 2',
  cpu: 'M4 4h16v16H4zM9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3',
  monitor: 'M2 3h20v14H2zM8 21h8M12 17v4',
  mouse: 'M5 9a7 7 0 0114 0v6a7 7 0 01-14 0zM12 5v4',
  cable: 'M4 9a2 2 0 012-2h2v6a2 2 0 002 2h4a2 2 0 002-2V7h2a2 2 0 012 2 M4 9v6a2 2 0 002 2M20 9v6a2 2 0 01-2 2',
  x: 'M18 6L6 18M6 6l12 12',
  calendar: 'M3 4h18v18H3zM3 10h18M8 2v4M16 2v4',
  building: 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-3M9 9v.01M9 12v.01M9 15v.01M9 18v.01',
  hash: 'M4 9h16M4 15h16M10 3L8 21M16 3l-2 18',
  cart: 'M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6',
  'trending-up': 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
  'more-vertical': 'M12 13a1 1 0 100-2 1 1 0 000 2zM12 6a1 1 0 100-2 1 1 0 000 2zM12 20a1 1 0 100-2 1 1 0 000 2z',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
  zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  logout: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
  whatsapp: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z',
  flame: 'M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z',
  scan: 'M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 12h10',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
};

function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 2, style = {} }) {
  const d = ICONS[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: 'block', ...style }}>
      {d && d.split(' M').map((seg, i) => <path key={i} d={(i === 0 ? seg : 'M' + seg)} />)}
    </svg>
  );
}

// ── Badge (pill with dot) ───────────────────────────────────────────────────
function Badge({ tone, label, style: badgeStyle = 'soft', size = 'md', dot = true }) {
  const compact = size === 'sm';
  if (badgeStyle === 'solid') {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: compact ? '2px 8px' : '3px 10px', borderRadius: 999,
        background: tone.solid, color: '#fff',
        fontSize: compact ? 10.5 : 11.5, fontWeight: 600, letterSpacing: 0.1,
        whiteSpace: 'nowrap', fontFamily: T.font,
      }}>{tone.label || label}</span>
    );
  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: compact ? '2px 8px' : '3px 10px', borderRadius: 999,
      background: tone.soft, color: tone.fg || tone.solid,
      fontSize: compact ? 10.5 : 11.5, fontWeight: 600, letterSpacing: 0.1,
      whiteSpace: 'nowrap', fontFamily: T.font,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: tone.solid }} />}
      {tone.label || label}
    </span>
  );
}

// ── Filter chips row ────────────────────────────────────────────────────────
function ChipRow({ chips, active, onPick, accent }) {
  return (
    <div style={{
      display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px 2px',
      scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
    }}>
      {chips.map(c => {
        const on = active === c.key;
        return (
          <button key={c.key} onClick={() => onPick(c.key)} style={{
            flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '7px 13px', borderRadius: 999, cursor: 'pointer',
            border: `1px solid ${on ? accent : T.border}`,
            background: on ? accent : T.surface,
            color: on ? '#fff' : T.textSoft,
            fontSize: 12.5, fontWeight: 600, fontFamily: T.font, whiteSpace: 'nowrap',
            transition: 'all .15s',
          }}>
            {c.label}
            {c.count != null && (
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '0 5px', borderRadius: 999, minWidth: 16,
                background: on ? 'rgba(255,255,255,.25)' : T.surfaceMuted,
                color: on ? '#fff' : T.muted,
              }}>{c.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Search field ────────────────────────────────────────────────────────────
function SearchField({ value, onChange, placeholder }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px',
      height: 42, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12,
    }}>
      <Icon name="search" size={17} color={T.faint} />
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontSize: 14, fontFamily: T.font, color: T.text,
        }} />
      {value && (
        <button onClick={() => onChange('')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, display: 'flex' }}>
          <Icon name="x" size={15} color={T.faint} />
        </button>
      )}
    </div>
  );
}

// ── Phone shell (custom ScandexPRO frame) ───────────────────────────────────
function StatusBar({ dark }) {
  const c = dark ? '#fff' : T.text;
  return (
    <div style={{
      height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 18px 0 22px', position: 'relative', flexShrink: 0,
      background: 'transparent',
    }}>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: c, fontFamily: T.font, letterSpacing: 0.2 }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={c}><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="4.5" y="4.5" width="3" height="7.5" rx="1"/><rect x="9" y="2" width="3" height="10" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={c}><path d="M8 2.2c2 0 3.8.8 5.1 2.1l1.1-1.2A9 9 0 0 0 8 .5 9 9 0 0 0 1.8 3.1l1.1 1.2A7.2 7.2 0 0 1 8 2.2zM8 5.6c1.1 0 2.1.4 2.8 1.2l1.1-1.2A5.7 5.7 0 0 0 8 4a5.7 5.7 0 0 0-3.9 1.6l1.1 1.2A4 4 0 0 1 8 5.6zM8 9l1.9-2A2.7 2.7 0 0 0 8 6.4 2.7 2.7 0 0 0 6.1 7z"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.7" y="0.7" width="21" height="10.6" rx="2.7" stroke={c} strokeOpacity="0.4"/><rect x="2.2" y="2.2" width="16" height="7.6" rx="1.5" fill={c}/><rect x="23" y="4" width="1.5" height="4" rx="0.75" fill={c} fillOpacity="0.5"/></svg>
      </div>
    </div>
  );
}

function PhoneFrame({ children, dark, statusDark }) {
  return (
    <div style={{
      width: 390, height: 844, borderRadius: 46, padding: 5, flexShrink: 0,
      background: 'linear-gradient(150deg,#2b3550,#0c1326)',
      boxShadow: '0 40px 90px -20px rgba(15,23,42,.55), 0 0 0 1px rgba(255,255,255,.04)',
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: 41, overflow: 'hidden',
        background: dark ? '#0B1020' : T.bg, position: 'relative',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50, pointerEvents: 'none',
        }}>
          <StatusBar dark={statusDark} />
        </div>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, {
  T, WO_STATUS, WO_PRIORITY, INV_TYPE, STOCK_TONE, MOVE_TONE,
  Icon, Badge, ChipRow, SearchField, PhoneFrame, StatusBar,
});
