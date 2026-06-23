// V1 — Editorial Minimalist
// Bold oversized type, lots of white, the arrow-plus glyph as a punctuation mark.
// Design pillars: refinement, generous whitespace, single-color discipline.

const V1_INK = '#1F2937';
const V1_INK_SOFT = '#6B7280';
const V1_LINE = '#E5E7EB';
const V1_BLUE = '#3B7BA8';      // submarca blue (primary accent)
const V1_BLUE_LIGHT = '#9CC8D6'; // logo principal blue
const V1_PAPER = '#FAFAF7';      // off-white paper

// The arrow+ glyph — the brand's defining signature, used everywhere as punctuation
const ArrowPlus = ({ size = 24, color = V1_BLUE, style }) => (
  <svg width={size} height={size * 0.55} viewBox="0 0 100 55" fill="none" style={style}>
    <path d="M2 38 Q 22 50, 50 32 L 60 28 L 56 22 L 64 24 L 66 16 L 68 24 L 76 22 L 70 28 L 76 36 L 68 30 Z"
          fill={color} opacity="0" />
    {/* Curved arrow */}
    <path d="M3 36 Q 25 50, 52 30" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    {/* Arrowhead */}
    <path d="M52 30 L 44 28 M52 30 L 50 22" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    {/* Plus */}
    <path d="M70 14 L 70 36 M 60 25 L 80 25" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
  </svg>
);

// Simple word-mark recreated — uses the brand "scandex+" feel without leaning on the raster
const Wordmark = ({ color = V1_INK, size = 28 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.25, fontFamily: '"Sora", system-ui', fontWeight: 700, fontSize: size, letterSpacing: '-0.02em', color, lineHeight: 1 }}>
    <span>scandex</span>
    <ArrowPlus size={size * 1.1} color={color === V1_INK ? V1_BLUE : color} style={{ marginBottom: -size * 0.1 }} />
  </div>
);

const V1Nav = () => (
  <nav style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '32px 64px', borderBottom: `1px solid ${V1_LINE}`,
    position: 'sticky', top: 0, background: V1_PAPER, zIndex: 10,
  }}>
    <Wordmark size={24} />
    <div style={{ display: 'flex', gap: 40, fontFamily: 'Sora, system-ui', fontSize: 14, fontWeight: 500, color: V1_INK }}>
      <a style={{ color: 'inherit', textDecoration: 'none' }}>Sobre</a>
      <a style={{ color: 'inherit', textDecoration: 'none' }}>Serviços</a>
      <a style={{ color: 'inherit', textDecoration: 'none' }}>Stack</a>
      <a style={{ color: 'inherit', textDecoration: 'none' }}>Contato</a>
    </div>
    <button style={{
      border: `1px solid ${V1_INK}`, background: V1_INK, color: V1_PAPER,
      padding: '12px 24px', borderRadius: 999, fontFamily: 'Sora, system-ui',
      fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
    }}>
      Falar no WhatsApp
      <span style={{ fontSize: 16 }}>→</span>
    </button>
  </nav>
);

const V1Hero = () => (
  <section style={{ padding: '120px 64px 100px', position: 'relative' }}>
    {/* tiny eyebrow */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      fontFamily: 'Sora, system-ui', fontSize: 12, fontWeight: 600,
      letterSpacing: '0.18em', textTransform: 'uppercase', color: V1_INK_SOFT,
      marginBottom: 80,
    }}>
      <span style={{ width: 32, height: 1, background: V1_INK_SOFT }}></span>
      Software house · Serviços digitais · Desde 2018
    </div>

    {/* Headline */}
    <h1 style={{
      fontFamily: '"Fraunces", "Times New Roman", serif',
      fontWeight: 300,
      fontSize: 'clamp(72px, 11vw, 168px)',
      lineHeight: 0.92,
      letterSpacing: '-0.04em',
      color: V1_INK,
      margin: 0,
      textWrap: 'balance',
    }}>
      Gestão.<br/>
      Memória.<br/>
      Conformidade.<br/>
      <span style={{ fontStyle: 'italic', fontWeight: 300, color: V1_BLUE, position: 'relative' }}>
        Sob controle
        <ArrowPlus size={120} color={V1_BLUE} style={{ display: 'inline-block', marginLeft: 24, transform: 'translateY(-20px)' }} />
      </span>
    </h1>

    {/* Subhead grid */}
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
      gap: 80, marginTop: 100, alignItems: 'start',
    }}>
      <div style={{ gridColumn: '2 / 4', maxWidth: 640 }}>
        <p style={{
          fontFamily: 'Sora, system-ui', fontSize: 22, lineHeight: 1.45,
          color: V1_INK, fontWeight: 400, margin: 0, textWrap: 'pretty',
        }}>
          Transformamos arquivos, processos e rotinas em sistemas que sua equipe realmente usa.
          <span style={{ color: V1_INK_SOFT }}> Software sob medida, digitalização documental e consultoria para quem precisa pôr ordem na operação.</span>
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 48 }}>
          <button style={{
            background: V1_BLUE, color: 'white', border: 'none',
            padding: '18px 32px', borderRadius: 999,
            fontFamily: 'Sora, system-ui', fontSize: 15, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
          }}>
            Falar com a Scandex+
            <span>→</span>
          </button>
          <button style={{
            background: 'transparent', color: V1_INK, border: `1px solid ${V1_INK}`,
            padding: '18px 32px', borderRadius: 999,
            fontFamily: 'Sora, system-ui', fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}>
            Ver serviços
          </button>
        </div>
      </div>
    </div>

    {/* Floating stat strip */}
    <div style={{
      marginTop: 140,
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      borderTop: `1px solid ${V1_LINE}`, borderBottom: `1px solid ${V1_LINE}`,
    }}>
      {[
        ['7+', 'anos digitalizando legados'],
        ['2.4M', 'documentos sob custódia'],
        ['43', 'clientes ativos no Brasil'],
        ['99.97%', 'uptime médio em 2025'],
      ].map(([n, l], i) => (
        <div key={i} style={{
          padding: '40px 32px',
          borderRight: i < 3 ? `1px solid ${V1_LINE}` : 'none',
        }}>
          <div style={{
            fontFamily: '"Fraunces", serif', fontWeight: 300,
            fontSize: 56, letterSpacing: '-0.03em', color: V1_INK, lineHeight: 1,
          }}>{n}</div>
          <div style={{
            fontFamily: 'Sora, system-ui', fontSize: 13, color: V1_INK_SOFT,
            marginTop: 12, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500,
          }}>{l}</div>
        </div>
      ))}
    </div>
  </section>
);

const V1About = () => (
  <section style={{ padding: '160px 64px', borderTop: `1px solid ${V1_LINE}` }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
      <div>
        <div style={{
          fontFamily: 'Sora, system-ui', fontSize: 12, fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: V1_BLUE,
        }}>
          (01) — Sobre
        </div>
      </div>
      <div>
        <p style={{
          fontFamily: '"Fraunces", serif', fontWeight: 300,
          fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1.15,
          letterSpacing: '-0.02em', color: V1_INK, margin: 0, textWrap: 'pretty',
        }}>
          Somos uma <em style={{ color: V1_BLUE, fontStyle: 'italic' }}>software house</em> brasileira
          que nasceu dentro de um arquivo hospitalar — e aprendeu, na prática, a tirar
          empresas da gaveta e pôr na nuvem.
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 80,
        }}>
          <div>
            <div style={{ fontFamily: 'Sora, system-ui', fontSize: 13, fontWeight: 600, color: V1_INK_SOFT, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              Para quem
            </div>
            <p style={{ fontFamily: 'Sora, system-ui', fontSize: 16, lineHeight: 1.6, color: V1_INK, margin: 0 }}>
              Hospitais e clínicas, escritórios de advocacia, prefeituras, escolas, farmácias —
              empresas com décadas de papel acumulado e processos que pedem ordem.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: 'Sora, system-ui', fontSize: 13, fontWeight: 600, color: V1_INK_SOFT, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              O que fazemos
            </div>
            <p style={{ fontFamily: 'Sora, system-ui', fontSize: 16, lineHeight: 1.6, color: V1_INK, margin: 0 }}>
              Digitalizamos, indexamos e conectamos. E depois construímos o sistema sob medida
              que mantém tudo isso vivo e usável pela sua equipe.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const V1_SERVICES = [
  {
    n: '01',
    title: 'Software sob medida',
    body: 'Sistemas web e desktop construídos do zero para o seu fluxo. Next.js, TypeScript, integrações com ERPs e legados.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Electron'],
  },
  {
    n: '02',
    title: 'Digitalização (GED)',
    body: 'Captura, indexação e custódia de documentos físicos. Do scanner ao OCR; do OCR à busca. Conforme LGPD e CFM.',
    tags: ['OCR', 'LGPD', 'TIFF/PDF', 'Indexação'],
  },
  {
    n: '03',
    title: 'Automação de processos',
    body: 'RPA e workflows para tirar a planilha do meio do caminho. Aprovações, rotinas, integrações entre sistemas.',
    tags: ['RPA', 'BPMN', 'APIs', 'Webhooks'],
  },
  {
    n: '04',
    title: 'Consultoria em transformação digital',
    body: 'Diagnóstico de operação, mapa de sistemas e roadmap de modernização. Antes de codar, entendemos.',
    tags: ['Diagnóstico', 'Roadmap', 'Arquitetura'],
  },
  {
    n: '05',
    title: 'Suporte técnico e manutenção',
    body: 'Sustentação contínua, monitoramento de uptime, plantão para horário de pico hospitalar e SLAs claros.',
    tags: ['SLA', 'Monitoramento', '24/7'],
  },
];

const V1Services = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ padding: '160px 64px', background: 'white', borderTop: `1px solid ${V1_LINE}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginBottom: 80 }}>
        <div style={{ fontFamily: 'Sora, system-ui', fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: V1_BLUE }}>
          (02) — Serviços
        </div>
        <h2 style={{
          fontFamily: '"Fraunces", serif', fontWeight: 300,
          fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1.05,
          letterSpacing: '-0.03em', color: V1_INK, margin: 0,
        }}>
          Cinco frentes.<br/>
          Um único <em style={{ color: V1_BLUE, fontStyle: 'italic' }}>princípio</em>: pôr a operação sob controle.
        </h2>
      </div>

      <div style={{ borderTop: `1px solid ${V1_LINE}` }}>
        {V1_SERVICES.map((s, i) => (
          <div key={i}
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              borderBottom: `1px solid ${V1_LINE}`, padding: '32px 0',
              cursor: 'pointer', transition: 'all 0.3s ease',
            }}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 2fr 80px', gap: 32, alignItems: 'baseline' }}>
              <div style={{ fontFamily: 'Sora, system-ui', fontSize: 13, color: V1_INK_SOFT, fontWeight: 500 }}>
                {s.n}
              </div>
              <div style={{
                fontFamily: '"Fraunces", serif', fontWeight: 300,
                fontSize: 36, letterSpacing: '-0.02em', color: V1_INK,
              }}>
                {s.title}
              </div>
              <div style={{
                maxHeight: open === i ? 200 : 0, opacity: open === i ? 1 : 0,
                overflow: 'hidden', transition: 'all 0.4s ease',
              }}>
                <p style={{ fontFamily: 'Sora, system-ui', fontSize: 16, lineHeight: 1.6, color: V1_INK_SOFT, margin: 0, marginBottom: 16 }}>
                  {s.body}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {s.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: 'Sora, system-ui', fontSize: 12, fontWeight: 500,
                      padding: '6px 12px', border: `1px solid ${V1_LINE}`, borderRadius: 999, color: V1_INK,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{
                fontSize: 24, color: V1_BLUE, textAlign: 'right',
                transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}>+</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const V1_STACK = [
  { cat: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Electron'] },
  { cat: 'Backend',  items: ['Node.js', 'PostgreSQL', 'Redis', 'tRPC', 'Prisma'] },
  { cat: 'Infra',    items: ['AWS', 'Docker', 'GitHub Actions', 'Cloudflare'] },
  { cat: 'GED & OCR', items: ['Tesseract', 'Kofax', 'TIFF/PDF/A', 'Barcode'] },
];

const V1Stack = () => (
  <section style={{ padding: '160px 64px', background: V1_PAPER, borderTop: `1px solid ${V1_LINE}` }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginBottom: 80 }}>
      <div style={{ fontFamily: 'Sora, system-ui', fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: V1_BLUE }}>
        (03) — Stack
      </div>
      <h2 style={{
        fontFamily: '"Fraunces", serif', fontWeight: 300,
        fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1.05,
        letterSpacing: '-0.03em', color: V1_INK, margin: 0,
      }}>
        Ferramentas <em style={{ color: V1_BLUE, fontStyle: 'italic' }}>maduras</em>,
        escolhidas a dedo.
      </h2>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48 }}>
      {V1_STACK.map((s, i) => (
        <div key={i}>
          <div style={{
            fontFamily: 'Sora, system-ui', fontSize: 13, fontWeight: 600,
            color: V1_BLUE, textTransform: 'uppercase', letterSpacing: '0.1em',
            paddingBottom: 16, borderBottom: `1px solid ${V1_LINE}`, marginBottom: 24,
          }}>{s.cat}</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {s.items.map(it => (
              <li key={it} style={{
                fontFamily: '"Fraunces", serif', fontWeight: 300,
                fontSize: 28, letterSpacing: '-0.02em', color: V1_INK,
                lineHeight: 1.4,
              }}>{it}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

const V1CTA = () => (
  <section style={{ padding: '160px 64px', background: V1_INK, color: 'white', position: 'relative', overflow: 'hidden' }}>
    {/* Big watermark */}
    <ArrowPlus size={800} color="rgba(155, 200, 214, 0.06)" style={{
      position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none',
    }} />

    <div style={{ position: 'relative', maxWidth: 900 }}>
      <div style={{
        fontFamily: 'Sora, system-ui', fontSize: 12, fontWeight: 600,
        letterSpacing: '0.18em', textTransform: 'uppercase', color: V1_BLUE_LIGHT, marginBottom: 32,
      }}>
        (04) — Próximo passo
      </div>
      <h2 style={{
        fontFamily: '"Fraunces", serif', fontWeight: 300,
        fontSize: 'clamp(56px, 8vw, 128px)', lineHeight: 0.95,
        letterSpacing: '-0.03em', color: 'white', margin: 0,
      }}>
        Vamos pôr<br/>
        sua operação<br/>
        <em style={{ color: V1_BLUE_LIGHT, fontStyle: 'italic' }}>sob controle</em>?
      </h2>
      <p style={{
        fontFamily: 'Sora, system-ui', fontSize: 20, lineHeight: 1.5,
        color: 'rgba(255,255,255,0.7)', marginTop: 48, maxWidth: 560,
      }}>
        Conte um pouco do seu cenário — arquivos, sistemas, gargalos.
        Em até 24 horas devolvemos um diagnóstico inicial e um caminho.
      </p>
      <div style={{ display: 'flex', gap: 16, marginTop: 56 }}>
        <button style={{
          background: V1_BLUE_LIGHT, color: V1_INK, border: 'none',
          padding: '22px 36px', borderRadius: 999,
          fontFamily: 'Sora, system-ui', fontSize: 16, fontWeight: 600,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Falar no WhatsApp
        </button>
        <button style={{
          background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)',
          padding: '22px 36px', borderRadius: 999,
          fontFamily: 'Sora, system-ui', fontSize: 16, fontWeight: 600, cursor: 'pointer',
        }}>
          contato@scandexplus.com.br
        </button>
      </div>
    </div>
  </section>
);

const V1Footer = () => (
  <footer style={{ padding: '64px', background: V1_INK, color: 'rgba(255,255,255,0.5)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
      <Wordmark color="white" size={20} />
      <div style={{ fontFamily: 'Sora, system-ui', fontSize: 13 }}>
        © 2026 Scandex+ Serviços Digitais · Belo Horizonte / MG
      </div>
      <div style={{ fontFamily: 'Sora, system-ui', fontSize: 13, fontStyle: 'italic' }}>
        Powered by ScandexPRO™
      </div>
    </div>
  </footer>
);

const V1Cursor = () => {
  const [pos, setPos] = React.useState({ x: -100, y: -100 });
  const [hovering, setHovering] = React.useState(false);
  React.useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target;
      setHovering(t && (t.tagName === 'BUTTON' || t.tagName === 'A' || t.closest('button') || t.closest('a')));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div style={{
      position: 'fixed', left: pos.x, top: pos.y, pointerEvents: 'none',
      width: hovering ? 56 : 12, height: hovering ? 56 : 12, borderRadius: '50%',
      background: hovering ? V1_BLUE : V1_INK, mixBlendMode: 'difference',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.2s ease, height 0.2s ease',
      zIndex: 9999,
    }} />
  );
};

const LandingV1 = () => (
  <div style={{ background: V1_PAPER, minHeight: '100vh', cursor: 'none' }}>
    <V1Cursor />
    <V1Nav />
    <V1Hero />
    <V1About />
    <V1Services />
    <V1Stack />
    <V1CTA />
    <V1Footer />
  </div>
);

window.LandingV1 = LandingV1;
