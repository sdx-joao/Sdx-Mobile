# OS 1223 — finalização salva e divergência nas listas — 27/11/2026

O código `OS-2026-001223` corresponde ao ID interno 1225; não é o registro de ID 1223, que tem outro código. A OS estava completed, com assinatura persistida em 27/11/2026 às 16:00:24 (timestamp registrado), evento 4535 de conclusão pelo Servus e evento 4536 de envio de WhatsApp com PDF assinado. Nada foi reaberto nem finalizado novamente; assinatura e efeitos de estoque preservados.

## Causa confirmada e correção

A consulta do histórico incluía ativas e encerradas e priorizava status delivered antes de completed, aplicando LIMIT 80. Havia 427 entregues e 769 concluídas. A OS 1223 não entrava nessa primeira página e o app só depois filtrava as finalizadas. Na consulta corrigida, ela aparece no histórico, com uma assinatura, e não aparece nas pendentes.

A API mobile agora filtra os status antes do LIMIT: padrão somente abertas/em andamento/aguardando; histórico com `view=history`, `includeHidden=1` (compatível com app antigo) ou filtro explícito de status encerrado. Histórico ordenado pela data de finalização, com até 200 registros, respeitando permissões, unidade e pesquisa. As regras de finalização permanecem bloqueadas para OS já fechada; resposta 409 inclui código WORK_ORDER_CLOSED e status.

O Servus foi atualizado para pedir explicitamente as listas corretas, pesquisar histórico no servidor, não exibir concluídas na lista de pendentes, consultar o estado persistido ao entrar na assinatura ou após uma falha de finalização, e ignorar respostas antigas que chegam depois de uma atualização mais recente. O tempo limite do cliente passa a cobrir o corpo completo da resposta JSON, além dos cabeçalhos.

## Validação

Teste SQL de leitura no banco real confirmou OS 1223 no histórico corrigido, zero correspondências nas pendentes e assinatura preservada. `node scripts/test-mobile-work-order-list.cjs` aprovado. Verificação de tipos final do backend e do app aprovada. Testes do app aprovados: corpo de resposta travado gera timeout, JSON e 204 válidos funcionam, respostas antigas não sobrescrevem a atualização mais recente e a desmontagem bloqueia alterações de estado. Testes prévios de fotos continuaram aprovados. Nenhuma ordem fictícia foi criada.

Backend: commit `d781048`, deploy concluído com sucesso em 368 s. Imagem `sha256:ff887f72ccb59b599c72ccd5ca0ba580738ed278905dd584a5e371701bd9b5d5`. Servus: commit `5331dae`, OTA Android production publicada para runtime 1.5.0, grupo `bb0389e6-0ec5-4ae5-953d-c5c914e841cc`, atualização `01a21e8a-1bfd-7857-b083-96b9cc028eaa`. Dashboard: https://expo.dev/accounts/sdx-joao/projects/sdx-mobile/updates/bb0389e6-0ec5-4ae5-953d-c5c914e841cc. Réplica oficial verificada: IO=Yes, SQL=Yes, atraso=0; OS 1223 completed e uma assinatura preservada. Arquivo da imagem da reserva: `~/scandex-app-d781048.tar.gz`, SHA-256 `a430d33d7371d662f7560c194f33def306e3e63174ddfda94a4c8e5a1d2ddcc4`. A aplicação anterior foi preservada como `sdx_app_migracao_pdf_pre_d781048`.


Verificação autenticada local em produção com sessão existente da Rochelle: lista padrão HTTP 200 com 4 pendentes, sem a OS 1223; `view=history&q=001223` HTTP 200 com exatamente a OS 1223, status completed; `includeHidden=1` HTTP 200 com 200 registros incluindo a OS 1223. Não foi enviado token pelo endereço público nem alterado o registro da OS.

Aplicação de validação do servidor novo atualizada com a mesma imagem de produção e login HTTP 200. Monitor da reserva continuou saudável, sem atraso. Não houve teste físico automatizado no telefone; a atualização OTA está disponível pelo aviso de nova versão do Servus.
