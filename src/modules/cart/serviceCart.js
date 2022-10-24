const { CartDaoFactory } = require('./cartDaoFactory');
const { Cart } = require('./cart');
const { argsparse } = require('../../../utils/argsparse');

const daoFactory = new CartDaoFactory();
const persistenceType = argsparse.persistenceType;

class CartService {
  constructor() {
    this.dao = daoFactory.create(persistenceType);
  }
    
  //Para crear el carrito luego del logueo
  async createCart (user) {
    const timestamp = Date.now();
    const products = [];
    const email = user.username;
    const address = user.address;
    const newCart = new Cart(timestamp, products, email, address);
    const newC = await this.dao.saveCart(newCart);
    return newC.id;
  }
    
  async getCart(id) {
    const cartFinded = await this.dao.getById(id);
    return cartFinded;
  }
    
  async updateCart(id, newData) {
    const updatedCart = await this.dao.updateById(id, newData);
    return updatedCart;
  }
}  

module.exports = { CartService };