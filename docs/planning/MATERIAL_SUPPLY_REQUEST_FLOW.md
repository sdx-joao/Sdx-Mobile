# Solicitação de materiais e suprimentos

## Comportamento do formulário

No fluxo vinculado a materiais/suprimentos, a abertura da O.S. exige:

1. seleção do setor solicitante no catálogo de setores;
2. seleção do nome no catálogo de solicitantes ou cadastro rápido no
   próprio seletor;
3. seleção do material/suprimento disponível;
4. digitação explícita da quantidade solicitada.

O formulário não aceita texto livre para setor nesse contexto. Para o
solicitante, um nome ainda não catalogado abre o cadastro rápido de nome e
telefone. **Cadastrar e usar** persiste a pessoa imediatamente, inclui o registro
retornado na lista e o seleciona na O.S. A quantidade começa vazia, com o
marcador `Qtd. *`, e somente valores numéricos maiores que zero entram no
payload.

## Dados gravados

- `department`: setor solicitante selecionado, sem substituição automática por
  `CEDOC/ESTOQUE`;
- `requestedByName`: nome selecionado ou cadastrado rapidamente no seletor;
- `stockMaterials`: itens com `itemId` e `qty > 0`.

Os demais tipos de O.S. preservam o comportamento atual, inclusive inclusão
rápida de opções quando permitida pelo fluxo.
