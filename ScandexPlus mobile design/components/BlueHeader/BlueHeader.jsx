// ScandexPlus Design System — BlueHeader
// Institutional blue gradient header with rounded bottom corners.
// Slots: back button, eyebrow, title, subtitle, brand row, trailing action.

export const BlueHeader = ({
  title, subtitle, eyebrow, onBack, action, brand, compact = false, children, style = {},
}) => (
  <div style={{
    background: 'var(--sdx-m-header, linear-gradient(135deg, #072AC8, #051E9B))',
    color: '#fff', position: 'relative', flexShrink: 0,
    padding: compact ? '44px 16px 16px' : '46px 18px 20px',
    borderBottomLeftRadius: 'var(--sdx-m-radius-header, 22px)',
    borderBottomRightRadius: 'var(--sdx-m-radius-header, 22px)',
    boxShadow: 'var(--sdx-m-shadow-header, 0 6px 18px -8px rgba(7,40,202,.5))',
    fontFamily: "'Inter', sans-serif", ...style,
  }}>
    {brand && <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>{brand}</div>}
    {onBack && (
      <button onClick={onBack} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12,
        padding: '6px 11px 6px 7px', borderRadius: 9, border: 'none', cursor: 'pointer',
        background: 'rgba(255,255,255,.15)', color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
      }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
        Voltar
      </button>
    )}
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
      <div style={{ minWidth: 0, flex: 1 }}>
        {eyebrow && <div style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,.72)', letterSpacing: 0.3, marginBottom: 4 }}>{eyebrow}</div>}
        {title && <h1 style={{ margin: 0, fontSize: compact ? 20 : 24, fontWeight: 800, letterSpacing: -0.4, lineHeight: 1.2 }}>{title}</h1>}
        {subtitle && <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255,255,255,.78)', lineHeight: 1.45 }}>{subtitle}</p>}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
    {children}
  </div>
);
