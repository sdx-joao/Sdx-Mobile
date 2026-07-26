# Publicar OTA (eas update)

O `.env` local aponta para o **servidor de dev** (`http://10.32.20.220:3000`,
`APP_ENV=development`). Publicar OTA sem sobrescrever o env **quebra a produção**
(o bundle embute a URL errada). Por isso use sempre os scripts abaixo, que puxam o
env do perfil de build em `eas.json` (fonte única de verdade).

```bash
# Produção (canal/branch production, API https://app.scandexplus.com.br)
npm run ota:prod -- "mensagem da atualização"

# Teste (canal/branch test, API https://app-test.scandexplus.com.br)
npm run ota:test -- "mensagem da atualização"
```

Sem mensagem, o script gera uma com data/hora.

## Regras

- **Só JS/assets vão por OTA.** Mudança nativa (novo módulo Expo, permissão,
  intent filter) exige **build no Codemagic/EAS** antes — a OTA só alcança um
  binário que já tenha o módulo.
- **Runtime tem que bater.** `runtimeVersion.policy = "appVersion"` → a OTA só
  chega a builds com o mesmo `version` de `app.json`. Se subir a versão, rebuilde
  antes de publicar OTA para o novo runtime.
- O env vem de `eas.json` (`build.<perfil>.env`) — mantenha lá, não no `.env`.

Detalhes do script: [`scripts/ota.mjs`](../scripts/ota.mjs).
