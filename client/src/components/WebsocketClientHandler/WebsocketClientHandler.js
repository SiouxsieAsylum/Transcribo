import { useEffect, useContext } from 'react';

import WebsocketContext from '../../contexts/WebsocketContext';
import MessageListContext from '../../contexts/MessageListContext';

/**
 * how to reload something memoized
 * if i need to reload the component when a key is updated, but not when the text is updated, 
 * should I memoize the key? or the textlist, 
 * as I don't want the text list to rerender the component?

 * ID is now being sent to FE. 

 * */ 

const Websocket = function Websocket(){
  const { setErrorStatus, connectionClientId, client } = useContext(WebsocketContext)
  const { update } = useContext(MessageListContext)

  useEffect(() => {
    client.onopen = () => {
      console.log('Websocket Client Connected: ' + connectionClientId)
      client.send(connectionClientId);
    }

    client.onmessage = ( message ) => {
      const [text, id] = message.data.split(' -break- ')
      console.log('message', message)
      console.log('id', id)
      update(oldTextList => [...oldTextList, text])
    }

    client.onclose = (event) => {
      console.log('Websocket closed')
    }

    client.onerror = () => {
      setErrorStatus(true)
    }

    return () => {
      console.log('hi not closing')
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
};

export default Websocket;
