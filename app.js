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
  console.log(`App listening on PORT ${port}`)
  const wsServer = new WebSocketServer({
    httpServer: server,
  });

  const clients = {};
  const acceptedOrigins = ['http://localhost:3000']
  /**
   * This will eventually need to keep track of
   * - multiple clients for the same server? 
   *   - if so, why does it not send the same messages to all websockets? (learning opportunity)
   * - multiple 1:1 server/client relationships
   *   - multiple docker containers managed at once, like coderpad
   *   - separate this from having separate development environments
   *   - can you nest having docker containers inside of a docker container? Should you?
   *   - would it be smarter to have them be in contact with siblings (websocket containers and development containers?)
   */


  wsServer.on("request", function (request) {
    const { origin } = request;
    if (acceptedOrigins.includes(origin)) {
      request.accept(null, request.origin);
    }
  });

  wsServer.on('connect', function(connection){
    // add the ID set on the FE to connect here
    const connectionId = uuidv4();
    connection.id = connectionId;
    clients[connectionId] = connection;
    console.log('Websocket connection ID', connectionId);
    recordTranscript(connection);
  })

  wsServer.on("close", function close(connection, reason, code) {
    delete clients[connection.id];
    console.log("ws is closed with code: " + code + " reason:\n" + reason.closeDescription);
  });

  // On Error
  wsServer.on("error", function (e) {
    console.log("error occured" + e);
    // Set to a logger down the road
  });
};

const initApplication = () => {
  initServer();
};

// ----- MAIN PROCESS ----
// how am I supposed to know which connectionID was just generated
try {
  initApplication();
} catch (e) {
  wsServer.close('')
}

