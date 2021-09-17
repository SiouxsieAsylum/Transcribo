const recognitionConfig = require("../../config/recognition.json");
const streamingRecognitionConfig = require("../../config/streaming-recognition.json");
const speakerDiarizationConfig = require("../../config/speaker-diarization.json");

const speech = require("@google-cloud/speech");

const { recieveTranscript } = require("./transcriptHandlerService");

// ---------------- REQUEST CONFIGS --------------------
recognitionConfig.diarizationConfig = speakerDiarizationConfig;
streamingRecognitionConfig.config = recognitionConfig;

// ------------------- STREAMING -----------------------
const client = new speech.SpeechClient();
const recognizeStream = client
  .streamingRecognize(streamingRecognitionConfig)
  .on("error", console.error)
  .on("data", (data) => {
    data.results[0] && data.results[0].alternatives[0]
      ? recieveTranscript(data)
      : console.log("\n\nReached transcription time limit, press Ctrl+C\n");
  });

// ------------------- RECORDING -----------------------

module.exports = {
  recognizeStream,
};
