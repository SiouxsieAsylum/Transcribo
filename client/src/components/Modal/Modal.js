const Modal = ({contents, callback}) => {
    const {title, message, buttonText} = contents;
    
    return (
    <div>
        <h1>{title}</h1>
        <p>{message}</p>
        <button
            onClick={() => callback()}
            >{buttonText}</button>
    </div>)
}

export default Modal;