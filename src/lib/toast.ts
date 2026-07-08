import { Platform, ToastAndroid, Alert } from 'react-native';

/**
 * Toast leve e não-bloqueante para confirmações de sucesso — substitui os
 * Alert.alert que travavam o fluxo. No Android usa o ToastAndroid nativo; no iOS
 * (fallback) cai num Alert simples sem título.
 */
export function showToast(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('', message);
  }
}
