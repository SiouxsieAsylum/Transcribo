require("dotenv").config();

const { recordTranscript } = require("./src/services/googleSTTService");
recordTranscript();
