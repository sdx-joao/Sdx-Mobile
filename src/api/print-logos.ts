// Logos do PDF da OS embutidas no app (base64), NÃO baixadas do servidor.
//
// Motivo: o domínio público (app.scandexplus.com.br) fica atrás de um proxy que
// responde 403 em /images/* — então os <img> remotos falhavam e o onerror
// escondia as logos no PDF gerado pelo app. Empacotando as imagens no bundle e
// convertendo para data URI, o PDF fica idêntico à impressão do Electron sem
// depender de rede nem de timing do expo-print.

import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';

export type PrintLogos = { hoLogo: string; prefLogo: string; submarca: string };

const EMPTY: PrintLogos = { hoLogo: '', prefLogo: '', submarca: '' };
let cache: PrintLogos | null = null;

async function toDataUri(mod: number): Promise<string> {
  try {
    const asset = Asset.fromModule(mod);
    if (!asset.localUri) await asset.downloadAsync();
    const uri = asset.localUri || asset.uri;
    if (!uri) return '';
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    return `data:image/png;base64,${base64}`;
  } catch {
    return '';
  }
}

/** Carrega (uma vez) as 3 logos como data URIs. Nunca lança — no erro devolve ''. */
export async function loadPrintLogos(): Promise<PrintLogos> {
  if (cache) return cache;
  try {
    const [hoLogo, prefLogo, submarca] = await Promise.all([
      toDataUri(require('../../assets/print/ho-logo.png')),
      toDataUri(require('../../assets/print/prefeitura-duque-caxias.png')),
      toDataUri(require('../../assets/print/submarca.png')),
    ]);
    cache = { hoLogo, prefLogo, submarca };
    return cache;
  } catch {
    return EMPTY;
  }
}
