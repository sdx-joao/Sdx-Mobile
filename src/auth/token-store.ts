import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'sdx.auth.token'; // access token (Bearer, curto ~1h)
const REFRESH_KEY = 'sdx.auth.refresh'; // refresh token (rotativo, 30 dias)
const REGISTERED_KEY = 'sdx.auth.registered'; // trava do auto-cadastro de teste (1 por aparelho)
const REGISTERED_USER_KEY = 'sdx.auth.registered_username';
const BIOMETRIC_KEY = 'sdx.auth.biometric'; // '1' = desbloqueio por biometria ligado
const PRINT_WORK_ORDERS_KEY = 'sdx.profile.print_work_orders'; // default OFF

/** Preferência local de solicitar impressão ao concluir uma OS. */
export async function getPrintWorkOrdersEnabled(): Promise<boolean> {
  return (await SecureStore.getItemAsync(PRINT_WORK_ORDERS_KEY)) === '1';
}

export async function setPrintWorkOrdersPref(enabled: boolean): Promise<void> {
  if (enabled) await SecureStore.setItemAsync(PRINT_WORK_ORDERS_KEY, '1');
  else await SecureStore.deleteItemAsync(PRINT_WORK_ORDERS_KEY);
}

/** Preferência de desbloqueio por biometria (por aparelho). */
export async function getBiometricEnabled(): Promise<boolean> {
  return (await SecureStore.getItemAsync(BIOMETRIC_KEY)) === '1';
}

export async function setBiometricPref(enabled: boolean): Promise<void> {
  if (enabled) await SecureStore.setItemAsync(BIOMETRIC_KEY, '1');
  else await SecureStore.deleteItemAsync(BIOMETRIC_KEY);
}

/** Salva o par access+refresh (login/registro). */
export async function saveTokens(token: string, refreshToken: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
}

/** Atualiza só o access token (após um refresh silencioso). */
export async function saveAccessToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

/** Atualiza o refresh token rotacionado (após um refresh silencioso). */
export async function saveRefreshToken(refreshToken: string): Promise<void> {
  await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
}

export async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(REFRESH_KEY);
}

export async function clearToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
}

/** Marca que este aparelho já criou um usuário de teste (não pode criar outro). */
export async function markDeviceRegistered(username: string): Promise<void> {
  await SecureStore.setItemAsync(REGISTERED_KEY, '1');
  await SecureStore.setItemAsync(REGISTERED_USER_KEY, username);
}

/** Retorna o usuário cadastrado neste aparelho (ou null se nunca cadastrou). */
export async function getRegisteredUsername(): Promise<string | null> {
  const flag = await SecureStore.getItemAsync(REGISTERED_KEY);
  if (flag !== '1') return null;
  return (await SecureStore.getItemAsync(REGISTERED_USER_KEY)) ?? '';
}
