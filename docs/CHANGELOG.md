# Servus-SDX — Changelog

Registro de mudanças por versão (`android.versionCode` em `app.json`). Toda
alteração implementada deve ser documentada aqui **antes** de gerar o build, pra
manter o desenvolvimento coeso e rastreável.

Formato: cada entrada lista o que mudou, por quê e os arquivos/áreas afetadas.
Build/publicação é feito pelo desenvolvedor (Codemagic `servus-prod` → Play).

---

## versionCode 21 — Correções de assinatura + margem inferior + técnico concluinte

- **Botão "Limpar" agora funciona:** estava dentro da View do PanResponder (que
  engolia o toque); movido para fora, sobre o quadro.
- **Margem inferior segura:** telas (scaffolds + wizard de conclusão) respeitam o
  `insets.bottom` — botões não ficam mais escondidos/atrás dos botões do celular.
- **Técnico responsável = dono do celular** que colhe a assinatura (era o
  responsável salvo na OS — ex.: quem delegou). Nome + CPF vêm do usuário logado;
  o backend também grava o concluinte como `responsible_technician_*`.

Backend (deployado): **toggle global de impressão automática** em
`/admin/print-stations` — desligado = fluxo 100% digital, nada imprime ao concluir.

versionCode 20 → 21.

---

## versionCode 20 — Ajustes de assinatura + toast custom + documento do técnico

- **Documento do técnico** exibido na assinatura, puxado do **cadastro dele**
  (CPF do usuário logado, via `/api/mobile/me`, mascarado) — espelha o do
  solicitante.
- **Orientação por passo:** campos pré-assinatura (situação, documento, revisão)
  ficam na **vertical**; só os passos de **assinar** vão para paisagem.
- **Botão "Limpar" sutil** dentro do quadro de assinatura (canto) para refazer;
  removido o refresh do cabeçalho (redundante).
- **Toast custom** (`lib/toast.tsx` + `<ToastHost/>` no root) no lugar do
  `ToastAndroid` "quadrado" do sistema — mensagem estilizada deslizando de baixo.

Backend (deployado): nova senha **não pode ser igual ao CPF** (senha inicial
padrão); senha inicial/redefinição = CPF.

versionCode 19 → 20.

---

## versionCode 19 — Overhaul de UX do ciclo de vida da OS (6 itens)

Redesenho do fluxo com base na revisão UX sênior:

1. **Botão "Concluir OS"** direto no detalhe (`WorkOrderDetailScreen`) — ação
   primária, leva ao fluxo de conclusão. Antes concluir estava escondido dentro de
   "Editar".
2. **Editar = só corrigir dados.** Removidos do `WorkOrderEditScreen` o seletor
   manual de status ("Fluxo"), o prazo e a "Situação da OS". Status andam sozinhos;
   conclusão é só pelo "Concluir OS". Botão vira "Salvar alterações".
3. **Status como linha do tempo read-only** no detalhe (Aberta • Em andamento •
   Concluída/Entregue) — não mais um controle cinza desabilitado.
4. **Técnico read-only** também no Editar (era campo livre).
5. **Filtro "Minhas"** + chip "Ativas" na lista; **métricas da Home** com
   drill-down (tocar filtra a lista de OS).
6. **Toast** (ToastAndroid) no lugar de `Alert` bloqueante em criar/salvar/concluir;
   **tela de revisão** antes de fechar a OS.

Conclusão agora é um **assistente**: situação (resolvida/parcial/não resolvida) +
solução + hora final → assinatura do técnico → documento do solicitante (se faltar)
→ assinatura do solicitante → **revisão** → confirmar. Backend passa a honrar a
`resolutionStatus` escolhida no fechamento (antes forçava "resolvida").

versionCode 18 → 19.

---

## versionCode 18 — Técnico fixo no login + solução adotada só na conclusão

- **Técnico responsável fixado no login** (`NewWorkOrderScreen`): campo read-only
  mostrando o usuário logado; a OS é sempre aberta em nome dele. O backend força
  `responsible_technician_name`/`responsible_technician_user_id` = usuário da
  sessão (evita abrir OS em nome de terceiros) — e isso também alimenta o CPF do
  técnico no molde.
- **Solução adotada + Hora final só aparecem ao declarar "Concluída/Resolvida"**
  (`WorkOrderEditScreen`): os demais status andam sozinhos pelo scheduler; o
  usuário só abre, muda prioridade e conclui.

---

## Conclusão da OS: assinatura do técnico + documento do solicitante

**Status:** commitado em `main`. Precisa de rebuild `servus-prod`. Depende do
backend (deployado): 2ª assinatura + documento no `work_order_signature` /
`work_order_requester`, e o GET expõe `requesterDocument`.

- **Assistente de conclusão em 3 passos** (`WorkOrderSignatureScreen` virou wizard,
  reaproveitando o mesmo pad):
  1. **Técnico responsável assina** → vai pro campo "assinatura do técnico" na OS.
  2. **Documento do solicitante** (CPF / RG / matrícula) — só aparece se o
     solicitante ainda não tiver documento cadastrado; senão pula direto. Salvo no
     catálogo do solicitante complementando o cadastro.
  3. **Solicitante assina** → mostra o documento ao lado do nome, **mascarado**
     (CPF/RG com •) ou **matrícula inteira**.
- O fluxo entra pela conclusão normal (marcar "Resolvida" → "Salvar e assinar" no
  `WorkOrderEditScreen`, que já tem Solução adotada + Hora final).
- `updateWorkOrderStatus` envia `techSignatureDataUrl`/`techSignerName`/
  `requesterDocument`/`requesterDocumentType`; `getWorkOrder` traz `requesterDocument`.

---

## OS com molde ÚNICO do servidor + solução adotada preservada

**Status:** commitado em `main`. Precisa de rebuild `servus-prod`. Depende do
backend (deploy): novo GET `/api/mobile/work-orders/[id]/print-html` (HTML
canônico) e enum `work_order.source` com `'mobile'` (migration aplicada).

- **Compartilhar puxa o HTML do servidor** (`getWorkOrderPrintHtml` → novo
  endpoint) em vez de montar o layout no app. Fim do 2º molde: o PDF do app fica
  **idêntico** à impressão de produção/estação — mesma marca d'água Scandex,
  histórico com coluna Status, assinatura digital embutida e origem. Removidos os
  usos de `buildWorkOrderPrintHtml`/`loadPrintLogos`/`loadWorkOrderPhotos` no
  share (`WorkOrderDetailScreen`, `WorkOrderSignatureScreen`).
- **"Solução adotada" não é mais sobrescrita**: a tela de assinatura preservava só
  a frase `OS concluída com assinatura coletada no app mobile.`, apagando o texto
  digitado. Agora o texto digitado (vindo do fluxo de conclusão via novo param
  `resolutionNotes`) é mantido e a nota da assinatura vai no **final**.
- **Origem "App"**: OS criada pelo app grava `source='mobile'` no backend (antes
  ia como `web`); rótulo "App" em todas as renderizações.

---

## PDF da OS: assinatura em toda folha + copia a assinatura salva

**Status:** commitado em `main`. Precisa de rebuild `servus-prod` + depende do
backend (deploy feito): GET `/api/mobile/work-orders/[id]` agora devolve a
assinatura digital salva.

- **Rodapé de assinatura em TODAS as folhas** (principal + páginas de foto):
  antes só a folha principal tinha o campo. `buildWorkOrderPrintHtml` repete o
  rodapé em cada página de foto (photo-page vira flex `min-height:272mm`, rodapé
  ancorado no fim via `margin-top:auto`).
- **Assinatura condicional**: a imagem e o texto "Assinado digitalmente" só
  aparecem quando há assinatura (antes o texto vinha sempre, mesmo sem assinar).
- **Compartilhar copia a assinatura salva**: ao compartilhar/reimprimir uma OS já
  assinada, o app injeta a assinatura digital salva (vinda do GET) como `<img>`
  no PDF — antes saía sem assinatura.
- Arquivos: `src/api/work-order-pdf-html.ts`, `src/api/mobile.ts`,
  `src/screens/WorkOrderDetailScreen.tsx`.

---

## v12.1 (versionCode 16) — Anexo de foto: robustez (a causa real era o banco)

- **Causa raiz (backend, não o app):** a coluna `work_order_attachment.upload_source`
  era `ENUM('web','qr')` e o endpoint mobile gravava `'mobile'` → o INSERT falhava
  e o backend retornava **500 "Erro ao enviar arquivo."** (a mensagem que aparecia
  no app). Corrigido por migration (`work_order_attachment_mobile_source_migration.sql`,
  aplicada em produção) — o **anexo passa a funcionar até no build atual**, sem rebuild.
- Melhorias de robustez no app (mantidas, embora não fossem a causa):
  - Upload via **`FileSystem.uploadAsync`** (multipart) no lugar de `fetch()`+FormData
    — mais confiável para arquivos no RN Android.
  - **Compressão com fallback**: se `manipulateAsync` falhar, sobe a foto original
    (captura 0.6 + resize 1440/compress 0.5). Foto fica ~400KB.
- versionCode 15 → 16.

---

## v12 (versionCode 15) — Logos no PDF (definitivo) + biometria

### 1. Logos no PDF — corrigido de vez
- No build de produção as logos **não apareciam** mesmo com o código de embutir
  (v14): a leitura do asset via `expo-asset` + `FileSystem` em runtime devolvia
  base64 vazio → logo não renderizava (sobrava o ícone de imagem quebrada).
- Agora as 3 logos são **embutidas como constante base64 no bundle**
  (`src/api/print-logos-data.ts`, geradas de `assets/print/*.png`). Zero leitura
  de asset/rede em runtime → renderiza sempre. Logos reduzidas (240px, ~90KB
  no total) → PDF leve.

### 2. Desbloqueio por biometria
- `expo-local-authentication`: novo status `locked` no auth-context. Se o
  desbloqueio estiver ligado e o aparelho tiver biometria, o app abre numa
  **tela de bloqueio** (`LockScreen`) que pede a digital/rosto.
- Toggle **"Desbloqueio por biometria"** no Perfil (só aparece se o aparelho
  suportar) — ao ligar, confirma com uma leitura; preferência salva no
  secure-store por aparelho.
- Fallback pro PIN/senha do aparelho; opção "Sair da conta" na tela de bloqueio.
- `app.json`: plugin `expo-local-authentication` (permissão) + versionCode 14 → 15.

---

## v11 (versionCode 14) — Anexos: upload, visualizador e fotos no PDF

> ℹ️ **versionCode**: 13 já havia sido consumido na Play Console; buildar como
> **14**. Inclui também logos embutidas reduzidas (ho-logo 331KB→29KB) para o PDF.

**Status:** commitado em `main`. Depende do backend SDX-Pro com o novo endpoint
mobile de arquivo de anexo (deploy feito). Build `servus-prod` no Codemagic.

### 1. Corrige erro ao anexar foto
- A foto da câmera (>1MB) era **rejeitada pelo túnel/proxy** do domínio público
  (Cloudflare Tunnel → container) — POST grande retornava 502 antes de chegar no
  app. Agora a foto é **redimensionada (máx. 1600px) + comprimida** (`expo-image-manipulator`,
  ~300–600KB) antes do upload → passa folgado e sobe rápido em rede instável.
- ⚠️ Causa de infra: o Cloudflare/túnel limita uploads grandes e bloqueia
  `/images` (403). Vale rever o limite no Cloudflare, mas a compressão resolve
  o caso da foto.

### 2. Visualizador de fotos
- Novo endpoint mobile **`GET /api/mobile/work-orders/attachments/[id]/file`**
  (bearer) — o web usa sessão por cookie, que o app não tem. `mapAttachment.url`
  passou a apontar pra ele.
- Detalhe da OS: anexos de imagem viram **grade de miniaturas** tocáveis;
  documentos continuam em lista.
- Nova tela `WorkOrderPhotoViewerScreen`: galeria **fullscreen** com swipe entre
  as fotos, contador, legenda (categoria · data · comentário) e pinch-zoom (iOS).

### 3. Fotos no PDF da OS
- `buildWorkOrderPrintHtml` agora recebe `photos` e gera **páginas de foto**
  (2 por página, com legenda), no mesmo padrão da impressão do Electron.
- As fotos são baixadas autenticadas e **embutidas em base64** (`work-order-photos.ts`),
  aplicado no compartilhar (detalhe) e no pós-assinatura.
- Deps novas: `expo-image-manipulator@~14.0.8`.

---

## v10 (versionCode 12) — Delegação de OS + Histórico no app

**Status:** commitado em `main`, aguardando deploy do backend (SDX-Pro) + migration
e build `servus-prod` no Codemagic.

> ℹ️ **versionCode**: os códigos 10 e 11 já foram consumidos na Play Console
> (10 rejeitado; 11 usado no build de teste que expôs o bug das logos), então
> este release vai como **versionCode 12**. O nome lógico da feature continua "v10".

### 0.1 Logos embutidas no PDF do app (base64)
- **Bug**: no PDF gerado pelo app, as logos (Hospital do Olho, Prefeitura,
  submarca) não apareciam. Causa: o app baixava `https://app.scandexplus.com.br/images/*`,
  mas o **domínio público responde 403** nesses paths (proxy/WAF) — o `onerror`
  então escondia os `<img>`. (No Electron funciona porque ele usa o IP interno,
  que serve 200.)
- **Correção**: as 3 logos agora são **empacotadas no app** (`assets/print/*.png`)
  e convertidas para **data URI base64** em runtime (`src/api/print-logos.ts`,
  via `expo-asset` + `expo-file-system`). `buildWorkOrderPrintHtml` passou a
  receber as logos (não mais a `baseUrl`). Sem rede, sem timing → sempre renderiza.
- Aplicado nos dois geradores de PDF do app: compartilhar (detalhe) e pós-assinatura.
- Deps novas: `expo-asset@~12.0.13` (+ `expo-file-system` já adicionado).

> ⚠️ **Dependência de backend**: este release depende do SDX-Pro atualizado e da
> migration `database/work_order_delegation_migration.sql` aplicada no banco
> `sdx_work_orders`. Sem isso, delegar/histórico não funcionam. Fazer o deploy
> web **antes** de publicar o app.

### 0. Correções de PDF/impressão (compartilhar OS + logos)
- **Nome do arquivo**: ao compartilhar a OS em PDF, o arquivo saía com nome
  temporário aleatório. Agora é renomeado para o **código da OS**
  (`OS-AAAA-NNNNNN.pdf`) via `expo-file-system` antes do compartilhamento.
- **Assinatura no meio da folha**: o layout do PDF do app não ancorava a
  assinatura no rodapé. Portado o padrão da impressão do Electron — `.main-page`
  vira flex com `min-height:272mm` e o rodapé de assinatura usa `margin-top:auto`
  → **as 3 formas (Electron, impressão, app) ficam idênticas**.
- **Logos sumindo no Electron/impressão** (repo ScandexGed): a print page
  (`work-orders/[id]/print`) usava `next/image` nos logos do Hospital do Olho e
  da Prefeitura; a URL otimizada `/_next/image` quebra na impressão headless do
  Electron. Trocado por `<img>` puro (igual à submarca e ao app) → logos voltam.
- Dependência nova no app: `expo-file-system@~19.0.23` (SDK 54).

### 1. Histórico de OS
- Botão **Histórico** ao lado de "Nova OS" no topo de Ordens de Serviço
  (`ModuleScreen` ganhou `secondaryAction`).
- Nova tela `WorkOrderHistoryScreen`: lista OS finalizadas
  (concluídas/entregues/canceladas), incluindo as que saíram do fluxo diário
  (`includeHidden=1`). Read-only, com busca e filtro por status.

### 2. Delegação de OS (conceito separado do técnico responsável)
- Nova tela `WorkOrderDelegateScreen`: escolhe destinatário (`/api/mobile/work-orders/users`)
  + mensagem opcional, chama `POST /api/mobile/work-orders/:id/delegate`.
- Botão **Delegar/Redelegar** no detalhe da OS, gated por
  `capabilities.canDelegateWorkOrders` (vindo de `/api/mobile/me`).
- `WOCard` realça em índigo quando a OS foi **delegada a você**
  (borda + badge "Delegada a você") e mostra quem encaminhou.
- Detalhe da OS exibe bloco de **Delegação** com destinatário, autor e recado.
- Só quem tem a permissão delega — no app e no Electron.

### 3. Notificações in-app
- Novo tipo `os_delegated` ("OS encaminhada para você"), ícone `send` na central.
- Quem **delegou** passa a ser notificado de qualquer movimentação/conclusão da OS.
- (Push real de dispositivo fica para uma fase 2 — hoje é a central in-app por polling.)

### 4. Visibilidade
- Nova permissão `canViewAllWorkOrders` (**default `true` — todos veem tudo**).
  Quando `false`, o usuário só enxerga OS ligadas a ele (delegadas, atribuídas,
  criadas ou solicitadas), tanto na lista quanto no detalhe.

### Arquivos tocados (app)
- `src/data/mock.ts`, `src/auth/types.ts`, `src/auth/auth-context.tsx`,
  `src/api/mobile.ts`, `src/components/cards.tsx`, `src/components/ui.tsx`,
  `src/screens/WorkOrdersScreen.tsx`, `src/screens/WorkOrderDetailScreen.tsx`,
  `src/screens/WorkOrderHistoryScreen.tsx` (novo),
  `src/screens/WorkOrderDelegateScreen.tsx` (novo),
  `src/screens/NotificationsScreen.tsx`, `src/navigation/{types,RootNavigator}.tsx`,
  `app.json` (versionCode 9 → 10).

### Backend correspondente (repo ScandexGed/SDX-Pro)
- Migration `work_order_delegation_migration.sql` (colunas de delegação).
- Permissões `canDelegateWorkOrders` / `canViewAllWorkOrders` em `src/types/index.ts`.
- Endpoints `POST /api/(mobile/)work-orders/:id/delegate`, `GET /api/mobile/work-orders/users`.
- `/api/mobile/me` expõe `capabilities`. Filtro de visibilidade nas listas.
- UI de delegação na página web `/work-orders` (reflete no Electron).

---

## v9 (versionCode 9) — Produção no banco real + ajustes de OS e ícone

**Status:** commitado em `main`, aguardando build `servus-prod` no Codemagic.

### 1. Build de produção aponta pro backend/DB real
- Antes o app instalado usava o backend de **teste** (`app-test.scandexplus.com.br`).
- O perfil **`servus-prod`** do Codemagic (`codemagic.yaml`) já seta
  `EXPO_PUBLIC_SDX_API_URL=https://app.scandexplus.com.br` e
  `EXPO_PUBLIC_APP_ENV=production` como env vars (têm precedência sobre o `.env`
  de dev — `@expo/env` não sobrescreve env já definido). Confirmado que os
  endpoints `/api/mobile/*` de produção respondem certo.
- Em produção, `IS_TEST_BUILD` (`src/api/client.ts`) vira `false` → recursos
  só-de-teste (ex.: auto-cadastro) ficam desligados.
- `app.json`: `versionCode` 8 → 9.
- ⚠️ Consequência: quem estava no teste interno passa a gravar em **produção**
  na atualização. Avisar os testadores.

### 2. Captura de foto só pela tela de Edição
- `src/screens/WorkOrderDetailScreen.tsx`: removidos os botões de captura de
  foto (Foto antes/depois/geral) da tela de **detalhe** (agora só lista anexos,
  read-only). Atalho "Toque em Editar para adicionar fotos" quando não
  finalizada.
- A captura continua na `WorkOrderEditScreen` (seção "Fotos"), onde os botões já
  existiam.

### 3. Compartilhar PDF em OS finalizada
- `WorkOrderDetailScreen.tsx`: OS `completed`/`delivered`/`cancelled` ganham
  botão **"Compartilhar OS (PDF)"** que gera o PDF (`buildWorkOrderPrintHtml` +
  `expo-print`) e abre o compartilhamento nativo (`expo-sharing`).
- Limitação: a imagem da assinatura desenhada não é reidratada no detalhe, então
  o PDF sai sem ela — o restante do conteúdo é idêntico ao da impressão.

### 4. Ícone centralizado no molde adaptativo
- `assets/adaptive-foreground.png`: o design da marca (cards + chave + seta-mais)
  estava a **80%** do canvas, com as bordas na linha de corte das máscaras
  redondas do Android (parecia cortado). Reduzido pra **74% centralizado**
  (fonte `icon.png` 1024, filtro Lanczos, qualidade máxima) → glifos dentro da
  zona segura (~66%), nada cortado.
- `icon.png` (ícone iOS/loja, full-bleed) mantido — iOS não usa máscara adaptativa.
- Pendência opcional: fundo em gradiente (`adaptiveIcon.backgroundImage`) casando
  com a marca pra eliminar a leve emenda entre o `#072AC8` sólido e o gradiente
  do design.
