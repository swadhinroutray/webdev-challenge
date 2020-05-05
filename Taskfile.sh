#!/bin/bash
default(){
    startnode
}

start() {
    docker-compose -f docker/docker-compose.yml \
    --project-name webchallenge up \
    --build --abort-on-container-exit
}

dbshell() {
     docker exec -it webchallenge_db_1 \
     mongo --authenticationDatabase webchallenge
}

rediscli() {
    docker exec -it webchallenge_redis_1 redis-cli
}

startnode() {
    cd api && npm run-script dev 
    
}
"${@:-default}"