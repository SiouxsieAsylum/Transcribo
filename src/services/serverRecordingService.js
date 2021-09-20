const { recognizeStream } = require("./googleSTTService")();
const recordingConfig = require("../../config/server-recording.json");
const recognitionConfig = require("../../config/recognition.json");

const recorder = require("node-record-lpcm16");

const { sampleRateHertz } = recognitionConfig;
recordingConfig.sampleRateHertz = sampleRateHertz;

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
