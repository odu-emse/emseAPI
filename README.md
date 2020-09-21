# Asynchronous Learning Management Platform | EMSE

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