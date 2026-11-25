import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, type ImageResizeMode, type StyleProp, type ImageStyle } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { withMobileToken } from '../api/client';
import { runNativeTransfer } from '../api/native-transfer';
import { Icon } from './Icon';
import { T } from '../theme/theme';

function cacheKey(value: string): string {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

/**
 * O Image nativo não é consistente ao reutilizar headers Bearer depois que o
 * app volta do background. Baixamos a imagem autenticada para o cache e então
 * exibimos um URI local, que também evita o quadro vazio logo após o upload.
 */
export function AuthenticatedImage({
  uri,
  token,
  style,
  resizeMode = 'cover',
}: {
  uri: string;
  token?: string | null;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
}) {
  const [localUri, setLocalUri] = useState<string | null>(uri.startsWith('file:') ? uri : null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    if (uri.startsWith('file:') || uri.startsWith('content:')) {
      setLocalUri(uri);
      setFailed(false);
      return () => { alive = false; };
    }

    const load = async () => {
      setFailed(false);
      setLocalUri(null);
      const destination = `${FileSystem.cacheDirectory}inventory-photo-v2-${cacheKey(uri + '|' + (token || ''))}.jpg`;
      try {
        if (attempt > 0) await FileSystem.deleteAsync(destination, { idempotent: true });
        const existing = await FileSystem.getInfoAsync(destination);
        if (!existing.exists || !('size' in existing) || existing.size === 0) {
          // Error bodies and partial downloads must never become reusable cache files.
          const temporary = destination + '.' + Date.now() + '-' + Math.random().toString(16).slice(2) + '.part';
          try {
            const response = await withMobileToken(token, async currentToken => {
              const task = FileSystem.createDownloadResumable(uri, temporary, {
                headers: currentToken ? { Authorization: `Bearer ${currentToken}` } : undefined,
              });
              const result = await runNativeTransfer(task, () => task.downloadAsync(), 20000);
              if (!result) throw new Error('Download cancelado.');
              return result;
            });
            const contentType = Object.entries(response.headers || {}).find(([key]) => key.toLowerCase() === 'content-type')?.[1] || '';
            const info = await FileSystem.getInfoAsync(temporary);
            if (response.status !== 200 || !contentType.toLowerCase().startsWith('image/') || !info.exists || !('size' in info) || info.size === 0) {
              throw new Error(`Foto indisponível (HTTP ${response.status}).`);
            }
            await FileSystem.moveAsync({ from: temporary, to: destination });
          } finally { await FileSystem.deleteAsync(temporary, { idempotent: true }).catch(() => {}); }
        }
        if (alive) setLocalUri(destination);
      } catch {
        if (alive) setFailed(true);
      }
    };
    void load();
    return () => { alive = false; };
  }, [uri, token, attempt]);

  if (localUri) return <Image source={{ uri: localUri }} style={style} resizeMode={resizeMode} onError={() => {
    if (localUri.startsWith(FileSystem.cacheDirectory || '__cache__')) void FileSystem.deleteAsync(localUri, { idempotent: true }).catch(() => {});
    setLocalUri(null);
    setFailed(true);
  }} />;
  return (
    <Pressable onPress={() => failed && setAttempt(value => value + 1)} style={[style, { alignItems: 'center', justifyContent: 'center', backgroundColor: T.surfaceMuted }]}>
      {failed ? <Icon name="refresh" size={20} color={T.muted} /> : <ActivityIndicator color={T.primary} />}
    </Pressable>
  );
}
