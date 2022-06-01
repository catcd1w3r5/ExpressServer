const {loadEndpoints, loadMiddlewares} = require('./serverFunctions');
const {setLoggingWarning} = require('./logging');

const Exports = {
    loadEndpoints,
    loadMiddlewares,
    setLoggingWarning,
}

module.exports = Exports;
