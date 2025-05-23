import { useState } from 'react';
import WebsocketContext from '../src/contexts/WebsocketContext';
import './App.css';


import { v4 as uuidv4 } from "uuid";
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import MainUIStateContainer from './components/MainUIStateContainer';

import Modal from './components/Modal';
import { connectionClosed } from './config/modal-contents.json';



function App() {
 const [errorStatus, setErrorStatus] = useState(false)
 const [connectionClientId, setConnectionClientId] = useState(uuidv4())
 console.log('establishing app and client')
 const client = new W3CWebSocket(`ws://127.0.0.1:8000`);


  /*
  TO-DO: create a selection process for when you get multiple options
    -how to differentiate when the batches are coming through?
    -should the back end denote a batch?
    -does the message object have anything I can use?  
  */ 

    const handleReload = () => {
      const newId = uuidv4()
      setConnectionClientId(newId)
      setErrorStatus(false)
      console.log(`New Connection Client Container ID: ${newId}`);
    }

  return (
    <>
    <WebsocketContext.Provider value={{client, connectionClientId, setErrorStatus}}>
      <MainUIStateContainer/>
    </WebsocketContext.Provider>
    {errorStatus && <Modal
      contents={connectionClosed}
      callback={handleReload}
      />}
    
    </>
  )
};

export default App;

/**
  To-Dos:
    - MongoDB hookup to generate session, save, and return to FE
 */