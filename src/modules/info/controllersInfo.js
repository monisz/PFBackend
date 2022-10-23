const logger = require('../../../utils/loggers/winston');
const { args, argsparse } = require('../../../utils/argsparse');

const port = process.env.PORT || argsparse.port;
const numCPUs = require('os').cpus().length;

const getInfo =  (req, res) => {
  let arguments = 'No se ingresaron argumentos';
  if (args.length !== 0) {
    const puerto = JSON.stringify({port})
    arguments = puerto ;
  }
  const info = {
    arguments: arguments ,
    platform: process.platform,
    version: process.version,
    memory: process.memoryUsage().rss,
    path: process.execPath,
    id: process.pid,
    folder: process.cwd(),
    numCPUs: numCPUs,
    mode: argsparse.mode,
    port: port,
    persistenceType: argsparse.persistenceType,
    sessionTime: argsparse.sessionTime
  };
  logger.info(`info en /info ${info}`);
  res.render('info', {info});
};

module.exports = { getInfo };