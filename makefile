ifneq (,$(wildcard ./.env))
	include .env
	export
	ENV_FILE_PARAM = --env-file .env
endif

drop:
	npm run db:drop

create:
	npm run db:create
migrate:
	npm run db:migrate

undoMigrate:
	npm run db:migrate:undo

seed:
	npm run db:seed

seedProduction:
	npx sequelize db:seed --seed 20220318095226-user-group.js  &&  npx sequelize db:seed --seed 20220318095232-user-role.js