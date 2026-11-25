const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(path, imports = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText,
    { exports, require: name => { if (!(name in imports)) throw new Error(name); return imports[name]; }, process: { env: {} }, setTimeout, clearTimeout, console });
  return exports;
}
(async () => {
  const native = load('src/api/native-transfer.ts');
  let cancelled = 0;
  await assert.rejects(native.runNativeTransfer({ cancelAsync: async () => { cancelled++; } }, () => new Promise(() => {}), 5), /Tempo limite/);
  assert.equal(cancelled, 1);
  assert.equal(await native.runNativeTransfer({ cancelAsync: async () => {} }, async () => 42, 100), 42);
  const client = load('src/api/client.ts', { './native-transfer': native });
  let logout = 0;
  client.setRefreshHandler(async () => 'renewed');
  client.setUnauthorizedHandler(() => { logout++; });
  const seen = [];
  assert.equal((await client.withMobileToken('old', async token => { seen.push(token); return { status: token === 'renewed' ? 200 : 401 }; })).status, 200);
  assert.deepEqual(seen, ['old', 'renewed']);
  await client.withMobileToken('old', async () => ({ status: 401 }));
  assert.equal(logout, 1);
  for (const valid of [false, true]) {
    let effect; const state = []; const moved = []; const deleted = []; let infoCalls = 0;
    const component = load('src/components/AuthenticatedImage.tsx', {
      react: { useState: value => { const index = state.length; state.push(value); return [value, next => { state[index] = next; }]; }, useEffect: callback => { effect = callback; } },
      'react/jsx-runtime': { jsx: () => null, jsxs: () => null }, 'react-native': {}, './Icon': {}, '../theme/theme': { T: {} },
      '../api/client': { withMobileToken: async (token, request) => request(token) }, '../api/native-transfer': native,
      'expo-file-system/legacy': { cacheDirectory: 'file:///cache/',
        getInfoAsync: async () => (++infoCalls === 1 ? { exists: false } : { exists: true, size: 100 }),
        createDownloadResumable: () => ({ cancelAsync: async () => {}, downloadAsync: async () => ({ status: valid ? 200 : 401, headers: { 'Content-Type': valid ? 'image/jpeg' : 'application/json' } }) }),
        moveAsync: async value => { moved.push(value); }, deleteAsync: async path => { deleted.push(path); },
      },
    });
    component.AuthenticatedImage({ uri: 'https://example.invalid/photo?v=1', token: 'token' }); effect();
    await new Promise(resolve => setTimeout(resolve, 10));
    assert.equal(moved.length, valid ? 1 : 0);
    assert.equal(state[1], !valid);
    assert.ok(deleted.some(path => path.endsWith('.part')));
    if (valid) assert.match(state[0], /inventory-photo-v2-/);
  }
  console.log('OK: timeout/cancel, refresh, invalid cache rejection, successful image cache and cleanup.');
})().catch(error => { console.error(error); process.exitCode = 1; });
