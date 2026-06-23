// ScandexPlus Design System — SearchField
// Mobile text field: leading icon, focus ring, optional valid (green) state.

const SDX_SEARCH_ICON = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);

export const SearchField = ({
  value = '', onChange, placeholder = '', type = 'text', inputMode,
  leading = SDX_SEARCH_ICON, valid = false, clearable = false, style = {},
}) => {
  const [focused, setFocused] = React.useState(false);
  const borderColor = focused ? 'var(--sdx-m-primary, #072AC8)'
    : valid ? 'var(--sdx-m-doc-available, #10B981)' : 'var(--sdx-m-border, #E2E8F2)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      height: 'var(--sdx-m-field-height, 54px)', padding: '0 14px',
      background: 'var(--sdx-m-surface, #fff)', borderRadius: 'var(--sdx-m-radius-field, 14px)',
      border: `1.5px solid ${borderColor}`,
      boxShadow: focused ? '0 0 0 4px rgba(7,42,200,.1)' : 'none',
      transition: 'border-color .15s, box-shadow .15s', fontFamily: "'Inter', sans-serif", ...style,
    }}>
      <span style={{ color: focused ? 'var(--sdx-m-primary, #072AC8)' : 'var(--sdx-m-faint, #94A3B8)', display: 'flex' }}>{leading}</span>
      <input
        value={value} onChange={e => onChange && onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        type={type} inputMode={inputMode} placeholder={placeholder}
        style={{
          flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
          fontSize: 16, fontWeight: 600, fontFamily: 'inherit', color: 'var(--sdx-m-text, #0F172A)', letterSpacing: 0.3,
        }} />
      {valid && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--sdx-m-doc-available, #10B981)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
      )}
      {clearable && value && !valid && (
        <button onClick={() => onChange && onChange('')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, display: 'flex', color: 'var(--sdx-m-faint, #94A3B8)' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
};
