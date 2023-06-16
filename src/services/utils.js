const confidenceConfig = require('../../config/confidence-config.json');

const utils = {

    removeTimeout: function(id){
        clearTimeout(id)
    }
};

//  TO-DO: figure out how to refactor so that you can access the methods in this object from other methods in the object

const googleUtils = {
    resetConfidence: (confidenceState) => {
        confidenceState.currentConfidence = 0;
        confidenceState.highestConfidence = false;
    },

    resetConfidenceTimeout: (id, ms, cb, args) => {
        utils.removeTimeout(id);
        confidenceState.timer = this.setConfidenceTimeout(ms, cb, args)
    },

    setConfidenceTimeout: (ms, cb, args) => {
        const timeout = setTimeout(cb(...args), ms || confidenceConfig.timeout.confidence);
        return timeout;
    },

    evaluateHighestConfidence: async (confidenceState, alt) => {
        console.log(this)
        // to-do: this should work, how am I not scoping this correctly?
        // const newConfidenceState = this.resetConfidence();

        const {confidence, transcript} = alt;

        let newConfidenceState = {
            currentConfidence: 0,
            highestConfidence: false
        };


        /*
        
        if there is a transcript in the current transcription state and it's the same transcript
        - if the confidence rate is lower than or equal to the last one, set the promoted transcripts 
        - if the confidence rate is higher, update confidence and set timeout to wait 100ms.
            - timer should be set onto config to be cleared and reassigned under "timerId"
            - if updated, clear and reset timer, <--- set timer should be only thing in this method, right?
            -if not, set the promoted transcript 
        */ 

        if (confidence > confidenceState.currentConfidence) {
            newConfidenceState.currentConfidence = confidence;
            newConfidenceState.transcript = transcript;
            const cbArgs = [confidenceState, alt];
            if (confidenceState.timer) {
                newConfidenceState.timer = this.resetConfidenceTimeout(confidenceState.timer, this.setPromotedTranscript, cbArgs)
            } else {
                newConfidenceState.timer = this.setConfidenceTimeout(null, this.setPromotedTranscript, cbArgs);

            }
        } else {
            newConfidenceState = this.setPromotedTranscript(confidenceState, alt);
        }

         return newConfidenceState;

    },

    setPromotedTranscript: alt => {
        return {
            currentConfidence: alt.confidence,
            highestConfidence: true,
            transcript: alt.transcript,
            timer: null
        }
    },

    // checkForChallengers: async function(confidence, alt) {
    //    return await Promise.all([
    //         utils.timeout(confidenceConfig.timeout.confidence),
    //     ]);
    // },


    evaluateDuplicate: (confidenceState, alt) => {
        return confidenceState.transcript === alt.transcript;
    }
}

googleUtils.resetConfidence.bind(googleUtils);

module.exports = {
    googleUtils,
    utils
};