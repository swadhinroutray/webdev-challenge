FROM node:alpine

WORKDIR /usr/src/api
COPY  package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run-script", "dev" ]
