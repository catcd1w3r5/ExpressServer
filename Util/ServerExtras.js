/**
 * Checks if project is being run in debug mode
 * @type {boolean}
 */
const debugMode =
    typeof v8debug === 'object' ||
    /--debug|--inspect/.test(process.execArgv.join(' ')) ||
    require('inspector').url() !== undefined;


module.exports = {debugMode}
