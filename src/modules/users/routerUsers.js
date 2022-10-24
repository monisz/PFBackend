const router = require('express').Router();
const { register, registerUser, failRegister, login, loginUser, faillogin, logout } = require('./controllersUsers');
const { validateToken, authentication, registration } = require('../../middlewares/auth');
const { getAllProducts } = require('../products/controllersProducts');

router.get('/register', register);

router.post('/register', registration, registerUser);

router.get('/failregister', failRegister);

router.get('/login', login);

router.post('/login', authentication, loginUser);

router.get('/faillogin', faillogin);

router.get('/', validateToken, getAllProducts);

router.get('/logout', validateToken, logout);

module.exports = router;