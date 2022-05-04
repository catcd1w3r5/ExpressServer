const SuppportedServerTypes = [
  'express',
  'restana',
];

/**
 * Creates  a server with the server type
 * @return {Express|any}
 */
// eslint-disable-next-line consistent-return
const createServer = (serverType = 'express', options = {}) => {
  if (SuppportedServerTypes.indexOf(serverType) === -1) {
    throw new Error(`${serverType} is not a supported server type`);
  }
  if (serverType === 'express' || serverType === 'restana') {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(serverType)(options);
  }
};

module.exports = createServer;
