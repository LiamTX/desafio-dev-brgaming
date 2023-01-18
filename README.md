
## Config

- Voce vai precisar do node:18 instalado
- Voce vai precisar da cli do nestjs instalado [https://docs.nestjs.com/support]
- Voce vai precisar de um banco de dados postgres criado
- Crie um arquivo .env na raiz do projeto com as seguintes variaveis:
  - DATABASE_HOST=host do banco de dados
  - DATABASE_PORT=porta do banco de dados
  - DATABASE_USERNAME=usuário do banco de dados
  - DATABASE_PASSWORD=senha do banco de dados
  - DATABASE_DATABASE=nome do banco de dados

## Installation

```bash
$ yarn install
```

ou

```bash
$ npm install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

ou

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
