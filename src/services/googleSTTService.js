const recognitionConfig = require("../../config/recognition.json");
const streamingRecognitionConfig = require("../../config/streaming-recognition.json");
const speakerDiarizationConfig = require("../../config/speaker-diarization.json");

const speech = require("@google-cloud/speech");

const { recieveTranscript } = require("./transcriptHandlerService");

// ---------------- REQUEST CONFIGS --------------------
recognitionConfig.diarizationConfig = speakerDiarizationConfig;
streamingRecognitionConfig.config = recognitionConfig;

const client = new speech.SpeechClient();

module.exports = (connection) => {
  module.recognizeStream = client
    .streamingRecognize(streamingRecognitionConfig)
    .on("error", console.error)
    .on("data", (data) => {
      const { isFinal } = data.results[0];
      const successfulResponse =
        data.results[0] && data.results[0].alternatives[0];
      if (successfulResponse && isFinal) {
        const { transcript } = successfulResponse;
        console.log(`Final Transcript || ====-----==== || ${transcript}`);
        connection ? connection.send(transcript) : recieveTranscript(data);
      } else {
        console.log("\n\nReached transcription time limit, press Ctrl+C\n");
      }
    });

  return module;
};
