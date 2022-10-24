const path = require('path');
if(!process.env.NODE_ENV) process.env.NODE_ENV = "prod";
console.log(process.env.NODE_ENV)
require("dotenv").config({
  path: path.resolve(__dirname, process.env.NODE_ENV + ".env")
});
const express = require('express');
const { engine } = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const cp = require('cookie-parser');
/* const MongoStore = require('connect-mongo'); */
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');
const logger = require('./utils/loggers/winston');
const { argsparse } = require('./utils/argsparse');
const apiRoutes = require('./src/routes/index');

const { MessageService } = require('./src/modules/messages/serviceMessages');
const messageService = new MessageService();

const app = express();
const httpServer = new HttpServer(app);
const ioServer = new SocketServer(httpServer);

app.use(express.static('public'));
app.use(express.json());
app.use(cp());
app.use(express.urlencoded({ extended: true }));

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
  })
);

app.set('views', './public/views');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  logger.info(`ruta: ${req.url}, método: ${req.method}`);
  next();
});

app.use('/', apiRoutes);

// Para cualquier ruta no implementada
app.use((req, res) => {
  logger.warn(`ruta: ${req.url}, método: ${req.method} no implementada`);
  res.status(404).send("ruta no implementada");
});

const port = process.env.PORT || argsparse.port;
logger.info(`en server admin: ${process.env.ADMIN}, persistenceType: ${argsparse.persistenceType}`);
logger.info(`argsparse.mode ${argsparse.mode}`)
logger.info(`argsparse.st ${argsparse.sessionTime}`)
logger.info(`process.env.MODE ${process.env.MODE}`)

if (argsparse.mode === "cluster" || process.env.MODE === "cluster") {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }    
  } else {
    httpServer.listen(port, () => {
      logger.info(`escuchando PFBackend en puerto ${port}, pid: ${process.pid}`);
    });
  }
} else {
  httpServer.listen(port, () => {
    logger.info(`escuchando PFBackend en puerto ${port}, pid: ${process.pid}`);
  });
};

ioServer.on('connection', (socket) => {
  logger.info('Nuevo cliente conectado');
  const getMessages = (async () => {
    socket.emit('messages', await messageService.getListMessages());
  }) ();  
  socket.on("newMessage", (message) => {
    const saveMessage = (async (message) => {
      await messageService.saveMessage(message);
      const allMessages = await messageService.getListMessages();
      ioServer.sockets.emit("messages", allMessages);
    }) (message);
  });
});