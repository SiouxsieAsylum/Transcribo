let currentConnection;

const saveConnection = (connection) => {
    if (!currentConnection || connection.id !== currentConnection.id) {
        currentConnection = connection;
    }
}

const sendOverConnection = (transcript) => {
    console.log(currentConnection.id)
    console.log('sending: ', transcript)
    currentConnection.send(transcript)
}


const connectionManagement = {
    saveConnection,
    sendOverConnection
};

module.exports = {
    connectionManagement,
};