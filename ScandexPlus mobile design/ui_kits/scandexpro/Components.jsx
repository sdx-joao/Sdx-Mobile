// ScandexPRO UI Kit — Shared Primitives
// Exported to window for use by other components

const SDX_COLORS = {
  primary: '#245594',
  primaryDark: '#1b3f6e',
  teal: '#4DB6AC',
  white: '#ffffff',
  bg: '#f4f7fc',
  card: '#ffffff',
  border: '#dce8f5',
  muted: '#f4f7fc',
  mutedFg: '#8a9db8',
  fg: '#1e2d42',
  destructive: 'hsl(0, 84.2%, 60.2%)',
};

// ── Button ────────────────────────────────────────────────────
const SDXButton = ({ variant = 'primary', size = 'md', children, onClick, disabled, style = {}, className = '' }) => {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer',
    border: '1px solid transparent', borderRadius: 8, transition: 'all 0.15s',
    opacity: disabled ? 0.5 : 1,
    padding: size === 'sm' ? '5px 12px' : size === 'lg' ? '10px 20px' : '8px 16px',
    fontSize: size === 'sm' ? 12 : 13,
  };
  const variants = {
    primary: { background: SDX_COLORS.primary, color: '#fff' },
    destructive: { background: SDX_COLORS.destructive, color: '#fff' },
    outline: { background: '#fff', color: SDX_COLORS.fg, borderColor: SDX_COLORS.border },
    ghost: { background: 'transparent', color: SDX_COLORS.fg },
    secondary: { background: SDX_COLORS.muted, color: SDX_COLORS.fg },
    accent: { background: SDX_COLORS.teal, color: '#fff' },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...style }} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

// ── Input ─────────────────────────────────────────────────────
const SDXInput = ({ label, placeholder, value, onChange, type = 'text', error }) => (
  <div style={{ marginBottom: 12 }}>
    {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4, color: SDX_COLORS.fg }}>{label}</label>}
    <input
      type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={{
        width: '100%', boxSizing: 'border-box', padding: '8px 10px',
        background: '#e5e7eb', border: `1px solid ${error ? SDX_COLORS.destructive : '#9ca3af'}`,
        borderRadius: 6, fontSize: 13, fontFamily: 'Inter, sans-serif',
        color: '#111827', outline: 'none',
      }}
    />
    {error && <div style={{ fontSize: 11, color: SDX_COLORS.destructive, marginTop: 3 }}>{error}</div>}
  </div>
);

// ── Badge ─────────────────────────────────────────────────────
const ROLE_STYLES = {
  SuperAdministrador: { background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' },
  Admin: { background: '#ede9fe', color: '#5b21b6', border: '1px solid #c4b5fd' },
  Gerente: { background: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7' },
  User: { background: '#dbeafe', color: '#1e40af', border: '1px solid #93c5fd' },
  Colaborador: { background: SDX_COLORS.muted, color: '#374151', border: `1px solid ${SDX_COLORS.border}` },
};
const ROLE_LABELS = {
  SuperAdministrador: 'Super Admin', Admin: 'Admin',
  Gerente: 'Gerente', User: 'Usuário', Colaborador: 'Colaborador',
};
const SDXRoleBadge = ({ role }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', padding: '2px 7px',
    borderRadius: 4, fontSize: 10, fontWeight: 700,
    letterSpacing: '.05em', textTransform: 'uppercase',
    fontFamily: 'Inter, sans-serif',
    ...(ROLE_STYLES[role] || ROLE_STYLES.Colaborador),
  }}>
    {ROLE_LABELS[role] || role}
  </span>
);

const SDXBadge = ({ children, variant = 'secondary' }) => {
  const styles = {
    secondary: { background: SDX_COLORS.muted, color: SDX_COLORS.fg },
    outline: { background: 'transparent', border: `1px solid ${SDX_COLORS.border}`, color: SDX_COLORS.fg },
    success: { background: '#d1fae5', color: '#065f46' },
    destructive: { background: SDX_COLORS.destructive, color: '#fff' },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '2px 7px',
      borderRadius: 4, fontSize: 10, fontWeight: 600,
      fontFamily: 'Inter, sans-serif',
      ...styles[variant],
    }}>{children}</span>
  );
};

// ── Card ──────────────────────────────────────────────────────
const SDXCard = ({ children, style = {} }) => (
  <div style={{
    background: '#fff', borderRadius: 8,
    border: `1px solid ${SDX_COLORS.border}`,
    boxShadow: '0 4px 6px -1px rgb(0 0 0/.1), 0 2px 4px -2px rgb(0 0 0/.1)',
    overflow: 'hidden', ...style,
  }}>{children}</div>
);

// ── Status dot ────────────────────────────────────────────────
const STATUS_COLORS = {
  available:   { bg: '#34d399', border: '#059669' },
  absent:      { bg: '#f87171', border: '#dc2626' },
  missing_info:{ bg: '#fb923c', border: '#ea580c' },
  processing:  { bg: '#60a5fa', border: '#2563eb' },
  altered:     { bg: '#facc15', border: '#ca8a04' },
};
const SDXStatusDot = ({ status, size = 10 }) => {
  const c = STATUS_COLORS[status] || STATUS_COLORS.absent;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: c.bg, border: `2px solid ${c.border}`,
      boxShadow: '0 1px 3px rgb(0 0 0/.2)',
    }} />
  );
};

// ── Avatar ────────────────────────────────────────────────────
const SDXAvatar = ({ name = '', size = 32, src }) => {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'U';
  return (
    <div style={{
      width: size, height: size, borderRadius: 6, overflow: 'hidden', flexShrink: 0,
      background: 'rgba(7,42,200,0.15)', border: '1.5px solid rgba(7,42,200,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 700, color: SDX_COLORS.primary,
    }}>
      {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
    </div>
  );
};

// ── Toast (simple inline) ─────────────────────────────────────
const SDXToast = ({ title, desc, variant = 'default', onClose }) => {
  const bg = variant === 'destructive' ? '#fef2f2' : variant === 'accent' ? '#f0fdf4' : '#fff';
  const border = variant === 'destructive' ? '#fca5a5' : variant === 'accent' ? '#86efac' : SDX_COLORS.border;
  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 999,
      background: bg, border: `1px solid ${border}`, borderRadius: 10,
      padding: '12px 16px', boxShadow: '0 10px 25px rgb(0 0 0/.15)',
      minWidth: 260, maxWidth: 360, fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: SDX_COLORS.fg }}>{title}</div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: SDX_COLORS.mutedFg, lineHeight: 1 }}>×</button>
      </div>
      {desc && <div style={{ fontSize: 12, color: SDX_COLORS.mutedFg, marginTop: 3 }}>{desc}</div>}
    </div>
  );
};

// ── Lucide-like SVG Icons ─────────────────────────────────────
const Icon = ({ path, size = 16, color = 'currentColor', ...paths }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path && <path d={path} />}
    {Object.entries(paths).map(([tag, d], i) => {
      if (tag === 'circle') return <circle key={i} {...d} />;
      if (tag === 'line') return <line key={i} {...d} />;
      if (tag === 'polyline') return <polyline key={i} points={d} />;
      if (tag === 'rect') return <rect key={i} {...d} />;
      return <path key={i} d={d} />;
    })}
  </svg>
);

// Export to window
Object.assign(window, {
  SDX_COLORS, SDXButton, SDXInput, SDXCard, SDXRoleBadge, SDXBadge,
  SDXStatusDot, SDXAvatar, SDXToast, Icon, ROLE_LABELS, ROLE_STYLES, STATUS_COLORS,
});
