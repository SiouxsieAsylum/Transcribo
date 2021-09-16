/* eslint-disable no-unused-vars */

const recieveTranscript = (data) => {
  const { isFinal, alternatives } = data.results[0];
  const { transcript } = alternatives[0];
  console.log(transcript);
};

module.exports = {
  recieveTranscript,
};
