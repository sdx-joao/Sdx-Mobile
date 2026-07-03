# Portar Delegação/Histórico de OS → Claude Design (projetos Scandex)

Handoff para replicar, **nos projetos do design system Scandex dentro do Claude
Design**, as adições de UX feitas no repo (`ScandexPlus mobile design/`). Objetivo:
consistência entre o export do repo e os projetos vivos no Claude Design.

Como usar: abra cada projeto Scandex no Claude Design e **cole o prompt** da
seção 3. Se o projeto for a camada **web** (ShadCN/Tailwind), peça a variante web
(mesma cor, componentes equivalentes). As seções 1–2 são a fonte de verdade dos
valores, caso prefira aplicar manualmente.

---

## 1. Tokens de cor (adicionar)

Índigo da **delegação** — conceito "OS encaminhada", distinto de status/prioridade:

| Token (mobile) | Valor | Uso |
|---|---|---|
| `--sdx-m-delegation` | `#6D28D9` | Cor principal (texto/ícone/borda-esquerda/CTA) |
| `--sdx-m-delegation-strong` | `#5B21B6` | Hover/pressed |
| `--sdx-m-delegation-soft` | `#F1ECFB` | Fundo tingido do card/banner (~5%) |
| `--sdx-m-delegation-border` | `#C9B6F0` | Borda do card/banner (~33%) |

Equivalente **web** (se o projeto usar a escala `--sdx-*`): `--sdx-delegation: #6D28D9`
(+ soft/border iguais). Dark mode: clarear o principal para ~`#A78BFA`.

## 2. Componente `DelegationBanner` + estados

Props: `variant` (`card` | `detail`), `toName`, `byName`, `message`, `toMe`.

- **card (delegada a você)** — dentro do card de OS: borda-esquerda índigo 3px +
  fundo `#F1ECFB` + badge "Delegada a você" (ícone paper-plane) + linha
  "Encaminhada por {byName}".
- **card (delegada a outro)** — só a linha "Delegada a {toName}" em índigo.
- **detail** — bloco: título "Delegação" (ícone), "Encaminhada para {toName} por
  {byName}", e o `message` entre aspas num cartão branco (borda índigo).

Padrões correlatos:
- **Botão Histórico** — secundário no header, ao lado do CTA "Nova OS": fundo
  `rgba(255,255,255,.16)`, borda `rgba(255,255,255,.35)`, ícone relógio, texto branco.
- **Sheet de delegar** — lista de usuários (radio, ativo índigo) + textarea de
  mensagem + CTA "Delegar" índigo (altura 50, raio 14).
- **Regra de permissão** — ações de delegar **somem** (não desabilitam) sem permissão.

Código de referência (copiar deste export): `components/DelegationBanner/DelegationBanner.jsx`
e o preview `preview/os-delegation.html`.

---

## 3. Prompt pronto para colar no Claude Design

> Adicione ao design system Scandex o padrão de **Delegação de Ordem de Serviço**,
> mantendo a identidade atual (azul `#072AC8`, Inter, cards raio 16, header azul
> arredondado).
>
> **Tokens (cor nova — índigo da delegação, distinta de status/prioridade):**
> `--sdx-m-delegation: #6D28D9`, `--sdx-m-delegation-strong: #5B21B6`,
> `--sdx-m-delegation-soft: #F1ECFB`, `--sdx-m-delegation-border: #C9B6F0`.
> No dark mode, clareie o principal para ~`#A78BFA`.
>
> **Componente `DelegationBanner`** com `variant` = `card` | `detail`:
> - `card` (delegada a você): tira compacta com ícone paper-plane + "Delegada a
>   você" / "Encaminhada por {nome}". Quando aplicada no card de OS, ele ganha
>   borda-esquerda índigo 3px e fundo `#F1ECFB`.
> - `detail`: bloco com título "Delegação", "Encaminhada para X por Y" e a
>   mensagem entre aspas num cartão branco de borda índigo.
>
> **Telas/estados adicionais:**
> - Header de "Ordens de Serviço" com botão secundário **Histórico** (branco
>   translúcido, borda 35%, ícone relógio) ao lado do CTA "Nova OS".
> - **Sheet de delegar**: lista de usuários com radio (ativo índigo) + campo de
>   mensagem opcional + botão "Delegar" índigo.
> - Botão **Delegar/Redelegar** no detalhe da OS (contorno índigo).
>
> Ações de delegar/quadro-geral são **condicionadas a permissão** e devem
> **sumir** quando o usuário não tem acesso (não ficar desabilitadas).
>
> Gere: os tokens, o componente `DelegationBanner` (com card de preview dos dois
> variants) e um preview de tela mostrando o header com Histórico e o sheet de
> delegar. Registre no manifest do projeto como fiz nos demais componentes.

---

## 4. Consistência entre projetos

Se houver projetos separados (web e mobile) no Claude Design, aplique o **mesmo
token de cor** (`#6D28D9`) e o **mesmo nome** de componente (`DelegationBanner`)
em ambos, variando só a implementação (ShadCN/Tailwind na web, touch-first no
mobile). Assim o conceito "delegação = índigo" fica idêntico em todo o Scandex.
