const googleUtils = {
    resetConfidence(confidenceState) {
        confidenceState.currentConfidence = 0;
        confidenceState.highestConfidence = false;
    },
    evaluateHighestConfidence(confidenceState, altConfidence) {
        // to-do: this should work, how am I not scoping this correctly?
        // const newConfidenceState = this.resetConfidence();

        // there is not always a multiple send of the same confidence level or lower, so it doesn't always match
        // timeout?
        // may need to play with the recording settings

        const newConfidenceState = {
            currentConfidence: 0,
            highestConfidence: false
        }

        if (altConfidence > confidenceState.currentConfidence) {
            newConfidenceState.currentConfidence = altConfidence;
        } else {
            newConfidenceState.currentConfidence = confidenceState.currentConfidence;
            newConfidenceState.highestConfidence = true;
        }

         return newConfidenceState;

    },
}

googleUtils.resetConfidence.bind(googleUtils);

module.exports = {
    googleUtils
};