import { useEffect, memo } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const establishedConnection = [];

const Websocket = memo(function Websocket({update}){
  const client = new W3CWebSocket(`ws://127.0.0.1:8000`);
  
  useEffect(() => {
    client.onopen = () => {
      console.log('Websocket Client Connected')
    }

    // do not reassign the env var, just add to it
    client.onmessage = (message) => {
      console.log('message', message)
      update(oldTextList => [...oldTextList, message.data])
    }

    client.onclose = () => {
      console.log('Websocket closed')
    }

    return () => {
      console.log('closing')
      client.send('Closing now!!')
      client.close();
    };
  })

  return (
  <>
    <header className="container">
      <div className="iframe-container">      
        <iframe src="https://giphy.com/embed/3oz8xWNwX1WSdyUo5G" width="480" height="360" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/conga-bounce-dance-birds-flipnote-keke-gif-3oz8xWNwX1WSdyUo5G">via GIPHY</a></p>
      </div>
    </header>
  </>)
});

export default Websocket;
