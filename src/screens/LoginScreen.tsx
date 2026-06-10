import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../components/Icon';
import { BrandTile, PoweredBy } from '../components/Brand';
import { T } from '../theme/theme';
import { useAuth } from '../auth/auth-context';
import { ApiError } from '../api/client';

export function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!username.trim() || !password) {
      setError('Informe usuário e senha.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signIn(username.trim(), password);
    } catch (e) {
      if (e instanceof ApiError) setError(e.status === 401 ? 'Usuário ou senha inválidos.' : e.message);
      else setError('Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  }

  const field = (
    icon: string,
    value: string,
    setValue: (v: string) => void,
    placeholder: string,
    secure?: boolean,
  ) => (
    <View style={{ height: 50, borderRadius: 13, backgroundColor: 'rgba(255,255,255,.12)', borderWidth: 1, borderColor: 'rgba(255,255,255,.18)', flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 15 }}>
      <Icon name={icon} size={18} color="rgba(255,255,255,.7)" />
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,.5)"
        secureTextEntry={secure}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
        onSubmitEditing={handleSubmit}
        returnKeyType={secure ? 'go' : 'next'}
        style={{ flex: 1, fontSize: 14.5, color: '#fff', padding: 0 }}
      />
    </View>
  );

  return (
    <LinearGradient colors={[T.primaryDark, T.primary, '#0B1A8F']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 28, paddingTop: insets.top }}>
          <BrandTile size={72} />
          <Text style={{ marginTop: 24, fontSize: 30, fontWeight: '800', color: '#fff', letterSpacing: -0.5 }}>ScandexPRO™</Text>
          <Text style={{ marginTop: 8, fontSize: 14, color: 'rgba(255,255,255,.78)', lineHeight: 21 }}>Insira suas credenciais para acessar o ScandexPRO™.</Text>

          <View style={{ marginTop: 30, gap: 12 }}>
            {field('user', username, setUsername, 'usuário')}
            {field('tag', password, setPassword, 'senha', true)}
          </View>

          {!!error && <Text style={{ marginTop: 14, color: '#FECACA', fontSize: 13.5, fontWeight: '500' }}>{error}</Text>}

          <Pressable
            onPress={handleSubmit}
            disabled={loading}
            style={{ marginTop: 22, height: 52, borderRadius: 14, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.8 : 1 }}
          >
            {loading ? (
              <ActivityIndicator color={T.primary} />
            ) : (
              <>
                <Text style={{ color: T.primary, fontSize: 15.5, fontWeight: '700' }}>Entrar</Text>
                <Icon name="chevron-right" size={18} color={T.primary} />
              </>
            )}
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: 28, paddingBottom: insets.bottom + 30, alignItems: 'center', gap: 12 }}>
          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', fontStyle: 'italic' }}>Hospital do Olho Júlio Cândido de Brito</Text>
          <PoweredBy tone="light" />
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
