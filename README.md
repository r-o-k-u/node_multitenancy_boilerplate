## NODE JS BOILERPLATE CODE

This is an [Express.js](https://github.com/Automattic/kue) based Nodejs server boilerplate.

Current stack is JavaScript/Nodejs, Postgres, Socket.io.

## Features

- Nodejs
- Error handling
- Email
- SMS
- Postgres support with Sequelize
- docker

## RUN ON DEVELOPMENT

- Install [Docker](https://www.docker.com/get-started) (if not yet installed) and make sure it runs
- Run `docker build -f Dockerfile.dev -t qwerty-systems/node-api .`
- Run `docker run -it -p 2121:2121 qwerty-systems/node-api`

## RUN ON PRODUCTION

- Install [Docker](https://www.docker.com/get-started) (if not yet installed) and make sure it runs
- Run `docker build -f Dockerfile -t qwerty-systems/node-api .`
- Run `docker run -it -p 2121:2121 qwerty-systems/node-api`

## GENERATE MIGRATION

npx sequelize-cli migration:generate --name [migration name]

## GENERATE MODEL

npx sequelize-cli model:generate --name [model name] --attributes name:string

## GENERATE SEED

npx sequelize-cli seed:generate --name [SEED name]
# node_multitenancy_boilerplate
