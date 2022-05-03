/**
 * Normalize a port into a number, string, or false.
 * @param val {string}
 * @return {(number|string|boolean)}
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
    // named pipe
    if (isNaN(port)) return val;
    // port number
    if (port >= 0) return port;
    return false;
}

/**
 * Generate Event listener for HTTP server "error" and "listening" events.
 * @param server {*} - HTTP server instance.
 * @param port {number} - Port number.
 * @return {{function , function}} - Event listeners.
 */
function getListeners(server, port) {

    /**
     * Event listener for HTTP server "error" event.
     */
    const onError = (error) => {
        if (error.syscall !== 'listen') throw error;

        const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }


    /**
     * Event listener for HTTP server "listening" event.
     */
    const onListening = () => {
        const address = server.address();
        const bind = (typeof address === 'string') ? 'pipe ' + address : 'port ' + address.port;

        const startUpMessage = `
-------------[Server Status]-------------
Listening on ${bind}
Server started and accessible via http://localhost:${port}
-----------------------------------------
`
        console.log(startUpMessage);
    }

    return {onError, onListening}
}

module.exports = {normalizePort, getListeners};
