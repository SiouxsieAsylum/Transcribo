import RecordRTC, { StereoAudioRecorder } from 'recordrtc';
import recordingConfig from '../../config/recording.json';
import { extractPCM } from  '../../services/recordingHelper.js'

const Recorder = (props) => {
    let client;
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
            client = new W3CWebSocket(`ws://127.0.0.1:8000`);
            client.send(blob)
        };
        recordingConfig.recorderType = StereoAudioRecorder;
        recorder = RecordRTC(mic, recordingConfig);
        recorder.startRecording();
        recorder.microphone = mic;
    }

    const stopRecording = () => {
        client.close();
        recorder.microphone.stop();
        recorder.stopRecording();
        console.log("stopped")
    }

    useEffect(() => {
        client.onopen = () => {
            console.log('Websocket Client Connected')
        }

        client.onmessage = (event) => {
            console.log(event)
        }

        client.onclose = () => {
            console.log('Websocket closed')
        }
    })

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