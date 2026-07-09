import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import { SplashScreen } from './src/components/Brand';
import { LoginScreen } from './src/screens/LoginScreen';
import { LockScreen } from './src/screens/LockScreen';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AuthProvider, useAuth } from './src/auth/auth-context';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { ToastHost } from './src/lib/toast';
import { IS_TEST_BUILD } from './src/api/client';
import { setupNotificationChannels, registerForPushToken, Notifications } from './src/lib/notifications';
import { checkForUpdateSilently, UpdateBanner } from './src/lib/app-update';
import { registerPushToken } from './src/api/mobile';
import type { RootStackParamList } from './src/navigation/types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Abre a OS ao tocar numa notificação (deep-link).
function openFromNotification(data: unknown) {
  const woId = (data as { workOrderId?: string | null } | undefined)?.workOrderId;
  if (woId && navigationRef.isReady()) {
    navigationRef.navigate('WorkOrderDetail', { id: String(woId) });
  }
}

Sentry.init({
  dsn: 'https://f970f6013e4d7cae4d4b4034bf865e06@o4511614147493888.ingest.us.sentry.io/4511614336172032',
  // Mesma DSN do backend; separa por environment no painel.
  environment: IS_TEST_BUILD ? 'servus-test' : 'servus-prod',
  enabled: !__DEV__,
  // ⚠️ Dado sensível: sem PII.
  sendDefaultPii: false,
  tracesSampleRate: 0.1,
});

function Root() {
  const { status, token } = useAuth();

  // OTA: checa/baixa nova versão ao abrir; se pronta, mostra um banner discreto.
  useEffect(() => { void checkForUpdateSilently(); }, []);

  // Canais + deep-link ao tocar a notificação (uma vez).
  useEffect(() => {
    void setupNotificationChannels();
    // App aberto a partir de uma notificação (estado morto).
    Notifications.getLastNotificationResponseAsync().then((res) => {
      if (res) openFromNotification(res.notification.request.content.data);
    });
    const sub = Notifications.addNotificationResponseReceivedListener((res) => {
      openFromNotification(res.notification.request.content.data);
    });
    return () => sub.remove();
  }, []);

  // Registra o token de push do aparelho quando autenticado.
  useEffect(() => {
    if (status !== 'authenticated' || !token) return;
    (async () => {
      const expoToken = await registerForPushToken();
      if (expoToken) {
        await registerPushToken(token, expoToken, IS_TEST_BUILD ? 'servus-test' : 'servus').catch(() => undefined);
      }
    })();
  }, [status, token]);

  if (status === 'loading') return <SplashScreen label="Iniciando sessão…" />;
  if (status === 'unauthenticated') return <LoginScreen />;
  if (status === 'locked') return <LockScreen />;

  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <ErrorBoundary>
        <AuthProvider>
          <Root />
        </AuthProvider>
      </ErrorBoundary>
      <ToastHost />
      <UpdateBanner />
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(App);
