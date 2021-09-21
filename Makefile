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
reup:
	make rebuild
	make up