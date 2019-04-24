# React Hooks Hapi
Template project with React (with Hooks) and HapiJS

The goal of the project is to learn how to fully replace redux with new reaction hooks and create a blueprint for future projects.

### Features
- Redux was replaced by React Hooks (useContext, usetState, useDispatch, useRef, useEffect)
- Authentication with JWT tokens
- Using immer for changing state (https://github.com/immerjs/immer)
- Using tailwindcss for CSS (https://github.com/tailwindcss/tailwindcss)
- Login, Admin pages

### Todo
- Client tests. At this moment, Enzime does not supports React Hooks
- Server tests.

### Server Instructions (/server)

##### Creating a docker MongoDB container
`docker run --name <YOUR_MONGODB_CONTAINER_NAME> -p 27017:27017 -d mongo` or start your existing instance `docker ps -a`, get container image id and run `docker start <YOUR_MONGODB_CONTAINER_ID/NAME>`. Ensure you're using port 27017, or change on server `.env` and `database.json`

##### Install server libs
`yarn install` 

##### Execute MongoDB migrations
`npx db-migration up` or `./node_modules/db-migrate/bin/db-migrate up`

##### Start the server
`yarn start` starts the server on port 3000

### Client instructions

##### Install client libs
`yarn install`

##### Start the client
`yarn start` starts the server on port 4000

### Author
Rodrigo Lima (rodgarcialima@gmail.com)
