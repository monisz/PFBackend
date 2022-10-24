const router = require('express').Router();
const logger = require('../../../utils/loggers/winston');
const { getMessages, getMessagesByEmail} = require('./controllersMessages');

const admin = process.env.ADMIN;
logger.info(`admin en routerMessages ${admin}`);

//Para listar todos los mensajes
router.get('/', getMessages);

//Para listar los mensajes por email
router.get('/:email', getMessagesByEmail);

module.exports = router;