const { recordTranscript } = require("./src/services/serverRecordingService");
require("dotenv").config();

// ------------ STARTUP --------------

const initServer = () => {
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
    const connection = request.accept(null, request.origin);
    clients[connectionId] = connection;
    console.log(connectionId);
    recordTranscript(connection);
  });

  wsServer.on("close", function close(reason, code) {
    console.log("ws is closed with code: " + code + " reason: " + reason);
  });

  // On Error
  wsServer.on("error", function (e) {
    console.log("error occured" + e);
  });
};

const initApplication = () => {
  initServer();
};

// ----- MAIN PROCESS ----
initApplication();
