import RecordRTC from 'recordrtc';
import recordingConfig from '../../config/recording.json';
// import { extractPCM } from  '../../services/recordingHelper.js'

const Recorder = () => {
    let recorder;

    const captureMicrophone = (callback) => {
        navigator.mediaDevices.getUserMedia({audio: true})
            .then(mic => {
                callback(mic)
            })
            .catch(err => {
                alert('Cannot Capture Microphone :(')
                console.error()
            })
    }

    const startRecording = (mic) => {
        // recordingConfig.ondataavailable = extractPCM;
        recorder = RecordRTC(mic, recordingConfig);
        recorder.startRecording()
        recorder.microphone = mic;
    }

    const stopRecording = () => {
        recorder.stopRecording();
        recorder.microphone.stop();
    }

    return (
        <>
        <h1>Record me</h1>
        <button 
            id="start"
            onClick="startRecording()"
            >Start</button>
         <button 
            id="stop"
            onClick="stopRecording()"
            >Start</button>
        </>
    )
}

export default Recorder;