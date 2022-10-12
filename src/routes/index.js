const express = require('express');
const router = express.Router();
const { isLogin } = require('../../modules/users/utils/isLogin');

const routerUsers = require('../../modules/users/routerUsers');
const routerProducts = require('../../modules/products/routerProducts');
const routerCart = require('../../modules/cart/routerCart');
const routerMessages = require('../daos/messagesDao_firebase');
const routerRandom = require('../daos/numbersRandom');
const routerOrders = require('../../modules/orders/routerOrders')


router.use('/', routerUsers);
router.use('/productos', isLogin, routerProducts);
router.use('/carrito', isLogin, routerCart);
router.use('/mensajes', isLogin, routerMessages);
router.use('/randoms', isLogin, routerRandom);
router.use('/ordenes', isLogin, routerOrders);

module.exports = router;