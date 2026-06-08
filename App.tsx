import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { API_BASE_URL } from './src/api/client';
import { appConfig } from './src/config/app';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.kicker}>SDX-Pro</Text>
        <Text style={styles.title}>{appConfig.name}</Text>
        <Text style={styles.description}>
          Base Android preparada. O proximo passo e conectar login e ordens de servico pela API mobile do SDX-Pro.
        </Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>API configurada</Text>
          <Text style={styles.infoValue}>{API_BASE_URL}</Text>
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },
  kicker: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 8,
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
  },
  description: {
    marginTop: 12,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23,
  },
  infoBox: {
    marginTop: 22,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    backgroundColor: colors.background,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  infoValue: {
    marginTop: 4,
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
});
