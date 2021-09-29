FROM node:14.17.6 as base

WORKDIR /usr/src/app

#copy folder director to docker container
COPY package.json ./

#For schema
COPY prisma/. /usr/src/app/prisma/.
COPY ts*.json ./
COPY .env ./
COPY ./src /usr/src/app/src/
#install all dependency from package.json
RUN yarn

RUN yarn global add @nestjs/cli
RUN npx prisma generate
#COPY . .
FROM base as production

#CMD ["npx", "prisma generate"]
#EXPOSE 4000
#RUN npm run dev
#Ran in docker-compose file
#CMD ["npm", "run", "dev"]