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
- [ ] Endpoint mobile de login no SDX-Pro (`POST /api/mobile/auth/login`).
- [x] Guardar token com seguranca (expo-secure-store via `src/auth/token-store.ts`).
- [x] AuthProvider com bootstrap de sessao (`/api/mobile/me`) e navegacao gated.
- [x] Tela de lista de OS consumindo `/api/mobile/work-orders` (com pull-to-refresh).
- [ ] Abrir detalhe de OS.
- [ ] Criar OS simples.
- [ ] Alterar status.
- [ ] Anexar foto.

> Estado do shell: login -> lista de OS ja navegam. Falta o **backend
> `/api/mobile/*`** (login/me/work-orders) para o app autenticar de verdade.
> As telas ja apontam para esses endpoints.

## Fase 2 - Fluxo Tecnico

- [ ] Aba "Minhas OS".
- [ ] Filtros por status, setor, prioridade e unidade.
- [ ] Atendimento parcial.
- [ ] Conclusao de OS.
- [ ] Historico de alteracoes.
- [ ] Comentario por foto.

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
