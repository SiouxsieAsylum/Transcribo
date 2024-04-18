import { useState, useEffect } from 'react';
import Websocket from '../Websocket';
import { v4 as uuidv4 } from "uuid";

const WebsocketContainer = ({update}) => {
    const [websocketClientId, setWebsocketClientId] = useState(uuidv4())

    return (
        <div 
            key={websocketClientId}>
            <Websocket
                update={update}
                />
        </div>

    )
}

export default WebsocketContainer;