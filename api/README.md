## Installation
Please, enter this command, in api folder,to install the ressources you need for this project:

```bash
$ yarn install
```

## Running the app
To launch the API, please use the following command:
```bash
# development
$ yarn start
```

Here are other commands to launch the project with different settings:
```bash
# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Prisma

Follow the .env.example to create your DATABASE_URL variable. You also need to manually change your db provider in the schema.prisma file.
To launch the migrations run:

```bash
yarn prisma migrate dev --name "init"
```

then seed the database if it hasn't been done:

```bash
yarn prisma db seed
```