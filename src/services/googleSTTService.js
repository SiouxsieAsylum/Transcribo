const recognitionConfig = require("../../config/recognition.json");
const streamingRecognitionConfig = require("../../config/streaming-recognition.json");
const speakerDiarizationConfig = require("../../config/speaker-diarization.json");
const recordingConfig = require("../../config/server-recording.json");

const recorder = require("node-record-lpcm16");
const speech = require("@google-cloud/speech");

const { recieveTranscript } = require("./transcriptHandlerService");

// ---------------- REQUEST CONFIGS --------------------
recognitionConfig.diarizationConfig = speakerDiarizationConfig;
streamingRecognitionConfig.config = recognitionConfig;

const { sampleRateHertz } = recognitionConfig;
recordingConfig.sampleRateHertz = sampleRateHertz;

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
const recordTranscript = () => {
  recorder
    .record(recordingConfig)
    .stream()
    .on("error", console.error)
    .pipe(recognizeStream);
};

module.exports = {
  recordTranscript,
};
