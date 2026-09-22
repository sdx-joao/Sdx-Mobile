import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, type ImageResizeMode, type StyleProp, type ImageStyle } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
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
      const destination = `${FileSystem.cacheDirectory}inventory-photo-${cacheKey(uri)}.jpg`;
      try {
        const existing = await FileSystem.getInfoAsync(destination);
        if (!existing.exists) {
          const response = await FileSystem.downloadAsync(uri, destination, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          });
          if (response.status < 200 || response.status >= 300) throw new Error(`HTTP ${response.status}`);
        }
        if (alive) setLocalUri(destination);
      } catch {
        if (alive) setFailed(true);
      }
    };
    void load();
    return () => { alive = false; };
  }, [uri, token, attempt]);

  if (localUri) return <Image source={{ uri: localUri }} style={style} resizeMode={resizeMode} />;
  return (
    <Pressable onPress={() => failed && setAttempt(value => value + 1)} style={[style, { alignItems: 'center', justifyContent: 'center', backgroundColor: T.surfaceMuted }]}>
      {failed ? <Icon name="refresh" size={20} color={T.muted} /> : <ActivityIndicator color={T.primary} />}
    </Pressable>
  );
}
