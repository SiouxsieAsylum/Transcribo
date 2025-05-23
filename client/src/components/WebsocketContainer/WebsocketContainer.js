import { useContext } from 'react';
import WebsocketClientHandler from '../WebsocketClientHandler';
import WebsocketContext from '../../contexts/WebsocketContext';


const WebsocketContainer = () => {
const { connectionClientId } = useContext(WebsocketContext)

    return (
        <div 
            connection={connectionClientId}>
            <WebsocketClientHandler/>
        </div>

    )
}

export default WebsocketContainer;