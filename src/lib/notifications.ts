import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const PROJECT_ID = '62ce89bc-bb9b-42f7-9770-8f44d79fae09';

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
    return token.data || null;
  } catch {
    return null;
  }
}

export { Notifications };
