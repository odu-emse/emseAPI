up:
	docker-compose up
down:
	docker-compose down
build:
	docker-compose build
rebuild:
	make down
	docker rmi emseapi_api
rncn:
	docker ps -a
img:
	docker image ls
encn:
	docker exec -it back_end_api bash
nocache:
	docker-compose build --no-cache
reup:
	make rebuild
	make nocache
	make build
	make up
regen:
	docker exec -i back_end_api npx tsc --skipLibCheck /usr/src/app/gql/generate-typings.ts
	docker exec -i back_end_api npx prisma generate