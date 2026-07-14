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
