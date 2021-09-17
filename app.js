require("dotenv").config();

// ------------ STARTUP --------------
const args = require("minimist")(process.argv.slice(2));
if (args._[0] === "server") {
  const { recordTranscript } = require("./src/services/serverRecordingService");
  recordTranscript();
} else {
  const port = process.env.WEBSOCKET_PORT || 8000;
  const WebSocketServer = require("websocket").server;
  const http = require("http");
  const { v4: uuidv4 } = require("uuid");

  const server = http.createServer();

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
    console.log(Object.keys(clients));
  });
}
