let loggingEndpointOrMiddlewareDisabled = console.warn;
let loggingFileSkipped = console.warn;

setLoggingEndpointOrMiddlewareDisabled = (callback) => loggingEndpointOrMiddlewareDisabled = callback;
setLoggingFileSkipped = (callback) => loggingFileSkipped = callback;


module.exports = {
    loggingEndpointOrMiddlewareDisabled,
    loggingFileSkipped,
    setLoggingEndpointOrMiddlewareDisabled,
    setLoggingFileSkipped
}
