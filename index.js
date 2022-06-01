const {loadEndpoints, loadMiddlewares} = require('./serverFunctions');
const {setLoggingEndpointOrMiddlewareDisabled, setLoggingFileSkipped} = require('./logging');

const Exports = {
    loadEndpoints,
    loadMiddlewares,
    setLoggingEndpointOrMiddlewareDisabled,
    setLoggingFileSkipped
}

module.exports = Exports;
