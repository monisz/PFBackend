const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { argsparse } = require('../../utils/argsparse');
const logger = require('../../utils/loggers/winston');

const { UserService } = require('../modules/users/serviceUsers');
const { CartService } = require('../modules/cart/serviceCart');
const userService = new UserService();
const cartService = new CartService();

const registration = async (req, res, next) => {
  if (req.body.password !== req.body.password2) {
    res.render("failRegister", {error: "las contraseñas no coinciden"})
  } else {
    const user = await userService.findUser(req.body.username);
    if (user.length === 1) return res.status(409).render('failregister', { error: "usuario ya registrado"});
    const passwordBcrypt = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    const newUser = { 
      username: req.body.username, 
      password: passwordBcrypt,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
    };
    await userService.saveUser(newUser);
    next();
  }
}

const authentication = async (req, res, next) => {
  const user = await userService.findUser(req.body.username);
  if (user.length === 0) return res.status(401).render("failLogin", { error: "Usuario no registrado" });
  if (bcrypt.compareSync(req.body.password, user.password)) {
    const idCart = await cartService.createCart(user);
    logger.info(`carrito agregado id: ${idCart}`);
    req.cart = idCart;
    const token = generateToken({user, idCart});
    res.cookie("token", token);
    req.user = user;
    next();
  } else return res.render("failLogin", { error: "password incorrecta" });
};

const validateToken = (req, res, next) => {
  verificarJwt(req.cookies.token, (error, content) => {
    if (error) {
      req.user = null;
      /* throw new Error('Token invalido'); */
      res.redirect('/login');
    } else {
      req.user = content.user;
      req.cart = content.idCart;
    }
  });
  next();
};

const generateToken = (dataUser) => {
  return jwt.sign(dataUser, process.env.JWT_SECRET, { expiresIn: argsparse.sessionTime })
};

const verificarJwt = (token, cb) => {
  jwt.verify(token, process.env.JWT_SECRET, cb )
};


module.exports = { registration, authentication, validateToken };