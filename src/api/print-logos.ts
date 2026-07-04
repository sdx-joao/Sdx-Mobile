// Logos do PDF da OS embutidas no app como data URI base64 (constantes em
// print-logos-data.ts, geradas de assets/print/*.png).
//
// Por que constante e não leitura de asset em runtime: o domínio público
// (app.scandexplus.com.br) responde 403 em /images/*, então baixar do servidor
// não funciona. E ler o asset empacotado via expo-asset + FileSystem FALHAVA no
// build de produção (o base64 saía vazio → logo não renderizava no PDF).
// Constante no bundle é 100% determinístico: a string já é o data URI.

import { HO_LOGO_DATA_URI, PREF_LOGO_DATA_URI, SUBMARCA_DATA_URI } from './print-logos-data';

export type PrintLogos = { hoLogo: string; prefLogo: string; submarca: string };

/** Retorna as 3 logos como data URIs. Assíncrono só para não mudar os callers. */
export async function loadPrintLogos(): Promise<PrintLogos> {
  return { hoLogo: HO_LOGO_DATA_URI, prefLogo: PREF_LOGO_DATA_URI, submarca: SUBMARCA_DATA_URI };
}
