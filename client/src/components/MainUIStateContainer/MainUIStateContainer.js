import { useState } from 'react';
import MessageContainer from '../MessageContainer';
import WebsocketContainer from '../WebsocketContainer';

import MessageListContext from '../../contexts/MessageListContext';


function MainUIStateContainer() {
    const [textList, setTextList] = useState([]);

    return (
      <>
        <MessageListContext.Provider value={{update: setTextList}}>
            <WebsocketContainer />
        </MessageListContext.Provider>
        <MessageContainer 
            textList={textList}
        />
      </>
    )
}

export default MainUIStateContainer;