const confidenceConfig = require("../../config/confidence-config.json")
const recognitionConfig = require("../../config/recognition.json");
const streamingRecognitionConfig = require("../../config/streaming-recognition.json");
const speakerDiarizationConfig = require("../../config/speaker-diarization.json");
const { connectionManagement } = require('./asyncSendingService')
const { googleUtils } = require("./utils");

const speech = require("@google-cloud/speech");

const { recieveTranscript } = require("./transcriptHandlerService");

// TO-DO: Speech adaptation https://cloud.google.com/speech-to-text/docs/adaptation

// ---------------- REQUEST CONFIGS --------------------
recognitionConfig.diarizationConfig = speakerDiarizationConfig;
streamingRecognitionConfig.config = recognitionConfig;

const client = new speech.SpeechClient();
let confidenceState = {
  currentConfidence: 0,
  highestConfidence: false
}

/***
 * 
 * How to denote a batch/state when it's multiple options of one sentance
 * How to ensure that a statement is sent to the FE and received without getting lost in the stream
 * 
 */ 

module.exports = (connection) => {
  module.recognizeStream = client
    .streamingRecognize(streamingRecognitionConfig)
    .on("error", console.error)
    .on("data", async (data) => {

      const {evaluateHighestConfidence, resetConfidence, evaluateDuplicate} = googleUtils;
      const {saveConnection} = connectionManagement;

      if (data.error) {
        console.error(data.error)
      };

      saveConnection(connection)

      const results = data.results[0];
      const { isFinal } = results;
      const alt = results.alternatives[0];
      const successfulResponse = results && alt;


      if (successfulResponse && isFinal) {
        const isSameTranscript = confidenceState.prevTranscript && evaluateDuplicate(confidenceState, alt, true)
        if (isSameTranscript) {
          console.log(`Same as previous: ${alt.transcript}`)
          return;
          console.log('progression');
        }
        console.log('successful and final', JSON.stringify(data, null, 2))
        
        confidenceState = await evaluateHighestConfidence(confidenceState, alt);
        console.log('confidence', confidenceState)
        confidenceState = resetConfidence(confidenceState);
      } else {
        console.log("\n\nReached transcription time limit, press Ctrl+C\n");
      }
    });

  return module;
};
