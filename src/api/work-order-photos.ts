// Baixa as fotos anexadas de uma OS (autenticado, via endpoint mobile) e
// converte para data URI base64, para embutir no PDF gerado pelo app.
// Best-effort: nunca lança — foto que falhar é pulada.

import * as FileSystem from 'expo-file-system/legacy';
import { API_BASE_URL } from './client';
import { getWorkOrderAttachments } from './mobile';
import type { PrintPhoto } from './work-order-pdf-html';

export async function loadWorkOrderPhotos(token: string | null, id: string): Promise<PrintPhoto[]> {
  try {
    const attachments = await getWorkOrderAttachments(token, id);
    const images = attachments.filter((a) => a.mimeType.startsWith('image/'));
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const out: PrintPhoto[] = [];
    for (const att of images) {
      const dest = `${FileSystem.cacheDirectory}wo-photo-${att.id}.img`;
      try {
        const res = await FileSystem.downloadAsync(`${API_BASE_URL}${att.url}`, dest, { headers });
        if (res.status === 200) {
          const base64 = await FileSystem.readAsStringAsync(dest, { encoding: FileSystem.EncodingType.Base64 });
          out.push({
            dataUri: `data:${att.mimeType || 'image/jpeg'};base64,${base64}`,
            category: att.category,
            comment: att.comment,
            createdAt: att.createdAt,
          });
        }
        await FileSystem.deleteAsync(dest, { idempotent: true });
      } catch {
        // pula esta foto
      }
    }
    return out;
  } catch {
    return [];
  }
}
