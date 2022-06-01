const {
  LoadAllFilesFromFolder,
  EnsureFolderExistsSync,
} = require('./fsExtras');
const {loggingWarning} = require('./logging');

/**
 * Loads all middlewares from a folder.
 * @param app {any} -app
 * @param middlewareDir {string} -Path to the folder containing the middleware
 */
function loadMiddlewares(app, middlewareDir) {
  EnsureFolderExistsSync(middlewareDir);
  const middlewares = LoadAllFilesFromFolder(middlewareDir, '.js', require, true);

  function parseInputArray(item, i) {
    if (Array.isArray(item)) {
      middlewares.push(...item);
      // Remove the middleware from the array
      middlewares.splice(i, 1);
      return;
    }

    // If the middleware is a function, convert it to an object and add it to the array
    switch (typeof item) {
      case 'function':
        middlewares[i] = {
          handle: item,
          priority: 0,
          name: 'Middleware Object from Function',
        };
        break;
      case 'object':
        // if priority is not set, set it to 0
        // try parse it
        // if it fails, set it to 0
        // eslint-disable-next-line no-param-reassign
        if (typeof item.priority !== 'number') item.priority = parseInt(middlewares[i].priority, 10) || 0;
        break;
      default:
        throw new Error('Invalid middleware type');
    }
  }

  middlewares.forEach(parseInputArray);

  // sort the middlewares by priority
  middlewares.sort((a, b) => a.priority - b.priority);

  function loadExtractedMiddleware(middleware) {
    const {
      name = 'Unnamed',
      handle,
      disabled,
    } = middleware;

    if (disabled) {
      loggingWarning(`Middleware "${name}" is disabled`);
      return;
    }
    if (typeof handle === 'function') {
      app.use(handle);
    } else {
      throw new Error(`Invalid middleware type,  Middleware "${name}" is not a function`);
    }
  }

  middlewares.forEach(loadExtractedMiddleware);
}

/**
 * Loads all endpoints from a folder.
 * @param app {any} -app
 * @param endpointsDir {string} -Path to the folder containing the endpoints
 */
function loadEndpoints(app, endpointsDir) {
  EnsureFolderExistsSync(endpointsDir);
  const endpoints = LoadAllFilesFromFolder(endpointsDir, '.js', require, true);

  // flatten the array
  endpoints.forEach((endpoint, i) => {
    if (Array.isArray(endpoint)) {
      endpoints.push(...endpoint);
      endpoints.splice(i, 1);
    }
  });

  function loadExtractedEndpoint(endpoint) {
    if (typeof endpoint !== 'object') throw new Error('Invalid endpoint type');
    // many ways to do object endpoints
    // add middleware to express
    const {
      name = 'Unnamed',
      path,
      handler,
      handle,
      disabled,
    } = endpoint;

    const handleFunction = handler || handle;

    let {
      method = 'GET',
    } = endpoint;

    if (disabled) {
      loggingWarning(`Endpoint "${name}" is disabled`);
      return;
    }

    if (typeof method !== 'string') throw new Error(`Endpoint ${name} contains invalid method`);
    method = method.toLowerCase();

    // check if the method is valid
    if (!['get', 'post', 'put', 'delete', 'all'].includes(method)) throw new Error(`Endpoint ${name} contains invalid method "${method}"`);
    // check if the path is valid
    if (typeof path !== 'string') throw new Error(`Endpoint ${name} contains invalid path`);
    // check if the handler is valid
    if (typeof handleFunction !== 'function') throw new Error(`Endpoint ${name} contains invalid handler`);

    app[method](path, handleFunction);
  }

  endpoints.forEach(loadExtractedEndpoint);
}

module.exports = {
  loadMiddlewares,
  loadEndpoints,
};
