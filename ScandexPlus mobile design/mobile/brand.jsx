// ScandexPRO Mobile — Brand assets (logos, splash/loading screen)
// Logo files: uploads/secundaria.png (circular badge, transparent),
//             uploads/LOGO PRINCIPAL (2).png (scandex+ wordmark, white bg → light surfaces only)

const LOGO_BADGE = 'uploads/secundaria.png';
const LOGO_WORDMARK = 'uploads/LOGO PRINCIPAL (2).png';

// White squircle "app tile" holding the circular badge
function BrandTile({ size = 84, radius, badge = 0.74, shadow = true }) {
  const r = radius != null ? radius : Math.round(size * 0.27);
  return (
    <div style={{
      width: size, height: size, borderRadius: r, background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      boxShadow: shadow ? '0 14px 34px -12px rgba(0,0,0,.5)' : 'none',
    }}>
      <img src={LOGO_BADGE} alt="Scandex" style={{ width: size * badge, height: size * badge, objectFit: 'contain', display: 'block' }} />
    </div>
  );
}

// Bare circular badge (use on light surfaces; dark charcoal circle)
function BrandBadge({ size = 32 }) {
  return <img src={LOGO_BADGE} alt="Scandex" style={{ width: size, height: size, objectFit: 'contain', display: 'block', flexShrink: 0 }} />;
}

// scandex+ wordmark — ONLY on white/light backgrounds (image has white bg)
function Wordmark({ width = 132 }) {
  return <img src={LOGO_WORDMARK} alt="scandex+ Serviços Digitais" style={{ width, height: 'auto', objectFit: 'contain', display: 'block', mixBlendMode: 'multiply' }} />;
}

// "powered by" lockup inside a white pill (safe on any background)
function PoweredBy({ tone = 'light' }) {
  const light = tone === 'light';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
      <span style={{ fontSize: 12, fontStyle: 'italic', color: light ? 'rgba(255,255,255,.6)' : T.faint, fontFamily: T.font }}>powered by</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', borderRadius: 999, padding: '5px 12px 5px 6px' }}>
        <BrandBadge size={20} />
        <span style={{ fontSize: 12.5, fontWeight: 800, color: '#2B2B2B', fontFamily: T.font, letterSpacing: -0.2 }}>scandex<span style={{ color: '#3E8FBE' }}>+</span></span>
      </span>
    </div>
  );
}

// ── Splash / Loading screen ─────────────────────────────────────────────────
// Reusable stylized boot screen with the Scandex logo.
function SplashScreen({ label = 'Carregando…' }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 90, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: `radial-gradient(120% 90% at 50% 18%, ${T.primary} 0%, ${T.primaryDark} 52%, #06165F 100%)`,
      fontFamily: T.font,
    }}>
      {/* faint orbit rings */}
      <div className="sdx-ring" style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', border: '1px solid rgba(255,255,255,.06)' }} />
      <div className="sdx-ring" style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(255,255,255,.08)' }} />

      {/* logo with pulse halo */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
        <span className="sdx-pulse" style={{ position: 'absolute', width: 104, height: 104, borderRadius: 30, background: 'rgba(255,255,255,.16)' }} />
        <span className="sdx-pulse sdx-pulse-2" style={{ position: 'absolute', width: 104, height: 104, borderRadius: 30, background: 'rgba(255,255,255,.10)' }} />
        <div className="sdx-tile-float"><BrandTile size={96} /></div>
      </div>

      <h1 style={{ margin: 0, fontSize: 27, fontWeight: 800, color: '#fff', letterSpacing: -0.4 }}>ScandexPRO™</h1>
      <p style={{ margin: '7px 0 0', fontSize: 13, color: 'rgba(255,255,255,.62)' }}>Gestão de serviços e inventário</p>

      {/* indeterminate progress */}
      <div style={{ width: 168, height: 4, borderRadius: 999, background: 'rgba(255,255,255,.16)', overflow: 'hidden', marginTop: 30 }}>
        <div className="sdx-progress" style={{ height: '100%', width: '42%', borderRadius: 999, background: 'rgba(255,255,255,.95)' }} />
      </div>
      <div style={{ marginTop: 13, fontSize: 12, color: 'rgba(255,255,255,.5)', letterSpacing: 0.3 }}>{label}</div>

      {/* footer */}
      <div style={{ position: 'absolute', bottom: 38 }}>
        <PoweredBy tone="light" />
      </div>
    </div>
  );
}

Object.assign(window, { LOGO_BADGE, LOGO_WORDMARK, BrandTile, BrandBadge, Wordmark, PoweredBy, SplashScreen });
