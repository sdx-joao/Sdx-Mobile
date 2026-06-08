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

- [ ] Tela de login.
- [ ] Configuracao da URL da API.
- [ ] Endpoint mobile de login no SDX-Pro.
- [ ] Guardar token com seguranca.
- [ ] Listar ordens de servico.
- [ ] Abrir detalhe de OS.
- [ ] Criar OS simples.
- [ ] Alterar status.
- [ ] Anexar foto.

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
