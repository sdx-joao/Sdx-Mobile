// V2.1 — Refined tech corporate landing for Scandex+
// Focus areas: typography polish, big numbers section, ScandexPRO solution block,
// headline copy variations, micro-interactions, tweakable.

const COLORS = {
  blue: '#3B7BA8',
  blueDeep: '#2E6388',
  blueLight: '#9CC8D6',
  blueTint: '#EAF2F6',
  ink: '#0F1620',
  inkSoft: '#5A6573',
  line: '#E2E8EE',
  paper: '#F6F7F9',
};

// Headline copy variations
const HEADLINES = {
  controle: {
    eyebrow: 'Nova marca · Equipe sênior em digitalização',
    h1: ['Gestão.', 'Memória.', 'Conformidade.'],
    accent: 'Sob controle',
    sub: 'Empresa recém-fundada por profissionais com mais de uma década digitalizando arquivos do setor público e privado. +1 milhão de documentos digitalizados na trajetória da equipe — agora com tecnologia própria.',
  },
  papel: {
    eyebrow: 'Da gaveta · Para a nuvem · Sem perder o histórico',
    h1: ['Tira o papel.', 'Mantém a história.', 'Acelera o trabalho.'],
    accent: 'Digital de verdade',
    sub: 'Anos digitalizando arquivos públicos e privados — agora com software próprio. Capturamos, indexamos e devolvemos sua operação consultável em segundos.',
  },
  futuro: {
    eyebrow: 'Especialistas em GED · Tecnologia que entende auditoria',
    h1: ['Documentos seguros.', 'Processos enxutos.', 'Times produtivos.'],
    accent: 'O futuro do seu arquivo',
    sub: 'Nascemos com a bagagem de quem já tirou auditoria do vermelho mais de uma vez. A Scandex+ é a empresa nova com a experiência prática de uma vida inteira em gestão documental.',
  },
};

// The brand glyph — for `blue` we use a pre-tinted PNG (exact #3B7BA8)
// to avoid CSS-filter color drift. Other tones are derived from the black mask.
const ARROW_FILTERS = {
  light: 'brightness(0) saturate(100%) invert(82%) sepia(15%) saturate(450%) hue-rotate(155deg) brightness(95%) contrast(85%)',
  white: 'brightness(0) invert(1)',
  ink:   'none',
  gray:  'opacity(0.5)',
};
const COLOR_TO_TONE = (c) => {
  if (!c) return 'blue';
  const v = String(c).toLowerCase();
  if (v === '#fff' || v === '#ffffff' || v === 'white') return 'white';
  if (v === COLORS.blueLight.toLowerCase()) return 'light';
  if (v === COLORS.ink.toLowerCase() || v === 'black') return 'ink';
  if (v === COLORS.blue.toLowerCase() || v === COLORS.blueDeep.toLowerCase()) return 'blue';
  return 'blue';
};
const ArrowPlus = ({ size = 80, color = '#fff', opacity = 1, tone }) => {
  const t = tone || COLOR_TO_TONE(color);
  const usePrimary = t === 'blue';
  return (
    <img
      src={usePrimary ? 'assets/arrow-plus-primary.png' : 'assets/arrow-plus-mask.png'}
      alt=""
      style={{
        width: size,
        height: size * (219 / 652),
        objectFit: 'contain',
        opacity,
        filter: usePrimary ? 'none' : ARROW_FILTERS[t],
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    />
  );
};

const Wordmark = ({ color = COLORS.ink, size = 24, accent, variant = 'auto' }) => {
  // Use the official logo PNG. `variant`:
  //   'auto'  — pick by `color`: dark text → original; white/light text → white logo
  //   'dark'  — original colors (dark on light)
  //   'white' — all-white silhouette (for dark surfaces)
  const isLight = color === '#fff' || color === '#ffffff' || color === 'white';
  const useWhite = variant === 'white' || (variant === 'auto' && isLight);
  // Cropped logo native is 586×151 → aspect 3.88
  const h = size * 1.55;       // height tuned so it visually matches old wordmark size
  const w = h * (586 / 151);
  return (
    <img
      src={useWhite ? 'assets/logo-principal-white.png' : 'assets/logo-principal-cropped.png'}
      alt="Scandex+ — Serviços Digitais"
      style={{ height: h, width: w, objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle' }}
    />
  );
};

// Real brand pattern — assets/pattern.png is solid white bg with brand-blue arrows+.
// We use CSS blend modes so it composites cleanly over any surface:
//   - light surfaces → multiply (white bg disappears, blue strokes stay)
//   - dark surfaces  → invert + screen (strokes become light on dark)
// `scale` controls tile size (smaller = denser).
const PATTERN_NATIVE = { w: 2481, h: 3508 }; // native px
const Pattern = ({ color, opacity = 1, scale = 1, tone = 'auto', surface = 'light' }) => {
  // tile size on screen — base ~720x1018 then divided by scale (>1 = denser)
  const tileW = Math.round(720 / scale);
  const tileH = Math.round(tileW * (PATTERN_NATIVE.h / PATTERN_NATIVE.w));
  const isDark = surface === 'dark';
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        backgroundImage: 'url("assets/pattern.png")',
        backgroundRepeat: 'repeat',
        backgroundSize: `${tileW}px ${tileH}px`,
        mixBlendMode: isDark ? 'screen' : 'multiply',
        filter: isDark ? 'invert(1) brightness(1.4)' : 'none',
      }}
    />
  );
};

const WhatsappIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Reveal-on-scroll wrapper
const Reveal = ({ children, delay = 0, style }) => {
  const ref = React.useRef();
  const [v, setV] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      ...style,
      opacity: v ? 1 : 0,
      transform: v ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.7s cubic-bezier(.2,.8,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.2,.8,.2,1) ${delay}ms`,
    }}>{children}</div>
  );
};

// Counting number animation
const CountUp = ({ to, suffix = '', prefix = '', decimals = 0, style }) => {
  const ref = React.useRef();
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const dur = 1600;
      const animate = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(to * eased);
        if (p < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      obs.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  const formatted = decimals > 0 ? n.toFixed(decimals) : Math.floor(n).toLocaleString('pt-BR');
  return <span ref={ref} style={style}>{prefix}{formatted}{suffix}</span>;
};

// ─────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────
const Nav = ({ T }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 24px',
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.65)',
      backdropFilter: 'blur(20px) saturate(140%)',
      WebkitBackdropFilter: 'blur(20px) saturate(140%)',
      position: 'sticky', top: 12, zIndex: 30, margin: '12px 12px 0',
      border: `1px solid ${scrolled ? COLORS.line : 'rgba(226,232,238,0.6)'}`,
      borderRadius: 999,
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 8px 32px rgba(15,22,32,0.06)' : 'none',
    }}>
      <Wordmark size={20} accent={T.primary} />
      <div style={{ display: 'flex', gap: 28, fontFamily: 'Sora, system-ui', fontSize: 13.5, fontWeight: 500, color: COLORS.ink }}>
        {['Sobre', 'Serviços', 'ScandexPRO™', 'Stack'].map(x => (
          <a key={x} style={{ color: 'inherit', textDecoration: 'none' }}>{x}</a>
        ))}
      </div>
      <button style={{
        background: T.primary, color: 'white', border: 'none',
        padding: '11px 20px', borderRadius: 999,
        fontFamily: 'Sora, system-ui', fontSize: 13, fontWeight: 600,
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: `0 4px 16px ${T.primary}40`,
      }}>
        <WhatsappIcon size={14} />
        Falar agora
      </button>
    </nav>
  );
};

// ─────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────
const Hero = ({ T }) => {
  const headline = HEADLINES[T.headline] || HEADLINES.controle;
  const [hour, setHour] = React.useState('');
  React.useEffect(() => {
    const tick = () => setHour(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    tick();
    const i = setInterval(tick, 30000);
    return () => clearInterval(i);
  }, []);

  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', minHeight: 'calc(100vh - 60px)', padding: '0 12px', gap: 12 }}>
      {/* LEFT */}
      <div style={{ padding: '56px 40px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
        <Reveal>
          <div style={{
            display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 10,
            padding: '7px 14px', background: 'white', color: COLORS.ink,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 999, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500,
          }}>
            <span style={{ color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {headline.eyebrow}
            </span>
          </div>
        </Reveal>

        <div style={{ marginTop: 48 }}>
          <h1 style={{
            fontFamily: '"Sora", system-ui', fontWeight: 700,
            fontSize: 'clamp(60px, 8.2vw, 124px)',
            lineHeight: 0.92, letterSpacing: '-0.05em',
            color: COLORS.ink, margin: 0,
          }}>
            {headline.h1.map((line, i) => (
              <Reveal key={i} delay={i * 90} style={{ display: 'block' }}>
                {line}
              </Reveal>
            ))}
            <Reveal delay={headline.h1.length * 90} style={{ display: 'block' }}>
              <span style={{ color: T.primary, display: 'inline-flex', alignItems: 'baseline', gap: 16 }}>
                {headline.accent}
                <ArrowPlus size={108} color={T.primary} />
              </span>
            </Reveal>
          </h1>

          <Reveal delay={500}>
            <p style={{
              fontFamily: 'Sora, system-ui', fontSize: 18, lineHeight: 1.55,
              color: COLORS.inkSoft, marginTop: 36, maxWidth: 540,
              textWrap: 'pretty',
            }}>
              {headline.sub}
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
              <button style={{
                background: T.primary, color: 'white', border: 'none',
                padding: '17px 26px', borderRadius: 12,
                fontFamily: 'Sora, system-ui', fontSize: 14.5, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: `0 8px 22px ${T.primary}33`,
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <WhatsappIcon size={17} />
                Falar no WhatsApp
              </button>
              <button style={{
                background: 'white', color: COLORS.ink, border: `1px solid ${COLORS.line}`,
                padding: '17px 26px', borderRadius: 12,
                fontFamily: 'Sora, system-ui', fontSize: 14.5, fontWeight: 600, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                Conhecer ScandexPRO™
                <span style={{ color: T.primary }}>→</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* trust strip — segmentos onde a equipe atuou */}
        <Reveal delay={700}>
          <div style={{ marginTop: 64 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 18 }}>
              ─── Setores onde nossa equipe já digitalizou
            </div>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              {['Setor público', 'Saúde privada', 'Jurídico', 'Educação', 'Indústria', 'Cartórios'].map(n => (
                <div key={n} style={{
                  fontFamily: 'Sora, system-ui', fontSize: 13.5, fontWeight: 500,
                  color: COLORS.inkSoft, opacity: 0.7,
                }}>{n}</div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* RIGHT — visual gallery */}
      <Reveal delay={300}>
        <div style={{
          background: T.primary, borderRadius: 24, position: 'relative', overflow: 'hidden',
          height: '100%', display: 'flex', flexDirection: 'column', padding: 22, gap: 14,
        }}>
          <Pattern surface="dark" opacity={T.patternIntensity * 0.32} scale={0.95} />

          {/* discreet brand mark, top-right corner */}
          <div style={{ position: 'absolute', top: 22, right: 22, zIndex: 2, opacity: 0.85 }}>
            <ArrowPlus size={44} color="white" />
          </div>

          {/* Photo mosaic: 1 hero + 2 supporting, clean — fotos respiram */}
          <div style={{
            position: 'relative', flex: 1, display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1.5fr 1fr',
            gap: 12, minHeight: 620,
          }}>
            {/* Hero — corredor de arquivo / estantes (spans full width on top) */}
            <div style={{
              gridColumn: '1 / -1',
              position: 'relative', borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.32)',
              background: COLORS.ink,
            }}>
              <img
                src="https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1600&q=80"
                alt=""
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Supporting photo 1 — pastas / arquivos morto */}
            <div style={{
              position: 'relative', borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(0,0,0,0.26)',
              background: COLORS.blueDeep,
            }}>
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80"
                alt=""
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.7) brightness(0.95)' }}
              />
            </div>

            {/* Supporting photo 2 — arquivo de repartição pública */}
            <div style={{
              position: 'relative', borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(0,0,0,0.26)',
              background: COLORS.blueDeep,
            }}>
              <img
                src="https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=900&q=80"
                alt=""
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────
// METRICS — big destaque section
// ─────────────────────────────────────────────────────────────────────
const Metrics = ({ T }) => (
  <section style={{ padding: '120px 40px', background: COLORS.ink, color: 'white', position: 'relative', overflow: 'hidden' }}>
    <Pattern surface="dark" opacity={T.patternIntensity * 0.18} scale={1.4} />
    <div style={{ position: 'relative', maxWidth: 1400, margin: '0 auto' }}>
      <Reveal>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.accent, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 24 }}>
          ─── A bagagem por trás da Scandex+
        </div>
        <h2 style={{
          fontFamily: 'Sora, system-ui', fontWeight: 700,
          fontSize: 'clamp(48px, 6.5vw, 96px)', lineHeight: 0.95,
          letterSpacing: '-0.04em', color: 'white', margin: 0, maxWidth: 1100,
        }}>
          Empresa nova. <span style={{ color: T.accent, fontStyle: 'italic', fontWeight: 400, fontFamily: '"Fraunces", serif' }}>Equipe que já tirou</span> auditoria do vermelho.
        </h2>
      </Reveal>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        marginTop: 80, borderTop: '1px solid rgba(255,255,255,0.12)',
      }}>
        {[
          { num: 1, suffix: 'M+', decimals: 0, label: 'Documentos digitalizados', sub: 'Soma de todas as experiências da equipe — público e privado' },
          { num: 12, suffix: '+',  decimals: 0, label: 'Anos de experiência', sub: 'Carreiras inteiras dedicadas a digitalização e GED' },
          { num: 0, suffix: '',   decimals: 0, label: 'Auditorias perdidas', sub: 'Crises de auditoria que a equipe enfrentou e resolveu' },
          { num: 100, suffix: '%', decimals: 0, label: 'Foco em GED', sub: 'Especialização do dia 1 — não é diversificação' },
        ].map((m, i) => (
          <Reveal key={i} delay={i * 100}>
            <div style={{
              padding: '40px 32px 40px 0',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.12)' : 'none',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
              paddingLeft: i > 0 ? 32 : 0,
            }}>
              <div style={{
                fontFamily: 'Sora, system-ui', fontWeight: 700,
                fontSize: 'clamp(56px, 7vw, 104px)',
                letterSpacing: '-0.05em', color: 'white', lineHeight: 1,
              }}>
                <CountUp to={m.num} suffix={m.suffix} decimals={m.decimals} />
              </div>
              <div style={{
                fontFamily: 'Sora, system-ui', fontSize: 16, fontWeight: 600,
                color: 'white', marginTop: 24,
              }}>{m.label}</div>
              <div style={{
                fontFamily: 'Sora, system-ui', fontSize: 13,
                color: 'rgba(255,255,255,0.55)', marginTop: 6, lineHeight: 1.5,
              }}>{m.sub}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* secondary row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
      }}>
        {[
          { num: 24, suffix: 'h', label: 'Resposta inicial em casos críticos de auditoria' },
          { num: 100, suffix: '%', label: 'Aderência a LGPD, retenção legal e normas setoriais' },
          { num: 0,  suffix: '',  label: 'Vícios de software house genérica · nascemos especialistas' },
        ].map((m, i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{
              padding: '40px 32px',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none',
              paddingLeft: i > 0 ? 32 : 0,
              display: 'flex', alignItems: 'baseline', gap: 24,
            }}>
              <div style={{
                fontFamily: '"Fraunces", serif', fontWeight: 300, fontStyle: 'italic',
                fontSize: 56, letterSpacing: '-0.03em', color: T.accent, lineHeight: 1, flexShrink: 0,
              }}>
                <CountUp to={m.num} suffix={m.suffix} />
              </div>
              <div style={{ fontFamily: 'Sora, system-ui', fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                {m.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

window.SDXP = { COLORS, ArrowPlus, Wordmark, Pattern, WhatsappIcon, Reveal, CountUp, Nav, Hero, Metrics, HEADLINES };
