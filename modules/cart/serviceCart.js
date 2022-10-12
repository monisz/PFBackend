const { CartDaoFactory } = require('./cartDaoFactory');
const { Cart } = require('./cart');
/* const sendMail = require('../../utils/mailer'); */
/* const sendWhatsapp = require('../../utils/whatsapp'); */
const argsparse = require('../../utils/argsparse');

const daoFactory = new CartDaoFactory();
const persistenceType = argsparse.persistenceType;

class CartService {
  constructor() {
    this.dao = daoFactory.create(persistenceType);
  }
    
  //Para crear el carrtio carrito luego del logueo
  async createCart (user) {
    const timestamp = Date.now();
    const products = [];
    const email = user.username;
    const address = user.address;
    const newCart = new Cart(timestamp, products, email, address);
    const newC = await this.dao.saveCart(newCart);
    console.log("nuevocarrito en servicecart", newC)
    return newC.id;
  }
    
  async getCart(id) {
    const cartFinded = await this.dao.getById(id);
    console.log("getcart en servicecart", cartFinded)
    return cartFinded;
  }
    
  async updateCart(id, newData) {
    const updatedCart = await this.dao.updateById(id, newData);
    return updatedCart;
  }  

  //TODO Agregar in boton para eliminar productos del carrito
  // y podría ser otro para vaciar carrito

  async deleteCart(id) {
    const result = await this.dao.deleteById(id);
    return result;
  }
    
  /* //Envío de los avisos de compra por mail y whatsapp */
  /* async sendPurchaseNotices(user, productsInCart) { */
  /*   sendWhatsapp(user); */
  /*   const dataCheckout = { */
  /*     user: user, */
  /*     products: productsInCart    */
  /*   } */
  /*   sendMail(dataCheckout); */
  /*   return dataCheckout; */
  /* } */
}  

module.exports = { CartService };