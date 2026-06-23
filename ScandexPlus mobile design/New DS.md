# New DS — Relatório Completo de Mudanças
**ScandexPlus Design System · Gerado em: 20/04/2026**

---

## 1. Visão Geral

Este documento registra todas as criações, atualizações e decisões de design realizadas durante a construção do **ScandexPlus Design System** a partir do codebase `ScandexGed/`.

O sistema de design foi construído como um projeto de referência independente, contendo:
- Tokens de cor e tipografia
- Guias de fundamentos visuais e de conteúdo
- Cards de preview registrados no painel de Design System
- UI Kit interativo do ScandexPRO™

---

## 2. Arquivos Criados

### Raiz do Projeto

| Arquivo | Descrição |
|---|---|
| `README.md` | Documentação central: visão geral, fundamentos visuais, conteúdo, iconografia, índice de arquivos |
| `colors_and_type.css` | CSS Variables completas para cores, tipografia e tokens de forma |
| `SKILL.md` | Configuração de skill para uso com Claude Code |
| `New DS.md` | Este relatório |

### Assets Copiados (`assets/`)

| Arquivo | Origem | Uso |
|---|---|---|
| `assets/ho-logo.png` | `ScandexGed/public/images/ho-logo.png` | Logo do cliente Hospital do Olho (tela de login) |
| `assets/hospital.png` | `ScandexGed/public/images/hospital.png` | Foto de fundo da tela de login |
| `assets/logo-02.png` | `ScandexGed/public/images/logo-02.png` | Marca ScandexPlus ("powered by") |
| `assets/favicon.svg` | `ScandexGed/public/favicon.svg` | Favicon SVG |
| `assets/icons/google-icon.png` | `ScandexGed/public/images/icons/google-icon.png` | Ícone Google (auth) |
| `assets/icons/govbr-icon.png` | `ScandexGed/public/images/icons/govbr-icon.png` | Ícone Gov.br (auth) |

> ⚠️ `logo-01.png` falhou na cópia (erro interno). Precisa ser re-adicionado manualmente.

---

## 3. Sistema de Cores — `colors_and_type.css`

### Tokens Base Definidos

```css
/* Brand */
--sdx-blue:        #072AC8;        /* Primary — hsl(230 93% 41%) */
--sdx-blue-light:  hsl(230 93% 60%); /* Dark mode */
--sdx-teal:        #4DB6AC;        /* Accent — hsl(174 43% 51%) */
--sdx-teal-light:  hsl(174 43% 60%);

/* Neutros */
--sdx-white:       #ffffff;
--sdx-off-white:   hsl(210 40% 96.1%);
--sdx-gray-border: hsl(214.3 31.8% 91.4%);
--sdx-gray-input:  hsl(214.3 30% 70%);
--sdx-gray-muted:  hsl(215.4 16.3% 46.9%);
--sdx-gray-dark:   hsl(222.2 47.4% 11.2%);
--sdx-near-black:  hsl(222.2 84% 4.9%);

/* Status de Documento */
--sdx-status-available:  #34d399;  /* emerald-400 */
--sdx-status-missing:    #fb923c;  /* orange-400 */
--sdx-status-processing: #60a5fa;  /* blue-400 */
--sdx-status-altered:    #facc15;  /* yellow-400 */
--sdx-status-absent:     #f87171;  /* red-400 */

/* Forma */
--sdx-radius:    0.5rem;   /* 8px */
--sdx-radius-md: 0.375rem; /* 6px */
--sdx-radius-sm: 0.25rem;  /* 4px */
```

### Variáveis Semânticas CSS (Light Mode)

```css
--background:           0 0% 100%;
--foreground:           222.2 84% 4.9%;
--primary:              230 93% 41%;   /* #072AC8 */
--primary-foreground:   0 0% 100%;
--secondary:            210 40% 96.1%;
--accent:               174 43% 51%;   /* #4DB6AC */
--muted:                210 40% 96.1%;
--muted-foreground:     215.4 16.3% 46.9%;
--border:               214.3 31.8% 91.4%;
--destructive:          0 84.2% 60.2%;
--radius:               0.5rem;
```

### Dark Mode
Todas as variáveis semânticas têm equivalente `.dark` — o primary blue clareia para `hsl(230 93% 60%)` e os backgrounds invertem para `hsl(222.2 84% 4.9%)`.

### Temas Adicionais
O projeto suporta os seguintes temas via classe no `<html>`:
`dark`, `suave`, `ocean`, `forest`, `sunset`, `grayscale`, `crimson-peak`, `azure-sky`, `verdant-valley`, `royal-purple`, `golden-sands`, `sepia-tones`, `magenta-burst`, `high-contrast`, `marsala`, `off-white`, `cinza`, `vibe`

---

## 4. Tipografia

### Fonte Utilizada
**Inter** (Google Fonts) — única fonte do sistema, usada para body e headline.

```css
--font-body:     'Inter', sans-serif;
--font-headline: 'Inter', sans-serif;
--font-code:     'Courier New', monospace;
```

### Escala Tipográfica

| Classe | Tamanho | Peso | Uso |
|---|---|---|---|
| `.sdx-h1` | 30px | 700 | Títulos de página |
| `.sdx-h2` | 24px | 700 | Títulos de seção (cor primary) |
| `.sdx-h3` | 20px | 600 | Subtítulos |
| `.sdx-body` | 14px | 400 | Texto corrido |
| `.sdx-body-sm` | 13px | 400 | Texto secundário |
| `.sdx-label` | 14px | 500 | Labels de formulário |
| `.sdx-muted` | 12px | 400 | Texto de apoio (cor muted) |
| `.sdx-brand` | 20px | 700 | "ScandexPRO™" no header |
| `.sdx-badge` | 10px | 700 UC | Badges de função/role |
| `.sdx-code` | 13px mono | 400 | Nomes de arquivo/prontuário |
| `.sdx-powered-by` | 14px italic | 400 | "powered by" no login |

---

## 5. Cards de Preview Registrados

| Asset | Grupo | Arquivo | Dimensões |
|---|---|---|---|
| Primary & Accent Colors | Colors | `preview/colors-primary.html` | 700×200 |
| Semantic & Status Colors | Colors | `preview/colors-semantic.html` | 700×200 |
| Typography Scale | Type | `preview/type-scale.html` | 700×320 |
| Spacing, Radius & Shadows | Spacing | `preview/spacing-tokens.html` | 700×240 |
| Buttons | Components | `preview/components-buttons.html` | 700×200 |
| Form Inputs | Components | `preview/components-inputs.html` | 700×240 |
| Cards | Components | `preview/components-cards.html` | 700×220 |
| Badges & Role Tags | Components | `preview/components-badges.html` | 700×200 |
| Navigation Header | Components | `preview/components-nav.html` | 700×90 |
| Document Status Indicators | Components | `preview/components-status.html` | 700×240 |
| Brand & Logos | Brand | `preview/brand-logos.html` | 700×200 |
| ScandexPRO UI Kit | Components | `ui_kits/scandexpro/index.html` | 1200×700 |

---

## 6. UI Kit — ScandexPRO™

### Componentes Compartilhados (`Components.jsx`)

| Componente | Props | Descrição |
|---|---|---|
| `SDXButton` | `variant`, `size`, `onClick`, `disabled` | Botão com 6 variantes: primary, destructive, outline, ghost, secondary, accent |
| `SDXInput` | `label`, `placeholder`, `value`, `onChange`, `type`, `error` | Input com label e estado de erro |
| `SDXCard` | `children`, `style` | Card com borda, sombra e radius padrão |
| `SDXRoleBadge` | `role` | Badge colorido por função (SuperAdmin/Admin/Gerente/User/Colaborador) |
| `SDXBadge` | `children`, `variant` | Badge genérico (secondary/outline/success/destructive) |
| `SDXStatusDot` | `status`, `size` | Indicador circular de status de documento |
| `SDXAvatar` | `name`, `size`, `src` | Avatar com iniciais e fallback |
| `SDXToast` | `title`, `desc`, `variant`, `onClose` | Notificação de feedback (accent/destructive/default) |

### Telas do Protótipo

| Tela | Funcionalidade mockada |
|---|---|
| **Login** | Formulário com validação, imagem do hospital, logo HO, "powered by" |
| **Dashboard** | Busca por prontuário (9999999, 100111), lista de cirurgias com status dots, visualizador de documento |
| **Comunicação** | Lista de tarefas com prioridade e status |
| **Usuários** | Tabela de usuários com badges de função e ações |
| **Relatórios** | Cards de estatística e gráfico de barras mockado |
| **Admin** | Menu de áreas administrativas |

### Cores de Status de Documento (usadas nos dots)

| Status | Cor | Hex |
|---|---|---|
| `available` | Emerald | `#34d399` / borda `#059669` |
| `absent` | Vermelho | `#f87171` / borda `#dc2626` |
| `missing_info` | Laranja | `#fb923c` / borda `#ea580c` |
| `processing` | Azul | `#60a5fa` / borda `#2563eb` |
| `altered` | Amarelo | `#facc15` / borda `#ca8a04` |

---

## 7. Atualização: Navigation Header (revisada)

**Data:** 20/04/2026  
**Motivo:** Feedback do usuário — "mais minimalista e claro, com ícones"

### Antes
- Itens de nav com label sempre visível, expandindo no hover
- Altura 56px com layout horizontal denso

### Depois
- Itens de nav com **ícone + label pequena** empilhados verticalmente
- Largura fixa de 52px por item — layout clean e uniforme
- Divisores sutis separando: brand / nav / user
- User chip compacto: avatar + nome + logout icon
- Notificação dot menor e mais discreta
- Arquivo: `preview/components-nav.html`

```
ScandexPRO™  |  [⊞] [💬•] [👤+] [📊] [⚙]  |  JC  João Costa  [→]
                Painel Msgs  Cad.  Rel.  Admin      Admin
```

---

## 8. Decisões de Design Documentadas

### Por que Inter como única fonte?
O `tailwind.config.ts` define `fontFamily.body` e `fontFamily.headline` ambos como `Inter`. Não há fonte display separada. A hierarquia é feita via peso (400/500/600/700) e tamanho.

### Por que #072AC8 como primary?
Valor extraído diretamente do `globals.css` (`--primary: 230 93% 41%`) e confirmado no código do botão de login: `bg-[#072AC8]`. É o azul institucional do produto.

### Iconografia: Lucide React
Confirmado via imports no `header.tsx` e `dashboard/page.tsx`. Todos os ícones são do pacote `lucide-react` — estilo outline, stroke uniforme. Nenhum ícone customizado SVG ou emoji é usado na UI principal.

### Sem gradientes de fundo
O header é azul sólido (`#072AC8`). Gradientes aparecem apenas em elementos pontuais (avatar placeholder, gradient text do nome do hospital em dourado no dropdown).

### Border radius padrão: 0.5rem (8px)
Definido em `--radius: 0.5rem` no `:root`. Cards, botões e modais usam este valor. Avatares usam `rounded-lg` (8px). Badges usam `rounded-sm` (4px).

---

## 9. Pendências e Próximos Passos

| Item | Status | Ação Necessária |
|---|---|---|
| `logo-01.png` (ícone "powered by") | ❌ Não copiado | Re-anexar o arquivo via Import |
| Fontes locais (.ttf) | ⚠️ Substituídas por CDN | Fornecer arquivos `.ttf` se disponíveis |
| Tela Electron (desktop app) | 📋 Documentada mas não mockada | Criar variante com titlebar customizado se necessário |
| Portal do paciente | ❓ Desconhecido | Confirmar se existe outra surface |
| Slides / apresentações | ❓ Não solicitado | Criar se necessário |
| Integração com código de produção | 📋 Manual | Ver seção "Como usar" abaixo |

---

## 10. Como Aplicar no Projeto ScandexGed

### Cores (já existem — confirmar equivalência)
As variáveis em `colors_and_type.css` espelham exatamente o `globals.css` do projeto. Nenhuma mudança necessária — o arquivo serve como documentação.

### Novos tokens que podem ser adicionados ao projeto
```css
/* Adicionar em :root no globals.css */
--sdx-blue:              #072AC8;
--sdx-teal:              #4DB6AC;
--sdx-status-available:  #34d399;
--sdx-status-missing:    #fb923c;
--sdx-status-processing: #60a5fa;
--sdx-status-altered:    #facc15;
--sdx-status-absent:     #f87171;
```

### Tipografia
Já usa Inter via `next/font/google`. Nenhuma mudança necessária.

### Componentes do UI Kit → Produção
Os componentes em `Components.jsx` são **protótipos visuais**. Para produção, use os componentes ShadCN existentes em `src/components/ui/` com as classes Tailwind equivalentes documentadas aqui.

---

---

## 11. Atualizações — Sessão 20/04/2026 (tarde)

### 11.1 Header — Botão de Tema (3 estados)

**Substituiu:** seletor dropdown com 6 temas coloridos  
**Por:** botão cíclico de 3 estados com ícone SVG

| Estado | ID | Cor primária | Ícone |
|---|---|---|---|
| Favorito | `favorito` | `#072AC8` (azul padrão) | ★ estrela preenchida |
| Claro | `claro` | `#0284c7` (azul céu) | ☀ sol com raios |
| Escuro | `escuro` | `#1e293b` (slate escuro) | ☽ lua crescente |

- Clique no botão cicla para o próximo estado com transição de cor no header
- Botão: 26×26px, `border-radius: 6px`, fundo `rgba(255,255,255,.15)`, borda `rgba(255,255,255,.3)`
- Código: `THEME_MODES` array com `{ id, label, primary, icon(color) }`

### 11.2 Header — Seletor de Aplicação (dropdown)

**Movido de:** inline no hero do dashboard  
**Para:** header, entre o divider e os itens de nav

**Design do dropdown:**
- Botão trigger: 34px altura, fundo `rgba(255,255,255,.15)`, borda `rgba(255,255,255,.25)`, ícone de briefcase + label + chevron
- Dropdown: `border-radius: 10px`, `box-shadow: 0 12px 30px rgba(0,0,0,.18)`, largura mínima 230px
- Cabeçalho: label uppercase "APLICAÇÕES DISPONÍVEIS" em 10px muted
- Itens: `border-left: 3px solid primary` no item selecionado, fundo `${primary}12`, ícone checkmark à direita
- Cada item tem: ícone 28×28px arredondado + label + descrição curta

**Aplicações disponíveis:**
```js
{ id: 'cirurgias_ho', label: 'Cirurgias — Hospital do Olho', desc: 'Prontuários e documentos cirúrgicos' }
{ id: 'juridico_ho',  label: 'Jurídico — HO',               desc: 'Processos e documentos jurídicos' }
```

### 11.3 Telas não-principais — WIP Placeholder

**Substituídas por WIP:** Comunicação, Usuários, Relatórios, Área Admin

**Design do WIP:**
- Centralizado na tela, fundo `#f8f9fb`
- Ícone de ferramenta 56×56px, borda dashed `rgba(7,42,200,.2)`, fundo `rgba(7,42,200,.06)`
- Label do nome da tela em 16px/600
- Subtitle: "Em desenvolvimento · Work in Progress"  
- Badge amarelo pill: "WIP" uppercase

### 11.4 Dashboard — Título dinâmico

O título da tela de pesquisa agora exibe o nome da aplicação selecionada no header dropdown (ex: "Cirurgias — Hospital do Olho") em vez do texto fixo "Pesquisa de Paciente".

---

## 12. Status Final do UI Kit

| Tela | Status | Observação |
|---|---|---|
| Login | ✅ Completo | Split-panel, logo HO, "powered by" |
| Dashboard / Pesquisa | ✅ Completo | Hero search, 2 inputs, status dots, doc viewer |
| Comunicação | 🔧 WIP | Placeholder — em desenvolvimento |
| Usuários | 🔧 WIP | Placeholder — em desenvolvimento |
| Relatórios | 🔧 WIP | Placeholder — em desenvolvimento |
| Admin | 🔧 WIP | Placeholder — em desenvolvimento |

*Relatório atualizado — ScandexPlus Design System v1.1 · 20/04/2026*

