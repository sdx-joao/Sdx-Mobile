// ScandexPlus Design System — DelegationBanner
// Sinalização de OS delegada (encaminhada a um usuário). Índigo, distinto de
// status/prioridade. Dois usos:
//   variant="card"   → tira compacta dentro do card de OS na lista.
//   variant="detail" → bloco completo na tela de detalhe, com o recado.
// A cor vem do token --sdx-m-delegation.

const SendIcon = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'block', flexShrink: 0 }}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export const DelegationBanner = ({
  variant = 'card',
  toName,
  byName,
  message,
  toMe = false,
  style = {},
}) => {
  const indigo = 'var(--sdx-m-delegation, #6D28D9)';
  const soft = 'var(--sdx-m-delegation-soft, #F1ECFB)';
  const border = 'var(--sdx-m-delegation-border, #C9B6F0)';
  const base = { fontFamily: "'Inter', sans-serif" };

  if (variant === 'card') {
    // Tira compacta: "Delegada a você" (toMe) ou "Delegada a {toName}".
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: indigo, ...base, ...style }}>
        <SendIcon size={12} color={indigo} />
        <span style={{ fontSize: 11.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {toMe ? `Encaminhada por ${byName || 'equipe'}` : `Delegada a ${toName || '—'}`}
        </span>
      </div>
    );
  }

  // variant="detail" — bloco com título, quem/para quem e o recado.
  return (
    <div style={{
      border: `1px solid ${border}`, background: soft, borderRadius: 'var(--sdx-m-radius-card, 16px)',
      padding: 14, color: 'var(--sdx-m-text, #0F172A)', ...base, ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
        <SendIcon size={15} color={indigo} />
        <span style={{ fontSize: 13, fontWeight: 800, color: indigo }}>Delegação</span>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.45 }}>
        Encaminhada para <strong>{toName || '—'}</strong>
        {byName ? <> por <strong>{byName}</strong></> : null}
      </div>
      {message ? (
        <div style={{
          marginTop: 9, fontSize: 13, lineHeight: 1.5, fontStyle: 'italic',
          background: 'var(--sdx-m-surface, #fff)', borderRadius: 10, padding: 11,
          border: `1px solid ${border}`, color: 'var(--sdx-m-text-soft, #334155)',
        }}>
          “{message}”
        </div>
      ) : null}
    </div>
  );
};
