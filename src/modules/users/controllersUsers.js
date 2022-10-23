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
  console.log("req.body en controlleruser", req.body)
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
    res.render('home',  {user});
  }
};

const loginUser = async (req, res) => {
  console.log("req.body", req.body)
  console.log("req.user", req.user)
  const user = userService.defineUser(req.user);
  /* req.user = user; */
  /* const idCart = await cartService.createCart(user); */
  const idCart = req.cart;
  console.log("req.cart", req.cart)
  
  res.render('home',  {user, idCart});
};

const faillogin = (req, res) => {
  res.render('faillogin');
};

const logout = (req, res) => {
  console.log("req.user en logout controlleruser",req.user)
  const username = req.user.username;
  /* req.session.destroy((err) => { */
  /* logger.error(err); */
  console.log("token antes de clear", req.cookies.token)
  /* res.clearCookie('token') */
  res.clearCookie('token')
  console.log("token antes de clear", req.cookies.token)
  res.render('logout', {username})
};

const getUserById = async (req, res) => {
  const username = req.query;
  console.log(username)
  const user = await userService.findUser(username)
  res.send(user)
}

//hacer funciones para getList, find, delete, update?


module.exports = { register, registerUser, failRegister, login, loginUser, faillogin, logout, getUserById };