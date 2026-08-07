import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const PROJECT_ID = '62ce89bc-bb9b-42f7-9770-8f44d79fae09';
const PUSH_TOKEN_CACHE_KEY = 'sdx.notifications.expo_token';
const PUSH_TOKEN_SAVED_AT_KEY = 'sdx.notifications.expo_token_saved_at';
const PUSH_TOKEN_ATTEMPT_AT_KEY = 'sdx.notifications.expo_token_attempt_at';
const TOKEN_REFRESH_MS = 30 * 24 * 60 * 60 * 1000;
const FAILED_ATTEMPT_COOLDOWN_MS = 24 * 60 * 60 * 1000;

// Mostra o banner + som mesmo com o app aberto (foreground).
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Canais do Android — cada tipo tem seu próprio "toque" (vibração distinta +
 * som padrão do sistema). Para usar sons customizados, basta adicionar arquivos
 * .wav em assets e referenciar aqui (`sound: 'nome.wav'`) + no plugin do app.json.
 */
export async function setupNotificationChannels(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync('default', {
    name: 'Geral',
    importance: Notifications.AndroidImportance.HIGH,
    sound: 'default',
    vibrationPattern: [0, 250, 200, 250],
    lightColor: '#072AC8',
  });
  await Notifications.setNotificationChannelAsync('os-delegated', {
    name: 'OS delegada a você',
    importance: Notifications.AndroidImportance.MAX,
    sound: 'default',
    // Padrão marcante (duas batidas longas) para "chegou uma OS pra você".
    vibrationPattern: [0, 350, 180, 350],
    lightColor: '#072AC8',
  });
  await Notifications.setNotificationChannelAsync('os-updated', {
    name: 'OS que você acompanha',
    importance: Notifications.AndroidImportance.HIGH,
    sound: 'default',
    // Padrão diferente (três batidas curtas) para "sua OS foi resolvida/movida".
    vibrationPattern: [0, 150, 90, 150, 90, 150],
    lightColor: '#059669',
  });
}

/** Pede permissão e retorna o Expo push token do aparelho (ou null). */
export async function registerForPushToken(): Promise<string | null> {
  try {
    // O token do Expo/FCM é da instalação, não da sessão. Consultá-lo a cada
    // reconstrução do processo força uma conexão nativa com Google Play
    // Services e, em alguns aparelhos, abre um diálogo fatal ao voltar do
    // segundo plano. Reutilizamos o token seguro e só renovamos periodicamente.
    const [cached, savedAtText, attemptedAtText] = await Promise.all([
      SecureStore.getItemAsync(PUSH_TOKEN_CACHE_KEY),
      SecureStore.getItemAsync(PUSH_TOKEN_SAVED_AT_KEY),
      SecureStore.getItemAsync(PUSH_TOKEN_ATTEMPT_AT_KEY),
    ]);
    const now = Date.now();
    const savedAt = Number(savedAtText || 0);
    if (cached && savedAt > 0 && now - savedAt < TOKEN_REFRESH_MS) return cached;

    const attemptedAt = Number(attemptedAtText || 0);
    if (!cached && attemptedAt > 0 && now - attemptedAt < FAILED_ATTEMPT_COOLDOWN_MS) return null;

    // Marca ANTES da chamada nativa: se o Play Services falhar ou matar a
    // Activity, a próxima retomada não entra num ciclo de novas tentativas.
    await SecureStore.setItemAsync(PUSH_TOKEN_ATTEMPT_AT_KEY, String(now));
    const existing = await Notifications.getPermissionsAsync();
    let status = existing.status;
    if (status !== 'granted') {
      const req = await Notifications.requestPermissionsAsync();
      status = req.status;
    }
    if (status !== 'granted') return null;
    const projectId =
      (Constants.expoConfig?.extra as { eas?: { projectId?: string } } | undefined)?.eas?.projectId || PROJECT_ID;
    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    const value = token.data || null;
    if (value) {
      await Promise.all([
        SecureStore.setItemAsync(PUSH_TOKEN_CACHE_KEY, value),
        SecureStore.setItemAsync(PUSH_TOKEN_SAVED_AT_KEY, String(Date.now())),
      ]);
    }
    return value;
  } catch {
    return null;
  }
}

export { Notifications };
