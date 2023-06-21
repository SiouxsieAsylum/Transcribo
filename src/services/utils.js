const confidenceConfig = require('../../config/confidence-config.json');
const { connectionManagement } = require('./asyncSendingService');

// -------------- UTILS ------------------------

function removeTimeout(timer) {
        clearTimeout(timer)
};

// ------------ GOOGLE UTILS -----------------


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
    console.trace(args[0])
    const timeout = setTimeout(() => cb(...args), ms || confidenceConfig.timeout.confidence);
    return timeout;
}


function setPromotedTranscript(confidence, alt) {
    console.log('setting promoted', alt.transcript)
    const {sendOverConnection} = connectionManagement
    sendOverConnection(alt.transcript);
    utils.removeTimeout(confidence.timer);
}

function evaluateDuplicate(source, comparitor, prev = false) {
    let property = prev ? 'prevTranscript' : 'transcript'
    let sourceVal = source[property].trim();
    let compareVal = comparitor.transcript.trim()
    console.log(`source: ${sourceVal}, comparitor ${compareVal}`)
    return sourceVal === compareVal;
}

async function evaluateHighestConfidence(confidenceState, alt) {

    const {confidence, transcript} = alt;
    let newConfidenceState = resetConfidence();

    if (confidence > confidenceState.currentConfidence) {
        newConfidenceState.currentConfidence = confidence;
        newConfidenceState.transcript = transcript;
        const cbArgs = [confidenceState, alt];
        if (confidenceState.timer) {
            newConfidenceState.timer = resetConfidenceTimeout(confidenceState.timer, null, setPromotedTranscript, cbArgs)
        } else {
            newConfidenceState.timer = setConfidenceTimeout(null, setPromotedTranscript, cbArgs);

        }
    } else {
        newConfidenceState = setPromotedTranscript(alt);
    }

        return newConfidenceState;

}

const utils = {
    removeTimeout
}

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