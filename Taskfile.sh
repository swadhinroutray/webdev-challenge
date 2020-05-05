#!/bin/bash
default(){
    start
}

start() {
    docker-compose -f docker/docker-compose.yml \
    --project-name webchallenge up \
    --build --abort-on-container-exit
}

dbshell() {
    source ./.env && docker exec -it webchallenge_db_1 \
    mongo  -u $DB_USER \
    -p $DB_PASSWORD \
    --authenticationDatabase $DB_NAME
}

rediscli() {
    docker exec -it webchallenge_redis_1 redis-cli
}

"${@:-default}"