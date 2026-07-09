import * as Updates from 'expo-updates';

// Atualização OTA (Expo Updates): checa se há uma versão nova publicada (mesmo
// runtimeVersion), baixa em segundo plano e devolve se está pronta pra aplicar.
// Best-effort: offline / sem update / dev → não faz nada.
export async function fetchLatestUpdate(): Promise<boolean> {
  if (__DEV__ || !Updates.isEnabled) return false;
  try {
    const res = await Updates.checkForUpdateAsync();
    if (res.isAvailable) {
      await Updates.fetchUpdateAsync();
      return true;
    }
  } catch {
    /* sem conexão / sem update — ignora */
  }
  return false;
}

/** Aplica o update baixado reiniciando o bundle (rápido, sem sair do app). */
export async function applyUpdate(): Promise<void> {
  try {
    await Updates.reloadAsync();
  } catch {
    /* noop */
  }
}
