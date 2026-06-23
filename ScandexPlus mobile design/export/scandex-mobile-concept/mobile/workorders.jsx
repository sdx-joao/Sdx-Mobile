// ScandexPRO Mobile — Ordens de Serviço module

function MetaRow({ icon, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
      <Icon name={icon} size={14} color={T.faint} />
      <span style={{ fontSize: 12.5, color: T.muted, fontFamily: T.font, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{children}</span>
    </div>
  );
}

function SourceMark({ source }) {
  if (source === 'whatsapp') return <Icon name="whatsapp" size={14} color="#16A34A" />;
  if (source === 'external') return <Icon name="send" size={13} color={T.faint} />;
  return null;
}

// ── WO Card ─────────────────────────────────────────────────────────────────
function WOCard({ wo, cfg, onOpen }) {
  const st = WO_STATUS[wo.status];
  const pr = WO_PRIORITY[wo.priority];
  const overdue = wo.expectedCompletionAt && new Date(wo.expectedCompletionAt) < new Date('2025-06-09T10:00:00')
    && wo.status !== 'completed' && wo.status !== 'delivered' && wo.status !== 'cancelled';
  const pad = cfg.density === 'compact' ? 12 : 14;
  return (
    <button onClick={() => onOpen(wo)} style={{
      width: '100%', textAlign: 'left', cursor: 'pointer', display: 'block',
      background: T.surface, border: `1px solid ${T.border}`,
      borderLeft: `3px solid ${pr.color}`, borderRadius: 14, padding: pad,
      boxShadow: cfg.cardStyle === 'elevated' ? '0 1px 3px rgba(15,23,42,.06), 0 6px 16px -8px rgba(15,23,42,.12)' : 'none',
      fontFamily: T.font, marginBottom: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: cfg.accent, letterSpacing: 0.2 }}>{wo.code}</span>
          <SourceMark source={wo.source} />
        </div>
        <Badge tone={st} style={cfg.badgeStyle} />
      </div>
      <div style={{ fontSize: 14.5, fontWeight: 600, color: T.text, marginBottom: 3, lineHeight: 1.3 }}>{wo.serviceType}</div>
      <div style={{ fontSize: 12.5, color: T.faint, marginBottom: 10 }}>{wo.category}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <MetaRow icon="building">{wo.department} · {wo.unitName.replace('Hospital do Olho — ', 'HO ')}</MetaRow>
        <MetaRow icon="user">{wo.responsibleTechnicianName || 'Não atribuída'}</MetaRow>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 11, paddingTop: 10, borderTop: `1px solid ${T.surfaceMuted}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 600, color: pr.color }}>
            {wo.priority === 'urgent' && <Icon name="flame" size={13} color={pr.color} />}
            {pr.label}
          </span>
          {wo.escalationCount > 0 && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 600, color: '#C2410C' }}>
              <Icon name="trending-up" size={12} color="#C2410C" /> Escalada
            </span>
          )}
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: overdue ? T.danger : T.faint, fontWeight: overdue ? 600 : 400 }}>
          <Icon name="clock" size={12} color={overdue ? T.danger : T.faint} />
          {overdue ? 'Atrasada' : (wo.status === 'completed' || wo.status === 'delivered' ? fmtTime(wo.finishedAt) : `Prev. ${fmtTime(wo.expectedCompletionAt)}`)}
        </span>
      </div>
    </button>
  );
}

// ── WO List screen ──────────────────────────────────────────────────────────
function WorkOrdersScreen({ cfg, onOpen, onNew }) {
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('all');

  const counts = React.useMemo(() => {
    const c = { all: WORK_ORDERS.length };
    WORK_ORDERS.forEach(w => { c[w.status] = (c[w.status] || 0) + 1; });
    return c;
  }, []);

  const chips = [
    { key: 'all', label: 'Todas', count: counts.all },
    { key: 'open', label: 'Abertas', count: counts.open },
    { key: 'in_progress', label: 'Em andamento', count: counts.in_progress },
    { key: 'waiting', label: 'Aguardando', count: counts.waiting },
    { key: 'completed', label: 'Concluídas', count: counts.completed },
  ];

  const list = WORK_ORDERS.filter(w => {
    if (filter !== 'all' && w.status !== filter) return false;
    if (q) {
      const t = (w.code + w.serviceType + w.department + (w.responsibleTechnicianName || '') + w.requestedByName).toLowerCase();
      if (!t.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <ModuleScreen
      cfg={cfg}
      title="Ordens de Serviço"
      subtitle={`${WO_STATS.activeNow} ativas · ${WO_STATS.openedToday} abertas hoje`}
      onNew={onNew}
      newLabel="Nova OS"
    >
      <div style={{ padding: '4px 16px 12px' }}>
        <SearchField value={q} onChange={setQ} placeholder="Buscar por código, setor, técnico…" />
      </div>
      <ChipRow chips={chips} active={filter} onPick={setFilter} accent={cfg.accent} />
      <div style={{ padding: '14px 16px 24px' }}>
        {list.length === 0 ? (
          <EmptyState icon="clipboard" text="Nenhuma ordem encontrada." />
        ) : list.map(wo => <WOCard key={wo.id} wo={wo} cfg={cfg} onOpen={onOpen} />)}
      </div>
    </ModuleScreen>
  );
}

// ── WO Detail screen ────────────────────────────────────────────────────────
function StatItem({ label, children }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: 11, color: T.faint, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 13.5, color: T.text, fontWeight: 500, lineHeight: 1.35 }}>{children}</div>
    </div>
  );
}

function SectionCard({ title, action, children }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 14, marginBottom: 12 }}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.text, letterSpacing: 0.2 }}>{title}</span>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

function WorkOrderDetail({ wo, cfg, onBack }) {
  const [status, setStatus] = React.useState(wo.status);
  const st = WO_STATUS[status];
  const pr = WO_PRIORITY[wo.priority];
  const timeline = WO_TIMELINE[wo.id];

  const flow = ['open', 'in_progress', 'waiting', 'completed'];

  return (
    <DetailScaffold
      cfg={cfg}
      onBack={onBack}
      eyebrow={wo.code}
      title={wo.serviceType}
      badge={<Badge tone={st} style="solid" />}
      headerExtra={
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,.16)', padding: '4px 10px', borderRadius: 999 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: pr.color }} /> Prioridade {pr.label}
          </span>
          <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.75)' }}>{wo.category}</span>
        </div>
      }
    >
      {/* Quick status changer */}
      <SectionCard title="Atualizar status">
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
          {flow.map(s => {
            const on = status === s;
            const tone = WO_STATUS[s];
            return (
              <button key={s} onClick={() => setStatus(s)} style={{
                flexShrink: 0, padding: '8px 13px', borderRadius: 10, cursor: 'pointer',
                border: `1px solid ${on ? tone.solid : T.border}`,
                background: on ? tone.soft : T.surface, color: on ? tone.fg : T.muted,
                fontSize: 12.5, fontWeight: 600, fontFamily: T.font, whiteSpace: 'nowrap',
              }}>{tone.label}</button>
            );
          })}
        </div>
        {status !== wo.status && (
          <div style={{ marginTop: 11, fontSize: 12, color: T.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="check-circle" size={14} color={cfg.accent} />
            Novo status pronto para registrar (demo).
          </div>
        )}
      </SectionCard>

      <SectionCard title="Solicitação">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <StatItem label="Unidade">{wo.unitName}</StatItem>
          <StatItem label="Setor">{wo.department}</StatItem>
          <StatItem label="Solicitante">{wo.requestedByName}</StatItem>
          <StatItem label="Contato">{wo.requesterContact || '—'}</StatItem>
          <StatItem label="Abertura">{fmtDate(wo.openedAt)} · {fmtTime(wo.openedAt)}</StatItem>
          <StatItem label="Previsão">{wo.expectedCompletionAt ? `${fmtDate(wo.expectedCompletionAt)} · ${fmtTime(wo.expectedCompletionAt)}` : '—'}</StatItem>
        </div>
        {wo.requesterContact && (
          <button style={{
            marginTop: 14, width: '100%', height: 42, borderRadius: 11, cursor: 'pointer',
            border: `1px solid ${T.border}`, background: T.surface, color: T.textSoft,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontSize: 13.5, fontWeight: 600, fontFamily: T.font,
          }}>
            <Icon name={wo.source === 'whatsapp' ? 'whatsapp' : 'phone'} size={16} color={wo.source === 'whatsapp' ? '#16A34A' : cfg.accent} />
            Contatar solicitante
          </button>
        )}
      </SectionCard>

      <SectionCard title="Atendimento">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <StatItem label="Responsável">{wo.responsibleTechnicianName || 'Não atribuída'}</StatItem>
          <StatItem label="Equipe">{wo.technicalTeam || '—'}</StatItem>
          <div>
            <div style={{ fontSize: 11, color: T.faint, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 5 }}>Observações</div>
            <div style={{ fontSize: 13.5, color: T.textSoft, lineHeight: 1.5, background: T.surfaceMuted, borderRadius: 10, padding: 11 }}>
              {wo.attendanceNotes || 'Sem observações registradas.'}
            </div>
          </div>
        </div>
      </SectionCard>

      {wo.materials.length > 0 && (
        <SectionCard title={`Materiais (${wo.materials.length})`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {wo.materials.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: T.surfaceMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="box" size={15} color={T.muted} />
                  </div>
                  <span style={{ fontSize: 13.5, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.description}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.textSoft, flexShrink: 0 }}>{m.quantity} {m.unit}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {timeline && (
        <SectionCard title="Histórico">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {timeline.map((ev, i) => (
              <div key={i} style={{ display: 'flex', gap: 11 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: WO_STATUS[ev.tone].solid, marginTop: 4 }} />
                  {i < timeline.length - 1 && <span style={{ width: 2, flex: 1, background: T.border, margin: '2px 0' }} />}
                </div>
                <div style={{ paddingBottom: i < timeline.length - 1 ? 14 : 0 }}>
                  <div style={{ fontSize: 13, color: T.text, fontWeight: 500 }}>{ev.label}</div>
                  <div style={{ fontSize: 11.5, color: T.faint, marginTop: 1 }}>{ev.at} · {ev.by}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      <div style={{ height: 8 }} />
    </DetailScaffold>
  );
}

// ── New WO (simple form) ────────────────────────────────────────────────────
function FieldLabel({ children, required }) {
  return <div style={{ fontSize: 12.5, fontWeight: 600, color: T.textSoft, marginBottom: 6 }}>{children}{required && <span style={{ color: T.danger }}> *</span>}</div>;
}
function FakeInput({ placeholder, value, chevron }) {
  return (
    <div style={{
      height: 44, borderRadius: 11, border: `1px solid ${T.border}`, background: T.surface,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 13px',
      fontSize: 14, color: value ? T.text : T.faint, fontFamily: T.font,
    }}>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value || placeholder}</span>
      {chevron && <Icon name="chevron-right" size={16} color={T.faint} style={{ transform: 'rotate(90deg)' }} />}
    </div>
  );
}

function NewWorkOrder({ cfg, onBack }) {
  const [priority, setPriority] = React.useState('normal');
  return (
    <DetailScaffold cfg={cfg} onBack={onBack} eyebrow="Nova ordem" title="Abrir OS" compact>
      <SectionCard title="Detalhes do serviço">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div><FieldLabel required>Tipo de serviço</FieldLabel><FakeInput placeholder="Selecionar tipo" chevron /></div>
          <div><FieldLabel>Categoria</FieldLabel><FakeInput placeholder="Selecionar categoria" chevron /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><FieldLabel required>Unidade</FieldLabel><FakeInput placeholder="Unidade" value="HO — JCB" chevron /></div>
            <div><FieldLabel required>Setor</FieldLabel><FakeInput placeholder="Setor" chevron /></div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Prioridade">
        <div style={{ display: 'flex', gap: 8 }}>
          {Object.entries(WO_PRIORITY).map(([k, p]) => {
            const on = priority === k;
            return (
              <button key={k} onClick={() => setPriority(k)} style={{
                flex: 1, padding: '9px 4px', borderRadius: 11, cursor: 'pointer',
                border: `1.5px solid ${on ? p.color : T.border}`, background: on ? p.soft : T.surface,
                color: on ? p.color : T.muted, fontSize: 12, fontWeight: 600, fontFamily: T.font,
              }}>{p.label}</button>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="Solicitante">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div><FieldLabel required>Nome</FieldLabel><FakeInput placeholder="Quem solicitou" chevron /></div>
          <div><FieldLabel>Contato</FieldLabel><FakeInput placeholder="(85) 9 0000-0000" /></div>
          <div>
            <FieldLabel>Descrição</FieldLabel>
            <div style={{ minHeight: 86, borderRadius: 11, border: `1px solid ${T.border}`, background: T.surface, padding: 12, fontSize: 14, color: T.faint, fontFamily: T.font }}>
              Descreva o problema ou a solicitação…
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Anexos">
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ flex: 1, height: 76, borderRadius: 12, border: `1.5px dashed ${T.borderStrong}`, background: T.surfaceMuted, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer', color: T.muted, fontFamily: T.font }}>
            <Icon name="camera" size={20} color={cfg.accent} />
            <span style={{ fontSize: 11.5, fontWeight: 600 }}>Foto</span>
          </button>
          <button style={{ flex: 1, height: 76, borderRadius: 12, border: `1.5px dashed ${T.borderStrong}`, background: T.surfaceMuted, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer', color: T.muted, fontFamily: T.font }}>
            <Icon name="scan" size={20} color={cfg.accent} />
            <span style={{ fontSize: 11.5, fontWeight: 600 }}>Escanear ativo</span>
          </button>
        </div>
      </SectionCard>

      <div style={{ height: 4 }} />
      <button style={{
        width: '100%', height: 50, borderRadius: 14, border: 'none', cursor: 'pointer',
        background: cfg.accent, color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: T.font,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: `0 8px 20px -6px ${cfg.accent}66`,
      }}>
        <Icon name="check" size={18} color="#fff" /> Abrir ordem de serviço
      </button>
      <div style={{ height: 12 }} />
    </DetailScaffold>
  );
}

Object.assign(window, { WorkOrdersScreen, WorkOrderDetail, NewWorkOrder, MetaRow, StatItem, SectionCard, FieldLabel, FakeInput });
