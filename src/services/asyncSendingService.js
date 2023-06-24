let currentConnection;

const saveConnection = (connection) => {
    currentConnection = connection;
}

const sendOverConnection = (transcript) => {
    console.trace('sending: ', transcript)
    currentConnection.send(transcript)
}


const connectionManagement = {
    saveConnection,
    sendOverConnection
};

module.exports = {
    connectionManagement,
};