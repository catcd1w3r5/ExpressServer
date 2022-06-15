const {
    LoadAllFilesFromFolder,
    EnsureFolderExistsSync,
} = require('./fsExtras');
const {
    loggingEMDisabled,
    loggingEMLoad,
    loggingError,
    debug
} = require('./logging');

const loadFile = (filePath) => {
    const file = require(filePath);
    return [file, filePath];
}

/**
 * Loads all middlewares from a folder.
 * @param app {any} -app
 * @param middlewareDir {string} -Path to the folder containing the middleware
 */
function loadMiddlewares(app, middlewareDir) {
    function parseInputArray(item, i) {
        debug(`parsing item at ${item[1]}`)
        if (Array.isArray(item[0])) {
            middlewares.push(...item[0]);
            // Remove the middleware from the array
            middlewares.splice(i, 1);
            return;
        }
        // If the middleware is a function, convert it to an object and add it to the array
        switch (typeof item[0]) {
            case 'function':
                middlewares[i] = {
                    handle: item[0],
                    priority: 0,
                    name: 'Middleware Object from Function',
                };
                break;
            case 'object':
                // if priority is not set, set it to 0
                // try parse it
                // if it fails, set it to 0
                // eslint-disable-next-line no-param-reassign
                if (typeof item[0].priority !== 'number') item.priority = parseInt(middlewares[i].priority, 10) || 0;
                if (item[0].name === undefined) item[0].name = item[1];
                middlewares[i] = item[0];
                break;
            default:
                loggingError(`Invalid middleware type: ${typeof item[0]} located in ${item[1]}`);
        }
    }

    function loadExtractedMiddleware(middleware) {
        const {
            name = 'Unnamed',
            handle,
            disabled,
        } = middleware;

        if (disabled) {
            loggingEMDisabled(`Middleware "${name}" is disabled`);
            return;
        }
        if (typeof handle === 'function') {
            app.use(handle);
            loadCount++;
        } else {
            loggingError(`Invalid middleware type,  Middleware "${name}" is not a function`);
        }
    }

    let loadCount = 0
    EnsureFolderExistsSync(middlewareDir);
    const middlewares = LoadAllFilesFromFolder(middlewareDir, '.js', loadFile, true);

    middlewares.forEach(parseInputArray);

    // sort the middlewares by priority
    middlewares.sort((a, b) => a.priority - b.priority);

    middlewares.forEach(loadExtractedMiddleware);
    loggingEMLoad(`loaded ${loadCount} middleware(s)`);
}

/**
 * Loads all endpoints from a folder.
 * @param app {any} -app
 * @param endpointsDir {string} -Path to the folder containing the endpoints
 */
function loadEndpoints(app, endpointsDir) {
    function loadExtractedEndpoint(endpoint) {
        if (typeof endpoint[0] !== 'object') throw new Error('Invalid endpoint type');
        // many ways to do object endpoints
        // add middleware to express
        const {
            name = endpoint[1],
            path,
            handler,
            handle,
            disabled,
        } = endpoint[0];

        const handleFunction = handler || handle;

        let {
            method = 'GET',
        } = endpoint[0];

        if (disabled) {
            loggingEMDisabled(`Endpoint "${name}" is disabled`);
            return;
        }

        if (typeof method !== 'string') loggingError(`Endpoint ${name} contains invalid method`);
        method = method.toLowerCase();

        // check if the method is valid
        if (!['get', 'post', 'put', 'delete', 'all'].includes(method)) loggingError(`Endpoint ${name} contains invalid method "${method}"`);
        // check if the path is valid
        if (typeof path !== 'string') loggingError(`Endpoint ${name} contains invalid path`);
        // check if the handler is valid
        if (typeof handleFunction !== 'function') loggingError(`Endpoint ${name} contains invalid handler`);

        app[method](path, handleFunction);
        loadCount++;
    }

    let loadCount = 0
    EnsureFolderExistsSync(endpointsDir);
    const endpoints = LoadAllFilesFromFolder(endpointsDir, '.js', loadFile, true);

    // flatten the array
    endpoints.forEach((endpoint, i) => {
        if (Array.isArray(endpoint[0])) {
            endpoints.push(...endpoint[0]);
            endpoints.splice(i, 1);
        }
    });


    endpoints.forEach(loadExtractedEndpoint);

    loggingEMLoad(`loaded ${loadCount} endpoints(s)`);
}

module.exports = {
    loadMiddlewares,
    loadEndpoints,
};
