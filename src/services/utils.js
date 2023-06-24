/**
 * 
 * As if now, file is mostly unused. Deciding what to do with it
 * 
 * */ 

const confidenceConfig = require('../../config/confidence-config.json');

// -------------- UTILS ------------------------

const removeTimeout = (timer) => {
        clearTimeout(timer)
};

// ------------ GOOGLE UTILS -----------------


const resetConfidence = (confidenceState = {}) => {
    return {
        currentConfidence: 0,
        highestConfidence: false,
        prevTranscript: confidenceState.transcript
    }

}

const resetConfidenceTimeout = (id, ms, cb, args) => {
    utils.removeTimeout(id);
    return setConfidenceTimeout(ms, cb, args)
}

const setConfidenceTimeout = (ms, cb, args) => {
    console.trace(args[0])
    const timeout = setTimeout(() => cb(...args), ms || confidenceConfig.timeout.confidence);
    return timeout;
}


const evaluateDuplicate = (source, comparitor, prev = false) => {
    let property = prev ? 'prevTranscript' : 'transcript'
    let sourceVal = source[property].trim();
    let compareVal = comparitor.transcript.trim()
    console.log(`source: ${sourceVal}, comparitor ${compareVal}`)
    return sourceVal === compareVal;
}

const utils = {
    removeTimeout
}

const googleUtils = {
    resetConfidence,
    resetConfidenceTimeout,
    setConfidenceTimeout,
    evaluateDuplicate,
}
 


module.exports = {
    googleUtils,
    utils
};