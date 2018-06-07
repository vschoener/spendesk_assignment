all: down build

build:
	docker-compose build

start:
	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down

clean:
	docker-compose run --rm app rm -rf nodes_modules logs flow-typed dist

install:
	docker-compose run --rm app npm install
	@make build-app

# Doesn't work in Docker, or we have to compile flow in Docker image with alpine
#install-dev: install
#	docker-compose run --rm app flow-typed install --ignoreDeps

build-app:
	docker-compose run --rm app npm run build

test:
	docker-compose run --rm app npm run test

showlogs:
	docker-compose logs -f

ps:
	docker-compose ps

watch: start
	docker-compose stop app
	docker-compose run --rm --service-ports app npm run watch

testApp:
	docker-compose run --rm app npm run test

installDep:
	npm install ${deps}
	docker-compose run --rm app npm install ${deps}
