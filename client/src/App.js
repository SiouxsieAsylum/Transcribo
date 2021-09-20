import { useEffect } from 'react';
import Recorder from './components/Recorder'
import './App.css';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function App() {
  const client = new W3CWebSocket(`ws://127.0.0.1:8000`)

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
    <Recorder
      client={client}
     />
  );
}

export default App;

/**
  To-Dos:
    - Hook up the front end recording to the back end 
    - MongoDB hookup to generate session, save, and return to FE
 */