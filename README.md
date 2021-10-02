# Asynchronous Learning Management Platform | EMSE
## Developer-Instructions
After cloning the ensure the .env file with the necessary database login url is present, in the root folder. 

### MakeFile development Controls
<br>

#### Build Image and start container
Docker-compose builds the image if image is not present or would use already built image when present to get the container started.
```shell script
$ make up
```
#### Stop container
Docker-compose stops an already operational container.
```shell script
$ make down
```
#### Build image
Docker-compose builds image, if image previously exist and no change in Dockerfile, docker-compose rebuilds the image again when there as been modified changes to the dockerfile.

```shell script
$ make build
```
#### Build image no cache
This builds image regardless if image exist or not.
```shell script
$ make nocache
```
#### Remove image
Removes back_end_api image, by stopping the container using the image then removes the image. 
```shell script
$ make remvimg
```
#### Enter container 
A simple make command to get into an existing container
```shell script
$ make encn
```
#### View Running Container
A simple command to view all running/stopped container
```shell script
$ make rncn
```
#### Show all docker image
A simple command to show all docker images
```shell script
$ make img
```
#### Start container (build img from scratch)
Build container from scratch with no cache
```shell script
$ make reup
```
#### Generate types
Once any schema.graphql is updated, must run this command to generate new typings in the container.
```shell script
$ make regen
```

## Getting Started
After cloning into repo, cd to project root directory and install server dependencies, as well as install the front-end dependencies:

```shell script
$ cd emsePortal
$ npm install && npm run client-install
```

> *In order for Express to connect to your database, you first need to create a ```.env``` file with the key ```MongoURI``` and the value of your database access URL.*

Run and expose port `:3000` for React and `:5000` for Express
```shell script
$ npm run dev
```

> *You can also add the key ```PORT``` to your ```.env``` file to change the default 5000 Express port assignment.*