const minimist = require('minimist');

const args = process.argv.slice(2);
const argsparse = minimist(args, {
  default: {
    port: 8080,
    mode: 'fork',
    persistenceType : 'mongoDb',
    sessionTime: '10m'
  },
  alias: {
    p: 'port',
    m: 'mode',
    t: 'persistenceType',
    s: 'sessionTime'
  }
});

module.exports = argsparse;