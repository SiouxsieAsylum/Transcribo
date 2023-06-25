import { useState, useEffect } from 'react';
import Websocket from './components/Websocket';
import MessageContainer from './components/MessageContainer';

import './App.css';

function App() {
  const [textList, setTextList] = useState([]);
  
  useEffect((textList) =>{
    console.log('textList', textList)
  })

  /*
  TO-DO: create a selection process for when you get multiple options
    -how to differentiate when the batches are coming through?
    -should the back end denote a batch?
    -does the message object have anything I can use?  
  */ 

  return (
    <>
    <Websocket 
      update={setTextList}
    />
    <MessageContainer 
      textList={textList}
      />
    </>
  )
}

export default App;

/**
  To-Dos:
    - MongoDB hookup to generate session, save, and return to FE
 */