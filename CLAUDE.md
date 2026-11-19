# Jornada — estudo bíblico cronológico (projeto pessoal do Rafael)

PWA estático (HTML/CSS/JS puro, sem build) publicado no GitHub Pages e instalado no celular.
Evoluído pelo Claude a partir de qualquer aparelho: clonar, editar, testar, publicar.

## Método
Uma sessão por dia: Contexto → Leitura (NAA) → O que entendi (+ nota da Bíblia de Estudo) → Aplicação.
A aplicação volta em 3 dias ("como foi?"). Revisão em quiz com repetição espaçada (Leitner).
Meta semanal: 5 de 7 dias (sem streak que zera).

## Ordem
Cronológica por livro, conforme a imagem do Rafael (@abibliadoprincipioaofim): 66 livros em 10 eras
(`data/plano.js`). Só a era 1 (Gênesis + Jó) tem conteúdo (`data/era-principio.js`).

## Regras de conteúdo — inegociáveis
- "Texto fiel, nada de achismos": toda afirmação sai do texto bíblico, com referência.
- O que é tradição/estudiosos (não o texto) é marcado como tal. Datas não informadas não são inventadas.
- NÃO copiar texto da NAA nem da Bíblia de Estudo NAA (direitos da SBB; repositório é público).
  Conteúdo é paráfrase própria no formato de Bíblia de estudo (introdução, cenário, notas).
- Texto bíblico abre no site oficial: `https://www.bibliaonline.com.br/naa/{slug}/{cap}`.
  Conferir o slug no site antes de preencher (Jó = `jó`, João = `jo`).

## Estrutura
- `js/store.js` — única camada de dados (localStorage + backup JSON). Para crescer com login, trocar só ela.
- `js/jogo.js` — regras de progresso, XP, níveis, conquistas, quiz.
- `js/app.js` — telas (roteamento por hash).
- `sw.js` — offline; subir `CACHE` ao adicionar arquivos.

## Nova era
Criar `data/era-<id>.js` com INTRODUCOES, SESSOES, PERSONAGENS, MARCOS; importar em `js/jogo.js`;
marcar `conteudo: true` na era em `plano.js`; adicionar slugs dos livros; incluir no `sw.js`.
