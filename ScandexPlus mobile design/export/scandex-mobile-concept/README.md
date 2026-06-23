# ScandexPRO Mobile — Conceito Visual

Pacote de referência para replicar o conceito da aplicação mobile (Ordens de Serviço + Inventário)
na aplicação real. Baseado nos repositórios `sdx-joao/ScandexGed` e `sdx-joao/Sdx-Mobile`.

## Como abrir
Abra **`ScandexPRO Mobile.html`** num navegador. Tudo é HTML + React (via Babel no navegador) —
nenhuma instalação necessária. A **`Loading ScandexPRO.html`** é a tela de splash standalone
(HTML/CSS puro, sem dependências).

## Estrutura
```
ScandexPRO Mobile.html      App completo (login → home → ordens → inventário → perfil)
Loading ScandexPRO.html     Template de splash/loading reutilizável
colors_and_type.css         Tokens de cor e tipografia (fonte de verdade do visual)
uploads/                    Logos da marca (badge circular + wordmark scandex+)
mobile/
  ui.jsx                    Tema (T), tokens de status, ícones, primitivos (Badge, Chip, Search, PhoneFrame)
  brand.jsx                 Logos reutilizáveis + SplashScreen
  data.jsx                  Mock data fiel ao schema real (WorkOrder, InventoryItem, Movement, Restock)
  workorders.jsx            Módulo Ordens de Serviço (lista, detalhe, nova OS)
  inventory.jsx             Módulo Inventário (lista somente-leitura, scan QR, detalhe)
  app.jsx                   Shell: splash, login, home, perfil, navegação por abas, Tweaks
  tweaks-panel.jsx          Painel de ajustes (cor de destaque, densidade, estilo de card)
```

## Sistema visual

### Cores (de `colors_and_type.css` / `theme/colors.ts`)
| Token            | Valor      | Uso |
|------------------|------------|-----|
| Primary          | `#0728CA`  | Azul royal da marca — headers, CTAs, destaque |
| Primary Dark     | `#051E9B`  | Gradientes de header, splash |
| Teal             | `#0F9488`  | Acento secundário |
| Background        | `#F5F7FB`  | Fundo das telas |
| Surface           | `#FFFFFF`  | Cards |
| Text / Muted      | `#0F172A` / `#64748B` | Texto principal / secundário |

**Status de OS:** Aberta (azul), Em andamento (âmbar), Aguardando (laranja), Entregue/Concluída (verde), Cancelada (vermelho).
**Prioridade:** Baixa, Normal, Alta, Urgente (com chama 🔥 no urgente).
**Estoque:** Normal (verde), Atenção (âmbar), Baixo (vermelho); Equipamento: Funcionando / Manutenção / Não funcionando / Baixado.

### Tipografia
**Inter** (400–800). Escala em `colors_and_type.css` (`.sdx-h1`…`.sdx-muted`).

### Padrões de layout
- **Header azul** com gradiente em todas as telas de módulo e detalhe.
- **Cards** com borda fina, raio 14px, sombra opcional (tweak `cardStyle`).
- **Badges de status** em pílula com dot (variação `soft` / `solid`).
- **Chips** de filtro roláveis horizontalmente com contagem.
- **Navegação por abas** inferior (Início · Ordens · Inventário · Perfil).

### Identidade da marca (`brand.jsx` + `uploads/`)
- `secundaria.png` — badge circular (transparente). Usar dentro de um *tile* branco sobre fundos escuros/azuis.
- `LOGO PRINCIPAL (2).png` — wordmark **scandex+** (fundo branco). Usar **apenas sobre superfícies claras**.
- Para usar o wordmark sobre o azul, gere uma versão branca/vetorial (não incluída).

## Conceitos-chave por módulo

**Ordens de Serviço** (editável): lista filtrável por status + busca; detalhe com atualização de status,
dados do solicitante, atendimento, materiais e histórico (timeline); fluxo "Nova OS".

**Inventário** (somente consulta): lista filtrável por tipo + busca; **leitura de QR Code via câmera**
que abre direto o item; detalhe com patrimônio, especificações técnicas, nível de estoque e histórico de
movimentações. Sem ações de edição.

**Splash/Loading:** boot animado com a logo — ver `Loading ScandexPRO.html` (template) e `SplashScreen` em `brand.jsx`.

---
Protótipo de referência visual. Os dados são exemplos; conecte aos endpoints reais
(`/api/mobile/work-orders`, inventário) ao implementar.
