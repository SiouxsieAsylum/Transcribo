require("dotenv").config();

const { recordTranscript } = require("./src/services/googleSTTService");

// ----------------- WEBSOCKET ---------------------

const port = process.env.WEBSOCKET_PORT || 8000;
const WebSocketServer = require("websocket").server;
const http = require("http");
const { v4: uuidv4 } = require("uuid");

const server = http.createServer();
console.log("hi", server);

server.listen(port);
const wsServer = new WebSocketServer({
  httpServer: server,
});

const clients = {};

wsServer.on("request", function (request) {
  const connectionId = uuidv4();
  //   const timestamp = new Date().toISOString();
  const connection = request.accept(null, request.origin);
  clients[connectionId] = connection;
});

recordTranscript();
