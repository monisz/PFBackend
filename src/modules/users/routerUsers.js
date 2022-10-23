const router = require('express').Router();
const { register, registerUser, failRegister, login, loginUser, faillogin, logout, getUserById } = require('./controllersUsers');
const { validateToken, authentication, registration } = require('../../middlewares/auth');
const { getAllProducts } = require('../products/controllersProducts');

router.get('/register', register);

router.post('/register', registration, registerUser);

router.get('/failregister', failRegister);

router.get('/login', /* validateToken, */ login);

router.post('/login', authentication, loginUser);

router.get('/faillogin', faillogin);

router.get('/', validateToken, getAllProducts);
/*  */
/* router.use('/', validateToken); */

router.get('/logout', validateToken, logout);

/* router.get('/:email', getUserById); */

module.exports = router;