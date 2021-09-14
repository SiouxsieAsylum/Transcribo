// import recognitionConfig from '../../config/recognition.json';
// import streamingRecognitionConfig from '../../config/streaming-recognition.json'
// import speakerDiarizationConfig from '../../config/speaker-diarization.json'
// import recordingConfig from '../../config/recording.json'

const recognitionConfig = require("../../config/recognition.json");
const streamingRecognitionConfig = require("../../config/streaming-recognition.json");
const speakerDiarizationConfig = require("../../config/speaker-diarization.json");
const recordingConfig = require("../../config/recording.json");

// import * as recorder from 'node-record-lpcm16';
// import * as speech from '@google-cloud/speech';

const recorder = require("node-record-lpcm16");
const speech = require("@google-cloud/speech");

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
    console.log(JSON.stringify(data));
    data.results[0] && data.results[0].alternatives[0]
      ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
      : "\n\nReached transcription time limit, press Ctrl+C\n";
  });

// ------------------- RECORDING -----------------------
recorder
  .record(recordingConfig)
  .stream()
  .on("error", console.error)
  .pipe(recognizeStream);
