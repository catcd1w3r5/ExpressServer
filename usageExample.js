const usageExample = require('./createServer')();
const {LoadMiddlewares, LoadEndpoints} = require('./serverFunctions');

//Locate and load all middlewares in the middleware folder using fs
LoadMiddlewares(usageExample, './Middleware');

//Locate and load all endpoints in the endpoint folder using fs
LoadEndpoints(usageExample, './Controller/Endpoint');

module.exports = usageExample;
