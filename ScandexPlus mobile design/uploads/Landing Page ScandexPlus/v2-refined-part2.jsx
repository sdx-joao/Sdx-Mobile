// V2.1 part 2 — About, ScandexPRO solution, Services, Stack, CTA, Footer
const { COLORS, ArrowPlus, Wordmark, Pattern, WhatsappIcon, Reveal, CountUp } = window.SDXP;

// ─────────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────────
const About = ({ T }) => (
  <section style={{ padding: '120px 40px', background: 'white' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
      <Reveal>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.primary, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 24 }}>
          ─── [01] Sobre a Scandex+
        </div>
        <h2 style={{
          fontFamily: 'Sora, system-ui', fontWeight: 700,
          fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.02,
          letterSpacing: '-0.035em', color: COLORS.ink, margin: 0,
        }}>
          Empresa nova.<br/>
          <span style={{ color: T.primary, fontFamily: '"Fraunces", serif', fontWeight: 300, fontStyle: 'italic' }}>Equipe que já tirou</span> mais de 1 milhão de documentos do papel.
        </h2>
        <p style={{
          fontFamily: 'Sora, system-ui', fontSize: 17, lineHeight: 1.6, color: COLORS.inkSoft, marginTop: 28, textWrap: 'pretty',
        }}>
          A Scandex+ é uma marca recém-fundada — mas as pessoas por trás dela passaram a carreira inteira digitalizando arquivos: setor público, privado, contratos, prontuários, processos. Já vivemos auditorias resgatadas em cima da hora — e construímos os processos para que a próxima sequer precise de resgate. Agora juntamos essa bagagem a tecnologia própria, incluindo o <strong style={{ color: COLORS.ink, fontWeight: 600 }}>ScandexPRO™</strong>, nosso GED.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 36 }}>
          {[
            ['Especialização', 'Não somos generalistas que entraram em GED. Já nascemos especialistas.'],
            ['Bagagem real', '+1 milhão de documentos digitalizados ao longo da carreira da equipe.'],
            ['Refino', 'Sistemas que sua equipe entende sem manual — porque já passamos pelo seu lugar.'],
            ['Conformidade', 'LGPD e retenção legal — domínio prático, forjado em auditoria real.'],
          ].map(([t, b], i) => (
            <div key={i} style={{ borderTop: `2px solid ${T.primary}`, paddingTop: 14 }}>
              <div style={{ fontFamily: 'Sora, system-ui', fontWeight: 600, fontSize: 14.5, color: COLORS.ink, marginBottom: 6 }}>{t}</div>
              <div style={{ fontFamily: 'Sora, system-ui', fontSize: 13, lineHeight: 1.5, color: COLORS.inkSoft }}>{b}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div style={{ position: 'relative', height: 560 }}>
          <div style={{ position: 'absolute', inset: 0, background: COLORS.blueTint, borderRadius: 20, overflow: 'hidden' }}>
            <Pattern surface="light" opacity={T.patternIntensity * 0.55} scale={0.95} />
          </div>
          <div style={{
            position: 'absolute', top: 32, left: 32, right: 32, padding: 28,
            background: 'white', borderRadius: 16, border: `1px solid ${COLORS.line}`,
            boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <Wordmark size={18} accent={T.primary} />
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: COLORS.inkSoft }}>NOVA · ESTREIA 2026</div>
            </div>
            <div style={{ fontFamily: '"Fraunces", serif', fontSize: 22, lineHeight: 1.35, color: COLORS.ink, fontStyle: 'italic', fontWeight: 300 }}>
              "Empresa nova é toda igual? Não a nossa. Já tiramos +1 milhão de documentos do papel — só faltava o nome."
            </div>
            <div style={{ marginTop: 20, fontFamily: 'Sora, system-ui', fontSize: 12, color: COLORS.inkSoft }}>— Manifesto Scandex+</div>
          </div>
          <div style={{
            position: 'absolute', bottom: 32, right: 24, padding: 18,
            background: COLORS.ink, color: 'white', borderRadius: 12,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
            maxWidth: 280, boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
          }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <span style={{ color: T.accent }}>●</span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>equipe.bagagem</span>
            </div>
            <div style={{ lineHeight: 1.7 }}>
              <span style={{ color: T.accent }}>+1M docs digitalizados</span><br/>
              <span style={{ color: T.accent }}>público + privado</span><br/>
              <span style={{ color: T.accent }}>0 auditorias perdidas</span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────
// SCANDEXPRO Solution Block
// ─────────────────────────────────────────────────────────────────────
const ScandexPro = ({ T }) => {
  const [tab, setTab] = React.useState(0);
  const tabs = [
    {
      label: 'Documentos',
      title: 'Cada papel encontra o seu lugar.',
      body: 'Captura, OCR, indexação automática e busca textual em milhões de documentos. Status visual por dot colorido, retenção configurável, trilha de auditoria por ação.',
      points: ['OCR multi-idioma + indexação por código de barras', 'Visualização de TIFF, PDF/A e imagens', 'Status: disponível, processando, alterado, ausente', 'Permissões granulares por setor e por documento'],
    },
    {
      label: 'Contratos',
      title: 'Do template à assinatura, com trilha completa.',
      body: 'Templates versionados, fluxo de aprovação configurável, alertas de vencimento e aditivos vinculados. Tudo conectado ao cadastro da contraparte.',
      points: ['Templates versionados com placeholders', 'Workflow de aprovação multi-nível', 'Alertas de vencimento e renovação', 'Aditivos vinculados ao contrato-mãe'],
    },
    {
      label: 'Auditoria',
      title: 'Tudo rastreável. Tudo defensável.',
      body: 'Cada visualização, edição e exportação registrada com usuário, IP, timestamp e dispositivo. Relatórios prontos para compliance, LGPD e auditoria externa.',
      points: ['Trilha de auditoria imutável', 'Relatórios LGPD prontos para o DPO', 'Exportação para CSV / PDF assinado', 'Retenção legal configurável por tipo'],
    },
  ];

  return (
    <section style={{ padding: '120px 40px', background: COLORS.paper, position: 'relative', overflow: 'hidden' }}>
      <Pattern surface="light" opacity={T.patternIntensity * 0.18} scale={1.6} />
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 32, marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.primary, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 24 }}>
                ─── [02] Solução · ScandexPRO™
              </div>
              <h2 style={{
                fontFamily: 'Sora, system-ui', fontWeight: 700,
                fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 1.0,
                letterSpacing: '-0.04em', color: COLORS.ink, margin: 0, maxWidth: 900,
              }}>
                O GED feito para quem<br/>
                <span style={{ color: T.primary }}>gerencia documentos e contratos</span> a sério.
              </h2>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '8px 14px', background: 'white', border: `1px solid ${COLORS.line}`,
              borderRadius: 999, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: COLORS.inkSoft,
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>
              GED · v3.2
            </div>
          </div>
        </Reveal>

        {/* Tab strip */}
        <div style={{
          display: 'inline-flex', padding: 4, background: 'white', border: `1px solid ${COLORS.line}`,
          borderRadius: 14, marginBottom: 32,
        }}>
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              padding: '12px 24px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: tab === i ? T.primary : 'transparent',
              color: tab === i ? 'white' : COLORS.inkSoft,
              fontFamily: 'Sora, system-ui', fontWeight: 600, fontSize: 14,
              transition: 'all 0.25s ease',
            }}>{t.label}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' }}>
          <Reveal key={tab}>
            <h3 style={{
              fontFamily: '"Fraunces", serif', fontWeight: 300, fontStyle: 'italic',
              fontSize: 'clamp(32px, 3.5vw, 48px)', lineHeight: 1.15, letterSpacing: '-0.02em',
              color: COLORS.ink, margin: 0,
            }}>{tabs[tab].title}</h3>
            <p style={{
              fontFamily: 'Sora, system-ui', fontSize: 17, lineHeight: 1.6,
              color: COLORS.inkSoft, marginTop: 24, textWrap: 'pretty',
            }}>{tabs[tab].body}</p>
            <div style={{ marginTop: 32, display: 'grid', gap: 12 }}>
              {tabs[tab].points.map((p, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 18px', background: 'white', borderRadius: 10,
                  border: `1px solid ${COLORS.line}`,
                  fontFamily: 'Sora, system-ui', fontSize: 14, color: COLORS.ink,
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: 6, background: COLORS.blueTint,
                    color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, flexShrink: 0,
                  }}>✓</span>
                  {p}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Visual: ambiente / equipamento — fotos por aba */}
          <Reveal delay={120}>
            <div style={{ position: 'relative' }}>
              {(() => {
                const VISUALS = [
                  {
                    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
                    fallback: COLORS.blueDeep,
                    eyebrow: 'Custódia · contratos · processos',
                    headline: 'Tudo na nuvem.\nAcesso em segundos.',
                    chips: ['Multi-formato', 'OCR pesquisável', 'Acesso por API'],
                  },
                  {
                    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
                    fallback: COLORS.ink,
                    eyebrow: 'Versionamento · aditivos · assinatura',
                    headline: 'Cada versão.\nCada cláusula.\nCada assinatura.',
                    chips: ['Histórico v1 → v8', 'Diff por cláusula', 'Assinatura digital'],
                  },
                  {
                    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80',
                    fallback: COLORS.blueDeep,
                    eyebrow: 'Quem · quando · de onde',
                    headline: 'Trilha de auditoria\nimutável.',
                    chips: ['LGPD · DPO ready', 'Logs imutáveis', 'Export auditável'],
                  },
                ];
                const v = VISUALS[tab];
                return (
                  <div key={tab} style={{
                    position: 'relative', borderRadius: 20, overflow: 'hidden',
                    boxShadow: '0 30px 80px rgba(15,22,32,0.18)',
                    aspectRatio: '4 / 5', background: v.fallback,
                  }}>
                    <img
                      src={v.img}
                      alt=""
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      }}
                    />
                    {/* gradient veil */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(180deg, rgba(15,22,32,0.05) 0%, rgba(15,22,32,0.55) 70%, rgba(15,22,32,0.85) 100%)`,
                    }}></div>
                    {/* decorative arrow+ glyph */}
                    <div style={{ position: 'absolute', right: 24, top: 24, opacity: 0.92 }}>
                      <ArrowPlus size={68} color="white" />
                    </div>
                    {/* caption block */}
                    <div style={{
                      position: 'absolute', left: 0, right: 0, bottom: 0,
                      padding: '32px 28px 28px', color: 'white',
                    }}>
                      <div style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                        textTransform: 'uppercase', letterSpacing: '0.16em',
                        opacity: 0.85, marginBottom: 12,
                      }}>{v.eyebrow}</div>
                      <div style={{
                        fontFamily: '"Fraunces", serif', fontWeight: 300, fontStyle: 'italic',
                        fontSize: 'clamp(28px, 3vw, 38px)', lineHeight: 1.15,
                        letterSpacing: '-0.02em', whiteSpace: 'pre-line', marginBottom: 18,
                      }}>{v.headline}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {v.chips.map((c, i) => (
                          <span key={i} style={{
                            padding: '6px 12px', borderRadius: 999,
                            background: 'rgba(255,255,255,0.16)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.22)',
                            fontFamily: 'Sora, system-ui', fontSize: 12, fontWeight: 500,
                          }}>{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────
// SERVICES (refined)
// ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { n: '01', title: 'Software sob medida', short: 'Sistemas web e desktop construídos do zero.',
    items: ['Next.js & TypeScript', 'Electron desktop', 'Integração com ERPs e legados', 'Mobile (PWA / React Native)'] },
  { n: '02', title: 'Digitalização (GED)', short: 'Captura, OCR, indexação e custódia.',
    items: ['Scanners de produção', 'OCR multi-idioma', 'Conformidade LGPD', 'Backup e retenção legal'] },
  { n: '03', title: 'Automação de processos', short: 'Tira a planilha do meio do caminho.',
    items: ['RPA e workflows', 'BPMN customizado', 'APIs e webhooks', 'Aprovações e SLAs'] },
  { n: '04', title: 'Consultoria digital', short: 'Diagnóstico antes do código.',
    items: ['Mapa de sistemas atual', 'Roadmap 12-24 meses', 'Arquitetura técnica', 'Análise de compliance'] },
  { n: '05', title: 'Suporte & manutenção', short: 'Sustentação contínua, plantão, SLA.',
    items: ['Monitoramento 24/7', 'Plantão em operações críticas', 'SLAs de resposta', 'Patches de segurança'] },
];

const Services = ({ T }) => {
  const [active, setActive] = React.useState(0);
  return (
    <section style={{ padding: '120px 40px', background: 'white' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.primary, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 24 }}>
                ─── [03] Serviços
              </div>
              <h2 style={{
                fontFamily: 'Sora, system-ui', fontWeight: 700,
                fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.05,
                letterSpacing: '-0.035em', color: COLORS.ink, margin: 0,
              }}>
                Cinco frentes.<br/>
                Um único <span style={{ color: T.primary, fontFamily: '"Fraunces", serif', fontWeight: 300, fontStyle: 'italic' }}>princípio</span>.
              </h2>
            </div>
            <p style={{
              fontFamily: 'Sora, system-ui', fontSize: 17, lineHeight: 1.6, color: COLORS.inkSoft,
              alignSelf: 'flex-end', margin: 0,
            }}>
              Não vendemos serviço isolado. Vendemos a operação inteira sob controle —
              do papel empilhado no almoxarifado ao dashboard de gestão na tela do diretor.
            </p>
          </div>
        </Reveal>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 32,
          background: COLORS.paper, borderRadius: 20, padding: 24,
          border: `1px solid ${COLORS.line}`,
        }}>
          <div>
            {SERVICES.map((s, i) => (
              <div key={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{
                  padding: '20px 16px', borderRadius: 12,
                  background: active === i ? 'white' : 'transparent',
                  boxShadow: active === i ? '0 4px 16px rgba(15,22,32,0.06)' : 'none',
                  cursor: 'pointer', display: 'grid', gridTemplateColumns: '40px 1fr auto',
                  alignItems: 'center', gap: 12, transition: 'all 0.25s ease',
                }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: active === i ? T.primary : COLORS.inkSoft, fontWeight: 600 }}>
                  {s.n}
                </div>
                <div style={{
                  fontFamily: 'Sora, system-ui', fontSize: 18, fontWeight: 600, letterSpacing: '-0.015em',
                  color: active === i ? COLORS.ink : COLORS.inkSoft, transition: 'all 0.25s ease',
                }}>{s.title}</div>
                <div style={{
                  fontSize: 16, color: T.primary,
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? 'translateX(0)' : 'translateX(-6px)',
                  transition: 'all 0.25s ease',
                }}>→</div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'white', borderRadius: 14, padding: 36,
            border: `1px solid ${COLORS.line}`, minHeight: 420,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 28 }}>
              <div style={{
                fontFamily: '"Fraunces", serif', fontWeight: 300, fontStyle: 'italic',
                fontSize: 88, lineHeight: 0.85, color: T.primary,
                letterSpacing: '-0.04em', minWidth: 90,
              }}>
                {SERVICES[active].n}
              </div>
              <div style={{ paddingTop: 10 }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.primary, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                  Serviço
                </div>
                <div style={{ fontFamily: 'Sora, system-ui', fontSize: 26, fontWeight: 700, color: COLORS.ink, marginTop: 4, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  {SERVICES[active].title}
                </div>
              </div>
            </div>

            <p style={{
              fontFamily: '"Fraunces", serif', fontSize: 28, lineHeight: 1.3, fontStyle: 'italic',
              color: COLORS.ink, fontWeight: 300, margin: 0, marginBottom: 28, letterSpacing: '-0.01em',
            }}>
              {SERVICES[active].short}
            </p>

            <div style={{ borderTop: `1px solid ${COLORS.line}`, paddingTop: 22 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 14 }}>
                O que está incluso
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {SERVICES[active].items.map((it, i) => (
                  <div key={i} style={{
                    padding: '12px 14px', background: COLORS.paper,
                    borderRadius: 8, fontFamily: 'Sora, system-ui', fontSize: 13.5, color: COLORS.ink,
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{ color: T.primary, fontWeight: 700 }}>✓</span>
                    {it}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────
// STACK
// ─────────────────────────────────────────────────────────────────────
const STACK = [
  { cat: 'Frontend',  icon: '◇', items: ['Next.js 15', 'React 18', 'TypeScript 5', 'Tailwind CSS', 'Electron 30', 'shadcn/ui'] },
  { cat: 'Backend',   icon: '◈', items: ['Node.js 22', 'PostgreSQL 16', 'Redis 7', 'Prisma ORM', 'tRPC', 'BullMQ'] },
  { cat: 'Infra',     icon: '◉', items: ['AWS EC2 + RDS', 'Docker', 'GitHub Actions', 'Cloudflare', 'Datadog', 'Sentry'] },
  { cat: 'GED & OCR', icon: '◆', items: ['Tesseract OCR', 'Kofax Capture', 'TIFF / PDF/A', 'ZBar barcode', 'ImageMagick', 'PDFtk'] },
];

const Stack = ({ T }) => (
  <section style={{ padding: '120px 40px', background: COLORS.paper }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 40, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.primary, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 24 }}>
              ─── [04] Stack tecnológica
            </div>
            <h2 style={{
              fontFamily: 'Sora, system-ui', fontWeight: 700,
              fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.05,
              letterSpacing: '-0.035em', color: COLORS.ink, margin: 0,
            }}>
              Ferramentas <span style={{ color: T.primary, fontFamily: '"Fraunces", serif', fontWeight: 300, fontStyle: 'italic' }}>maduras</span>,<br/>
              escolhidas a dedo.
            </h2>
          </div>
          <p style={{
            fontFamily: 'Sora, system-ui', fontSize: 16, lineHeight: 1.55, color: COLORS.inkSoft,
            maxWidth: 380, margin: 0,
          }}>
            Não usamos cada nova framework que sai. O que vai pra produção precisa aguentar
            operação crítica em horário de pico — então prefere-se boring.
          </p>
        </div>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: `1px solid ${COLORS.line}`, borderRadius: 16, overflow: 'hidden', background: 'white' }}>
        {STACK.map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{
              padding: 28, borderRight: i < 3 ? `1px solid ${COLORS.line}` : 'none', height: '100%',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${COLORS.line}` }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: COLORS.blueTint,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: T.primary, fontSize: 18,
                }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ fontFamily: 'Sora, system-ui', fontSize: 16, fontWeight: 700, color: COLORS.ink, letterSpacing: '-0.015em' }}>{s.cat}</div>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {s.items.map(it => (
                  <li key={it} style={{
                    fontFamily: 'Sora, system-ui', fontSize: 14, color: COLORS.ink,
                    padding: '10px 0', borderBottom: `1px dashed ${COLORS.line}`,
                  }}>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Subtle invitation — we work with other stacks too */}
      <Reveal delay={400}>
        <div style={{
          marginTop: 24, display: 'flex', justifyContent: 'center',
          fontFamily: 'Sora, system-ui', fontSize: 14.5, color: COLORS.inkSoft,
          letterSpacing: '-0.005em',
        }}>
          <span>
            Trabalha com outra tecnologia?{' '}
            <a href="#contato" style={{
              color: T.primary, textDecoration: 'none', fontWeight: 500,
              borderBottom: `1px solid ${T.primary}55`, paddingBottom: 1,
            }}>
              Vamos conversar sobre <span style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontWeight: 300 }}>→</span>
            </a>
          </span>
        </div>
      </Reveal>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────
// CTA + FOOTER
// ─────────────────────────────────────────────────────────────────────
const CTA = ({ T }) => (
  <section style={{ padding: '20px 12px' }}>
    <div style={{
      padding: '80px 56px', background: T.primary, color: 'white',
      borderRadius: 28, position: 'relative', overflow: 'hidden',
    }}>
      <Pattern surface="dark" opacity={T.patternIntensity * 0.28} scale={1.4} />
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 64, alignItems: 'center' }}>
        <Reveal>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.accent, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 24 }}>
            ─── [05] Próximo passo
          </div>
          <h2 style={{
            fontFamily: 'Sora, system-ui', fontWeight: 700,
            fontSize: 'clamp(44px, 5.5vw, 80px)', lineHeight: 0.98,
            letterSpacing: '-0.035em', color: 'white', margin: 0,
          }}>
            Conta pra gente o<br/>
            tamanho do seu legado.<br/>
            <span style={{ color: T.accent, fontFamily: '"Fraunces", serif', fontWeight: 300, fontStyle: 'italic' }}>Devolvemos um plano em 24h.</span>
          </h2>
          <p style={{
            fontFamily: 'Sora, system-ui', fontSize: 17, lineHeight: 1.55,
            color: 'rgba(255,255,255,0.85)', marginTop: 28, maxWidth: 560,
          }}>
            Diagnóstico inicial sem custo. Mande fotos do arquivo, screenshots do sistema atual
            ou só descreva o problema — devolvemos um caminho técnico e uma estimativa.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <button style={{
              background: 'white', color: T.primary, border: 'none',
              padding: '20px 32px', borderRadius: 12,
              fontFamily: 'Sora, system-ui', fontSize: 15.5, fontWeight: 700,
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 12,
              boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
            }}>
              <WhatsappIcon size={18} />
              Falar no WhatsApp
              <span>→</span>
            </button>
            <button style={{
              background: 'rgba(255,255,255,0.12)', color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '20px 32px', borderRadius: 12,
              fontFamily: 'Sora, system-ui', fontSize: 15.5, fontWeight: 600, cursor: 'pointer',
            }}>contato@scandexplus.com.br</button>
          </div>
          <div style={{ marginTop: 22, fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5, color: 'rgba(255,255,255,0.7)' }}>
            +55 (32) 9 8765-4321 · seg-sex 9h-18h
          </div>
        </Reveal>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <ArrowPlus size={380} color={T.accent} opacity={0.55} weight={3} />
        </div>
      </div>
    </div>
  </section>
);

const Footer = ({ T }) => (
  <footer style={{ padding: '40px 40px 24px', background: 'white' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, paddingBottom: 28, borderBottom: `1px solid ${COLORS.line}` }}>
        <div>
          <Wordmark size={24} accent={T.primary} />
          <p style={{
            fontFamily: 'Sora, system-ui', fontSize: 13.5, lineHeight: 1.55,
            color: COLORS.inkSoft, marginTop: 14, maxWidth: 320,
          }}>
            Software house brasileira. Eficiência, tecnologia e refino para empresas
            que precisam pôr a operação em ordem.
          </p>
        </div>
        {[
          { t: 'Serviços', items: ['Software sob medida', 'Digitalização (GED)', 'Automação', 'Consultoria', 'Suporte'] },
          { t: 'Empresa',  items: ['Sobre', 'Manifesto', 'Equipe', 'Carreiras', 'Imprensa'] },
          { t: 'Contato',  items: ['contato@scandexplus.com.br', '+55 (32) 9 8765-4321', 'Belo Horizonte, MG'] },
        ].map((col, i) => (
          <div key={i}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: T.primary, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 12 }}>
              {col.t}
            </div>
            {col.items.map(x => (
              <div key={x} style={{ fontFamily: 'Sora, system-ui', fontSize: 13.5, color: COLORS.ink, padding: '5px 0' }}>{x}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, fontFamily: 'Sora, system-ui', fontSize: 12.5, color: COLORS.inkSoft }}>
        <span>© 2026 Scandex+ Serviços Digitais</span>
        <span style={{ fontStyle: 'italic' }}>Powered by ScandexPRO™</span>
      </div>
    </div>
  </footer>
);

window.SDXP_Sections = { About, ScandexPro, Services, Stack, CTA, Footer };
