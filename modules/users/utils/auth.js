const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const argsparse = require('../../../utils/argsparse');
const logger = require('../../../utils/loggers/winston');

const { UserService } = require('../serviceUsers');
const { CartService } = require('../../cart/serviceCart');
const userService = new UserService();
const cartService = new CartService();

const registration = async (req, res, next) => {
  console.log("en registration", req.body, req.body.password, req.body.username)
  if (req.body.password !== req.body.password2) {
    res.render("failRegister", {error: "las contraseñas no coinciden"})
  } else {
    const user = await userService.findUser(req.body.username);
    console.log("user en auth", user)
    if (user.length === 1) return res.status(409).render('failregister', { error: "usuario ya registrado"});
    console.log("password en registration", req.body.password)
    const passwordBcrypt = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    //crear carrito?
    const newUser = { 
      username: req.body.username, 
      password: passwordBcrypt,
      name: req.body.name,
      phone: req.body.phone,
    };
    await userService.saveUser(newUser);
    next();
  }
}

const authentication = async (req, res, next) => {
  console.log("body en authentcation", req.body, req.body.username, req.body.password)
  const user = await userService.findUser(req.body.username);
  console.log("user en auth", user)
  if (user.length === 0) return res.status(401).render("failLogin", { error: "Usuario no registrado" });
  if (bcrypt.compareSync(req.body.password, user.password)) {
    const idCart = await cartService.createCart(user);
    logger.info(`carrito agregado id: ${idCart}`);
    req.cart = idCart 
    const token = generateToken({user, idCart});
    /* res.clearCookie("token"); */
    res.cookie("token", token /* { httpOnly: true} */);
    /* console.log(res.cookie("token", token)) */
    console.log("token", token)
    console.log("res.cookie token", req.cookies.token)
    req.user = user
    next();
  } else return res.render("failLogin", { error: "password incorrecta" })
};

const validateToken = /* async  */(req, res, next) => {
  /* const auth = req.headers.authorization; */
  /* if (!auth) return res.status(401).json({ error: "no autenticado"}); */
  /* const token = auth.split(' ')[1]; */
  /* verifyJwt(token, async ) */

  /* await  */verificarJwt(req.cookies.token, (error, content) => {
    console.log("content", content)
    if (error) {
      console.log("en validate error", error)
      req.user = null;
      /* throw new Error('Token invalido'); */
      res.redirect('/login')
    } else {
      /* req.user = await userService.findUser(content.user.username); */
      req.user = content.user;
      req.cart = content.idCart
      console.log("req.cart en validate", req.cart)
      console.log("req.user en validate", req.user)
    }
    console.log("req.user en validate", req.user)
  });
  next();
/* } */
};

const generateToken = (dataUser) => {
  console.log("user en generatetoken", dataUser)
  console.log(process.env.JWT_SECRET, argsparse.sessionTime)
  return jwt.sign(dataUser, process.env.JWT_SECRET, { expiresIn: argsparse.sessionTime })
};

const verificarJwt = (token, cb) => {
  jwt.verify(token, process.env.JWT_SECRET, cb )
};

const isAdmin = (req, res, next) => {
  if (process.env.ADMIN === "true") next();
  else res.status(403).send("método no autorizado")
};

logger.info(`admin: ${process.env.ADMIN}`);


module.exports = { registration, authentication, validateToken, isAdmin };