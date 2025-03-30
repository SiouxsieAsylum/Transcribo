const confidenceConfig = require("../../config/confidence-config.json")
const recognitionConfig = require("../../config/recognition.json");
const streamingRecognitionConfig = require("../../config/streaming-recognition.json");
const speakerDiarizationConfig = require("../../config/speaker-diarization.json");
const { connectionManagement } = require('./asyncSendingService')
const { googleUtils } = require("./utils");
const { handleResults}  = require('./resultManagementService');

const speech = require("@google-cloud/speech");

const { recieveTranscript } = require("./transcriptHandlerService");

// TO-DO: Speech adaptation https://cloud.google.com/speech-to-text/docs/adaptation

// ---------------- REQUEST CONFIGS --------------------
recognitionConfig.diarizationConfig = speakerDiarizationConfig;
streamingRecognitionConfig.config = recognitionConfig;

const client = new speech.SpeechClient();

/***
 * 
 * How to denote a batch/state when it's multiple options of one sentance
 * How to ensure that a statement is sent to the FE and received without getting lost in the stream
 * 
 * 
 * Want to establish certain metrics
 * - from reception of content from FE to transcription via google
 * - from transcription from google to send to FE
 */ 


module.exports = (connection) => {
  module.recognizeStream = client
    .streamingRecognize(streamingRecognitionConfig)
    .on("error", console.error)
    .on("data", async (data) => {
      const { saveConnection } = connectionManagement;

      if (data.error) {
        console.error(data.error)
      };

      saveConnection(connection)

      const results = data.results[0];
      const { isFinal } = results;
      const alt = results.alternatives[0];
      const successfulResponse = results && alt;

      if (successfulResponse && isFinal) {
        handleResults(alt);
      } else {
        console.log("\n\nReached transcription time limit, press Ctrl+C\n");
      }
    });

  return module;
};
