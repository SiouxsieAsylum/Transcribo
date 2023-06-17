const confidenceConfig = require('../../config/confidence-config.json');

const utils = {
    removeTimeout: function(id){
        clearTimeout(id)
    }
};

function sendOverConnection(connection, transcript) {
    // how to get connection for the async calls
}

function resetConfidence(confidenceState = {}) {
    return {
        currentConfidence: 0,
        highestConfidence: false,
        prevTranscript: confidenceState.transcript
    }

}

function resetConfidenceTimeout(id, ms, cb, args) {
    utils.removeTimeout(id);
    return setConfidenceTimeout(ms, cb, args)
}

function setConfidenceTimeout(ms, cb, args) {
    console.trace(cb)
    const timeout = setTimeout(() => cb(...args), ms || confidenceConfig.timeout.confidence);
    return timeout;
}


function setPromotedTranscript(alt) {
    // how to ensure this new transcript can get promoted after the method returns? Async sending.
    console.log('setting promoted', alt.transcript)
    return {
        currentConfidence: alt.confidence,
        highestConfidence: true,
        transcript: alt.transcript,
        timer: null
    }
}

function evaluateDuplicate(source, comparitor, prev = false) {
    let property = prev ? 'prevTranscript' : 'transcript'
    return source[property] === comparitor.transcript;
}

async function evaluateHighestConfidence(confidenceState, alt) {

    const {confidence, transcript} = alt;
    let newConfidenceState = resetConfidence();

    if (confidence > confidenceState.currentConfidence) {
        newConfidenceState.currentConfidence = confidence;
        newConfidenceState.transcript = transcript;
        const cbArgs = [confidenceState, alt];
        if (confidenceState.timer) {
            newConfidenceState.timer = resetConfidenceTimeout(confidenceState.timer, null, setPromotedTranscript, [alt])
        } else {
            newConfidenceState.timer = setConfidenceTimeout(null, setPromotedTranscript, [alt]);

        }
    } else {
        newConfidenceState = setPromotedTranscript(alt);
    }

        return newConfidenceState;

}


/**
 * If the confidence increases with each call, it will set a timeout to 
 * 
 * 
 * */ 

const googleUtils = {
    resetConfidence,
    resetConfidenceTimeout,
    setConfidenceTimeout,
    evaluateHighestConfidence,
    setPromotedTranscript,
    evaluateDuplicate,
}
 


module.exports = {
    googleUtils,
    utils
};