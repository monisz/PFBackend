const express = require('express');
const router = express.Router();
const { validateToken } = require('./../../modules/users/utils/auth');

const routerUsers = require('../../modules/users/routerUsers');
const routerProducts = require('../../modules/products/routerProducts');
const routerCart = require('../../modules/cart/routerCart');
const routerMessages = require('../../modules/messages/routerMessages');
const routerRandom = require('../daos/numbersRandom');
const routerOrders = require('../../modules/orders/routerOrders')


router.use('/', routerUsers);
router.use('/productos', validateToken, routerProducts);
router.use('/carrito', validateToken, routerCart);
router.use('/chat', validateToken, routerMessages);
router.use('/randoms', validateToken, routerRandom);
router.use('/ordenes', validateToken, routerOrders);

module.exports = router;