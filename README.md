# Servus-SDX

Aplicativo mobile (Expo / React Native, Android) do ecossistema SDX, focado em
Ordens de Servico e Inventario. Consome as APIs mobile do backend central
(Scandex) por token assinado. App separado do Prontus-SDX (prontuarios).

> Detalhes sensiveis (IPs, dominios internos, credenciais, chaves) nao devem
> ficar neste README nem no Git. A URL do backend vem de variavel de build.

## Identidade

| | |
| --- | --- |
| Nome | Servus |
| Pacote Android | `com.sdxpro.mobile` |
| Build | Codemagic (AAB) → Google Play |
| OTA | Expo Updates (ligado; canal por ambiente) |

## Stack

- Expo SDK 54, React Native, TypeScript.
- React Navigation (stack + bottom tabs).
- expo-camera (leitura de QR), expo-local-authentication (biometria),
  expo-notifications (push), expo-file-system, expo-secure-store.
- Sentry para telemetria (sem PII).

## Funcionalidades

### Ordens de Servico

- Login por token; lista, detalhe e criacao de OS.
- Regra de propriedade: so o criador (ou quem recebeu por delegacao) edita,
  conclui ou delega; Super e excecao.
- Delegacao de OS com mensagem e notificacao ao destinatario.
- Solicitacao de cancelamento com motivo obrigatorio; aprovacao por quem
  gerencia.
- Conclusao com situacao, solucao adotada e assinatura digital (tecnico e
  solicitante), com linha-guia no quadro de assinatura.
- Destaque visual e atalho para OS urgentes/escaladas.
- Compartilhamento do PDF da OS finalizada.

### Inventario

- Consulta de itens/equipamentos com foto (autenticada por token).
- Cadastro de equipamento iniciado apenas por leitura da etiqueta (QR).
- Local estruturado no cadastro: Unidade e Comodo (alimenta o Mapa no desktop).
- Modelo de copias com indice: ao concluir, o operador valida todas as copias
  da etiqueta coladas no equipamento; so entao o item e salvo.
- Cadastros pendentes: se faltar validar alguma copia, os dados ficam guardados
  localmente e podem ser retomados depois.
- Deep link (App Links / custom scheme) para abrir a etiqueta direto no app.

### Plataforma

- Bloqueio por biometria quando o aparelho possui biometria cadastrada.
- Notificacoes push com deep link para a OS.
- Atualizacao OTA com aviso discreto de nova versao.

## Execucao local

```powershell
npm install
npm start
```

Para rodar em aparelho/emulador Android use o Expo Dev Client. A URL do backend
e definida por `EXPO_PUBLIC_SDX_API_URL` (e `EXPO_PUBLIC_APP_ENV`) no ambiente de
build; nao versionar valores reais.

## Build e distribuicao

- Build de producao e teste via Codemagic (workflows `servus-prod` / `servus-test`),
  gerando AAB assinado para a Google Play.
- `versionCode` dinamico no build (evita colisao na Play).
- Mudancas apenas de JS podem ir por OTA (workflow `servus-ota-prod`); mudancas
  nativas (novos modulos, permissoes, intent filters) exigem novo build na Play e
  incremento de `version`.

## Estrutura

```text
Servus-SDX/
├── App.tsx              # raiz: auth, lock, deep link, OTA, push
├── src/
│   ├── api/             # cliente das APIs mobile
│   ├── auth/            # sessao, token, biometria
│   ├── components/      # UI compartilhada
│   ├── lib/             # toast, notificacoes, OTA, etiquetas, pendencias
│   ├── navigation/      # navegador e tipos de rota
│   └── screens/         # telas (OS, Inventario, Scan, cadastro, validacao)
├── app.json             # config Expo (intent filters, plugins, updates)
├── codemagic.yaml       # build/OTA
└── docs/CHANGELOG.md
```

## Documentacao

- Changelog: [`docs/CHANGELOG.md`](docs/CHANGELOG.md).
- Contexto do ecossistema e regras de negocio: `CLAUDE.md` do repositorio do
  backend (Scandex).

## Licenca

Software proprietario. Uso restrito aos ambientes e equipes autorizadas.
