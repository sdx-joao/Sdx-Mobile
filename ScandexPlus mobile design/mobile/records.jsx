// ScandexPRO Mobile — Prontuários (medical records) module
// Fluxo: Buscar → Ver paciente + cirurgias → Abrir documento.

// ── Document status system ("as bolinhas") — §6 do brief — CRÍTICO ──────────
const DOC_STATUS = {
  available:    { label: 'Documento disponível',  color: '#10B981', ring: '#059669', soft: '#E7F8F0' },
  processing:   { label: 'Em processamento',       color: '#3B82F6', ring: '#2563EB', soft: '#E9F1FE' },
  altered:      { label: 'Informação alterada',    color: '#EAB308', ring: '#CA8A04', soft: '#FBF4DC' },
  missing_info: { label: 'Faltando páginas/info',  color: '#F97316', ring: '#EA580C', soft: '#FEEEE1' },
  absent:       { label: 'Documento ausente',      color: '#EF4444', ring: '#DC2626', soft: '#FDECEC' },
  reported:     { label: 'Reportado com problema', color: '#EAB308', ring: '#CA8A04', soft: '#FBF4DC' },
};

// ── Mock patients (schema-faithful) ─────────────────────────────────────────
const PATIENTS = {
  '123456': {
    prontuario: '123456', name: 'Maria Aparecida Nogueira da Silva', age: 64, birthDate: '12/03/1961',
    cpf: '472.118.965-04', susNumber: '706 0042 8815 0007', bloodType: 'O+',
    cep: '60192-340', address: 'Rua das Acácias, 128 — Aldeota, Fortaleza/CE',
    photoUrl: null, barcodeBase: '123-4567-8901', isNew: false,
    surgeries: [
      { id: 's1', date: '28/05/2025', name: 'Facectomia + LIO — OD', specialty: 'Catarata', status: 'performed', documentType: 'pdf', pages: 6, docStatus: 'available', isReported: false, anexos: 2 },
      { id: 's2', date: '18/06/2025', prog: true, name: 'Facectomia + LIO — OE', specialty: 'Catarata', status: 'scheduled', documentType: null, pages: 0, docStatus: 'processing', isReported: false, anexos: 0 },
      { id: 's3', date: '15/03/2025', name: 'Mapeamento de retina', specialty: 'Retina', status: 'performed', documentType: 'image', pages: 3, docStatus: 'altered', isReported: false, anexos: 0 },
      { id: 's4', date: '20/08/2024', name: 'Yag laser — capsulotomia', specialty: 'Catarata', status: 'performed', documentType: 'pdf', pages: 4, docStatus: 'missing_info', isReported: true, anexos: 1 },
      { id: 's5', date: '02/11/2024', name: 'Trabeculectomia — OE', specialty: 'Glaucoma', status: 'cancelled', cancellationReason: 'Paciente remarcou por motivos pessoais', documentType: null, pages: 0, docStatus: 'absent', isReported: false, anexos: 0 },
    ],
  },
  '884220': {
    prontuario: '884220', name: 'João Batista Ferreira', age: 57, birthDate: '04/09/1968',
    cpf: '318.904.226-71', susNumber: '700 8821 3390 0042', bloodType: 'A−',
    cep: '60150-160', address: 'Av. Dom Luís, 1200, ap. 704 — Meireles, Fortaleza/CE',
    photoUrl: null, barcodeBase: '884-2201-0033', isNew: false,
    surgeries: [
      { id: 'j1', date: '10/06/2025', name: 'Transplante de córnea — OD', specialty: 'Córnea', status: 'performed', documentType: 'pdf', pages: 8, docStatus: 'available', isReported: false, anexos: 3 },
      { id: 'j2', date: '02/02/2025', name: 'Vitrectomia posterior — OD', specialty: 'Retina', status: 'performed', documentType: 'pdf', pages: 5, docStatus: 'available', isReported: false, anexos: 0 },
    ],
  },
  '100345': {
    prontuario: '100345', name: 'Antônia Helena Vasconcelos', age: 71, birthDate: '23/07/1954',
    cpf: '205.667.138-90', susNumber: '709 1003 4500 0011', bloodType: 'B+',
    cep: '60810-000', address: 'Rua Tibúrcio Cavalcante, 45 — Joaquim Távora, Fortaleza/CE',
    photoUrl: null, barcodeBase: '100-3450-0022', isNew: false,
    surgeries: [],
  },
};
const CPF_INDEX = Object.fromEntries(Object.values(PATIENTS).map(p => [p.cpf.replace(/\D/g, ''), p.prontuario]));
const RECENT = ['123456', '884220', '100345'];

const RECORDS_APPS = [
  { key: 'surg', label: 'Cirurgias — HO' },
  { key: 'legal', label: 'Jurídico — HO' },
];

// ── Status dot (a "bolinha") ────────────────────────────────────────────────
function StatusDot({ surgery, size = 16 }) {
  const key = surgery.isReported ? 'reported' : surgery.docStatus;
  const s = DOC_STATUS[key];
  if (surgery.isReported) {
    return (
      <span title={s.label} style={{ display: 'inline-flex', position: 'relative', flexShrink: 0 }}>
        <svg width={size + 4} height={size + 4} viewBox="0 0 24 24" fill={s.color} stroke={s.ring} strokeWidth="1.5" strokeLinejoin="round">
          <path d="M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0z" />
          <path d="M12 9.5v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="16.6" r="1.1" fill="#fff" stroke="none" />
        </svg>
      </span>
    );
  }
  return <span title={s.label} style={{ width: size, height: size, borderRadius: '50%', background: s.color, border: `2px solid ${s.ring}`, flexShrink: 0, display: 'block' }} />;
}

// ── Status legend (reusable) ────────────────────────────────────────────────
function StatusLegend() {
  const items = ['available', 'processing', 'altered', 'missing_info', 'absent'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map(k => (
        <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: DOC_STATUS[k].color, border: `2px solid ${DOC_STATUS[k].ring}`, flexShrink: 0 }} />
          <span style={{ fontSize: 12.5, color: T.textSoft, fontFamily: T.font }}>{DOC_STATUS[k].label}</span>
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill={DOC_STATUS.reported.color} stroke={DOC_STATUS.reported.ring} strokeWidth="1.5" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <path d="M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0z" /><path d="M12 9.5v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="16.6" r="1.1" fill="#fff" stroke="none" />
        </svg>
        <span style={{ fontSize: 12.5, color: T.textSoft, fontFamily: T.font }}>Reportado com problema</span>
      </div>
    </div>
  );
}

// ── Toast ───────────────────────────────────────────────────────────────────
function Toast({ kind, text }) {
  const danger = kind === 'error';
  return (
    <div style={{
      position: 'absolute', left: 16, right: 16, bottom: 28, zIndex: 70,
      background: danger ? T.danger : '#059669', color: '#fff', borderRadius: 13,
      padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 14px 30px -10px rgba(15,23,42,.5)', fontFamily: T.font,
      animation: 'sdxToastIn .26s ease',
    }}>
      <Icon name={danger ? 'alert' : 'check-circle'} size={18} color="#fff" />
      <span style={{ fontSize: 13.5, fontWeight: 600 }}>{text}</span>
    </div>
  );
}

// ── Screen 1 — Busca de paciente ────────────────────────────────────────────
function maskCPF(v) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  let out = d;
  if (d.length > 9) out = `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  else if (d.length > 6) out = `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  else if (d.length > 3) out = `${d.slice(0, 3)}.${d.slice(3)}`;
  return out;
}

function FieldShell({ icon, children, focused, valid }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, height: 54, padding: '0 14px',
      background: T.surface, borderRadius: 14,
      border: `1.5px solid ${focused ? T.primary : valid ? '#10B981' : T.border}`,
      boxShadow: focused ? `0 0 0 4px ${T.primary}1a` : 'none', transition: 'border-color .15s, box-shadow .15s',
    }}>
      <Icon name={icon} size={19} color={focused ? T.primary : T.faint} />
      {children}
    </div>
  );
}

function SearchScreen({ onFound, onNotFound, onOpenLegend }) {
  const [app, setApp] = React.useState('surg');
  const [pront, setPront] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [focus, setFocus] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const prontDigits = pront.replace(/\D/g, '');
  const cpfDigits = cpf.replace(/\D/g, '');
  const prontValid = prontDigits.length >= 5;
  const cpfValid = cpfDigits.length === 11;
  const canSearch = prontValid || cpfValid;

  const submit = () => {
    if (!canSearch || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (prontValid) {
        const hit = PATIENTS[prontDigits];
        if (hit) onFound(hit);
        else onFound({ prontuario: prontDigits, isNew: true, surgeries: [] });
        return;
      }
      // CPF path
      const key = CPF_INDEX[cpfDigits];
      if (key) onFound(PATIENTS[key]);
      else onNotFound('Paciente não encontrado para este CPF');
    }, 650);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <BlueHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
          <BrandTile size={26} radius={8} shadow={false} />
          <span style={{ fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: -0.2, fontFamily: T.font }}>Prontuários</span>
        </div>
        <h1 style={{ margin: 0, fontSize: 25, fontWeight: 800, letterSpacing: -0.4, fontFamily: T.font }}>Buscar paciente</h1>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255,255,255,.78)', fontFamily: T.font, lineHeight: 1.45 }}>
          Informe o prontuário (≥5 dígitos) ou um CPF válido.
        </p>
      </BlueHeader>

      <div style={{ flex: 1, overflow: 'auto', background: T.bg, padding: '18px 18px 26px' }}>
        {/* Aplicação */}
        <div style={{ display: 'flex', background: T.surfaceMuted, borderRadius: 12, padding: 4, marginBottom: 20 }}>
          {RECORDS_APPS.map(a => {
            const on = app === a.key;
            return (
              <button key={a.key} onClick={() => setApp(a.key)} style={{
                flex: 1, height: 40, borderRadius: 9, border: 'none', cursor: 'pointer',
                background: on ? T.primary : 'transparent', color: on ? '#fff' : T.muted,
                fontSize: 12.5, fontWeight: 700, fontFamily: T.font, transition: 'all .15s',
              }}>{a.label}</button>
            );
          })}
        </div>

        {/* Prontuário */}
        <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>Prontuário</div>
        <FieldShell icon="search" focused={focus === 'p'} valid={prontValid && focus !== 'p'}>
          <input value={pront} onChange={e => setPront(e.target.value.replace(/[^\d]/g, ''))}
            onFocus={() => setFocus('p')} onBlur={() => setFocus(null)}
            inputMode="numeric" placeholder="Ex.: 123456"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 16, fontWeight: 600, fontFamily: T.font, color: T.text, letterSpacing: 0.5 }} />
          {prontValid && <Icon name="check-circle" size={18} color="#10B981" />}
        </FieldShell>

        {/* separador */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 2px' }}>
          <span style={{ flex: 1, height: 1, background: T.border }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: T.faint, fontFamily: T.font }}>ou</span>
          <span style={{ flex: 1, height: 1, background: T.border }} />
        </div>

        {/* CPF */}
        <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>CPF</div>
        <FieldShell icon="idcard" focused={focus === 'c'} valid={cpfValid && focus !== 'c'}>
          <input value={cpf} onChange={e => setCpf(maskCPF(e.target.value))}
            onFocus={() => setFocus('c')} onBlur={() => setFocus(null)}
            inputMode="numeric" placeholder="000.000.000-00"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 16, fontWeight: 600, fontFamily: T.font, color: T.text, letterSpacing: 0.5 }} />
          {cpfValid && <Icon name="check-circle" size={18} color="#10B981" />}
        </FieldShell>

        {/* Buscar */}
        <button onClick={submit} disabled={!canSearch || loading} style={{
          marginTop: 24, width: '100%', height: 54, borderRadius: 15, border: 'none',
          cursor: canSearch && !loading ? 'pointer' : 'default',
          background: canSearch ? `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})` : T.borderStrong,
          color: '#fff', fontSize: 15.5, fontWeight: 700, fontFamily: T.font,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
          boxShadow: canSearch ? `0 10px 24px -8px ${T.primary}80` : 'none', transition: 'background .2s',
        }}>
          {loading ? <span className="sdx-spin" style={{ width: 19, height: 19, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,.4)', borderTopColor: '#fff', display: 'block' }} />
            : <><Icon name="search" size={19} color="#fff" /> Buscar</>}
        </button>

        {/* Buscas recentes */}
        <div style={{ marginTop: 30, fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 11 }}>Buscas recentes</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {RECENT.map(p => (
            <button key={p} onClick={() => onFound(PATIENTS[p])} style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 13px', borderRadius: 999,
              border: `1px solid ${T.border}`, background: T.surface, cursor: 'pointer', fontFamily: T.font,
            }}>
              <Icon name="clock" size={14} color={T.faint} />
              <span style={{ fontSize: 13, fontWeight: 600, color: T.textSoft }}>{p}</span>
            </button>
          ))}
        </div>

        <button onClick={onOpenLegend} style={{
          marginTop: 26, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: 'none', border: 'none', cursor: 'pointer', fontFamily: T.font,
          fontSize: 12.5, fontWeight: 600, color: T.muted,
        }}>
          <Icon name="alert" size={15} color={T.faint} /> O que significam as cores de status?
        </button>
      </div>
    </div>
  );
}

// ── Screen 2 — Detalhes do paciente ─────────────────────────────────────────
function PatientField({ label, value, full }) {
  return (
    <div style={{ minWidth: 0, gridColumn: full ? '1 / -1' : 'auto' }}>
      <div style={{ fontSize: 10.5, color: T.faint, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14.5, color: T.text, fontWeight: 600, lineHeight: 1.35, wordBreak: 'break-word' }}>{value || '—'}</div>
    </div>
  );
}

function SurgeryTab({ active, label, count, on, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, height: 38, borderRadius: 9, border: 'none', cursor: 'pointer',
      background: on ? T.primary : 'transparent', color: on ? '#fff' : T.muted,
      fontSize: 12.5, fontWeight: 700, fontFamily: T.font, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
    }}>
      {label}<span style={{ fontSize: 11, fontWeight: 700, opacity: on ? 0.85 : 0.7 }}>{count}</span>
    </button>
  );
}

function SurgeryCard({ s, onOpenDoc }) {
  const cancelled = s.status === 'cancelled';
  const noDoc = s.docStatus === 'absent' || s.docStatus === 'processing';
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 14,
      boxShadow: '0 1px 3px rgba(15,23,42,.05)', marginBottom: 10, opacity: cancelled ? 0.92 : 1,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
        <div style={{ paddingTop: 3 }}><StatusDot surgery={s} size={16} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: s.prog ? T.primary : T.muted, fontWeight: 700, letterSpacing: 0.2 }}>
            <Icon name="calendar" size={13} color={s.prog ? T.primary : T.faint} />
            {s.prog ? `Data Prog. ${s.date}` : s.date}
          </div>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: T.text, marginTop: 5, lineHeight: 1.3 }}>{s.name}</div>
          <div style={{ fontSize: 12.5, color: T.muted, marginTop: 2 }}>{s.specialty}</div>
          {cancelled && s.cancellationReason && (
            <div style={{ fontSize: 12, color: T.danger, marginTop: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
              <Icon name="x" size={12} color={T.danger} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.cancellationReason}</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 12, paddingTop: 11, borderTop: `1px solid ${T.surfaceMuted}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {s.anexos > 0 && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 600, color: T.muted, background: T.surfaceMuted, padding: '4px 8px', borderRadius: 999 }}>
              <Icon name="paperclip" size={12} color={T.muted} /> {s.anexos}
            </span>
          )}
          {s.documentType && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: T.faint, fontWeight: 600 }}>
              <Icon name={s.documentType === 'pdf' ? 'file-text' : 'image'} size={13} color={T.faint} />
              {s.documentType.toUpperCase()}{s.pages ? ` · ${s.pages}p` : ''}
            </span>
          )}
        </div>
        <button onClick={() => !noDoc && onOpenDoc(s)} disabled={noDoc} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 13px', borderRadius: 10,
          border: 'none', cursor: noDoc ? 'default' : 'pointer', fontFamily: T.font, fontSize: 12.5, fontWeight: 700,
          background: noDoc ? T.surfaceMuted : `${T.primary}12`, color: noDoc ? T.faint : T.primary,
        }}>
          <Icon name="file-text" size={14} color={noDoc ? T.faint : T.primary} /> Ver Documento
        </button>
      </div>
    </div>
  );
}

function PatientDetail({ patient, cfg, onBack, onOpenDoc }) {
  const [tab, setTab] = React.useState('all');
  const surgeries = patient.surgeries || [];
  const performed = surgeries.filter(s => s.status !== 'cancelled');
  const cancelled = surgeries.filter(s => s.status === 'cancelled');
  const list = tab === 'all' ? surgeries : tab === 'performed' ? performed : cancelled;

  const initials = patient.name ? patient.name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('') : '?';

  return (
    <DetailScaffold cfg={cfg} onBack={onBack} eyebrow={`Prontuário ${patient.prontuario}`}
      title={patient.isNew ? 'Paciente não cadastrado' : patient.name} compact>

      {patient.isNew ? (
        <div style={{ marginTop: 4, border: `1.5px dashed #D9A441`, background: '#FEF7E6', borderRadius: 16, padding: 22, textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: '#FBEBC6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <Icon name="user" size={26} color="#B45309" />
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#92500E', fontFamily: T.font }}>Paciente não encontrado</div>
          <p style={{ margin: '7px 0 18px', fontSize: 13, color: '#A16207', fontFamily: T.font, lineHeight: 1.5 }}>
            O prontuário <strong>{patient.prontuario}</strong> ainda não está cadastrado no sistema.
          </p>
          <button style={{
            width: '100%', height: 50, borderRadius: 13, border: 'none', cursor: 'pointer',
            background: '#B45309', color: '#fff', fontSize: 14.5, fontWeight: 700, fontFamily: T.font,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Icon name="plus" size={18} color="#fff" /> Cadastrar novo paciente
          </button>
        </div>
      ) : (
        <>
          {/* Cartão do paciente */}
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 18, padding: 18, marginBottom: 16, boxShadow: '0 1px 3px rgba(15,23,42,.05)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
              <div style={{ width: 96, height: 96, borderRadius: 24, background: `${T.primary}0d`, border: `2px solid ${T.primary}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <span style={{ fontSize: 30, fontWeight: 800, color: T.primary, fontFamily: T.font }}>{initials}</span>
              </div>
              <div style={{ marginTop: 9, fontSize: 12, fontStyle: 'italic', color: '#B7861F', fontWeight: 600, fontFamily: T.font, letterSpacing: 0.4 }}>{patient.barcodeBase}</div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <PatientField label="Nome Completo" value={patient.name} full />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 14px' }}>
              <PatientField label="Idade" value={`${patient.age} anos`} />
              <PatientField label="Nascimento" value={patient.birthDate} />
              <PatientField label="CPF" value={patient.cpf} />
              <PatientField label="Tipo Sanguíneo" value={patient.bloodType} />
              <PatientField label="Prontuário" value={patient.prontuario} />
              <PatientField label="CEP" value={patient.cep} />
              <PatientField label="Cartão SUS" value={patient.susNumber} full />
              <PatientField label="Endereço" value={patient.address} full />
            </div>
          </div>

          {/* Histórico de cirurgias */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '4px 2px 12px' }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: T.font, letterSpacing: -0.2 }}>Histórico de Cirurgias</span>
            <span style={{ fontSize: 12, color: T.muted, fontFamily: T.font }}>{surgeries.length} registro{surgeries.length === 1 ? '' : 's'}</span>
          </div>

          {surgeries.length === 0 ? (
            <EmptyState icon="file-text" text="Nenhuma cirurgia registrada para este paciente." />
          ) : (
            <>
              <div style={{ display: 'flex', background: T.surfaceMuted, borderRadius: 11, padding: 4, marginBottom: 14 }}>
                <SurgeryTab on={tab === 'all'} label="Todas" count={surgeries.length} onClick={() => setTab('all')} />
                <SurgeryTab on={tab === 'performed'} label="Realizadas" count={performed.length} onClick={() => setTab('performed')} />
                <SurgeryTab on={tab === 'cancelled'} label="Canceladas" count={cancelled.length} onClick={() => setTab('cancelled')} />
              </div>
              {list.map(s => <SurgeryCard key={s.id} s={s} onOpenDoc={onOpenDoc} />)}
            </>
          )}
        </>
      )}
      <div style={{ height: 8 }} />
    </DetailScaffold>
  );
}

// ── Screen 3 — Visualizador de documento ────────────────────────────────────
function ScannedPage({ pageNum }) {
  // Faux scanned medical-record page placeholder (clean, no real PII)
  const lines = [92, 78, 85, 64, 88, 72, 80, 58, 90, 67, 83, 75];
  return (
    <div style={{ width: 300, background: '#fff', borderRadius: 4, padding: '26px 24px', boxShadow: '0 8px 30px rgba(0,0,0,.4)', fontFamily: T.font, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #1f2937', paddingBottom: 12, marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#1f2937', letterSpacing: 0.5 }}>HOSPITAL DO OLHO — JCB</div>
          <div style={{ fontSize: 8, color: '#9ca3af', marginTop: 2, letterSpacing: 0.5 }}>PRONTUÁRIO CIRÚRGICO DIGITALIZADO</div>
        </div>
        <div style={{ width: 30, height: 30, borderRadius: 6, background: '#eef2f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="droplet" size={15} color="#cbd5e1" />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 14px', marginBottom: 16 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i}>
            <div style={{ height: 4, width: '52%', background: '#cbd5e1', borderRadius: 2, marginBottom: 4 }} />
            <div style={{ height: 6, width: '84%', background: '#1f2937', borderRadius: 2, opacity: 0.82 }} />
          </div>
        ))}
      </div>
      <div style={{ height: 5, width: '34%', background: '#94a3b8', borderRadius: 2, marginBottom: 11 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {lines.map((w, i) => <div key={i} style={{ height: 4, width: `${w}%`, background: '#e2e8f0', borderRadius: 2 }} />)}
      </div>
      <div style={{ position: 'absolute', right: 18, bottom: 14, fontSize: 8, color: '#cbd5e1', fontWeight: 600 }}>Pág. {pageNum}</div>
    </div>
  );
}

function DocViewer({ surgery, patient, onBack }) {
  const total = surgery.pages || 1;
  const [page, setPage] = React.useState(1);
  const [zoom, setZoom] = React.useState(1);
  const [menu, setMenu] = React.useState(false);

  const z = (d) => setZoom(v => Math.min(2.4, Math.max(0.6, +(v + d).toFixed(2))));

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 75, display: 'flex', flexDirection: 'column', background: '#0B1020' }}>
      {/* compact blue header */}
      <div style={{ background: `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`, padding: '44px 14px 12px', display: 'flex', alignItems: 'center', gap: 11, flexShrink: 0 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="arrow-left" size={19} color="#fff" />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: '#fff', fontFamily: T.font, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{surgery.name}</div>
          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.72)', fontFamily: T.font }}>{patient.name?.split(' ').slice(0, 2).join(' ')} · Pront. {patient.prontuario}</div>
        </div>
        <button onClick={() => setMenu(m => !m)} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="more-vertical" size={19} color="#fff" />
        </button>
        {menu && (
          <div style={{ position: 'absolute', top: 78, right: 14, zIndex: 80, background: T.surface, borderRadius: 13, boxShadow: '0 16px 40px -10px rgba(0,0,0,.5)', overflow: 'hidden', minWidth: 196 }}>
            {[{ i: 'download', l: 'Baixar' }, { i: 'share', l: 'Compartilhar' }, { i: 'flag', l: 'Reportar problema', danger: true }].map((m, idx) => (
              <button key={m.l} onClick={() => setMenu(false)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '13px 15px', border: 'none', cursor: 'pointer',
                background: T.surface, fontFamily: T.font, fontSize: 13.5, fontWeight: 600, color: m.danger ? T.danger : T.text,
                borderTop: idx ? `1px solid ${T.surfaceMuted}` : 'none', textAlign: 'left',
              }}>
                <Icon name={m.i} size={17} color={m.danger ? T.danger : T.muted} /> {m.l}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* document area */}
      <div onClick={() => setMenu(false)} style={{ flex: 1, overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'radial-gradient(120% 80% at 50% 0%, #161d33, #0B1020)' }}>
        <div style={{ transform: `scale(${zoom})`, transition: 'transform .18s ease', transformOrigin: 'center' }}>
          <ScannedPage pageNum={page} />
        </div>
      </div>

      {/* page swipe arrows */}
      {total > 1 && (
        <>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={navBtn('left', page === 1)}><Icon name="chevron-left" size={22} color="#fff" /></button>
          <button onClick={() => setPage(p => Math.min(total, p + 1))} disabled={page === total} style={navBtn('right', page === total)}><Icon name="chevron-right" size={22} color="#fff" /></button>
        </>
      )}

      {/* floating controls */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 26, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(17,24,42,.82)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 999, padding: 6, pointerEvents: 'auto', boxShadow: '0 12px 30px rgba(0,0,0,.45)' }}>
          <CtrlBtn icon="zoom-out" onClick={() => z(-0.2)} />
          <span style={{ minWidth: 50, textAlign: 'center', fontSize: 12.5, fontWeight: 700, color: '#fff', fontFamily: T.font }}>{Math.round(zoom * 100)}%</span>
          <CtrlBtn icon="zoom-in" onClick={() => z(0.2)} />
          <span style={{ width: 1, height: 22, background: 'rgba(255,255,255,.16)', margin: '0 4px' }} />
          <CtrlBtn icon="maximize" onClick={() => { setZoom(1); setPage(1); }} />
          {total > 1 && <span style={{ minWidth: 52, textAlign: 'center', fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,.85)', fontFamily: T.font }}>{page}/{total}</span>}
        </div>
      </div>
    </div>
  );
}

function navBtn(side, disabled) {
  return {
    position: 'absolute', top: '50%', [side]: 8, transform: 'translateY(-50%)', zIndex: 70,
    width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: disabled ? 'default' : 'pointer',
    background: 'rgba(17,24,42,.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    opacity: disabled ? 0.25 : 1,
  };
}
function CtrlBtn({ icon, onClick }) {
  return (
    <button onClick={onClick} style={{ width: 38, height: 38, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={icon} size={19} color="#fff" />
    </button>
  );
}

// ── Legend sheet ────────────────────────────────────────────────────────────
function LegendSheet({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 78, background: 'rgba(11,16,32,.5)', display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', background: T.surface, borderRadius: '22px 22px 0 0', padding: '10px 22px 34px', animation: 'sdxSheetIn .28s ease' }}>
        <div style={{ width: 38, height: 4, borderRadius: 999, background: T.border, margin: '0 auto 18px' }} />
        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, fontFamily: T.font, marginBottom: 4 }}>Status do documento</div>
        <p style={{ margin: '0 0 18px', fontSize: 12.5, color: T.muted, fontFamily: T.font }}>A bolinha ao lado de cada cirurgia indica o estado do documento.</p>
        <StatusLegend />
      </div>
    </div>
  );
}

// ── Root Prontuários screen (internal stack) ────────────────────────────────
function RecordsScreen({ cfg, onOpenDoc }) {
  const [view, setView] = React.useState({ name: 'search' });
  const [toast, setToast] = React.useState(null);
  const [legend, setLegend] = React.useState(false);

  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <SearchScreen
        onFound={(p) => setView({ name: 'details', patient: p })}
        onNotFound={(msg) => setToast({ kind: 'error', text: msg })}
        onOpenLegend={() => setLegend(true)}
      />
      {view.name === 'details' && (
        <PatientDetail patient={view.patient} cfg={cfg} onBack={() => setView({ name: 'search' })}
          onOpenDoc={(s) => onOpenDoc(s, view.patient)} />
      )}
      {legend && <LegendSheet onClose={() => setLegend(false)} />}
      {toast && <Toast kind={toast.kind} text={toast.text} />}
    </div>
  );
}

Object.assign(window, {
  DOC_STATUS, PATIENTS, StatusDot, StatusLegend, RecordsScreen, SearchScreen, PatientDetail, DocViewer,
});
