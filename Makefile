up:
	docker-compose up
down:
	docker-compose down
build:
	docker-compose build
remvimg:
	make down
	docker rmi emseapi-api
rmvcont:
	make down
	docker rm emseapi-api
rmvol:
	make down
	docker volume rm emseapi_api_data
rncn:
	docker ps -a
img:
	docker image ls
encn:
	docker exec -it back_end_api bash
nocache:
	docker-compose build --no-cache

quick-reup:
	make build
	make up

reup:
	make remvimg
	make rmvol
	make build
	make up

reup-clean:
	make remvimg
	make rmvol
	make nocache
	make up

regen:
	docker exec -i back_end_api npx tsc --skipLibCheck /usr/src/app/gql/generate-typings.ts
	docker exec -i back_end_api node /usr/src/app/gql/generate-typings.js
	docker exec -i back_end_api npx prisma generate
prune:
	docker system prune --all

dev-clean:
	make remvimg
	make rmvol
	make nocache
	make dev

dev:
	yarn concurrently -n "server,types" -c "bgBlue.bold,bgMagenta.bold" "docker-compose up api" "npx onchange \"./src/*/schema.graphql\" -v -- yarn generate"