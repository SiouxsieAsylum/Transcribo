const recordingConfig = require("../../config/server-recording.json");
const recognitionConfig = require("../../config/recognition.json");

const recorder = require("node-record-lpcm16");

const { sampleRateHertz } = recognitionConfig;
recordingConfig.sampleRateHertz = sampleRateHertz;

const recordTranscript = (connection) => {
  const { recognizeStream } = require("./googleSTTService")(connection);
  console.log('establishing recorder')
  recorder
    .record(recordingConfig)
    .stream()
    .on("error", console.error)
    .pipe(recognizeStream);
};

module.exports = {
  recordTranscript,
};
