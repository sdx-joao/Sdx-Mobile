// ScandexPlus Design System — StatusDot & StatusLegend
// Document-status "bolinhas" — the visual language the surgical team already knows.

export const DOC_STATUS_META = {
  available:    { label: 'Documento disponível',  fill: 'var(--sdx-m-doc-available, #10B981)',  ring: 'var(--sdx-m-doc-available-ring, #059669)' },
  processing:   { label: 'Em processamento',       fill: 'var(--sdx-m-doc-processing, #3B82F6)', ring: 'var(--sdx-m-doc-processing-ring, #2563EB)' },
  altered:      { label: 'Informação alterada',    fill: 'var(--sdx-m-doc-altered, #EAB308)',    ring: 'var(--sdx-m-doc-altered-ring, #CA8A04)' },
  missing_info: { label: 'Faltando páginas/info',  fill: 'var(--sdx-m-doc-missing, #F97316)',    ring: 'var(--sdx-m-doc-missing-ring, #EA580C)' },
  absent:       { label: 'Documento ausente',      fill: 'var(--sdx-m-doc-absent, #EF4444)',     ring: 'var(--sdx-m-doc-absent-ring, #DC2626)' },
};
const REPORTED_META = { label: 'Reportado com problema', fill: 'var(--sdx-m-doc-altered, #EAB308)', ring: 'var(--sdx-m-doc-altered-ring, #CA8A04)' };

export const StatusDot = ({ status = 'available', reported = false, size = 16 }) => {
  if (reported) {
    return (
      <span title={REPORTED_META.label} style={{ display: 'inline-flex', flexShrink: 0 }}>
        <svg width={size + 4} height={size + 4} viewBox="0 0 24 24" fill={REPORTED_META.fill} stroke={REPORTED_META.ring} strokeWidth="1.5" strokeLinejoin="round">
          <path d="M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0z" />
          <path d="M12 9.5v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="16.6" r="1.1" fill="#fff" stroke="none" />
        </svg>
      </span>
    );
  }
  const m = DOC_STATUS_META[status] || DOC_STATUS_META.available;
  return <span title={m.label} style={{ width: size, height: size, borderRadius: '50%', background: m.fill, border: `2px solid ${m.ring}`, flexShrink: 0, display: 'inline-block' }} />;
};

export const StatusLegend = ({ style = {} }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: "'Inter', sans-serif", ...style }}>
    {Object.keys(DOC_STATUS_META).map(k => (
      <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <StatusDot status={k} size={14} />
        <span style={{ fontSize: 12.5, color: 'var(--sdx-m-text-soft, #334155)' }}>{DOC_STATUS_META[k].label}</span>
      </div>
    ))}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <StatusDot reported size={16} />
      <span style={{ fontSize: 12.5, color: 'var(--sdx-m-text-soft, #334155)' }}>{REPORTED_META.label}</span>
    </div>
  </div>
);
