const {LoadAllFilesFromFolder, EnsureFolderExistsSync} = require('./FsExtras');

/**
 * Loads all middlewares from a folder.
 * @param app {Express} -Express app
 * @param middlewareDir {string} -Path to the folder containing the middleware
 */
function LoadMiddlewares(app, middlewareDir) {
    {
        EnsureFolderExistsSync(middlewareDir);
        let middlewares = LoadAllFilesFromFolder(middlewareDir, '.js', require, true);

        for (let i = 0; i < middlewares.length; i++) {
            if (Array.isArray(middlewares[i])) {
                middlewares.push(...middlewares[i]);
                //Remove the middleware from the array
                middlewares.splice(i, 1);
                continue;
            }

            //If the middleware is a function, convert it to an object and add it to the array
            switch (typeof middlewares[i]) {
                case 'function':
                    middlewares[i] = {handle: middlewares[i], priority: 0, name: 'Middleware Object from Function'};
                    break;
                case 'object':
                    //if priority is not set, set it to 0
                    if (typeof middlewares[i].priority === 'number') break;
                    //try parse it
                    //if it fails, set it to 0
                    middlewares[i].priority = parseInt(middlewares[i].priority) || 0;
                    break;
                default:
                    throw new Error('Invalid middleware type');
            }
        }

        //sort the middlewares by priority
        middlewares.sort((a, b) => a.priority - b.priority);

        for (let i = 0; i < middlewares.length; i++) {
            const {name = 'Unnamed', handle, disabled} = middlewares[i];

            if (disabled) {
                console.log(`Middleware "${name}" is disabled`);
                continue;
            }
            if (typeof handle === 'function') app.use(handle);
            else throw new Error(`Invalid middleware type,  Middleware "${name}" is not a function`);
        }

    }
}

/**
 * Loads all endpoints from a folder.
 * @param app {Express} -Express app
 * @param endpointsDir {string} -Path to the folder containing the endpoints
 */
function LoadEndpoints(app, endpointsDir) {
    {
        EnsureFolderExistsSync(endpointsDir);
        let endpoints = LoadAllFilesFromFolder(endpointsDir, '.js', require, true);

        //flatten the array
        for (let i = 0; i < endpoints.length; i++) {
            if (Array.isArray(endpoints[i])) endpoints.push(...endpoints[i]);
            endpoints.splice(i, 1);
        }

        for (let i = 0; i < endpoints.length; i++) {

            //PAIN
            if (typeof endpoints[i] !== 'object') throw new Error('Invalid endpoint type');
            //many ways to do object endpoints
            //add middleware to express
            let {name = 'Unnamed', method = 'GET', path, handler, disabled} = endpoints[i];
            if (disabled) {
                console.log(`Middleware "${name}" is disabled`);
                continue;
            }

            if (typeof method !== 'string') throw new Error(`Endpoint ${name} contains invalid method`);
            method = method.toLowerCase();

            //check if the method is valid
            if (!['get', 'post', 'put', 'delete', 'all'].includes(method)) throw new Error(`Endpoint ${name} contains invalid method "${method}"`);
            //check if the path is valid
            if (typeof path !== 'string') throw new Error(`Endpoint ${name} contains invalid path`);
            //check if the handler is valid
            if (typeof handler !== 'function') throw new Error(`Endpoint ${name} contains invalid handler`);

            app[method](path, handler);
        }
    }
}

module.exports = {
    LoadMiddlewares,
    LoadEndpoints
};
