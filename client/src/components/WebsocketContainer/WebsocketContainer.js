// import { useState, useEffect  } from 'react';
import Websocket from '../Websocket';


const WebsocketContainer = ({update, key}) => {
//  the container reloads but
// - the text persists, 
// - the connection doesnt reestablish, 
//   so the transcription is made but not set to the FE

    return (
        <div 
            key={key}>
            <Websocket/>
        </div>

    )
}

export default WebsocketContainer;