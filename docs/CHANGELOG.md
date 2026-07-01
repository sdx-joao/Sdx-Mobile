# Servus-SDX — Changelog

Registro de mudanças por versão (`android.versionCode` em `app.json`). Toda
alteração implementada deve ser documentada aqui **antes** de gerar o build, pra
manter o desenvolvimento coeso e rastreável.

Formato: cada entrada lista o que mudou, por quê e os arquivos/áreas afetadas.
Build/publicação é feito pelo desenvolvedor (Codemagic `servus-prod` → Play).

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
