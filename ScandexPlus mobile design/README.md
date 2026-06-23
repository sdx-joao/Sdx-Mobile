# ScandexPlus Design System

Sistema de design do **ScandexPRO™** — plataforma hospitalar de gestão de documentos (GED), ordens de serviço, inventário e prontuários do Hospital do Olho (HO — JCB).

O sistema cobre duas camadas coesas:
- **Web** — tokens e UI kit do produto desktop (ShadCN/Tailwind, fonte Inter).
- **Mobile** — camada otimizada para toque (app React Native / Expo), mantendo a mesma identidade visual.

Tudo compartilha o mesmo azul institucional, a mesma tipografia e a mesma linguagem de status de documento.

---

## Como consumir

Em um projeto consumidor, vincule **um** arquivo de estilo e o bundle de componentes:

```html
<link rel="stylesheet" href="_ds/<pasta>/styles.css">
<script src="_ds/<pasta>/_ds_bundle.js"></script>
<script>
  const { BlueHeader, SearchField, MobileButton } = window.ScandexPlusDesignSystem_c9a9df;
</script>
```

`styles.css` importa `colors_and_type.css` (tokens + tipografia + reset). Componentes são React e leem `window.React` / `window.ReactDOM`.

---

## Fundamentos

### Cor
- **Primária** `#072AC8` (`hsl(230 93% 41%)`) — azul institucional. Header em gradiente `#072AC8 → #051E9B`.
- **Apoio (teal)** `#4DB6AC`.
- **Fundo** `#F5F7FB` · **Superfície** `#FFFFFF` · **Borda** `#E2E8F2`.
- Texto `#0F172A` · suave `#334155` · muted `#64748B` · faint `#94A3B8`.
- **Perigo** `#DC2626`.
- Suporte a **dark mode** via classe `.dark`.

### Tipografia
Fonte única **Inter** (400/500/600/700/800). Hierarquia por peso + tamanho. Classes utilitárias: `.sdx-h1`…`.sdx-h3`, `.sdx-body`, `.sdx-label`, `.sdx-muted`, `.sdx-badge`, `.sdx-code`.

### Iconografia
Ícones traço fino estilo Lucole/Feather. No mobile, use o componente **`Icon`** com o conjunto curado (sem emoji na UI principal).

### Status de documento (crítico)
Linguagem visual que a equipe cirúrgica já conhece — **replicar fielmente**:

| Estado | Cor | Significado |
|---|---|---|
| `available` | 🟢 `#10B981` | Documento disponível |
| `processing` | 🔵 `#3B82F6` | Em processamento |
| `altered` | 🟡 `#EAB308` | Informação alterada |
| `missing_info` | 🟠 `#F97316` | Faltando páginas/info |
| `absent` | 🔴 `#EF4444` | Documento ausente |
| `reported` | ⚠️ | Reportado com problema (triângulo) |

---

## Camada Mobile

### Tokens (`--sdx-m-*` em `colors_and_type.css`)
Camada de tokens otimizada para toque, coesa com a web:
- **Toque**: `--sdx-m-touch: 44px` (alvo mínimo), `--sdx-m-btn-height: 52px`, `--sdx-m-field-height: 54px`.
- **Raios** mais arredondados: card `16px`, botão/campo `14px`, header `22px` (cantos inferiores).
- **Header**: `--sdx-m-header` (gradiente), `--sdx-m-shadow-header`.
- **Status**: `--sdx-m-doc-*` (preenchimento) + `--sdx-m-doc-*-ring` (borda).

### Componentes (`window.ScandexPlusDesignSystem_c9a9df`)

| Componente | Resumo |
|---|---|
| `Icon` | Conjunto curado de ícones traço (Lucide-style). `name`, `size`, `color`. |
| `MobileButton` | Botão touch-first. `variant` (primary/secondary/outline/ghost/danger), `size`, `fullWidth`, `loading`. Primary = gradiente azul, 52px. |
| `MobileCard` | Superfície branca, raio 16, sombra suave. `variant` (elevated/flat), `accent` (borda esquerda). |
| `BlueHeader` | Header em gradiente, cantos inferiores arredondados. Slots: `title`, `subtitle`, `eyebrow`, `onBack`, `action`, `brand`. |
| `SegmentedControl` | Seletor/abas. `options` (`{key,label,count?}`), ativo em azul. |
| `SearchField` | Campo de texto/busca com ícone, anel de foco e estado `valid` (✓ verde). `clearable`. |
| `StatusDot` / `StatusLegend` | Bolinha de status de documento (5 cores + ⚠️) e legenda reutilizável. |
| `StatusBadge` | Pílula de status com bolinha. `variant` (soft/solid). |
| `TabBar` | Navegação inferior. `items` (`{key,label,icon}`), ativo no accent. |
| `Avatar` | Avatar quadrado arredondado com iniciais e fallback de foto. |

### Padrões mobile
- Alvos de toque ≥ 44px; espaçamento generoso.
- Header azul arredondado embaixo; cards brancos raio 16; botão primário gradiente 52px.
- Stack navegável (Busca → Detalhes → Documento); abas em segmented control.
- Teclado nunca tapa campo/botão; pull-to-refresh em listas; toasts para feedback.

---

## Templates

| Template | Pasta | Descrição |
|---|---|---|
| Prontuários — Busca (mobile) | `templates/prontuarios-mobile/` | Tela de busca de paciente montada com os componentes mobile. Ponto de partida para o módulo de Prontuários. |

Cada template carrega o DS via `ds-base.js` (edite a linha `base` no projeto consumidor para apontar ao `_ds/<pasta>` vinculado).

---

## Índice de arquivos

- `colors_and_type.css` — tokens (web + mobile), tipografia, reset.
- `styles.css` — entrada única (importa `colors_and_type.css`).
- `components/<Nome>/` — componentes mobile (`.jsx` + `.d.ts` + card `@dsCard`).
- `preview/` — cards de preview web (cores, tipografia, espaçamento, componentes).
- `ui_kits/scandexpro/` — UI kit web interativo (protótipo desktop).
- `templates/` — pontos de partida (DC) para projetos consumidores.
- `mobile/` — protótipo de referência do app (ScandexPRO Mobile) que originou a camada mobile.
- `assets/` — logos e imagens de marca.

---

*ScandexPlus Design System — camada mobile adicionada sobre a base web, preservando a identidade visual do produto.*
