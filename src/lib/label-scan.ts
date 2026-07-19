/**
 * Extrai código + índice de cópia de um QR de etiqueta (Modelo B):
 *   https://app.scandexplus.com.br/i/ETQ-000123?c=2
 *   servus://i/ETQ-000123?c=2
 * `c` ausente → cópia 1.
 */
export function parseLabelScan(raw: string): { code: string; copy: number } | null {
  const v = (raw || '').trim();
  const codeM = v.match(/\/i\/([^/?#]+)/) || v.match(/^servus:\/\/i\/([^/?#]+)/i);
  if (!codeM) return null;
  const code = decodeURIComponent(codeM[1]).toUpperCase();
  const cM = v.match(/[?&]c=(\d+)/);
  const copy = cM ? Math.max(1, Number(cM[1])) : 1;
  return { code, copy };
}

/**
 * Etiqueta de inventário: <SIGLA>-<número> — a sigla é a da unidade
 * (HOJCB-000001, HMMRC-000001) ou o legado ETQ-000001.
 */
export const isLabelCode = (code: string) => /^[A-Z]{2,10}-?\d{1,10}$/i.test(code);

/**
 * QR exibido na tela do PC pelo SDX Nuntius — identifica a MÁQUINA, não a
 * etiqueta:
 *   https://app.scandexplus.com.br/i/m/<token>
 *   servus://i/m/<token>
 *
 * ⚠️ Precisa ser testado ANTES de `parseLabelScan`: aquele casa `/i/(...)` e
 * capturaria "m" como se fosse código de etiqueta.
 *
 * O token preserva a caixa (é aleatório, base64url) — diferente da etiqueta,
 * que é normalizada para maiúsculas.
 */
export function parseMachinePairScan(raw: string): string | null {
  const v = (raw || '').trim();
  const m = v.match(/\/i\/m\/([^/?#\s]+)/i) || v.match(/^servus:\/\/i\/m\/([^/?#\s]+)/i);
  if (!m) return null;
  const token = decodeURIComponent(m[1]);
  return token.length >= 20 ? token : null;
}
