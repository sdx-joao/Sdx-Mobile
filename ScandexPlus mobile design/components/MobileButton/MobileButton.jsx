// ScandexPlus Design System — MobileButton
// Touch-first button. Primary uses the institutional blue gradient.

export const MobileButton = ({
  variant = 'primary', size = 'lg', fullWidth = false,
  disabled = false, loading = false, onClick, children, style = {},
}) => {
  const heights = { sm: 40, md: 46, lg: 52 };
  const fonts = { sm: 13.5, md: 14.5, lg: 15.5 };
  const h = heights[size] || 52;

  const variants = {
    primary: {
      background: disabled ? 'var(--sdx-m-border-strong, #D8E0EF)'
        : 'var(--sdx-m-header, linear-gradient(135deg, #072AC8, #051E9B))',
      color: '#fff', border: '1px solid transparent',
      boxShadow: disabled ? 'none' : '0 10px 24px -10px rgba(7,42,200,.6)',
    },
    secondary: { background: 'var(--sdx-m-surface-muted, #F1F5FB)', color: 'var(--sdx-m-text, #0F172A)', border: '1px solid transparent', boxShadow: 'none' },
    outline: { background: 'var(--sdx-m-surface, #fff)', color: 'var(--sdx-m-text-soft, #334155)', border: '1px solid var(--sdx-m-border, #E2E8F2)', boxShadow: 'none' },
    ghost: { background: 'transparent', color: 'var(--sdx-m-primary, #072AC8)', border: '1px solid transparent', boxShadow: 'none' },
    danger: { background: 'var(--sdx-m-danger, #DC2626)', color: '#fff', border: '1px solid transparent', boxShadow: '0 10px 24px -10px rgba(220,38,38,.55)' },
  };

  return (
    <button onClick={disabled || loading ? undefined : onClick} disabled={disabled || loading}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
        width: fullWidth ? '100%' : 'auto', height: h, padding: fullWidth ? 0 : '0 22px',
        borderRadius: 'var(--sdx-m-radius-btn, 14px)', cursor: disabled || loading ? 'default' : 'pointer',
        fontFamily: "'Inter', sans-serif", fontSize: fonts[size] || 15.5, fontWeight: 700, letterSpacing: 0.1,
        opacity: disabled ? 0.85 : 1, transition: 'transform .12s, box-shadow .2s', WebkitTapHighlightColor: 'transparent',
        ...variants[variant], ...style,
      }}>
      {loading ? (
        <span style={{ width: 19, height: 19, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,.4)', borderTopColor: '#fff', animation: 'sdxmSpin .7s linear infinite' }} />
      ) : children}
      <style>{'@keyframes sdxmSpin{to{transform:rotate(360deg)}}'}</style>
    </button>
  );
};
