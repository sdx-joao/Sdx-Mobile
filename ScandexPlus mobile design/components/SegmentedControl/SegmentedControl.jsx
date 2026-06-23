// ScandexPlus Design System — SegmentedControl
// Mobile tab/segmented control. Active segment fills with primary.
// Use for app selectors and status tabs (Todas / Realizadas / Canceladas).

export const SegmentedControl = ({ options = [], value, onChange, size = 'md', style = {} }) => {
  const h = size === 'sm' ? 36 : size === 'lg' ? 44 : 40;
  return (
    <div style={{
      display: 'flex', background: 'var(--sdx-m-surface-muted, #F1F5FB)',
      borderRadius: 12, padding: 4, gap: 2, fontFamily: "'Inter', sans-serif", ...style,
    }}>
      {options.map(o => {
        const on = value === o.key;
        return (
          <button key={o.key} onClick={() => onChange && onChange(o.key)} style={{
            flex: 1, height: h, borderRadius: 9, border: 'none', cursor: 'pointer',
            background: on ? 'var(--sdx-m-primary, #072AC8)' : 'transparent',
            color: on ? '#fff' : 'var(--sdx-m-muted, #64748B)',
            fontSize: size === 'sm' ? 12 : 12.5, fontWeight: 700, fontFamily: 'inherit',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            transition: 'background .15s, color .15s', WebkitTapHighlightColor: 'transparent',
          }}>
            {o.label}
            {o.count != null && <span style={{ fontSize: 11, fontWeight: 700, opacity: on ? 0.9 : 0.7 }}>{o.count}</span>}
          </button>
        );
      })}
    </div>
  );
};
