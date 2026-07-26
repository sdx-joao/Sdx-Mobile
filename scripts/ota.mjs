#!/usr/bin/env node
/**
 * Publica uma OTA (eas update) usando o MESMO env do perfil de build em eas.json —
 * fonte única de verdade. Evita a armadilha do `.env` local (que aponta para o
 * servidor de dev) vazar para a produção. Ver docs/OTA.md.
 *
 * Uso:
 *   node scripts/ota.mjs production "mensagem da atualização"
 *   node scripts/ota.mjs test "mensagem"
 * Ou via npm:
 *   npm run ota:prod -- "mensagem"
 *   npm run ota:test -- "mensagem"
 */
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const profile = process.argv[2] || 'production';
const message =
  process.argv.slice(3).join(' ').trim() ||
  `OTA ${profile} — ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`;

let eas;
try {
  eas = JSON.parse(readFileSync(new URL('../eas.json', import.meta.url), 'utf8'));
} catch (err) {
  console.error('Não foi possível ler eas.json:', err.message);
  process.exit(1);
}

const cfg = eas.build?.[profile];
if (!cfg) {
  console.error(`Perfil "${profile}" não existe em eas.json (build.${profile}).`);
  process.exit(1);
}

// O env vem do perfil de build (production/test); o branch = channel do perfil.
const profileEnv = cfg.env || {};
const branch = cfg.channel || profile;
const env = { ...process.env, ...profileEnv };

if (!profileEnv.EXPO_PUBLIC_SDX_API_URL || !profileEnv.EXPO_PUBLIC_APP_ENV) {
  console.error(`Perfil "${profile}" não define EXPO_PUBLIC_SDX_API_URL / EXPO_PUBLIC_APP_ENV em eas.json.`);
  process.exit(1);
}

console.log('\n────────────────────────────────────────');
console.log(`▶ OTA  perfil=${profile}  branch=${branch}`);
console.log(`  API : ${profileEnv.EXPO_PUBLIC_SDX_API_URL}`);
console.log(`  ENV : ${profileEnv.EXPO_PUBLIC_APP_ENV}`);
console.log(`  msg : ${message}`);
console.log('────────────────────────────────────────\n');

const res = spawnSync(
  'npx',
  ['eas', 'update', '--branch', branch, '--message', message],
  { stdio: 'inherit', env, shell: true },
);
process.exit(res.status ?? 1);
