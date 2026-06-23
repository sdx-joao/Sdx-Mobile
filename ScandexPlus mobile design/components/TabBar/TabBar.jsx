// ScandexPlus Design System — TabBar
// Bottom navigation. Active item uses the accent/primary color.

const __SDX_NS = 'ScandexPlusDesignSystem_c9a9df';

export const TabBar = ({ items = [], active, onChange, accent = 'var(--sdx-m-primary, #072AC8)', style = {} }) => {
  const Icon = (typeof window !== 'undefined' && window[__SDX_NS] && window[__SDX_NS].Icon) || null;
  return (
    <div style={{
      flexShrink: 0, background: 'var(--sdx-m-surface, #fff)',
      borderTop: '1px solid var(--sdx-m-border, #E2E8F2)',
      paddingTop: 8, paddingBottom: 20, fontFamily: "'Inter', sans-serif", ...style,
    }}>
      <div style={{ display: 'flex' }}>
        {items.map(t => {
          const on = active === t.key;
          const color = on ? accent : 'var(--sdx-m-faint, #94A3B8)';
          return (
            <button key={t.key} onClick={() => onChange && onChange(t.key)} style={{
              flex: 1, border: 'none', background: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '5px 0',
              fontFamily: 'inherit', WebkitTapHighlightColor: 'transparent',
            }}>
              {Icon && <Icon name={t.icon} size={22} color={color} strokeWidth={on ? 2.4 : 2} />}
              <span style={{ fontSize: 10.5, fontWeight: on ? 700 : 500, color }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
