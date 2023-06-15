import Message from '../Message';

function MessageContainer({textList}) {
    return (<>
      {textList.map(text => (
        <Message 
          key={text}
          message={text}
          />
      ))}
    </>)
}

export default MessageContainer
