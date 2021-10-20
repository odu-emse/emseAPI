FROM node:14.17.6 as base

WORKDIR /usr/src/app


#copy folder director to docker container
COPY package.json ./


#For schema back end
COPY prisma/. /usr/src/app/prisma/.
COPY ts*.json ./
COPY .env ./

#For schema front end
#COPY src/gql/generate-typings.ts usr/src/app/src/gql/.
#For Generate typings
#COPY scr/gql/generate-types.ts /usr/src/app/src/gql/.
#install yarn globbalyy

RUN yarn install
COPY gql/. /usr/src/app/gql/.
RUN npx tsc --skipLibCheck /usr/src/app/gql/generate-typings.ts
#RUN node /usr/src/app/gql/generate-typings.js

#Generates new types based on graphql changes
#COPY ./src/*/schema.graphql .
#COPY scr/gql/generate-types.ts /usr/src/app/src/gql/.
#RUN npm install -g ts-node typescript '@types/node'
#RUN tsc /usr/src/generate-types.ts
#RUN node /usr/src/generate-types.js
#install all dependency from package.json
#install nestjs client globally to run nestjs on the termnal
RUN yarn global add @nestjs/cli
#install
RUN npx prisma generate
#COPY . .
FROM base as production

#CMD ["npx", "prisma generate"]
#EXPOSE 4000
#RUN npm run dev
#Ran in docker-compose file
#CMD ["npm", "run", "dev"]