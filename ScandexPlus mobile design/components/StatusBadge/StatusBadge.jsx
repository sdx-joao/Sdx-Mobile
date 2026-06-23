// ScandexPlus Design System — StatusBadge
// Pill badge with a leading dot. soft (tinted) or solid (filled).

export const StatusBadge = ({ label, color = '#2563EB', variant = 'soft', dot = true, size = 'md', style = {} }) => {
  const compact = size === 'sm';
  const solid = variant === 'solid';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: compact ? '2px 8px' : '3px 10px', borderRadius: 999,
      background: solid ? color : color + '18',
      color: solid ? '#fff' : color,
      fontSize: compact ? 10.5 : 11.5, fontWeight: 600, letterSpacing: 0.1,
      whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif", ...style,
    }}>
      {dot && !solid && <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />}
      {label}
    </span>
  );
};
