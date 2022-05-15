FROM node:18 as base

WORKDIR /usr/src/app


#copy folder director to docker container
COPY package.json ./


#For schema back end
COPY prisma/. /usr/src/app/prisma/.
COPY ts*.json ./
COPY .env ./



RUN yarn
COPY gql/. /usr/src/app/gql/.
RUN npx tsc --skipLibCheck /usr/src/app/gql/generate-typings.ts

RUN yarn global add @nestjs/cli

RUN npx prisma generate

FROM base as production

