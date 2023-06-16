const confidenceConfig = require("../../config/confidence-config.json")
const recognitionConfig = require("../../config/recognition.json");
const streamingRecognitionConfig = require("../../config/streaming-recognition.json");
const speakerDiarizationConfig = require("../../config/speaker-diarization.json");
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

module.exports = (connection) => {
  module.recognizeStream = client
    .streamingRecognize(streamingRecognitionConfig)
    .on("error", console.error)
    .on("data", async (data) => {
      const {evaluateHighestConfidence, resetConfidence} = googleUtils;
      if (data.error) {
        console.error(data.error)
      };

      const results = data.results[0];
      const { isFinal } = results;
      const alt = results.alternatives[0];
      const successfulResponse = results && alt;

      /*
        - if there is one final transcript, the application should send the transcript after a timeout
          - how will it know?
            - timeout occurs and highest confidence is still false
        - If there is multiple sends of the final transcript, the application should update the confidence object and based on that update, send the transcript
        - If transcript is already sent, do not send transcript
          - how will it know?
            - how to identify it as the same transcript
            - is there a way to get the IDs of a transcription?
            - if not, save the value and measure against it
            - timeout required?
      */ 

      if (successfulResponse && isFinal) {
        console.log('successful and final', JSON.stringify(data, null, 2))
        // TO-DO: add more constraints to prevent double posts and allow ones to come through that don't have doubles
        
        confidenceState = await evaluateHighestConfidence(confidenceState, alt);
        console.log('confidence', confidenceState)
        if (confidenceState.highestConfidence) {
          console.log('highest confidence', JSON.stringify(data, null, 2));
          const { transcript } = successfulResponse;
          console.log(`Final Transcript || ====-----==== || ${transcript}`);
          connection ? connection.send(transcript) : recieveTranscript(data);
          resetConfidence(confidenceState);
        };
      } else {
        console.log("\n\nReached transcription time limit, press Ctrl+C\n");
      }
    });

  return module;
};
