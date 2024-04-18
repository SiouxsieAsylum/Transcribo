import { useState, useEffect } from 'react';
import MessageContainer from './components/MessageContainer';
import WebsocketContainer from './components/WebsocketContainer';
import Modal from './components/Modal';

import { connectionClosed } from './config/modal-contents.json';
import './App.css';


function App() {
  const [textList, setTextList] = useState([]);

  /*
  TO-DO: create a selection process for when you get multiple options
    -how to differentiate when the batches are coming through?
    -should the back end denote a batch?
    -does the message object have anything I can use?  
  */ 

    const handleReload = () => {
      console.clog("yerr")
    }

  return (
    <>
    <WebsocketContainer 
      update={setTextList}
    />
    <MessageContainer 
      textList={textList}
      />
    <Modal
      contents={connectionClosed}
      callback={handleReload}
      />
    </>
  )
}

export default App;

/**
  To-Dos:
    - MongoDB hookup to generate session, save, and return to FE
 */