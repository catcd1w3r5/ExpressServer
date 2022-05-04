const createServer = require('./createServer');
const {loadMiddlewares, loadEndpoints} = require('./serverFunctions');
const {debugMode} = require('./serverExtras');

module.exports = {
    createServer,
    loadMiddlewares,
    loadEndpoints,
    debugMode
}
