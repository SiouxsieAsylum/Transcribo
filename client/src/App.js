import { useEffect } from 'react';
import Recorder from './components/Recorder'
import './App.css';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function App() {
  return (
    <Recorder
     />
  );
}

export default App;

/**
  To-Dos:
    - Hook up the front end recording to the back end 
    - MongoDB hookup to generate session, save, and return to FE
 */