up:
	yarn install
	docker-compose up
up-d:
	yarn install
	docker-compose up -d
up-apollo:
	yarn install
	export "USE_APOLLO=TRUE"
	docker-compose up -d
down:
	docker-compose down
build:
	yarn install
	docker-compose build
remvimg:
	make down
	docker rmi emseapi-api
rmvcont:
	make down
	docker rm emseapi-api
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
	make build
	make up

reup-clean:
	make remvimg
	make nocache
	make up

regen:
	docker exec -i back_end_api npx tsc --skipLibCheck /usr/src/app/gql/generate-typings.ts
	docker exec -i back_end_api node /usr/src/app/gql/generate-typings.js
	docker exec -i back_end_api npx prisma generate
prune:
	docker system prune --all