# Brief de Design — Módulo de Prontuários (versão mobile)

> Documento para orientar o **Claude Design** (ou qualquer designer) a gerar as telas
> da **versão mobile** do módulo de Prontuários do ScandexPRO, mantendo consistência
> com o app **Sdx-Mobile** existente (Ordens de Serviço, Inventário).
>
> Plataforma alvo: **app React Native (Expo)**, telefone, retrato. Português (Brasil).

---

## 1. O que é o módulo

É a tela central do hospital: o operador **busca um paciente** (por prontuário ou CPF),
vê os **dados cadastrais** dele e o **histórico de cirurgias/exames**, e abre o
**documento digitalizado** (PDF ou imagem do prontuário) de cada cirurgia.

Fluxo mental do usuário: **Buscar → Ver paciente + cirurgias → Abrir documento.**

Hoje na web isso é uma página única com 3 "modos de visualização" (`search`,
`details`, `document`). No mobile vamos quebrar em **telas navegáveis** (stack),
mais natural pra toque.

---

## 2. Identidade visual (tokens exatos — usar estes)

```
Primária (azul Scandex)   #0728CA
Primária escura           #051E9B
Texto sobre primária      #FFFFFF
Teal (apoio)              #0F9488
Fundo da tela             #F5F7FB
Superfície (card)         #FFFFFF
Superfície suave          #F1F5FB
Texto                     #0F172A
Texto suave               #334155
Muted (labels)            #64748B
Faint                     #94A3B8
Borda                     #E2E8F2
Borda forte               #D8E0EF
Perigo                    #DC2626  (soft #FEE2E2)
```

- **Cabeçalho** das telas: faixa **azul (#0728CA → #051E9B em gradiente)** com título branco
  (é o padrão `BlueHeader` do app). Cantos inferiores arredondados.
- **Cards**: superfície branca, borda `#E2E8F2`, raio ~16px, sombra suave.
- **Tipografia**: sem serifa, system default. Labels em `#64748B`, 10–12px, UPPERCASE,
  letter-spacing leve. Valores em `#0F172A`, 14–16px, peso 600–700.
- **Toque**: alvos mínimos de 44×44px. Espaçamento generoso entre linhas.
- ⚠️ **Modo teste**: o app tem uma variante "VERSÃO DE TESTE" onde o azul vira **cinza**
  (`#5A6373 / #8B93A4`) e aparece um badge. **Projete no azul**; a variante cinza é
  derivada automaticamente, não precisa desenhar separado.

---

## 3. Arquitetura de telas

| # | Tela | Origem na web |
|---|------|---------------|
| 1 | **Busca de paciente** | modo `search` |
| 2 | **Detalhes do paciente** (dados + histórico de cirurgias) | modo `details` |
| 3 | **Visualizador de documento** (PDF/imagem) | modo `document` |

Navegação: stack. Tela 1 → push Tela 2 → push Tela 3. Voltar com seta no header.

---

## 4. Tela 1 — Busca de paciente

**Objetivo:** achar o paciente rápido, com teclado.

Elementos:
- Header azul "Prontuários" (ou "Buscar paciente").
- Card central com:
  - **Seletor de aplicação** (chips ou select): "Cirurgias — Hospital do Olho" /
    "Jurídico — HO". Default a primeira. (Visualmente é um segmented control.)
  - Campo **Prontuário** (numérico, mínimo 5 dígitos) — ícone de busca.
  - Separador "ou".
  - Campo **CPF** (máscara `000.000.000-00`, valida 11 dígitos) — mostra ✓ verde quando válido.
  - Botão primário **Buscar** (azul, full-width, altura 52).
- Abaixo, opcional: "Buscas recentes" (lista de chips com prontuários recentes).
- Microcopy de ajuda: "Informe o prontuário (≥5 dígitos) ou um CPF válido".

Estados:
- **Carregando**: spinner no botão + skeleton.
- **Não encontrado**: toast vermelho "Paciente não encontrado" + foca no campo de novo.
- **Encontrado mas não cadastrado** (`isNew`): vai pra Tela 2 num estado especial (ver §5).

UX mobile: ao focar um campo, **o teclado não pode tapar o botão Buscar** (rolar/empurrar
a tela pra cima — padrão do app via `useKeyboardHeight`).

---

## 5. Tela 2 — Detalhes do paciente

Duas seções empilhadas e roláveis.

### 5.1 Cartão do paciente (topo, "fixo"/sticky)
- **Foto** (avatar quadrado arredondado 96–112px, borda azul suave). Fallback: ícone de pessoa.
- Abaixo da foto: **ID** (`barcodeBase`) em itálico amarelado, pequeno (ex.: `123-4567-8901`).
- Grid de campos (label em cima, valor embaixo):
  - **Nome Completo** (destaque, pode truncar)
  - Idade · Data de Nascimento · CPF
  - Prontuário · Cartão SUS · Tipo Sanguíneo
  - CEP · **Endereço** (largura cheia, quebra linha)
- No mobile: foto centralizada no topo, campos em **2 colunas** (ou lista de 1 coluna se
  ficar apertado). Use `—` para campos vazios.
- Ações (ícones/botões discretos no topo do card): **Editar detalhes** (lápis, só se tiver
  permissão) e **Voltar à busca** (seta — já é o back do header).

**Estado especial `isNew` (paciente não cadastrado):**
Em vez do grid, um bloco âmbar tracejado: "Paciente não encontrado — prontuário X não está
cadastrado" + botão **Cadastrar novo paciente**.

### 5.2 Histórico de cirurgias
- Título "Histórico de Cirurgias".
- **Abas** (segmented): **Todas (n)** · **Realizadas (n)** · **Canceladas (n)**.
- Lista de **cards de cirurgia**, cada um com:
  - **Data** (ou "Data Prog." se agendada) — `DD/MM/AAAA`.
  - **Procedimento** (nome, pode truncar) + **Especialidade** (linha menor, muted).
  - Se cancelada: **motivo do cancelamento** (linha muted, 1 linha).
  - **Bolinha de status colorida** (ver §6) — elemento visual crítico.
  - Botão **Ver Documento** (abre Tela 3) — desabilitado/opaco quando não há documento.
    Mostra um selo com 📎 + número quando há anexos extras.
  - (Com permissão) ícones de **editar** e **excluir**.
- **Vazio**: ícone de documento + "Nenhuma cirurgia registrada para este paciente."
- **Pull-to-refresh** na lista.
- Atualização ao vivo: a lista pode mudar sozinha (novo documento chegou) — anime sutilmente.

---

## 6. Sistema de status do documento (as "bolinhas") — CRÍTICO

Cada cirurgia tem uma bolinha (ou triângulo ⚠️) que comunica o estado do documento.
**Replicar fielmente** — é a linguagem visual que a equipe já conhece:

| Cor | Significado | Quando |
|-----|-------------|--------|
| 🟢 **Verde** (`#10B981`) | Documento **disponível** | PDF/imagem vinculado e pronto pra ver |
| 🔵 **Azul** (`#3B82F6`) | **Em processamento** | Registro existe, arquivo ainda não chegou ao servidor |
| 🟡 **Amarelo** (`#EAB308`) | **Informação alterada** | Cadastro foi editado depois |
| 🟠 **Laranja** (`#F97316`) | **Faltando páginas/info** | Reportado como incompleto |
| 🔴 **Vermelho** (`#EF4444`) | **Ausente** | Nenhum documento encontrado |
| ⚠️ **Triângulo amarelo** | **Reportado com problema** | Substitui a bolinha quando `isReported` |

- Bolinha: círculo ~16–20px, borda 2px num tom mais escuro da mesma cor.
- Ao tocar/segurar, mostrar tooltip/legenda com o texto do significado.
- Incluir numa tela ou rodapé uma **legenda** das cores (opcional mas útil).

---

## 7. Tela 3 — Visualizador de documento

Onde o usuário lê o PDF/imagem digitalizada do prontuário.

- Header azul compacto com: **voltar**, nome do procedimento, e o paciente/prontuário.
- **Área do documento** (fundo escuro/neutro, fullscreen):
  - **PDF** → render com paginação.
  - **Imagem** (uma ou várias páginas) → visualizador de imagem.
- **Gestos mobile** (substituem o pan/zoom do mouse na web):
  - Pinça para **zoom**, arrastar para **mover** (pan).
  - Swipe horizontal para **trocar de página** (ou setas).
- **Barra de controles** (flutuante embaixo ou topo): página atual / total, **zoom +/−**,
  **resetar zoom**, **ir pra primeira página**.
- Ações (menu/ícones): **Baixar**, **Compartilhar** (nativo), **Imprimir** (se aplicável),
  **Reportar problema** (abre um formulário: descrição + prioridade + destinatário).
- **Anotações** (web permite marcar retângulos no doc): no mobile **v1 pode ser só
  visualização** das anotações existentes (retângulos sobre o doc + descrição ao tocar).
  Criar anotação fica pra v2.

Estados: carregando (spinner sobre fundo escuro), erro ("Não foi possível carregar o documento"),
sem documento (não deveria chegar aqui — botão fica desabilitado na Tela 2).

---

## 8. Modelo de dados (campos que as telas consomem)

**Paciente:**
`prontuario, name, age, birthDate, cpf, susNumber, bloodType, cep, address, photoUrl,
barcodeBase (ID), isNew`

**Cirurgia:**
`date, name (procedimento), specialty, status ('performed'|'cancelled'|'scheduled'),
cancellationReason, documentType ('pdf'|'image'), documentUrl (1 ou várias páginas),
documentStatus ('available'|'processing'|'missing_info'|'altered'|'absent'),
isReported, anexos[]`

> A API mobile correspondente seria algo como `GET /api/mobile/patients/:identifier`
> (espelhando o `/api/patients/[identifier]` da web). Não é preciso desenhar a API agora —
> só saber quais campos existem para compor as telas.

---

## 9. Padrões mobile a seguir (consistência com o app atual)

- **Header azul** arredondado embaixo, título branco (como Ordens de Serviço).
- **Cards** brancos, raio 16, borda `#E2E8F2`, sombra leve.
- **Botão primário**: azul `#0728CA`, texto branco, altura ~52, raio 14.
- **Chips/abas**: segmented control com o ativo em azul.
- **Teclado nunca tapa campo/botão** (empurrar a tela — comportamento padrão do app).
- **Pull-to-refresh** nas listas; **atualização automática** ao voltar pra tela.
- **Toasts** para feedback (verde sucesso, vermelho erro).
- Ícones no estilo do app (Lucide/Feather, traço fino).

---

## 10. Fora de escopo / simplificações para a v1

- **Criar** anotações no documento (só visualizar). 
- **Editar** paciente/cirurgia e **cadastrar** podem ser v2 — na v1 desenhe os botões mas
  o foco é **consulta** (buscar, ver, abrir documento).
- A aplicação "Jurídico — HO" pode ficar como um chip selecionável sem fluxo próprio na v1.

---

## 11. Entregáveis esperados do Claude Design

1. **Tela 1 — Busca** (estado normal + teclado aberto + erro "não encontrado").
2. **Tela 2 — Detalhes do paciente** (com histórico, abas, bolinhas de status) +
   variante `isNew` (cadastrar).
3. **Tela 3 — Visualizador** (PDF e imagem, com controles e gestos indicados).
4. **Legenda das cores de status** (componente reutilizável).
5. Versões **retrato** (prioridade). Paisagem só no visualizador, se sobrar tempo.

---

## 12. Prompt sugerido para colar no Claude Design

> "Crie as telas mobile (React Native, retrato, pt-BR) do módulo de **Prontuários** de um
> sistema hospitalar chamado ScandexPRO. Identidade: azul primário **#0728CA** (gradiente
> com #051E9B), fundo #F5F7FB, cards brancos raio 16 borda #E2E8F2, header azul arredondado
> com título branco. Três telas em stack: **(1) Busca** por prontuário (≥5 dígitos) ou CPF
> (com máscara e validação) e seletor de aplicação; **(2) Detalhes do paciente** com cartão
> de dados (foto, nome, idade, nascimento, CPF, prontuário, SUS, tipo sanguíneo, CEP,
> endereço, ID) e **histórico de cirurgias** em abas (Todas/Realizadas/Canceladas), onde
> cada cirurgia mostra data, procedimento, especialidade, uma **bolinha de status colorida**
> (verde=disponível, azul=processando, amarelo=alterado, laranja=incompleto,
> vermelho=ausente, ⚠️=reportado) e botão **Ver Documento**; **(3) Visualizador** de PDF/imagem
> com pinça-zoom, arrastar, troca de página por swipe, controles de zoom/página e ações
> baixar/compartilhar/reportar. Inclua estados de carregando, vazio e erro. Siga padrões
> mobile: alvos de toque ≥44px, teclado não tapa campos, pull-to-refresh."

---

*Gerado a partir da análise de `ScandexGed/src/app/(authenticated)/dashboard/page.tsx`
(modos search/details/document), `src/types/index.ts` (PatientData, Surgery, Annotation) e
dos tokens de `Sdx-Mobile/src/theme/theme.ts`.*
