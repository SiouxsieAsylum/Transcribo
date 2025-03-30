import { useEffect, useContext, memo } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import WebsocketContext from '../../contexts/WebsocketContext';

/**
 * how to reload something memoized
 * if i need to reload the component when a key is updated, but not when the text is updated, 
 * should I memoize the key? or the textlist, 
 * as I don't want the text list to rerender the component?

 * ID is now being sent to FE. 

 * */ 

const Websocket = memo(function Websocket(){
  const client = new W3CWebSocket(`ws://127.0.0.1:8000`);
  
  const { update, setErrorStatus } = useContext(WebsocketContext)

  useEffect(() => {
    client.onopen = () => {
      console.log('Websocket Client Connected')
    }

    // do not reassign the env var, just add to it
    client.onmessage = ( message ) => {
      const [text, id] = message.data.split(' -break- ')
      console.log('message', message)
      console.log('id', id)
      update(oldTextList => [...oldTextList, text])
    }

    client.onclose = () => {
      console.log('Websocket closed')
    }

    client.onerror = () => {
      setErrorStatus(true)
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
        <iframe title="gif-container" src="https://giphy.com/embed/3oz8xWNwX1WSdyUo5G" width="480" height="360" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/conga-bounce-dance-birds-flipnote-keke-gif-3oz8xWNwX1WSdyUo5G">via GIPHY</a></p>
      </div>
    </header>
  </>)
});

export default Websocket;
