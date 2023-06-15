import { useState, useEffect } from 'react';
import Websocket from './components/Websocket';
import MessageContainer from './components/MessageContainer';

import './App.css';

function App() {
  // lift this into separate component
  const [textList, setTextList] = useState([]);
  
  useEffect((textList) =>{
    console.log('textList', textList)
  })


  return (
    <>
    <Websocket 
      textList={textList}
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