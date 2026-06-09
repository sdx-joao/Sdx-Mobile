import { useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashScreen } from './src/components/Brand';
import { LoginScreen } from './src/screens/LoginScreen';
import { RootNavigator } from './src/navigation/RootNavigator';
import { SessionContext, type SessionValue } from './src/state/session';
import { MOCK_USER } from './src/data/mock';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setBooting(false), 2200);
    return () => clearTimeout(id);
  }, []);

  const session = useMemo<SessionValue>(
    () => ({ user: MOCK_USER, signOut: () => setAuthed(false) }),
    [],
  );

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {booting ? (
        <SplashScreen label="Iniciando sessão…" />
      ) : !authed ? (
        <LoginScreen onLogin={() => setAuthed(true)} />
      ) : (
        <SessionContext.Provider value={session}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SessionContext.Provider>
      )}
    </SafeAreaProvider>
  );
}
