# Fotos do estoque — 25/11/2026

## Evidências

Servidor atual com carga 0,23, 2,6 GiB de memória disponível, 13 GiB livres na raiz e 40 GiB no fileserver. Aplicação respondeu localmente em 17 ms. Sem erros recentes no log da aplicação; pasta de fotos gravável pelo usuário do container.

A foto do produto TONER EPSON M5899 PRETO (item 286) chegou às 13h34min03s e está vinculada ao cadastro. JPEG válido de 1600×1200, 178865 bytes. Teste autenticado retornou HTTP 200 no original (252 ms) e na miniatura de 96 px (1687 bytes, 353 ms). A autenticação do teste ficou apenas em memória e não foi persistida nem exibida.

O acesso público teve oscilação nos testes: ocorreram timeouts e uma chamada posterior retornou o erro de autenticação esperado, com corpo completo; o login público respondeu em 131 ms. Isso não prova a origem da interrupção do telefone. O arquivo recebido comprova que o cadastro não perdeu a foto.

## Defeitos encontrados no cliente

- Transferências nativas do Expo não usavam o limite de tempo nem a renovação silenciosa do cliente JSON.
- O download gravava diretamente no cache definitivo. Uma resposta de erro podia deixar um arquivo existente e ser reutilizada nas tentativas seguintes.
- Não havia tratamento de erro do decodificador da imagem local.
- O erro de envio ficava na tela de edição, escondida pela confirmação da foto.

## Correção

Upload cancelável com limite de 60 s; download com limite de 20 s. Respostas 401 tentam renovar a sessão uma única vez, com limite de 15 s para essa renovação. Downloads usam arquivo temporário, validam HTTP 200, tipo de imagem e tamanho não nulo antes de promover ao cache. Cache v2 isolado por URL e sessão, ignorando entradas antigas. Erros de decodificação removem o cache e mostram a opção de tentar novamente. Erro de envio exibido na própria confirmação.

Não houve alteração no backend, nos dados dos produtos ou na configuração de rede. Alterações de inventário já existentes no repositório foram excluídas da cópia de publicação.

## Validação e publicação

`tsc --noEmit` e `node scripts/test-inventory-photo-transfer.cjs`: aprovados. Testes cobrem cancelamento por timeout, sucesso, renovação após 401, sessão inválida, rejeição de JSON no cache, download válido e limpeza temporária. Publicação OTA Android production concluída, runtime 1.5.0. Grupo `872cdf54-07b7-458e-adeb-4ecb0b00eda1`, atualização Android `01a213a3-bf4f-723e-94a6-de2783379444`, commit de código `a456cb3`. Dashboard: https://expo.dev/accounts/sdx-joao/projects/sdx-mobile/updates/872cdf54-07b7-458e-adeb-4ecb0b00eda1. A atualização alcança os binários compatíveis com runtime 1.5.0; não exige alteração nativa. Não houve teste físico automatizado no telefone do operador.


Servidor novo: cadastro e ambos os JPEGs do item 286 conferidos; réplica oficial IO=Yes, SQL=Yes, atraso zero.
