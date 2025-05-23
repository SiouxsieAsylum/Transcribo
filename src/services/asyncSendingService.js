let currentConnection;

const saveConnection = (connection) => {
    if (!currentConnection || connection.id !== currentConnection.id) {
        currentConnection = connection;
    }
}

const sendOverConnection = (topResult) => {
    const { transcript } = topResult;
    // console.log('currentConnection.id', currentConnection.id)
    console.log('sending: ', transcript)
    currentConnection.send(`${transcript} -break- ${currentConnection.id}`)
}


const connectionManagement = {
    saveConnection,
    sendOverConnection
};

module.exports = {
    connectionManagement,
};