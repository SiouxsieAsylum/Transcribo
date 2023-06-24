const { connectionManagement } = require('./asyncSendingService');
const confidenceConfig = require('../../config/confidence-config.json');

// const { googleUtils, utils } = require('./utils')


/*
 * 
 * start time is time of first transcript 
 * start time will get reset when the transcript is sent
 *  
 * 
 * (if option one chosen) end time is the timestamp of the last transcript to come through in a batch
 * - end time will be updated with every alt that comes through
 * - end time will be reset when the transcript is set
 * 
 * ======== OPTION 2 CHOSEN ===========
 * (if option two chosen) top result is an object with three properties, timestamp, confidence and transcript
 *  - as each option comes through, it will check the difference between the timestamp and the startTime
 *  - if less than confidence timeout, it will be considered to fit with in the batch and be evaluated
 *  - if the confidence for this alt is higher than the highest result, it replaces the top result and gets added to the results object
 *  - the top result is reset once the transcript is sent
 * 
 * results is an object of objects
 * each child will have two properties: confidence to transcript
 * at end time, the values will be sorted and ranked
 * OR 
 * as the first transcript comes through, it is set as the top result
 * and every subsequent result is compared against it
 */ 


const resultsAggregator = {
    startTime: 0,
    topResult: {},
    results: []
};

const resetResultsAggregator = _ => {
    resultsAggregator.startTime = 0
    resultsAggregator.topResult = {}
    resultsAggregator.results = []
}

const setPromotedTranscript = _ => {

    console.log('setting promoted', resultsAggregator.topResult.transcript)
    const { sendOverConnection } = connectionManagement;
    sendOverConnection(resultsAggregator.topResult.transcript);
    console.log('All results: \n', resultsAggregator.results)
    resetResultsAggregator()
}

const handleResults = async (alt) => {
    const now = Date.now();
    const prevTime = resultsAggregator.startTime;

    if (!prevTime) {
        resultsAggregator.startTime = now;
    }

    const {confidence, transcript } = alt;

    const resultObject = {
        confidence,
        transcript,
        timestamp: now
    };

    console.log(resultObject);
    
    if (!Object.keys(resultsAggregator.topResult).length) {
        resultsAggregator.topResult = resultObject;
        setTimeout(setPromotedTranscript, confidenceConfig.timeout.confidence);
    } else {
        if (resultsAggregator.topResult.confidence < resultObject.confidence) {
            resultsAggregator.topResult = resultObject;
        }
    }

    resultsAggregator.results[now] = resultObject;
    console.log('resultAggregator', resultsAggregator)
};

module.exports = {
    handleResults
};