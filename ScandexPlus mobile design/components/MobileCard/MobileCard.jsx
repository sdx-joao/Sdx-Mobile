// ScandexPlus Design System — MobileCard
// White surface, 16px radius, soft elevation. Optional accent left-border.

export const MobileCard = ({
  variant = 'elevated', accent, padding = 14, onClick, children, style = {},
}) => {
  const clickable = typeof onClick === 'function';
  return (
    <div onClick={onClick} role={clickable ? 'button' : undefined}
      style={{
        background: 'var(--sdx-m-surface, #fff)',
        border: '1px solid var(--sdx-m-border, #E2E8F2)',
        borderLeft: accent ? `3px solid ${accent}` : '1px solid var(--sdx-m-border, #E2E8F2)',
        borderRadius: 'var(--sdx-m-radius-card, 16px)', padding,
        boxShadow: variant === 'elevated' ? 'var(--sdx-m-shadow-card, 0 1px 3px rgba(15,23,42,.06), 0 6px 16px -8px rgba(15,23,42,.12))' : 'none',
        cursor: clickable ? 'pointer' : 'default', textAlign: 'left',
        fontFamily: "'Inter', sans-serif", color: 'var(--sdx-m-text, #0F172A)',
        WebkitTapHighlightColor: 'transparent', ...style,
      }}>
      {children}
    </div>
  );
};
