const router = require('express').Router();
const isAdmin = require('../../middlewares/isAdmin');
const logger = require('../../../utils/loggers/winston');
const { getOrders, getOrderById, deleteOrderById } = require('./controllersOrders');

const admin = process.env.ADMIN;
logger.info(`admin en routerOrders ${admin}`);

//Para listar todas las órdenes
router.get('/', isAdmin, getOrders);

//Para buscar una orden x id
router.get('/:id', isAdmin, getOrderById);

//Para borrar una orden según su id
router.delete('/:id', isAdmin, deleteOrderById);

module.exports = router;