const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, imports = {}, context = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText,
    { exports, require: name => imports[name], process: { env: {} }, setTimeout, clearTimeout, ...context });
  return exports;
}
(async () => {
  const native = load('src/api/native-transfer.ts');
  const client = mockFetch => load('src/api/client.ts', { './native-transfer': native }, {
    fetch: mockFetch, AbortController, Response,
    setTimeout: (callback, ms) => setTimeout(callback, Math.min(ms, 15)),
  });
  // Receiving HTTP headers does not mean the response body arrived.
  const stalled = client(async () => ({ text: () => new Promise(() => {}) }));
  await assert.rejects(stalled.apiFetch('/test'), error => error.status === 408 && error.code === 'timeout');
  const healthy = client(async () => new Response('{"ok":true}', { status: 200, headers: { 'Content-Type': 'application/json' } }));
  assert.equal((await healthy.apiFetch('/test')).ok, true);
  const empty = client(async () => new Response(null, { status: 204 }));
  assert.equal(await empty.apiFetch('/test'), null);
  const states = [], effects = [], resolvers = [];
  const hooks = load('src/api/use-resource.ts', {
    react: {
      useCallback: fn => fn, useRef: value => ({ current: value }),
      useState: value => { const index = states.length; states.push(value); return [value, next => { states[index] = next; }]; },
      useEffect: fn => effects.push(fn),
    },
    '@react-navigation/native': { useFocusEffect: () => {} }, './client': healthy,
  });
  const resource = hooks.useResource(() => new Promise(resolve => resolvers.push(resolve)));
  const cleanup = effects[0](); resource.reload();
  resolvers[1]('completed'); await new Promise(resolve => setImmediate(resolve));
  resolvers[0]('open'); await new Promise(resolve => setImmediate(resolve));
  assert.equal(states[0], 'completed');
  resource.reload(); cleanup(); resolvers[2]('obsolete'); await new Promise(resolve => setImmediate(resolve));
  assert.equal(states[0], 'completed');
  console.log('OK: timeout includes stalled response body, JSON/204 success, stale-response rejection and unmount protection.');
})().catch(error => { console.error(error); process.exitCode = 1; });
