const SuppportedServerTypes = [
    'express',
    'restana',
]
/**
 * Creates  a server with the server type
 * @type {Express|any}
 */
module.exports = (serverType = 'express', options = {}) => {
    if (SuppportedServerTypes.indexOf(serverType) === -1) {
        throw new Error(`${serverType} is not a supported server type`)
    }
    if (serverType === 'express' || serverType === 'restana') {
        return require(serverType)(options)
    }
};
