let loggingWarning = console.warn;

setLoggingWarning = function (callback) {
    loggingWarning = callback;
}

module.exports = {
    loggingWarning,
    setLoggingWarning,
}
