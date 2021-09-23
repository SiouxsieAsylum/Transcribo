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
    const connection = request.accept(null, request.origin);
    clients[connectionId] = connection;

    connection.on("message", function (stream) {
      console.log("message recieved", stream.type);

      // const websocketStream = require('websocket-stream');

      // stream.pipe(recognizeStream);
      // websocket-stream sets up the initial server to be the stream, and doesn't recognize the audio data coming through
      // how do I send the blob packets down and pipe them after the button is pressed?
      // do I need to set up two separate servers?
      // can swap handlers once the audio starts?
      // does it even recognize that the audio has started?
      // how can I verify that it's recieving packets
    });
  });

  //   const { recognizeStream } = require("./src/services/googleSTTService")(
  //     wsServer
  //   );

  wsServer.on("close", function close(reason, code) {
    console.log("ws is closed with code: " + code + " reason: " + reason);
  });

  // On Error
  wsServer.on("error", function (e) {
    console.log("error occured" + e);
  });
}
