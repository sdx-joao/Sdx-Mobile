// ScandexPlus Design System — Avatar
// Rounded-square initials avatar with photo fallback. Blue-tinted by default.

export const Avatar = ({ name = '', initials, src, size = 48, radius, color = 'var(--sdx-m-primary, #072AC8)', style = {} }) => {
  const r = radius != null ? radius : Math.round(size * 0.28);
  const computed = (initials != null && String(initials).trim())
    ? String(initials).trim().toUpperCase()
    : (name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?');
  return (
    <div style={{
      width: size, height: size, borderRadius: r, flexShrink: 0, overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: src ? 'transparent' : color + '14',
      border: `2px solid ${color}33`, fontFamily: "'Inter', sans-serif", ...style,
    }}>
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <span style={{ fontSize: size * 0.36, fontWeight: 800, color, lineHeight: 1 }}>{computed}</span>
      )}
    </div>
  );
};
