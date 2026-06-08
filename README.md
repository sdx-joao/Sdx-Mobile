# SDX Mobile

Aplicativo mobile do ecossistema SDX, preparado para Android.

Este repositorio nasce separado do SDX-Pro principal. O objetivo e consumir APIs do SDX-Pro para ordens de servico, anexos/fotos e, no futuro, operacao offline com sincronizacao.

## Estado Atual

- Projeto Expo/React Native inicial criado.
- TypeScript configurado.
- Estrutura base de pastas criada.
- Nenhuma API conectada ainda.
- Nenhuma regra do SDX-Pro foi migrada para ca.

## Requisitos

- Node.js LTS ou atual.
- npm.
- Android Studio com Android SDK.
- Emulador Android ou aparelho fisico.

## Primeira Execucao

```powershell
npm install
npm run android
```

Ou para abrir o Expo Dev Server:

```powershell
npm start
```

## Ambiente

Copie `.env.example` para `.env` quando for iniciar integracao real:

```powershell
Copy-Item .env.example .env
```

Variavel principal:

```text
EXPO_PUBLIC_SDX_API_URL=http://10.32.20.220:3000
```

## Foco do 1.0

- Login mobile.
- Listagem de ordens de servico.
- Detalhe da OS.
- Criacao de OS simples.
- Atualizacao de status/atendimento.
- Upload de fotos comprimidas.

Offline fica para fase posterior.

## Documentacao

Veja:

- `docs/IMPLEMENTATION_PLAN.md`
