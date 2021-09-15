FROM node:14.17.6

WORKDIR /usr/src/app

#copy folder director to docker container
COPY . .

#install typescript
#RUN npm install typescript
#RUN npx @nestjs/cli
RUN npm install -g @nestjs/cli
RUN npm install

EXPOSE 4000
#RUN npm run dev

CMD ["npm", "run", "dev"]