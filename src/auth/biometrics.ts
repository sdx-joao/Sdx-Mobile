// Wrapper de expo-local-authentication (biometria do aparelho).
import * as LocalAuthentication from 'expo-local-authentication';

/** O aparelho tem hardware de biometria E ao menos uma digital/rosto cadastrado? */
export async function isBiometricAvailable(): Promise<boolean> {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) return false;
    return await LocalAuthentication.isEnrolledAsync();
  } catch {
    return false;
  }
}

/** Rótulo amigável do tipo de biometria disponível (para textos da UI). */
export async function biometricLabel(): Promise<string> {
  try {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) return 'reconhecimento facial';
    if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) return 'impressão digital';
    return 'biometria';
  } catch {
    return 'biometria';
  }
}

/** Pede a biometria. Retorna true se autenticou. */
export async function authenticateBiometric(reason = 'Desbloquear o Servus'): Promise<boolean> {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: reason,
      cancelLabel: 'Cancelar',
      disableDeviceFallback: false, // permite PIN/senha do aparelho como alternativa
    });
    return result.success;
  } catch {
    return false;
  }
}
