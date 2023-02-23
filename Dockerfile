FROM node:18 as base

WORKDIR /usr/src/app

COPY ./.env ./.eslintrc.yml ./.prettierrc ./package.json ./yarn.lock ./yarn-error.log ./tsconfig.json ./tsconfig.build.json ./

COPY prisma/* ./prisma/
COPY gql/* ./gql/
COPY src/ ./src/



FROM base as development

