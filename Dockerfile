FROM node:14.17.6 as base

WORKDIR /usr/src/app

#copy folder director to docker container
COPY package.json ./
COPY prisma/. /usr/src/app/prisma/.

#install typescript
#RUN npm install typescript
#RUN npx @nestjs/cli
RUN npm i

RUN npm install -g @nestjs/cli prisma
RUN npx prisma generate
COPY . .


FROM base as production

#CMD ["npx", "prisma generate"]


#EXPOSE 4000
#RUN npm run dev
#Ran in docker-compose file
#CMD ["npm", "run", "dev"]