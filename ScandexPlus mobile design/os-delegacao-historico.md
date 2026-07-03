# OS — Delegação, Histórico & Visibilidade (brief de UX)

Mudanças de UX introduzidas no módulo de **Ordens de Serviço**, válidas nas duas
camadas do produto: **app Servus-SDX** (React Native) e **web/Electron** (ScandexPRO).
Este brief põe o designer a par do conceito, dos estados visuais e das regras.

Artefatos no design system:
- Token de cor: `--sdx-m-delegation` e variantes (índigo `#6D28D9`).
- Componente: **`DelegationBanner`** (`components/DelegationBanner/`).
- Previews: **"DelegationBanner"** (Components — Mobile) e **"OS — Delegação & Histórico"** (Components).

---

## 1. Delegação de OS

**O que é:** encaminhar uma OS a um usuário específico, com um **recado** e a
identidade de **quem delegou**. É um conceito **separado** do "técnico responsável"
— delegar não sobrescreve o responsável, é uma camada de "isto é com você agora".

**Cor:** índigo `#6D28D9` (`--sdx-m-delegation`), escolhida por não colidir com
as cores de **status** (azul/amarelo/verde/vermelho) nem de **prioridade**. Fundo
tingido `#F1ECFB`, borda `#C9B6F0`.

**Estados visuais:**

| Onde | Como aparece |
|---|---|
| Card na lista (delegado **a você**) | Borda-esquerda índigo (3px) + fundo `#F1ECFB` + badge **"Delegada a você"** (ícone de envio) + linha "Encaminhada por {nome}". `DelegationBanner variant="card" toMe`. |
| Card na lista (delegado a outro) | Linha discreta "Delegada a {nome}" em índigo, sem tingir o fundo. |
| Detalhe da OS | Bloco **Delegação** (`variant="detail"`): "Encaminhada para X por Y" + o recado entre aspas num cartão branco. |
| Ação | Botão **Delegar** (ou **Redelegar** se já delegada), contorno/ível índigo. Só para quem tem permissão. |
| Sheet de delegação | Lista de usuários com **radio** (item ativo índigo) + campo de **mensagem** opcional + CTA **Delegar** índigo. |

**Onde inicia:** tanto no **Electron/web** (modal da OS) quanto no **app** (detalhe).

---

## 2. Histórico de OS

Botão **secundário** no header, ao lado do CTA "Nova OS": fundo branco translúcido
(`rgba(255,255,255,.16)`), borda `rgba(255,255,255,.35)`, ícone de relógio. Abre a
lista de OS **finalizadas** (concluídas/entregues/canceladas) — somente consulta,
com busca e filtro por status. Complementa a lista corrente (que mostra só o fluxo
ativo).

---

## 3. Visibilidade por unidade/pessoa (permissões)

Duas permissões novas moldam o que cada um vê/pode:

- **`canViewAllWorkOrders`** — *default ligado*. Com ela, o usuário vê o **quadro
  geral** de todas as OS. Sem ela, vê **apenas** as OS ligadas a ele (delegadas,
  atribuídas, criadas ou solicitadas). Design: nada muda visualmente na lista, só
  o conjunto de dados; não há "estado vazio" especial além do padrão.
- **`canDelegateWorkOrders`** — controla quem enxerga a ação **Delegar**. Sem ela,
  o botão simplesmente **não aparece** (não desabilitado — oculto).

> Regra geral de UX: ações condicionadas a permissão **somem** em vez de ficarem
> desabilitadas, mantendo a tela limpa para o usuário final.

---

## 4. Notificações

Quem recebe uma delegação e quem delegou são avisados na **central de notificações**
(sino) — não há push de dispositivo nesta fase. Tipo novo `os_delegated`
(ícone de envio). Quem delegou também é notificado a cada movimentação/conclusão da OS.

---

## 5. PDF da OS (paridade entre plataformas)

Ao compartilhar/imprimir uma OS, as **3 formas ficam idênticas** — app, Electron e
impressão:
- Logos no cabeçalho (Hospital do Olho + Prefeitura) e submarca no rodapé.
- Assinatura **ancorada no rodapé** da folha A4 (não no meio).
- Nome do arquivo = código da OS (`OS-AAAA-NNNNNN.pdf`).
- No app, as logos são **embutidas** no bundle (o domínio público bloqueia
  `/images`), então o PDF não depende de rede.

---

*Fonte de verdade visual: token `--sdx-m-delegation` + componente `DelegationBanner`.
Implementação de referência no app: `src/components/cards.tsx`,
`src/screens/WorkOrderDelegateScreen.tsx`, `src/screens/WorkOrderDetailScreen.tsx`.*
