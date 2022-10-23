const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/auth');

const routerUsers = require('../modules/users/routerUsers');
const routerProducts = require('../modules/products/routerProducts');
const routerCart = require('../modules/cart/routerCart');
const routerMessages = require('../modules/messages/routerMessages');
const routerOrders = require('../modules/orders/routerOrders');
const routerInfo = require('../modules/info/routerInfo');

router.use('/', routerUsers);
router.use('/productos', validateToken, routerProducts);
router.use('/carrito', validateToken, routerCart);
router.use('/chat', validateToken, routerMessages);
router.use('/ordenes', validateToken, routerOrders);
router.use('/info', validateToken, routerInfo);

module.exports = router;