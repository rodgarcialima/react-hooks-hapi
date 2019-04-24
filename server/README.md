## SERVER

- [SERVER](#server)
  - [Running a dev environment (FOLLOW STEPS 1 TO 3)](#running-a-dev-environment-follow-steps-1-to-3)
    - [1. Install libs](#1-install-libs)
    - [2. Running mongodb](#2-running-mongodb)
    - [3. Update your local mongodb to the latest version](#3-update-your-local-mongodb-to-the-latest-version)
  - [Utilities](#utilities)
      - [Another migration commands](#another-migration-commands)
      - [To create a new migration](#to-create-a-new-migration)
      - [To revert N migrations](#to-revert-n-migrations)
      - [Create MongoDb Docker container](#create-mongodb-docker-container)

### Running a dev environment (FOLLOW STEPS 1 TO 3)

#### 1. Install libs

`yarn install`

#### 2. Running mongodb

- `docker ps -a` to get mongodb container image id
- `docker start MONGODB_CONTAINER_ID`

#### 3. Update your local mongodb to the latest version

`npx db-migrate up`

### Utilities

##### Another migration commands

You can learn more reading https://db-migrate.readthedocs.io/en/latest/

##### To create a new migration

`npx db-migrate create your_migration_name` then copy the methods `up` and `down`
from `server/migrations/20190423105906-default-users` users migration file as base
to write your own migrations.

##### To revert N migrations

`npx db-migrate down -c N` where N is the number of migrations you want to rollback. Example
`npx db-migrate down -c 1` will revert the last migration only.

##### Create MongoDb Docker container

`docker run --name mongodb -p 27017:27017 -d mongo`
