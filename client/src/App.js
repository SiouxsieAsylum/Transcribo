import { useEffect, useState } from 'react';
import Message from './components/Message'
import './App.css';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function App() {
  const client = new W3CWebSocket(`ws://127.0.0.1:8000`)
  const [textList, setTextList] = useState([]);

  useEffect(() => {
    client.onopen = () => {
      console.log('Websocket Client Connected')
    }

    client.onmessage = (message) => {
      console.log(message)
      setTextList(oldTextList=> [...oldTextList, message.data])
      console.log(textList)
    }

    client.onclose = () => {
      console.log('Websocket closed')
    }
  })

  return (
    <>
    {textList}
      {/* {
        textList.forEach(text => {
          console.log("eat my shorts")
          return <p>{text}</p>
          return (<Message key={text} message={text} />)
        })
      } */}
    </>
  );
}

export default App;

/**
  To-Dos:
    - Hook up the front end recording to the back end 
    - MongoDB hookup to generate session, save, and return to FE
 */