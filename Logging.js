const loggers = {
    loggingEMDisabled: (msg) => console.warn(msg),
    loggingEMLoad: (msg) => console.info(msg),
    loggingError: (msg) => {
        throw new Error(msg);
    },
    debug: () => {
    },
}


setLoggingEMDisabled = (callback) => loggers.loggingEMDisabled = callback;
setLoggingEMLoad = (callback) => loggers.loggingEMLoad = callback;
setLoggingError = (callback) => loggers.loggingError = callback;
setDebug = (callback) => loggers.debug = callback;


module.exports = {
    ...loggers,

    setLoggingEMDisabled,
    setLoggingEMLoad,
    setLoggingError,
    setDebug
}
