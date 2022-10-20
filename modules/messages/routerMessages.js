const router = require('express').Router();
const isAdmin = require('../middlewares/isAdmin');
const logger = require('../../utils/loggers/winston');
const { getMessages, sendMessage, getMessagesByEmail} = require('./controllersMessages');

const admin = process.env.ADMIN;
logger.info(`admin en routerOrders ${admin}`);

//Para listar todas las órdenes
router.get('/', getMessages);

//Para buscar una orden x id
router.post('/', sendMessage);

//Para borrar una orden según su id
router.get('/:email', getMessagesByEmail);

module.exports = router;