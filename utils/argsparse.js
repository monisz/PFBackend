const minimist = require('minimist');

const args = process.argv.slice(2);
const argsparse = minimist(args, {
  default: {
    port: 8080,
    mode: 'fork',
    sessionTime: '10m',
    persistenceType : 'mongoDb'
  },
  alias: {
    p: 'port',
    m: 'mode',
    s: 'sessionTime',
    t: 'persistenceType'
  }
});

module.exports = { argsparse, args };