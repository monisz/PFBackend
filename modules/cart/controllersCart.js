const { CartService } = require(`./serviceCart`);
const { ProductService } = require('../products/serviceProducts');
const logger = require('../../utils/loggers/winston');
const { OrderService } = require('../orders/serviceOrders');

const cartService = new CartService();
const productService = new ProductService();
const orderService = new OrderService();

const getCartById = async (req, res) => {
  let idCart = 0;
  if (req.params.id) idCart = parseInt(req.params.id);
  else idCart = req.session.cart;
  if (isNaN(idCart)) return res.status(400).send({error: "el parámetro no es un número"});
  const cart = await cartService.getCart(idCart);
  if (!cart) res.status(404).send({error: "carrito no encontrado"});
  else {
    logger.info(`cart en get ${cart}`);
    const user = req.session.user;
    const productsInCart = cart.products;
    res.render('cart', {productsInCart, user, idCart});
  }
};

//Para agregar un producto al carrito por id del producto (el id del carrito es el de la session)
const addProductToCart = async (req, res) => {
  const idProduct = parseInt(req.params.id);
  if (isNaN(idProduct)) return res.status(400).send({error: "el parámetro no es un número"});
  const productToAdd = await productService.getProduct(idProduct);
  if (!productToAdd) res.status(404).send({error: "producto no encontrado"});
  else {
    const idCart = req.session.cart;
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
      const user = req.session.user;
      res.render('cart', {user, cartModified, productsInCart, idCart});
    }
  }
};

//Para borrar un carrito según el id
const deleteCartById = (req, res) => {
  const id = parseInt(req.params.id);
  const result = cartService.deleteCart(id);
  if (result.deletedCount == 0) res.status(404).send({error: "producto no encontrado"});
  else res.send("producto eliminado");
};

//Para eliminar del carrito(id) el producto (id_prod)
const deleteProductFromCart = async (req, res) => {
  const idCart = parseInt(req.params.id);
  const idProduct = parseInt(req.params.id_prod);
  if ( isNaN(idCart) || isNaN(idProduct) ) return res.status(400).send({error: "algún parámetro no es un número"});
  else {
    const cartFinded = await cartService.getCart(idCart);
    if (!cart) res.send('error: no existe ese carrito');
    else {
      const productFinded = cartFinded[0].products.find((elem) => elem.id === idProduct);
      if (!productFinded) res.send('error: no existe ese producto en el carrito');
      else {
        cartFinded[0].products = cartFinded[0].products.filter((elem) => elem.id !== idProduct);
        const cartModified = await cartService.updateCart(idCart, cartFinded[0]);
        const productsInCart = cartModified[0].products;
        logger.info(`carrito modificado ${cartModified[0]}`)
      //TODO agregar esto al front
          /* const user = req.session.user; */
      /* res.render('cart', {user, cartModified, cart, productsInCart, idCart}); */        
        res.send(`producto id: ${idProduct} eliminado del carrito id: ${idCart}`);
      };
    }
  }
};

//Al finalizar la compra 
const checkout = async (req, res) => {
  console.log("en checlout")
  const idCart = req.session.cart;
  console.log("en checkout", idCart)
  const cartFinded = await cartService.getCart(idCart);
  if (!cartFinded) res.send('error: no existe ese carrito');
  else {
    const productsInCart = cartFinded.products;
    const user = req.session.user;
    /* const dataCheckout = cartService.sendPurchaseNotices(user, productsInCart);     */    
    /* logger.info(`productos comprados ${productsInCart}`); */
    /* res.render('cart', {productsInCart, user, idCart, dataCheckout}); */
    const orderNumber = await orderService.createOrder(user.username, cartFinded.products);
    const totalOrder = productsInCart.reduce((ac, prod) => ac += (prod.price * prod.cant), 0);
    console.log(totalOrder)
    const dataCheckout = orderService.sendPurchaseNotices(user, orderNumber, productsInCart, totalOrder);
    console.log(dataCheckout)
    res.render('cart', {user, productsInCart, orderNumber, totalOrder});
  }
};

module.exports = { getCartById, addProductToCart, deleteCartById, deleteProductFromCart, checkout };