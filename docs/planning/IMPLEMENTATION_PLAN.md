# Plano de Implementacao - SDX Mobile

## Objetivo

Criar um app Android para o SDX, inicialmente focado no modulo de ordens de servico.

O app deve consumir o SDX-Pro como backend central, sem duplicar regra de negocio dentro do mobile.

## Arquitetura

| Camada | Decisao inicial |
| --- | --- |
| App | Expo + React Native + TypeScript |
| Backend | SDX-Pro |
| Autenticacao | API mobile futura no SDX-Pro |
| Offline | Fase 2 |
| Fotos | Upload direto pelo app com compressao |
| Android Studio | SDK, emulador, depuracao e build |

## Fase 0 - Preparacao

- [x] Criar repositorio `sdx-joao/Sdx-Mobile`.
- [x] Clonar repositorio localmente.
- [x] Criar projeto Expo TypeScript.
- [x] Criar README.
- [x] Criar `.env.example`.
- [x] Criar estrutura base.
- [ ] Validar Android Studio e emulador.
- [ ] Rodar app no Android.

## Fase 1 - App Online Minimo

- [x] Tela de login (UI + validacao + estados de erro/carregando).
- [x] Configuracao da URL da API (`EXPO_PUBLIC_SDX_API_URL`).
- [x] Endpoint mobile de login no SDX-Pro (`POST /api/mobile/auth/login`).
- [x] Guardar token com seguranca (expo-secure-store via `src/auth/token-store.ts`).
- [x] AuthProvider com bootstrap de sessao (`/api/mobile/me`) e navegacao gated.
- [x] Tela de lista de OS consumindo `/api/mobile/work-orders` (com pull-to-refresh).
- [x] Abrir detalhe de OS.
- [x] Criar OS simples (`NewWorkOrderScreen`).
- [x] Alterar status.
- [x] Anexar foto (captura pela tela de Edicao).

> Estado atual: backend `/api/mobile/*` completo em producao (login/me/
> work-orders/notifications/inventory). App cobre login, lista, detalhe, criacao,
> edicao, status, anexos, assinatura, historico e delegacao.

## Fase 2 - Fluxo Tecnico

- [ ] Aba "Minhas OS".
- [ ] Filtros por status, setor, prioridade e unidade.
- [ ] Atendimento parcial.
- [x] Conclusao de OS (assinatura + trava pos-finalizacao).
- [x] Historico de alteracoes (timeline no detalhe + tela de Historico de OS).
- [ ] Comentario por foto.

## Fase 2.5 - Delegacao + Historico (v10, entregue 2026-07-02)

Feature cross-repo (app + SDX-Pro). Backend em producao + migration aplicada.
App aguardando build `servus-prod`. Roteiro de teste em
`docs/archive/test-plans/TESTES_v10_delegacao_historico.md`.

- [x] Historico de OS no app (botao + tela `WorkOrderHistoryScreen`, `includeHidden`).
- [x] Delegacao como conceito separado do tecnico responsavel
      (colunas `delegated_*` em `work_order`).
- [x] Delegar/redelegar no Electron/web (`/work-orders`) e no app (detalhe da OS).
- [x] Permissao `canDelegateWorkOrders` gateando a acao (web + app).
- [x] Permissao `canViewAllWorkOrders` (default true) — sem ela, so ve OS ligadas a ele.
- [x] Card/detalhe realcam OS delegada; bloco de delegacao com recado.
- [x] Notificacao in-app `os_delegated` ao destinatario; delegador avisado em
      toda movimentacao/conclusao.
- [x] `/api/mobile/me` expoe `capabilities`; `/api/mobile/work-orders/users`
      lista destinos de delegacao.

## Fase 3 - Push real no celular (planejado, sem custo p/ Android)

Complementa a central in-app (que continua sendo a fonte de verdade / historico).
Push apenas "acorda" o usuario com o app fechado. **Caminho A escolhido**
(Expo Push Service por cima do FCM) — sem custo recorrente no Android.

- [ ] Firebase: projeto + app Android (`com.sdxpro.mobile`) → `google-services.json`;
      service account (FCM v1) subida no painel Expo (Credentials).
- [ ] App: `expo-notifications` + `expo-device`; permissao (Android 13+
      `POST_NOTIFICATIONS`); `getExpoPushTokenAsync()` no login →
      `POST /api/mobile/push-tokens`; handler de exibicao + toque abrindo
      `WorkOrderDetail`.
- [ ] Backend: tabela `device_push_token`; endpoint de registro; disparo do push
      nos MESMOS pontos que hoje chamam `createNotifications` (delegacao,
      movimentacao, escalacao) via `POST https://exp.host/--/api/v2/push/send`
      (best-effort); limpeza de tokens `DeviceNotRegistered`.
- [ ] Build novo (modulo nativo) + bump de versionCode.
- iOS ficaria pra depois (exige APNs / Apple Developer US$ 99/ano); foco atual e Android.

## Fase 3 - Offline

- [ ] Banco local.
- [ ] Rascunhos locais.
- [ ] Fila de sincronizacao.
- [ ] `clientMutationId` para idempotencia.
- [ ] Retry de upload.
- [ ] Resolucao de conflitos.

## APIs Esperadas no SDX-Pro

```text
POST /api/mobile/auth/login
POST /api/mobile/auth/refresh
GET  /api/mobile/me
GET  /api/mobile/catalogs
GET  /api/mobile/work-orders
GET  /api/mobile/work-orders/:id
POST /api/mobile/work-orders
PATCH /api/mobile/work-orders/:id/status
PATCH /api/mobile/work-orders/:id/attendance
POST /api/mobile/work-orders/:id/attachments
```

## Camada de Estoque (Leitura de QR Code)

O modulo de Estoque do SDX-Pro imprime etiquetas patrimoniais Zebra com QR Code.
O app sera o leitor oficial dessas etiquetas em campo: ao escanear, abre a ficha
do bem com todos os status (`disponivel`, `em uso`, `em manutencao`, `defeituoso`,
`baixado`, `extraviado`), local, responsavel, fotos e OS vinculadas.

### Estrategia de deep link (decisao atual: custom scheme)

- **Agora (LAN, sem dominio HTTPS):** o QR redireciona via custom scheme
  `sdxmobile://inventory/<codigo>`. O `scheme` ja esta configurado em `app.json`.
- **Futuro (quando houver `sdx.pro.com` + HTTPS):** migrar para Android App Link
  `https://sdx.pro/i/<codigo>` com fallback web. Sem reimpressao em massa: o
  scanner interno do app le ambos os formatos e tambem o legado `SDX|INV|...`.

### Parsing do payload

O scanner interno aceita 3 formatos e extrai sempre o `codigo`:

```text
sdxmobile://inventory/0000000115329            (custom scheme - atual)
https://sdx.pro/i/0000000115329?u=HMOJCB       (app link - futuro)
SDX|INV|0000000115329|HMOJCB|29/05/2026|13:54  (legado, so scanner interno)
```

> O app nunca confia nos dados do QR como verdade do item. O QR so carrega o
> `codigo`; status/local/responsavel/historico vem sempre do backend.

### A fazer (estoque)

- [ ] Scanner de QR no app (`expo-camera`) + parser dos 3 formatos.
- [ ] Tela "Ficha do Item" com todos os status do bem.
- [ ] `GET /api/mobile/inventory/assets/:codigo` no SDX-Pro.
- [ ] Acao "Abrir OS para este item" (pre-vincula `codigo`).
- [ ] No SDX-Pro: trocar o `^BQ` da etiqueta de `SDX|INV|...` para
      `sdxmobile://inventory/{{CODIGO}}` (auto-fit ja cuida do tamanho).

## Regras de Seguranca

- App nao guarda senha em texto.
- Token deve ficar em armazenamento seguro.
- Backend sempre valida permissao.
- Filtro por unidade deve ocorrer no backend.
- Fotos devem ser comprimidas antes do upload.
- Logs nao devem conter token, senha ou dados sensiveis desnecessarios.

## Fora do Escopo Inicial

- Impressao direta pelo celular.
- Offline completo.
- Estoque completo.
- WhatsApp/OpenWA.
- Gestao administrativa.
