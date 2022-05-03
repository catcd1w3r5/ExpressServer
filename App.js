const app = require('./Util/CreateExpressServer');
const {LoadMiddlewares, LoadEndpoints} = require('./Util/AppExtras');

//Locate and load all middlewares in the middleware folder using fs
LoadMiddlewares(app, './Middleware');

//Locate and load all endpoints in the endpoint folder using fs
LoadEndpoints(app, './Controller/Endpoint');

module.exports = app;
