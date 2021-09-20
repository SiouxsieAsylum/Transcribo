import RecordRTC, { StereoAudioRecorder } from 'recordrtc';
import recordingConfig from '../../config/recording.json';
import { extractPCM } from  '../../services/recordingHelper.js'

const Recorder = (props) => {
    const { client } = props;
    let microphone;
    let recorder;

    const captureMicrophone = () => {
        if (!microphone){
            navigator.mediaDevices.getUserMedia({audio: true})
            .then(mic => {
                console.log(microphone)
                microphone = mic;
                startRecording(microphone)
            })
            .catch(err => {
                alert('Cannot Capture Microphone :(')
                console.error()
            })
        } else {
            startRecording(microphone)
        } 
    }

    const startRecording = (mic) => {
        recordingConfig.ondataavailable = (blob) => {
            console.log('new audio!')
            client.send(blob)
        };
        recordingConfig.recorderType = StereoAudioRecorder;
        recorder = RecordRTC(mic, recordingConfig);
        recorder.startRecording();
        recorder.microphone = mic;
    }

    const stopRecording = () => {
        recorder.microphone.stop();
        recorder.stopRecording();
        console.log("stopped")
    }

    return (
        <>
        <h1>Record me</h1>
        <button 
            id="start"
            onClick={captureMicrophone}
            >Start</button>
         <button 
            id="stop"
            onClick={stopRecording}
            >Stop</button>

        
        </>
    )
}

export default Recorder;