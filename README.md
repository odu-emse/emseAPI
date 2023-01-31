# EMSE - Asynchronous Learning Management Platform | GraphQL API

## Pre-requisites

-   Docker
    > Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. By taking advantage of Docker’s methodologies for shipping, testing, and deploying code quickly, you can significantly reduce the delay between writing code and running it in production.
    -   [Install Docker for your OS](https://docs.docker.com/desktop/)
-   make
    > Make is a tool which controls the generation of executables and other non-source files of a program from the program's source files. Make gets its knowledge of how to build your program from a file called the makefile, which lists each of the non-source files and how to compute it from other files. When you write a program, you should write a makefile for it, so that it is possible to use Make to build and install the program.
    -   [Install GNU win32 on Windows](http://gnuwin32.sourceforge.net/packages/make.htm)

## Environmental Variables

After cloning the repository, create a .env file with the appropriate variables that you received from your supervisor or through documentation. This file will contain the necessary variables like, database connection, and our JWT configuration.

```shell
$ cd emseAPI && touch .env
```

## Running the API using Docker

To run the API, first please make sure you have all the necessary Pre-Requisite software are installed and your environment file is created. Without these, the API will not be able to run or compile.

### API + Type generation

To make the most out of using Prisma as a Type ORM, we need to generate the TypeScript types from our models, on the fly.

```shell
$ make dev
```

If you need to run a clean installation of the API, but you still want to make use of the automatic type generation, you can run the following command:

```shell
$ make dev-clean
```

### Build Image and start container

Docker-compose builds the image, if the image is not already present, in which case it would use the already built image to start the container.

```shell
$ make up
```

### Stop container

Docker-compose stops the already operational container.

```shell
$ make down
```

### Build image

Docker-compose builds the image. If the image previously exists and no changes have been made in the Dockerfile, docker-compose rebuilds the image again when there have been modifications made to the Dockerfile.

```shell
$ make build
```

### Build image with no cache

This command will build the image with no cache, regardless if image exist or not.

```shell
$ make nocache
```

### Remove image

Removes back_end_api image, by first stopping the container that is using the image and then removes the image.

```shell
$ make remvimg
```

### Enter container

A simple make command to get (`cd`) into the existing container. This is useful when you want to run a command inside the container, or want to see if your changes are showing inside the container.

```shell
$ make encn
```

### View Running Containers

A simple command to view all running/stopped containers.

```shell
$ make rncn
```

### Show all docker images

This command does no destructive actions, it is simply here to help you see all the docker images that are available. This can be a useful command to know if you **don't** have Docker desktop installed (only Docker CLI), or if you are debugging your image.

```shell script
$ make img
```

### Start container (build img from scratch)

Build container from scratch, with no cache. This will take longer than other commands, as it has to remove the existing container and build the image from scratch.

```shell script
$ make reup
```

### Generate types

Once any schema.graphql file is modified, you must run this command to generate new typings _inside of_ the container. This command will enter the container and run the appropriate `node` commands to generate the typings.

Under the hood, it uses `npx` for both TypeScript and Prisma compilations, and uses `ts-node-dev` to run the `generate-typings.ts` file, which turns our GraphQL schema into a TypeScript types.

```shell script
$ make regen
```

## Project Structure

```shell
emseAPI
├── CHANGELOG.md
├── Dockerfile
├── Makefile
├── Procfile
├── README.md
├── docker-compose.yml
├── gql
│   ├── generate-typings.ts
│   └── graphql.ts
├── package.json
├── prisma
│   └── schema.prisma
├── src
│   ├── main.ts
│   ├── app.module.ts
│   ├── prisma.service.ts
│   ├── pos
│   │   ├── interfaces
│   │   │   └── pos.interface.ts
│   │   ├── pos.module.ts
│   │   ├── pos.resolver.ts
│   │   ├── pos.service.ts
│   │   └── schema.graphql
│   ├── program
│   │   ├── program.module.ts
│   │   ├── program.resolver.ts
│   │   ├── program.service.ts
│   │   └── schema.graphql
│   └── user
│       ├── schema.graphql
│       ├── user.module.ts
│       ├── user.resolver.ts
│       └── user.service.ts
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```

### Detailed explanation of the project structure

### `/` (commonly referred to as the root)

This is where TypeScript, CI/CD and Docker configuration files are stored, as well as our documentation, and our CHANGELOG. These files will not be altered too frequently, and if you find yourself having to modify them, you should ensure that you are on the right track first, as these modifications can be highly destructive.

```shell
emseAPI
├── CHANGELOG.md
├── Dockerfile
├── docker-compose.yml
├── Makefile
├── package.json
├── Procfile
├── README.md
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```

### `gql/`

This folder contains the scripts that are responsible for creating the TypeScript typings from our GraphQL Schemas. You will **NEVER** modify the `graphql.ts` file, as it is completely generated automatically. While you might find yourself needing to modify the `generate-typings.ts` file, you should consult with your supervisor before doing so.

Under the hood the `generate-typings.ts` file, picks up all the files called `schema.graphql` inside of the `src` folder, and generates the appropriate typings from them. You will not have to run this file manually, as it has it's own `make` command, which is detailed in the above section.

```shell
gql
├── generate-typings.ts
└── graphql.ts
```

### `src/`

This directory contains all the source code for the API. You can see that there are subdirectories for each scope of the application that we have. Namely `src/pos/`, `src/program/`, and `src/user/`. These all hold the source code for the respective scopes of the application. Throughout your day-to-day work, you will spend most of your time in these directories. To gain understanding behind why we use this structure, you should research `MVC` architecture, as it is how `NestJS` is built.

> Very important to note! Each of the subdirectories contains a `schema.graphql` file, which is crucial for the application to work. These files define the API data structures that are used throughout it's respective scope. All your queries, mutations, enums, types and inputs **MUST** be defined before you can see any progress in the application.

```shell
src
├── main.ts
├── app.module.ts
├── prisma.service.ts
├── pos
│   ├── interfaces
│   │   └── pos.interface.ts
│   ├── pos.module.ts
│   ├── pos.resolver.ts
│   ├── pos.service.ts
│   └── schema.graphql
├── program
│   ├── program.module.ts
│   ├── program.resolver.ts
│   ├── program.service.ts
│   └── schema.graphql
└── user
    ├── schema.graphql
    ├── user.module.ts
    ├── user.resolver.ts
    └── user.service.ts
```

### `prisma/`

This directory is quite simple and self explanatory. It contains our Prisma schema, which is used to define and create our entire database. In this file you will find all of our models, references, relations, configurations and much much more.

When implementing a new feature, you will need to start your process here, as we are following strict **Schema First Design** principles. This means you need to develop features from the back first (from the database layer), if they require the creation of a new database model.

```shell
prisma
└── schema.prisma
```
