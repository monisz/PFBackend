const { CartService } = require(`./serviceCart`);
const { ProductService } = require('../products/serviceProducts');
const logger = require('../../../utils/loggers/winston');
const { OrderService } = require('../orders/serviceOrders');
const { findDangerousChanges } = require('graphql');

const cartService = new CartService();
const productService = new ProductService();
const orderService = new OrderService();

const getCartById = async (req, res) => {
  let idCart = 0;
  if (req.params.id) idCart = parseInt(req.params.id);
  else idCart = req.cart;
  if (isNaN(idCart)) return res.status(400).send({error: "el parámetro no es un número"});
  const cart = await cartService.getCart(idCart);
  if (!cart) res.status(404).send({error: "carrito no encontrado"});
  else {
    logger.info(`cart en get ${cart}`);
    const user = req.user;
    const productsInCart = cart.products;
    res.render('cart', {productsInCart, user, idCart});
  }
};

//Para agregar un producto al carrito por id del producto (el id del carrito es el de la session)
const addProductToCart = async (req, res) => {
  const idProduct = parseInt(req.params.id);
  if (isNaN(idProduct)) return res.status(400).send({error: "el parámetro no es un número"});
  const productToAdd = await productService.getProductById(idProduct);
  if (!productToAdd) res.status(404).send({error: "producto no encontrado"});
  else {
    const idCart = req.cart;
    const cartFinded = await cartService.getCart(idCart);
    if (!cartFinded) res.send('error: no existe ese carrito');
    else {
      const productFindedInCart = cartFinded.products.find(prod => prod.id == productToAdd.id)
      if (!productFindedInCart) {
        productToAdd.cant = 1;
        cartFinded.products.push(productToAdd);
      } else {
        productToAdd.cant = productFindedInCart.cant + 1;
        cartFinded.products.map(prod => {if(prod.id == productToAdd.id) prod.cant = productToAdd.cant});
      }
      const cartModified = await cartService.updateCart(idCart, cartFinded);
      const productsInCart = cartModified[0].products;
      logger.info(`producto id: ${idProduct} agregado en carrito id: ${idCart}`);
      const user = req.user;
      console.log("direccion en carrito", cartFinded.address)
      res.render('cart', {user, cartModified, productsInCart, idCart});
    }
  }
};

//Para eliminar del carrito el producto (id)
const deleteProductFromCart = async (req, res) => {
  const idCart = req.cart;
  const idProduct = parseInt(req.params.id);
  let cart = await cartService.getCart(idCart);
  const productsInCart = cart.products.filter((elem) => elem.id !== idProduct);
  cart.products = productsInCart;
  const newCart = await cartService.updateCart(idCart, cart);
  logger.info(`producto id: ${idProduct} eliminado del carrito id: ${idCart}`)
  const user = req.user;
  res.render('cart', {user, newCart, productsInCart, idCart});
};

//Al finalizar la compra 
const checkout = async (req, res) => {
  const idCart = req.cart;
  const cartFinded = await cartService.getCart(idCart);
  if (!cartFinded) res.send('error: no existe ese carrito');
  else {
    const productsInCart = cartFinded.products;
    const user = req.user;
    const orderNumber = await orderService.createOrder(user.username, cartFinded.products);
    const totalOrder = productsInCart.reduce((ac, prod) => ac += (prod.price * prod.cant), 0);
    const dataCheckout = orderService.sendPurchaseNotices(user, orderNumber, productsInCart, totalOrder);
    res.render('cart', {user, productsInCart, orderNumber, totalOrder});
  }
};

module.exports = { getCartById, addProductToCart, deleteProductFromCart, checkout };