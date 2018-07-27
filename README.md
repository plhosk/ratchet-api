# Demo App - Node.js/Koa API server

## MongoDB Server

- If you have a local MongoDB server running, you may edit the file `.env` to point to the correct URI (default `mongodb://localhost:27017/ratchet-api`)
- If you do not have MongoDB running but you have it installed and `mongod` is in the path, run `./mongo-start.sh` to start a MongoDB server in the terminal. The data directory will be set as `./mongodb/data`
- Alternatively `./mongo-background.sh` will start a server in the background
- If you do not have a MongoDB server you can download it [here](https://www.mongodb.com/download-center#community)

## Start Demo App API Server

1. `npm install` to install npm packages
1. `npm start` to run server (the equivalent command is `node ./server/index.js`)
1. Default port is 3000
1. Use the [Demo App front-end](https://github.com/plhosk/ratchet-front) to interface with this API

## Endpoints

- `GET /items`
- `POST /items` with body `{ title: String, column: Number }`
- `DELETE /items/:id
- `GET /log`

## Testing

- `npm test` to test the API endpoints
