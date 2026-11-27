# OS 1223 — finalização salva e divergência nas listas — 27/11/2026

O código `OS-2026-001223` corresponde ao ID interno 1225; não é o registro de ID 1223, que tem outro código. A OS estava completed, com assinatura persistida em 27/11/2026 às 16:00:24 (timestamp registrado), evento 4535 de conclusão pelo Servus e evento 4536 de envio de WhatsApp com PDF assinado. Nada foi reaberto nem finalizado novamente; assinatura e efeitos de estoque preservados.

## Causa confirmada e correção

A consulta do histórico incluía ativas e encerradas e priorizava status delivered antes de completed, aplicando LIMIT 80. Havia 427 entregues e 769 concluídas. A OS 1223 não entrava nessa primeira página e o app só depois filtrava as finalizadas. Na consulta corrigida, ela aparece no histórico, com uma assinatura, e não aparece nas pendentes.

A API mobile agora filtra os status antes do LIMIT: padrão somente abertas/em andamento/aguardando; histórico com `view=history`, `includeHidden=1` (compatível com app antigo) ou filtro explícito de status encerrado. Histórico ordenado pela data de finalização, com até 200 registros, respeitando permissões, unidade e pesquisa. As regras de finalização permanecem bloqueadas para OS já fechada; resposta 409 inclui código WORK_ORDER_CLOSED e status.

O Servus será atualizado para pedir explicitamente as listas corretas, pesquisar histórico no servidor, não exibir concluídas na lista de pendentes, consultar o estado persistido ao entrar na assinatura ou após uma falha de finalização, e ignorar respostas antigas que chegam depois de uma atualização mais recente. O tempo limite do cliente passa a cobrir o corpo completo da resposta JSON, além dos cabeçalhos.

## Validação

Teste SQL de leitura no banco real confirmou OS 1223 no histórico corrigido, zero correspondências nas pendentes e assinatura preservada. `node scripts/test-mobile-work-order-list.cjs` aprovado. Verificação de tipos do backend e do app aprovada antes dos últimos ajustes de reconciliação, que serão revalidados. Nenhuma ordem fictícia foi criada.

Publicação backend, atualização OTA e verificação da reserva: em andamento.
