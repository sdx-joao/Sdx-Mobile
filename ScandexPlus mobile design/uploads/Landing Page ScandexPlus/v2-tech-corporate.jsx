// V2 — Tech corporate / split-canvas with the brand's deep blue and the arrow+ pattern.
// Pillars: structure, product-feel, density without clutter.

const V2_BLUE = '#3B7BA8';        // submarca — deep blue, dominant
const V2_BLUE_DEEP = '#2E6388';   // hover/depth
const V2_BLUE_LIGHT = '#9CC8D6';  // logo principal — accent
const V2_BLUE_TINT = '#E8F1F5';   // wash backgrounds
const V2_INK = '#1A1A1A';
const V2_INK_SOFT = '#5C6470';
const V2_LINE = '#DDE5EA';
const V2_PAPER = '#FFFFFF';

const V2ArrowPlus = ({ size = 80, color = '#fff', opacity = 1 }) => (
  <svg width={size} height={size * 0.55} viewBox="0 0 100 55" fill="none" style={{ opacity }}>
    <path d="M3 36 Q 25 50, 52 30" stroke={color} strokeWidth="3.2" strokeLinecap="round" fill="none"/>
    <path d="M52 30 L 44 28 M52 30 L 50 22" stroke={color} strokeWidth="3.2" strokeLinecap="round" fill="none"/>
    <path d="M70 14 L 70 36 M 60 25 L 80 25" stroke={color} strokeWidth="3.2" strokeLinecap="round" fill="none"/>
  </svg>
);

const V2Wordmark = ({ color = V2_INK, size = 24 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.2, fontFamily: '"Sora", system-ui', fontWeight: 700, fontSize: size, letterSpacing: '-0.02em', color, lineHeight: 1 }}>
    <span>scandex</span>
    <V2ArrowPlus size={size * 1.1} color={color === V2_INK ? V2_BLUE : color} />
  </div>
);

const V2Nav = () => (
  <nav style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 48px',
    background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
    position: 'sticky', top: 16, zIndex: 20, margin: '16px',
    border: `1px solid ${V2_LINE}`, borderRadius: 999,
  }}>
    <V2Wordmark size={20} />
    <div style={{ display: 'flex', gap: 32, fontFamily: 'Sora, system-ui', fontSize: 14, fontWeight: 500, color: V2_INK }}>
      <a style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: V2_BLUE }}></span>
        Sobre
      </a>
      <a style={{ color: 'inherit', textDecoration: 'none' }}>Serviços</a>
      <a style={{ color: 'inherit', textDecoration: 'none' }}>Stack</a>
      <a style={{ color: 'inherit', textDecoration: 'none' }}>ScandexPRO™</a>
    </div>
    <button style={{
      background: V2_BLUE, color: 'white', border: 'none',
      padding: '12px 22px', borderRadius: 999,
      fontFamily: 'Sora, system-ui', fontSize: 13, fontWeight: 600,
      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      WhatsApp
    </button>
  </nav>
);

// SVG pattern of arrows+ — inline so we control size + color
const V2Pattern = ({ color = V2_BLUE, opacity = 1, scale = 1 }) => {
  const id = React.useId();
  return (
    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity }}>
      <defs>
        <pattern id={id} x="0" y="0" width={120 * scale} height={70 * scale} patternUnits="userSpaceOnUse">
          <g transform={`scale(${scale})`}>
            <path d="M5 50 Q 28 65, 60 42" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M60 42 L 50 39 M60 42 L 58 33" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M82 22 L 82 50 M 70 36 L 94 36" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};

const V2Hero = () => {
  const [hour, setHour] = React.useState('');
  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      setHour(d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', minHeight: 'calc(100vh - 80px)', padding: '0 16px', gap: 16 }}>
      {/* LEFT: white side with headline */}
      <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{
          display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 10,
          padding: '8px 14px', background: V2_BLUE_TINT, color: V2_BLUE,
          borderRadius: 999, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: '#22C55E',
            boxShadow: '0 0 0 4px rgba(34,197,94,0.2)',
          }}></span>
          Operando · {hour} BRT
        </div>

        <div>
          <h1 style={{
            fontFamily: '"Sora", system-ui', fontWeight: 700,
            fontSize: 'clamp(64px, 8.5vw, 132px)',
            lineHeight: 0.92, letterSpacing: '-0.045em',
            color: V2_INK, margin: 0,
          }}>
            Gestão.<br/>
            Memória.<br/>
            Conformidade.<br/>
            <span style={{ color: V2_BLUE, display: 'inline-flex', alignItems: 'baseline', gap: 16 }}>
              Sob controle
              <V2ArrowPlus size={120} color={V2_BLUE} />
            </span>
          </h1>

          <p style={{
            fontFamily: 'Sora, system-ui', fontSize: 18, lineHeight: 1.55,
            color: V2_INK_SOFT, marginTop: 40, maxWidth: 560,
          }}>
            Software house brasileira focada em <strong style={{ color: V2_INK, fontWeight: 600 }}>digitalização documental, sistemas sob medida e automação</strong> para empresas com legado a organizar.
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
            <button style={{
              background: V2_BLUE, color: 'white', border: 'none',
              padding: '18px 28px', borderRadius: 12,
              fontFamily: 'Sora, system-ui', fontSize: 15, fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: '0 8px 24px rgba(59,123,168,0.25)',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar no WhatsApp
            </button>
            <button style={{
              background: 'white', color: V2_INK, border: `1px solid ${V2_LINE}`,
              padding: '18px 28px', borderRadius: 12,
              fontFamily: 'Sora, system-ui', fontSize: 15, fontWeight: 600, cursor: 'pointer',
            }}>
              Ver serviços →
            </button>
          </div>
        </div>

        {/* trust strip */}
        <div style={{ marginTop: 80 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: V2_INK_SOFT, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
            Confiam na Scandex+
          </div>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            {['Hospital do Olho', 'Clínica Visão+', 'Prefeitura de São Lourenço', 'Castro & Advogados', 'Rede Farma+', 'Colégio Phoenix'].map(n => (
              <div key={n} style={{ fontFamily: 'Sora, system-ui', fontSize: 14, fontWeight: 500, color: V2_INK_SOFT }}>
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: blue panel with pattern + product preview */}
      <div style={{
        background: V2_BLUE, borderRadius: 24, position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', padding: 32, justifyContent: 'space-between',
      }}>
        <V2Pattern color="white" opacity={0.08} scale={0.7} />

        {/* top label */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase', letterSpacing: '0.15em',
          }}>
            ScandexPRO™ · em produção
          </div>
          <V2ArrowPlus size={36} color="white" />
        </div>

        {/* Mock product card */}
        <div style={{
          background: 'white', borderRadius: 16, padding: 0,
          boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* window chrome */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 16px', borderBottom: `1px solid ${V2_LINE}`, background: '#FAFAFB',
          }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }}></span>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }}></span>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }}></span>
            <div style={{
              flex: 1, marginLeft: 16, padding: '4px 12px', background: 'white',
              border: `1px solid ${V2_LINE}`, borderRadius: 6,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: V2_INK_SOFT,
            }}>scandexpro.com.br/dashboard</div>
          </div>

          <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontFamily: 'Sora, system-ui', fontSize: 13, fontWeight: 600, color: V2_INK }}>
                Documentos · Setembro 2026
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 10, padding: '3px 8px',
                  background: V2_BLUE_TINT, color: V2_BLUE, borderRadius: 4, fontWeight: 600,
                }}>2.4M+</span>
              </div>
            </div>

            {/* doc rows */}
            {[
              { id: '08-2412-PRO', name: 'Prontuário · Maria S.', status: 'Disponível', color: '#10B981' },
              { id: '08-2411-PRO', name: 'Exame · João T.', status: 'Processando', color: V2_BLUE },
              { id: '08-2410-PRO', name: 'Receita · Ana B.', status: 'Disponível', color: '#10B981' },
              { id: '08-2409-PRO', name: 'Internação · Paulo R.', status: 'Alterado', color: '#F59E0B' },
              { id: '08-2408-PRO', name: 'Laudo · Clara M.', status: 'Disponível', color: '#10B981' },
            ].map((d, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 12,
                alignItems: 'center', padding: '10px 12px', borderRadius: 8,
                background: i === 1 ? V2_BLUE_TINT : 'transparent',
                fontFamily: 'Sora, system-ui', fontSize: 12, marginBottom: 2,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }}></span>
                <div>
                  <div style={{ fontWeight: 600, color: V2_INK }}>{d.name}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: V2_INK_SOFT }}>{d.id}</div>
                </div>
                <div style={{ fontSize: 11, color: V2_INK_SOFT }}>{d.status}</div>
                <button style={{
                  border: `1px solid ${V2_LINE}`, background: 'white', padding: '4px 8px',
                  borderRadius: 6, fontSize: 10, color: V2_INK_SOFT, cursor: 'pointer',
                }}>Abrir</button>
              </div>
            ))}
          </div>

          {/* footer of card */}
          <div style={{
            padding: '12px 20px', borderTop: `1px solid ${V2_LINE}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: V2_INK_SOFT,
          }}>
            <span>5 de 2.412.886 documentos</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }}></span>
              uptime 99.97%
            </span>
          </div>
        </div>

        {/* bottom stats card */}
        <div style={{
          position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12,
        }}>
          {[
            ['7+', 'anos'],
            ['43', 'clientes'],
            ['2.4M', 'docs'],
          ].map(([n, l], i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12,
              padding: 16,
            }}>
              <div style={{ fontFamily: 'Sora, system-ui', fontWeight: 700, fontSize: 28, color: 'white', letterSpacing: '-0.02em' }}>{n}</div>
              <div style={{ fontFamily: 'Sora, system-ui', fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const V2About = () => (
  <section style={{ padding: '120px 64px', background: 'white' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: V2_BLUE, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>
          [01] Sobre a Scandex+
        </div>
        <h2 style={{
          fontFamily: 'Sora, system-ui', fontWeight: 700,
          fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.05,
          letterSpacing: '-0.03em', color: V2_INK, margin: 0,
        }}>
          Nascemos em um arquivo hospitalar.<br/>
          <span style={{ color: V2_BLUE }}>Crescemos sistematizando o caos.</span>
        </h2>
        <p style={{
          fontFamily: 'Sora, system-ui', fontSize: 17, lineHeight: 1.6, color: V2_INK_SOFT, marginTop: 32,
        }}>
          Começamos digitalizando milhões de prontuários do Hospital do Olho Julio Cândido de Brito — e
          construindo o ScandexPRO™, o GED hospitalar que hoje é nosso carro-chefe. Hoje atendemos clínicas,
          farmácias, escolas, escritórios de advocacia e prefeituras: lugares onde décadas de papel
          encontram operações que não podem parar.
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 40,
        }}>
          {[
            ['Eficiência operacional', 'Cada projeto começa com um diagnóstico — sem ele, código vira retrabalho.'],
            ['Tecnologia madura', 'Usamos o que aguenta produção. Nada de hype, tudo de seriedade.'],
            ['Refino e clareza', 'Sistemas que sua equipe entende sem manual de 80 páginas.'],
            ['Conformidade real', 'LGPD, CFM, retenção legal — desenhado pra passar em auditoria.'],
          ].map(([t, b], i) => (
            <div key={i} style={{ borderTop: `2px solid ${V2_BLUE}`, paddingTop: 16 }}>
              <div style={{ fontFamily: 'Sora, system-ui', fontWeight: 600, fontSize: 15, color: V2_INK, marginBottom: 6 }}>{t}</div>
              <div style={{ fontFamily: 'Sora, system-ui', fontSize: 13, lineHeight: 1.5, color: V2_INK_SOFT }}>{b}</div>
            </div>
          ))}
        </div>
      </div>

      {/* visual side: stacked layered cards */}
      <div style={{ position: 'relative', height: 560 }}>
        <div style={{
          position: 'absolute', inset: 0, background: V2_BLUE_TINT, borderRadius: 20,
          overflow: 'hidden',
        }}>
          <V2Pattern color={V2_BLUE} opacity={0.12} scale={0.8} />
        </div>
        <div style={{
          position: 'absolute', top: 40, left: 40, right: 40, padding: 32,
          background: 'white', borderRadius: 16, border: `1px solid ${V2_LINE}`,
          boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <V2Wordmark size={18} />
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: V2_INK_SOFT }}>
              FUNDADO · 2018
            </div>
          </div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 24, lineHeight: 1.35, color: V2_INK, fontStyle: 'italic', fontWeight: 300 }}>
            "Tirar a empresa da gaveta e pôr na nuvem — sem perder o histórico no caminho."
          </div>
          <div style={{ marginTop: 24, fontFamily: 'Sora, system-ui', fontSize: 12, color: V2_INK_SOFT }}>
            — Manifesto Scandex+
          </div>
        </div>
        <div style={{
          position: 'absolute', bottom: 40, right: 32, padding: 20,
          background: V2_INK, color: 'white', borderRadius: 12,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
          maxWidth: 280, boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
        }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <span style={{ color: '#10B981' }}>●</span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>scandex.status</span>
          </div>
          <div style={{ lineHeight: 1.6 }}>
            <span style={{ color: V2_BLUE_LIGHT }}>43 clientes</span><br/>
            <span style={{ color: V2_BLUE_LIGHT }}>2.4M docs</span><br/>
            <span style={{ color: V2_BLUE_LIGHT }}>99.97% uptime</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const V2_SERVICES = [
  { n: '01', title: 'Software sob medida',
    short: 'Sistemas web e desktop construídos do zero.',
    items: ['Next.js & TypeScript', 'Electron desktop', 'Integração com ERPs e legados', 'Mobile (PWA / React Native)'],
  },
  { n: '02', title: 'Digitalização (GED)',
    short: 'Captura, OCR, indexação e custódia.',
    items: ['Scanners de produção', 'OCR multi-idioma', 'Conformidade LGPD/CFM', 'Backup e retenção legal'],
  },
  { n: '03', title: 'Automação de processos',
    short: 'Tira a planilha do meio do caminho.',
    items: ['RPA e workflows', 'BPMN customizado', 'APIs e webhooks', 'Aprovações e SLAs'],
  },
  { n: '04', title: 'Consultoria digital',
    short: 'Diagnóstico antes do código.',
    items: ['Mapa de sistemas atual', 'Roadmap 12-24 meses', 'Arquitetura técnica', 'Análise de compliance'],
  },
  { n: '05', title: 'Suporte & manutenção',
    short: 'Sustentação contínua, plantão, SLA.',
    items: ['Monitoramento 24/7', 'Plantão hospitalar', 'SLAs de resposta', 'Patches de segurança'],
  },
];

const V2Services = () => {
  const [active, setActive] = React.useState(0);
  return (
    <section style={{ padding: '120px 64px', background: V2_INK, color: 'white', position: 'relative', overflow: 'hidden' }}>
      <V2Pattern color="white" opacity={0.025} scale={1} />
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 60 }}>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: V2_BLUE_LIGHT, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>
            [02] Serviços
          </div>
          <h2 style={{
            fontFamily: 'Sora, system-ui', fontWeight: 700,
            fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.05,
            letterSpacing: '-0.03em', color: 'white', margin: 0,
          }}>
            Cinco frentes.<br/>
            Um único <span style={{ color: V2_BLUE_LIGHT }}>princípio</span>.
          </h2>
        </div>
        <p style={{
          fontFamily: 'Sora, system-ui', fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)',
          alignSelf: 'flex-end', margin: 0,
        }}>
          Não vendemos cada serviço isolado. Vendemos a operação inteira sob controle —
          do papel empilhado no almoxarifado ao dashboard de gestão na tela do diretor.
        </p>
      </div>

      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, alignItems: 'start' }}>
        {/* left: list */}
        <div>
          {V2_SERVICES.map((s, i) => (
            <div key={i}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              style={{
                padding: '24px 0', borderTop: `1px solid ${active === i ? V2_BLUE_LIGHT : 'rgba(255,255,255,0.1)'}`,
                cursor: 'pointer', display: 'grid', gridTemplateColumns: '60px 1fr auto',
                alignItems: 'center', gap: 16, transition: 'all 0.3s ease',
              }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: active === i ? V2_BLUE_LIGHT : 'rgba(255,255,255,0.4)' }}>
                {s.n}
              </div>
              <div style={{
                fontFamily: 'Sora, system-ui', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em',
                color: active === i ? 'white' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.3s ease',
              }}>{s.title}</div>
              <div style={{
                fontSize: 18, color: V2_BLUE_LIGHT,
                opacity: active === i ? 1 : 0,
                transform: active === i ? 'translateX(0)' : 'translateX(-8px)',
                transition: 'all 0.3s ease',
              }}>→</div>
            </div>
          ))}
        </div>

        {/* right: detail card */}
        <div style={{
          background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 40,
          minHeight: 480,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 12, background: V2_BLUE,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <V2ArrowPlus size={36} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: V2_BLUE_LIGHT, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Serviço {V2_SERVICES[active].n}
              </div>
              <div style={{ fontFamily: 'Sora, system-ui', fontSize: 24, fontWeight: 600, color: 'white', marginTop: 2 }}>
                {V2_SERVICES[active].title}
              </div>
            </div>
          </div>

          <p style={{
            fontFamily: '"Fraunces", serif', fontSize: 28, lineHeight: 1.3, fontStyle: 'italic',
            color: 'white', fontWeight: 300, margin: 0, marginBottom: 32, letterSpacing: '-0.01em',
          }}>
            {V2_SERVICES[active].short}
          </p>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>
              O que está incluso
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {V2_SERVICES[active].items.map((it, i) => (
                <div key={i} style={{
                  padding: '12px 16px', background: 'rgba(255,255,255,0.04)',
                  borderRadius: 8, fontFamily: 'Sora, system-ui', fontSize: 14, color: 'white',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ color: V2_BLUE_LIGHT }}>✓</span>
                  {it}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const V2_STACK = [
  { cat: 'Frontend', icon: '◇', items: ['Next.js 15', 'React 18', 'TypeScript 5', 'Tailwind CSS', 'Electron 30', 'shadcn/ui'] },
  { cat: 'Backend',  icon: '◈', items: ['Node.js 22', 'PostgreSQL 16', 'Redis 7', 'Prisma ORM', 'tRPC', 'BullMQ'] },
  { cat: 'Infra',    icon: '◉', items: ['AWS EC2 + RDS', 'Docker', 'GitHub Actions', 'Cloudflare', 'Datadog', 'Sentry'] },
  { cat: 'GED & OCR', icon: '◆', items: ['Tesseract OCR', 'Kofax Capture', 'TIFF / PDF/A', 'ZBar barcode', 'ImageMagick', 'PDFtk'] },
];

const V2Stack = () => (
  <section style={{ padding: '120px 64px', background: 'white' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, gap: 40 }}>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: V2_BLUE, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>
          [03] Stack tecnológica
        </div>
        <h2 style={{
          fontFamily: 'Sora, system-ui', fontWeight: 700,
          fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.05,
          letterSpacing: '-0.03em', color: V2_INK, margin: 0,
        }}>
          Ferramentas <span style={{ color: V2_BLUE }}>maduras</span>,<br/>
          escolhidas a dedo.
        </h2>
      </div>
      <p style={{
        fontFamily: 'Sora, system-ui', fontSize: 16, lineHeight: 1.55, color: V2_INK_SOFT,
        maxWidth: 380, margin: 0,
      }}>
        Não usamos cada nova framework que sai. O que vai pra produção precisa aguentar
        plantão hospitalar de madrugada — então prefere-se boring.
      </p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: `1px solid ${V2_LINE}`, borderRadius: 16, overflow: 'hidden' }}>
      {V2_STACK.map((s, i) => (
        <div key={i} style={{
          padding: 32,
          borderRight: i < 3 ? `1px solid ${V2_LINE}` : 'none',
          background: i % 2 === 0 ? 'white' : '#FAFBFC',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${V2_LINE}` }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, background: V2_BLUE_TINT,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: V2_BLUE, fontSize: 18,
            }}>{s.icon}</div>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: V2_INK_SOFT, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: 'Sora, system-ui', fontSize: 16, fontWeight: 600, color: V2_INK }}>{s.cat}</div>
            </div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {s.items.map(it => (
              <li key={it} style={{
                fontFamily: 'Sora, system-ui', fontSize: 14, color: V2_INK,
                padding: '10px 0', borderBottom: `1px dashed ${V2_LINE}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span>{it}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#10B981' }}>● prod</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

const V2CTA = () => (
  <section style={{
    padding: '64px',
    background: V2_BLUE,
    color: 'white', position: 'relative', overflow: 'hidden',
    margin: '0 16px 16px', borderRadius: 24,
  }}>
    <V2Pattern color="white" opacity={0.07} scale={1.4} />

    <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 80, alignItems: 'center' }}>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: V2_BLUE_LIGHT, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>
          [04] Próximo passo
        </div>
        <h2 style={{
          fontFamily: 'Sora, system-ui', fontWeight: 700,
          fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 0.98,
          letterSpacing: '-0.03em', color: 'white', margin: 0,
        }}>
          Conta pra gente o<br/>
          tamanho do seu legado.<br/>
          <span style={{ color: V2_BLUE_LIGHT }}>Devolvemos um plano em 24h.</span>
        </h2>
        <p style={{
          fontFamily: 'Sora, system-ui', fontSize: 18, lineHeight: 1.55,
          color: 'rgba(255,255,255,0.8)', marginTop: 32, maxWidth: 560,
        }}>
          Diagnóstico inicial sem custo. Você manda fotos do arquivo, screenshots do sistema atual
          ou um print do problema — devolvemos um caminho técnico e uma estimativa.
        </p>
        <button style={{
          marginTop: 40,
          background: 'white', color: V2_BLUE, border: 'none',
          padding: '22px 36px', borderRadius: 12,
          fontFamily: 'Sora, system-ui', fontSize: 16, fontWeight: 700,
          cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 12,
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Falar no WhatsApp
          <span>→</span>
        </button>

        {/* phone hint */}
        <div style={{ marginTop: 24, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
          +55 (32) 9 8765-4321 · seg-sex 9h-18h
        </div>
      </div>

      {/* big arrow+ */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <V2ArrowPlus size={420} color={V2_BLUE_LIGHT} opacity={0.5} />
      </div>
    </div>
  </section>
);

const V2Footer = () => (
  <footer style={{ padding: '48px 64px 32px', background: 'white' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, paddingBottom: 32, borderBottom: `1px solid ${V2_LINE}` }}>
      <div>
        <V2Wordmark size={28} />
        <p style={{
          fontFamily: 'Sora, system-ui', fontSize: 14, lineHeight: 1.5,
          color: V2_INK_SOFT, marginTop: 16, maxWidth: 320,
        }}>
          Software house brasileira. Eficiência, tecnologia e refino para empresas
          que precisam pôr a operação em ordem.
        </p>
      </div>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: V2_BLUE, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>
          Serviços
        </div>
        {['Software sob medida', 'Digitalização (GED)', 'Automação', 'Consultoria', 'Suporte'].map(x => (
          <div key={x} style={{ fontFamily: 'Sora, system-ui', fontSize: 14, color: V2_INK, padding: '6px 0' }}>{x}</div>
        ))}
      </div>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: V2_BLUE, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>
          Empresa
        </div>
        {['Sobre', 'Manifesto', 'Cases', 'Carreiras', 'Imprensa'].map(x => (
          <div key={x} style={{ fontFamily: 'Sora, system-ui', fontSize: 14, color: V2_INK, padding: '6px 0' }}>{x}</div>
        ))}
      </div>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: V2_BLUE, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>
          Contato
        </div>
        <div style={{ fontFamily: 'Sora, system-ui', fontSize: 14, color: V2_INK, padding: '6px 0' }}>contato@scandexplus.com.br</div>
        <div style={{ fontFamily: 'Sora, system-ui', fontSize: 14, color: V2_INK, padding: '6px 0' }}>+55 (32) 9 8765-4321</div>
        <div style={{ fontFamily: 'Sora, system-ui', fontSize: 14, color: V2_INK, padding: '6px 0' }}>Belo Horizonte, MG</div>
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, fontFamily: 'Sora, system-ui', fontSize: 13, color: V2_INK_SOFT }}>
      <span>© 2026 Scandex+ Serviços Digitais</span>
      <span style={{ fontStyle: 'italic' }}>Powered by ScandexPRO™</span>
    </div>
  </footer>
);

const LandingV2 = () => (
  <div style={{ background: '#F4F6F8', minHeight: '100vh' }}>
    <V2Nav />
    <V2Hero />
    <V2About />
    <V2Services />
    <V2Stack />
    <V2CTA />
    <V2Footer />
  </div>
);

window.LandingV2 = LandingV2;
