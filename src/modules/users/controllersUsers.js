const { UserService } = require(`./serviceUsers`);
const { CartService } = require('../cart/serviceCart');
const logger = require('../../../utils/loggers/winston');

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
  if (!req.user) 
    res.render('login');
  else {
    const user = req.user;
    res.render('home', {user});
  }
};

const loginUser = async (req, res) => {
  const user = userService.defineUser(req.user);
  const idCart = req.cart;
  res.render('home',  {user, idCart});
};

const faillogin = (req, res) => {
  res.render('faillogin');
};

const logout = (req, res) => {
  const username = req.user.username;
  res.clearCookie('token');
  res.render('logout', {username});
};

const getUserById = async (req, res) => {
  const username = req.query;
  const user = await userService.findUser(username);
  res.send(user);
}

module.exports = { register, registerUser, failRegister, login, loginUser, faillogin, logout, getUserById };