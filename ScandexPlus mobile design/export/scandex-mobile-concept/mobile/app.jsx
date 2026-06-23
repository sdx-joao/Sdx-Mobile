// ScandexPRO Mobile — App shell, scaffolds, home, login, navigation

// ── Shared layout scaffolds ─────────────────────────────────────────────────
function BlueHeader({ children, compact }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`,
      padding: compact ? '44px 18px 18px' : '46px 18px 20px',
      color: '#fff', position: 'relative', flexShrink: 0,
      boxShadow: '0 6px 18px -8px rgba(7,40,202,.5)',
    }}>{children}</div>
  );
}

function ModuleScreen({ cfg, title, subtitle, onNew, newLabel, newIcon = 'plus', children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <BlueHeader>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ margin: 0, fontSize: 23, fontWeight: 800, letterSpacing: -0.3, fontFamily: T.font }}>{title}</h1>
            <p style={{ margin: '5px 0 0', fontSize: 13, color: 'rgba(255,255,255,.78)', fontFamily: T.font }}>{subtitle}</p>
          </div>
          <button style={{ width: 40, height: 40, borderRadius: 12, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
            <Icon name="bell" size={19} color="#fff" />
            <span style={{ position: 'absolute', top: 9, right: 10, width: 7, height: 7, borderRadius: '50%', background: '#FBBF24', border: '1.5px solid #1538C9' }} />
          </button>
        </div>
        {onNew && (
          <button onClick={onNew} style={{
            marginTop: 16, width: '100%', height: 44, borderRadius: 12, border: 'none', cursor: 'pointer',
            background: '#fff', color: T.primary, fontSize: 14, fontWeight: 700, fontFamily: T.font,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Icon name={newIcon} size={18} color={T.primary} /> {newLabel}
          </button>
        )}
      </BlueHeader>
      <div style={{ flex: 1, overflow: 'auto', background: T.bg, paddingTop: onNew ? 10 : 12 }}>
        {children}
      </div>
    </div>
  );
}

function DetailScaffold({ cfg, onBack, eyebrow, title, badge, headerExtra, compact, children }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 60, display: 'flex', flexDirection: 'column', background: T.bg }}>
      <BlueHeader compact={compact}>
        <button onClick={onBack} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12, padding: '6px 10px 6px 6px',
          borderRadius: 9, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,.14)',
          color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: T.font,
        }}>
          <Icon name="arrow-left" size={17} color="#fff" /> Voltar
        </button>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,.7)', letterSpacing: 0.3, fontFamily: T.font }}>{eyebrow}</div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginTop: 4 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: -0.2, fontFamily: T.font, lineHeight: 1.25 }}>{title}</h1>
          {badge && <div style={{ flexShrink: 0, marginTop: 3 }}>{badge}</div>}
        </div>
        {headerExtra}
      </BlueHeader>
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>{children}</div>
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '56px 24px', textAlign: 'center' }}>
      <div style={{ width: 60, height: 60, borderRadius: 18, background: T.surfaceMuted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={26} color={T.faint} />
      </div>
      <span style={{ fontSize: 14, color: T.muted, fontFamily: T.font }}>{text}</span>
    </div>
  );
}

// ── Home / Dashboard ────────────────────────────────────────────────────────
function StatTile({ value, label, icon, tone, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, textAlign: 'left', cursor: 'pointer', background: T.surface,
      border: `1px solid ${T.border}`, borderRadius: 14, padding: 13, fontFamily: T.font,
    }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: `${tone}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 9 }}>
        <Icon name={icon} size={17} color={tone} />
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: T.text, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11.5, color: T.muted, marginTop: 4 }}>{label}</div>
    </button>
  );
}

function HomeScreen({ cfg, user, onGoOrders, onGoInventory, onOpenWO, onOpenItem }) {
  const lowItems = INVENTORY.filter(i => i.itemType !== 'equipment' && i.minQty > 0 && i.currentQty < i.minQty);
  const recent = WORK_ORDERS.filter(w => w.status === 'open' || w.status === 'in_progress' || w.status === 'waiting').slice(0, 3);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <BlueHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
          <BrandTile size={28} radius={9} shadow={false} />
          <span style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: -0.2, fontFamily: T.font }}>ScandexPRO<span style={{ fontSize: 9, verticalAlign: 'super', fontWeight: 600, opacity: 0.7 }}>™</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', fontFamily: T.font }}>Bem-vindo de volta,</div>
            <h1 style={{ margin: '3px 0 0', fontSize: 22, fontWeight: 800, letterSpacing: -0.3, fontFamily: T.font }}>{user.name}</h1>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,.8)', fontFamily: T.font }}>
              <Icon name="building" size={13} color="rgba(255,255,255,.8)" /> {user.unit} · {user.dept}
            </div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 13, background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: T.font, flexShrink: 0 }}>
            {user.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </div>
        </div>
      </BlueHeader>

      <div style={{ flex: 1, overflow: 'auto', background: T.bg, padding: '16px 16px 24px' }}>
        {/* Stats */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <StatTile value={WO_STATS.activeNow} label="OS ativas" icon="clipboard" tone={cfg.accent} onClick={onGoOrders} />
          <StatTile value={WO_STATS.openedToday} label="Abertas hoje" icon="zap" tone="#EA580C" onClick={onGoOrders} />
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
          <StatTile value={INV_STATS.lowStock} label="Estoque baixo" icon="alert" tone="#DC2626" onClick={onGoInventory} />
          <StatTile value={INV_STATS.inMaintenance} label="Em manutenção" icon="wrench" tone="#CA8A04" onClick={onGoInventory} />
        </div>

        {/* Quick modules */}
        <SectionTitle>Módulos</SectionTitle>
        <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
          <ModuleTile icon="clipboard" label="Ordens de Serviço" sub={`${WO_STATS.activeNow} ativas`} accent={cfg.accent} onClick={onGoOrders} />
          <ModuleTile icon="package" label="Inventário" sub={`${INV_STATS.lowStock} alertas`} accent={cfg.accent} onClick={onGoInventory} />
        </div>

        {/* Attention: low stock */}
        {lowItems.length > 0 && (
          <>
            <SectionTitle action={<TextLink onClick={onGoInventory}>Ver tudo</TextLink>}>Estoque em alerta</SectionTitle>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: '2px 14px', marginBottom: 22 }}>
              {lowItems.map((it, i) => {
                const tone = stockStatusOf(it);
                return (
                  <button key={it.id} onClick={() => onOpenItem(it)} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 11, padding: '12px 0', borderBottom: i < lowItems.length - 1 ? `1px solid ${T.surfaceMuted}` : 'none', fontFamily: T.font }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: `${tone.solid}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name="alert" size={16} color={tone.solid} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.name}</div>
                      <div style={{ fontSize: 11.5, color: T.muted }}>{it.currentQty} {it.unit} · mín. {it.minQty}</div>
                    </div>
                    <Badge tone={tone} style={cfg.badgeStyle} size="sm" />
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Recent OS */}
        <SectionTitle action={<TextLink onClick={onGoOrders}>Ver tudo</TextLink>}>Ordens em aberto</SectionTitle>
        {recent.map(wo => <WOCard key={wo.id} wo={wo} cfg={cfg} onOpen={onOpenWO} />)}
      </div>
    </div>
  );
}

function SectionTitle({ children, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: T.text, letterSpacing: 0.2, fontFamily: T.font }}>{children}</span>
      {action}
    </div>
  );
}
function TextLink({ children, onClick }) {
  return <button onClick={onClick} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 600, color: T.primary, fontFamily: T.font }}>{children}</button>;
}
function ModuleTile({ icon, label, sub, accent, onClick }) {
  return (
    <button onClick={onClick} style={{ flex: 1, textAlign: 'left', cursor: 'pointer', background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 14, fontFamily: T.font }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: `${accent}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 11 }}>
        <Icon name={icon} size={20} color={accent} />
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: T.text, lineHeight: 1.25 }}>{label}</div>
      <div style={{ fontSize: 11.5, color: T.muted, marginTop: 3 }}>{sub}</div>
    </button>
  );
}

// ── Profile ─────────────────────────────────────────────────────────────────
function ProfileScreen({ cfg, user, onLogout }) {
  const rows = [
    { icon: 'user', label: 'Meus dados' },
    { icon: 'bell', label: 'Notificações' },
    { icon: 'qr', label: 'Etiquetas e impressão' },
    { icon: 'download', label: 'Dados offline', note: 'Em breve' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <BlueHeader>
        <h1 style={{ margin: 0, fontSize: 23, fontWeight: 800, fontFamily: T.font }}>Perfil</h1>
      </BlueHeader>
      <div style={{ flex: 1, overflow: 'auto', background: T.bg, padding: '16px 16px 24px' }}>
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 16, display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: 15, background: `${cfg.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: cfg.accent, fontFamily: T.font }}>
            {user.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.text, fontFamily: T.font }}>{user.name}</div>
            <div style={{ fontSize: 12.5, color: T.muted, fontFamily: T.font }}>{user.dept} · {user.role}</div>
          </div>
        </div>
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 18 }}>
          {rows.map((r, i) => (
            <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 15px', borderBottom: i < rows.length - 1 ? `1px solid ${T.surfaceMuted}` : 'none', cursor: 'pointer' }}>
              <Icon name={r.icon} size={18} color={T.muted} />
              <span style={{ flex: 1, fontSize: 14, color: T.text, fontFamily: T.font }}>{r.label}</span>
              {r.note && <span style={{ fontSize: 11, color: T.faint, fontFamily: T.font, marginRight: 4 }}>{r.note}</span>}
              <Icon name="chevron-right" size={16} color={T.faint} />
            </div>
          ))}
        </div>
        <button onClick={onLogout} style={{ width: '100%', height: 48, borderRadius: 13, border: `1px solid ${T.border}`, background: T.surface, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: T.danger, fontFamily: T.font }}>
          <Icon name="logout" size={17} color={T.danger} /> Sair do ScandexPRO™
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 22 }}>
          <Wordmark width={120} />
          <div style={{ fontSize: 11, color: T.faint, fontFamily: T.font }}>ScandexPRO™ Mobile · v1.0 · build demo</div>
        </div>
      </div>
    </div>
  );
}

// ── Login ───────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 80, display: 'flex', flexDirection: 'column', background: `linear-gradient(160deg, ${T.primaryDark}, ${T.primary} 55%, #0B1A8F)` }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px' }}>
        <BrandTile size={72} />
        <h1 style={{ margin: '24px 0 0', fontSize: 30, fontWeight: 800, color: '#fff', letterSpacing: -0.5, fontFamily: T.font }}>ScandexPRO™</h1>
        <p style={{ margin: '8px 0 0', fontSize: 14, color: 'rgba(255,255,255,.78)', fontFamily: T.font, lineHeight: 1.5 }}>Insira suas credenciais para acessar o ScandexPRO™.</p>

        <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ height: 50, borderRadius: 13, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', gap: 11, padding: '0 15px' }}>
            <Icon name="user" size={18} color="rgba(255,255,255,.7)" />
            <span style={{ fontSize: 14.5, color: 'rgba(255,255,255,.95)', fontFamily: T.font }}>carlos.andrade</span>
          </div>
          <div style={{ height: 50, borderRadius: 13, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', gap: 11, padding: '0 15px' }}>
            <Icon name="tag" size={18} color="rgba(255,255,255,.7)" />
            <span style={{ flex: 1, fontSize: 14.5, color: 'rgba(255,255,255,.95)', fontFamily: T.font, letterSpacing: 3 }}>••••••••</span>
          </div>
        </div>

        <button onClick={onLogin} style={{ marginTop: 22, height: 52, borderRadius: 14, border: 'none', cursor: 'pointer', background: '#fff', color: T.primary, fontSize: 15.5, fontWeight: 700, fontFamily: T.font, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          Entrar <Icon name="chevron-right" size={18} color={T.primary} />
        </button>
      </div>
      <div style={{ padding: '0 28px 38px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', fontFamily: T.font, fontStyle: 'italic' }}>Hospital do Olho Julio Cândido de Brito</div>
        <PoweredBy tone="light" />
      </div>
    </div>
  );
}

// ── Bottom tab bar ──────────────────────────────────────────────────────────
function TabBar({ active, onChange, accent }) {
  const tabs = [
    { key: 'home', label: 'Início', icon: 'home' },
    { key: 'orders', label: 'Ordens', icon: 'clipboard' },
    { key: 'inventory', label: 'Inventário', icon: 'package' },
    { key: 'profile', label: 'Perfil', icon: 'user' },
  ];
  return (
    <div style={{ flexShrink: 0, background: T.surface, borderTop: `1px solid ${T.border}`, paddingBottom: 22, paddingTop: 8 }}>
      <div style={{ display: 'flex' }}>
        {tabs.map(t => {
          const on = active === t.key;
          return (
            <button key={t.key} onClick={() => onChange(t.key)} style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '5px 0', fontFamily: T.font }}>
              <Icon name={t.icon} size={22} color={on ? accent : T.faint} strokeWidth={on ? 2.4 : 2} />
              <span style={{ fontSize: 10.5, fontWeight: on ? 700 : 500, color: on ? accent : T.faint }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Root App ────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#0728CA",
  "badgeStyle": "soft",
  "cardStyle": "elevated",
  "density": "comfortable"
}/*EDITMODE-END*/;

const USER = { name: 'Carlos Andrade', dept: 'Suporte TI', unit: 'HO — JCB', role: 'Técnico', username: 'carlos.andrade' };

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [booting, setBooting] = React.useState(true);
  const [authed, setAuthed] = React.useState(false);
  const [tab, setTab] = React.useState('home');
  const [overlay, setOverlay] = React.useState(null); // {type:'wo'|'item'|'newWo'|'scan', payload}
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    const id = setTimeout(() => setBooting(false), 2200);
    return () => clearTimeout(id);
  }, []);

  const cfg = { accent: t.accent, badgeStyle: t.badgeStyle, cardStyle: t.cardStyle, density: t.density };

  const go = (key) => { setOverlay(null); setTab(key); if (scrollRef.current) scrollRef.current.scrollTop = 0; };
  const openWO = (wo) => setOverlay({ type: 'wo', payload: wo });
  const openItem = (it) => setOverlay({ type: 'item', payload: it });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px 0', background: 'radial-gradient(circle at 50% 0%, #1c2438, #0b0f1a)' }}>
      <PhoneFrame statusDark={authed && !overlay && tab === 'home' ? true : (overlay ? true : (authed ? false : true))}>
        {/* main tab content */}
        <div ref={scrollRef} style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {tab === 'home' && <HomeScreen cfg={cfg} user={USER} onGoOrders={() => go('orders')} onGoInventory={() => go('inventory')} onOpenWO={openWO} onOpenItem={openItem} />}
          {tab === 'orders' && <WorkOrdersScreen cfg={cfg} onOpen={openWO} onNew={() => setOverlay({ type: 'newWo' })} />}
          {tab === 'inventory' && <InventoryScreen cfg={cfg} onOpen={openItem} onScan={() => setOverlay({ type: 'scan' })} />}
          {tab === 'profile' && <ProfileScreen cfg={cfg} user={USER} onLogout={() => setAuthed(false)} />}
        </div>
        <TabBar active={tab} onChange={go} accent={cfg.accent} />

        {/* overlays */}
        {overlay?.type === 'wo' && <WorkOrderDetail wo={overlay.payload} cfg={cfg} onBack={() => setOverlay(null)} />}
        {overlay?.type === 'item' && <InventoryDetail item={overlay.payload} cfg={cfg} onBack={() => setOverlay(null)} />}
        {overlay?.type === 'newWo' && <NewWorkOrder cfg={cfg} onBack={() => setOverlay(null)} />}
        {overlay?.type === 'scan' && <ScanView cfg={cfg} onClose={() => setOverlay(null)} onDetected={(it) => setOverlay({ type: 'item', payload: it })} />}

        {!authed && <LoginScreen onLogin={() => { setAuthed(true); setTab('home'); }} />}
        {booting && <SplashScreen label="Iniciando sessão…" />}
      </PhoneFrame>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Marca" />
        <TweakColor label="Cor de destaque" value={t.accent}
          options={['#0728CA', '#0F9488', '#7C3AED', '#0F172A']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Componentes" />
        <TweakRadio label="Status" value={t.badgeStyle} options={['soft', 'solid']} onChange={(v) => setTweak('badgeStyle', v)} />
        <TweakRadio label="Cards" value={t.cardStyle} options={['flat', 'elevated']} onChange={(v) => setTweak('cardStyle', v)} />
        <TweakRadio label="Densidade" value={t.density} options={['comfortable', 'compact']} onChange={(v) => setTweak('density', v)} />
      </TweaksPanel>
    </div>
  );
}

// ── New inventory item (simple form) ────────────────────────────────────────
function NewInventoryItem({ cfg, onBack }) {
  const [type, setType] = React.useState('MATERIAL');
  const isEquip = type === 'EQUIPAMENTO';
  return (
    <DetailScaffold cfg={cfg} onBack={onBack} eyebrow="Novo item" title="Cadastrar no estoque" compact>
      <SectionCard title="Tipo principal">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {Object.entries(INV_TYPE).map(([k, v]) => {
            const on = type === k;
            return (
              <button key={k} onClick={() => setType(k)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 10, cursor: 'pointer',
                border: `1.5px solid ${on ? cfg.accent : T.border}`, background: on ? `${cfg.accent}10` : T.surface,
                color: on ? cfg.accent : T.muted, fontSize: 12.5, fontWeight: 600, fontFamily: T.font,
              }}>
                <Icon name={v.icon} size={15} color={on ? cfg.accent : T.faint} /> {v.label}
              </button>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="Dados do item">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div><FieldLabel required>Nome</FieldLabel><FakeInput placeholder="Nome do item" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><FieldLabel>SKU</FieldLabel><FakeInput placeholder="Código" /></div>
            <div><FieldLabel>Unidade</FieldLabel><FakeInput placeholder="UN" value="UN" chevron /></div>
          </div>
          <div><FieldLabel>Localização</FieldLabel><FakeInput placeholder="Onde fica" chevron /></div>
          {isEquip ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><FieldLabel>Patrimônio</FieldLabel><FakeInput placeholder="Etiqueta" /></div>
              <div><FieldLabel>Nº de série</FieldLabel><FakeInput placeholder="Série" /></div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              <div><FieldLabel>Inicial</FieldLabel><FakeInput placeholder="0" /></div>
              <div><FieldLabel>Mínimo</FieldLabel><FakeInput placeholder="0" /></div>
              <div><FieldLabel>Máximo</FieldLabel><FakeInput placeholder="0" /></div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Foto e etiqueta">
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ flex: 1, height: 76, borderRadius: 12, border: `1.5px dashed ${T.borderStrong}`, background: T.surfaceMuted, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer', color: T.muted, fontFamily: T.font }}>
            <Icon name="camera" size={20} color={cfg.accent} /><span style={{ fontSize: 11.5, fontWeight: 600 }}>Foto</span>
          </button>
          <button style={{ flex: 1, height: 76, borderRadius: 12, border: `1.5px dashed ${T.borderStrong}`, background: T.surfaceMuted, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer', color: T.muted, fontFamily: T.font }}>
            <Icon name="qr" size={20} color={cfg.accent} /><span style={{ fontSize: 11.5, fontWeight: 600 }}>Gerar etiqueta</span>
          </button>
        </div>
      </SectionCard>

      <button style={{ width: '100%', height: 50, borderRadius: 14, border: 'none', cursor: 'pointer', background: cfg.accent, color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: T.font, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: `0 8px 20px -6px ${cfg.accent}66` }}>
        <Icon name="check" size={18} color="#fff" /> Cadastrar item
      </button>
      <div style={{ height: 12 }} />
    </DetailScaffold>
  );
}

Object.assign(window, {
  App, ModuleScreen, DetailScaffold, EmptyState, HomeScreen, ProfileScreen, LoginScreen, TabBar, NewInventoryItem,
  SectionTitle, TextLink, ModuleTile, StatTile,
});
