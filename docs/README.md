# Documentacao do SDX Mobile

Este diretorio guarda a documentacao operacional do app. Materiais visuais e
prototipos ficam em `../design/`.

## Leitura rapida

- `IMPLEMENTATION_PLAN.md` - plano base de evolucao do app mobile.
- `../design/prontuarios-mobile-brief.md` - brief do modulo de Prontuarios.
- `../design/scandexplus-mobile-design-system/` - referencia visual exportada.

## Estado atual

- Android e prioridade de distribuicao.
- O build `test` usa `https://app-test.scandexplus.com.br`.
- `EXPO_PUBLIC_APP_ENV=test` habilita identificacao visual de teste,
  auto-cadastro controlado por aparelho e fotos temporarias de teste.
- O backend central continua sendo o ScandexGed; regras de negocio devem ficar
  nas APIs, nao duplicadas no app.
