# Roteiro de testes — v10 (Delegação + Histórico de OS)

Feature cross-repo: **Servus-SDX** (app, versionCode 10) + **SDX-Pro/ScandexGed**
(backend + Electron/web). Backend já está em **produção** e a migration
`work_order_delegation_migration.sql` já foi aplicada no `sdx_work_orders`.
O app depende de um **build novo** (`servus-prod` no Codemagic) para ser testado
no aparelho.

> Enquanto o app não é buildado, dá pra testar **toda a parte web/Electron**
> (delegação, visibilidade, notificação in-app do delegador) pelo navegador em
> `http://10.32.20.220:3000` ou pelo Electron.

## Pré-condições

- [ ] Ter pelo menos 3 usuários no `sdx_core`: um **delegador** (com
      `canDelegateWorkOrders`, ex.: Gerente/Admin), um **técnico A** e um
      **técnico B** (destinatários).
- [ ] Confirmar em `/users` que os toggles **"Delegar Ordens de Serviço"** e
      **"Ver Todas as Ordens de Serviço (quadro geral)"** aparecem e salvam.
- [ ] Lembrar: `canViewAllWorkOrders` vem **ligado por padrão** em todos.

## A. Web / Electron (`/work-orders`)

### A1. Delegar
- [ ] Abrir uma OS **não finalizada** no modal de edição. Como delegador, deve
      aparecer o botão **"Delegar"** no topo do modal.
- [ ] Clicar → escolher o **técnico A** + escrever uma mensagem → **Delegar**.
- [ ] Toast de sucesso; o modal fecha; ao reabrir a OS aparece o banner
      **"Delegada para {técnico A} por {delegador}"** com o recado.
- [ ] Reabrir e **Redelegar** para o **técnico B** — banner atualiza.

### A2. Permissão de delegar
- [ ] Logar como um usuário **sem** `canDelegateWorkOrders`: o botão "Delegar"
      **não** aparece. Chamar o endpoint direto deve dar **403**.

### A3. OS fechada não delega
- [ ] Numa OS já concluída/entregue/cancelada, o botão não aparece; endpoint
      responde **409**.

### A4. Notificação do delegador
- [ ] Como delegador, delegar uma OS ao técnico A.
- [ ] Com **outro** usuário, mover o status dessa OS (ou concluir).
- [ ] O **delegador** deve receber notificação in-app ("OS movida para …").
- [ ] O **criador** da OS (se diferente) também recebe. Não pode haver
      notificação duplicada se delegador == criador.

### A5. Visibilidade (quadro geral)
- [ ] Tirar `canViewAllWorkOrders` do **técnico A** (deixar `false`).
- [ ] Logar como técnico A: a lista deve mostrar **só** as OS ligadas a ele
      (delegadas, atribuídas como responsável, criadas ou solicitadas por ele).
- [ ] Tentar abrir por URL uma OS que **não** é dele → **403**.
- [ ] Religar `canViewAllWorkOrders`: volta a ver tudo.

## B. App Servus-SDX (após build servus-prod)

### B1. Histórico
- [ ] Na tela **Ordens de Serviço**, botão **"Histórico"** ao lado de "Nova OS".
- [ ] Abre a lista de OS **finalizadas** (concluídas/entregues/canceladas),
      incluindo as já sumidas do fluxo diário. Busca e filtros funcionam.
- [ ] Abrir uma OS do histórico → detalhe em modo consulta.

### B2. Card de OS delegada a mim
- [ ] Delegar (pelo web) uma OS ao usuário logado no app.
- [ ] Puxar a lista: o card fica **realçado em índigo** com badge
      **"Delegada a você"** e a linha "Encaminhada por {delegador}".

### B3. Detalhe + notificação
- [ ] Abrir a OS delegada: bloco **"Delegação"** mostra destinatário, autor e o
      recado.
- [ ] Na central de notificações (sino), aparece **"OS … encaminhada para você"**
      com ícone de envio.

### B4. Delegar pelo app
- [ ] Com um usuário que tem `canDelegateWorkOrders`, no detalhe da OS aparece
      **"Delegar OS"** (ou "Redelegar").
- [ ] Escolher destinatário + mensagem → delegar → o destinatário passa a ver o
      card realçado; o delegador recebe avisos de movimentação.
- [ ] Usuário **sem** a permissão: o botão não aparece.

### B5. Conclusão inalterada
- [ ] Concluir/entregar uma OS pelo fluxo normal (assinatura) continua
      funcionando; depois de finalizada a OS fica **trancada** (só consulta),
      mesmo tendo sido delegada.

## Observações

- Push real no celular **não** faz parte desta versão — o aviso é a central
  in-app (atualiza ao abrir/atualizar). Push é fase 2 (ver IMPLEMENTATION_PLAN).
- Se algo em "Delegar" der erro 500 no web, checar se a migration foi aplicada
  no banco (`SHOW COLUMNS FROM work_order LIKE 'delegat%'`).
