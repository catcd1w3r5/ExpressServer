const {loadEndpoints, loadMiddlewares} = require('./serverFunctions');
const {setLoggingEMDisabled, setLoggingEMLoad,setLoggingError, setDebug} = require('./logging');

const Exports = {
    loadEndpoints,
    loadMiddlewares,
    setLoggingEMDisabled,
    setLoggingEMLoad,
    setLoggingError,
    setDebug,
}

module.exports = Exports;
