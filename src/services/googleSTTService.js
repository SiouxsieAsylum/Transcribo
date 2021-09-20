const recognitionConfig = require("../../config/recognition.json");
const streamingRecognitionConfig = require("../../config/streaming-recognition.json");
const speakerDiarizationConfig = require("../../config/speaker-diarization.json");

const speech = require("@google-cloud/speech");

const { recieveTranscript } = require("./transcriptHandlerService");

// ---------------- REQUEST CONFIGS --------------------
recognitionConfig.diarizationConfig = speakerDiarizationConfig;
streamingRecognitionConfig.config = recognitionConfig;

const client = new speech.SpeechClient();

module.exports = (server) => {
  module.recognizeStream = client
    .streamingRecognize(streamingRecognitionConfig)
    .on("error", console.error)
    .on("data", (data) => {
      console.log("I even got here, yay");
      console.log("---------------------");
      console.log(JSON.stringify(data));

      const { isFinal } = data.results[0];
      const successfulResponse =
        data.results[0] && data.results[0].alternatives[0];
      if (successfulResponse && isFinal) {
        const { transcript } = successfulResponse;
        console.log("=====================");
        console.log("---------------------");
        console.log("---------------------");
        console.log("---------------------");
        console.log(`Final Transcript || ====-----==== || ${transcript}`);
        server ? server.send(transcript) : recieveTranscript(data);
      } else {
        console.log("\n\nReached transcription time limit, press Ctrl+C\n");
      }
    });

  return module;
};
