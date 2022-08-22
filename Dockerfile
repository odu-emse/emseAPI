FROM node:18 as base

WORKDIR /usr/src/app


#copy folder director to docker container
COPY package.json ./


#For schema back end
COPY prisma/* ./prisma/
COPY ts*.json ./
COPY .env ./

COPY src/* /usr/src/app/src/

RUN yarn
COPY gql/* ./gql/

FROM base as production

