const { UserService } = require(`./serviceUsers`);
const { CartService } = require('../cart/serviceCart');
const logger = require('../../utils/loggers/winston');

const userService = new UserService();
const cartService = new CartService();

const register = (req, res) => {
  res.render('register');
};

const registerUser = (req, res) => {
  const registerSuccess = 'Registrado exitosamente. Ir a Login para ingresar';
  userService.sendRegistrationNotices(req.body);
  res.render('register', {registerSuccess});
};

const failRegister = (req, res) => {
  res.render('failregister');
};

const login = (req, res) => {
  if (!req.session.user) 
    res.render('login');
  else {
    const user = req.session.user;
    res.render('home',  {user});
  }
};

const loginUser = async (req, res) => {
  const user = userService.defineUser(req.user);
  req.session.user = user;
  const idCart = await cartService.createCart(user);
  req.session.cart = idCart;
  logger.info(`carrito agregado id: ${idCart}`);
  res.render('home',  {user, idCart});
};

const faillogin = (req, res) => {
  res.render('faillogin');
};

const logout = (req, res) => {
  const username = req.session.user.username;
  req.session.destroy((err) => {
  logger.error(err);
  res.render('logout', {username})
  });
};

//hacer funciones para getList, find, delete, update?


module.exports = { register, registerUser, failRegister, login, loginUser, faillogin, logout };