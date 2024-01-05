## Sobre
ste projeto tem como objetivo criar uma plataforma adaptável para RPG, incorporando um sistema personalizado de ficha de personagem, utilizando React.


<img align="right" height="590em" src="https://raw.githubusercontent.com/gist/c-Bruno/664c083d75e832684ac82441e2fe72d6/raw/0a54f1a1fefba1b898084b4439e23da06b95b91a/characterOverview.svg"/>
<h1 align="left"><img src="https://raw.githubusercontent.com/kaueMarques/kaueMarques/master/hi.gif" height="30px"> Objetivo do Projeto</h1>

A ideia central do projeto é desenvolver um sistema de ficha de RPG. O sistema consiste em um dashboard para o mestre, que exibe uma lista de todos os personagens cadastrados pelos jogadores. Nessa lista, o mestre pode visualizar rapidamente a vida, sanidade e a imagem de cada jogador, além de gerenciar esses personagens por meio de operações CRUD se necessário.


<br/><br/>

## Instalação
- Clone o projeto na sua maquina, ou baixe o zip.
- Executar `npm install` para instalar as dependencias
- Criar um banco de dados local e configurar a varivel DB_PROVIDER_URL apontando para este banco
- Executar `npx prisma migrate reset` para fazer as migrações no banco
- Executar `npm start` para iniciar

### Tecnologias sendo utilizadas
- React para a construção da interface.
- Next.JS com SSR (Server-Side Rendering) e API REST.
- Prisma como ORM.
- Banco de dados relacional MySQL.
- Socket.io para comunicação em tempo real entre o servidor e o cliente.
