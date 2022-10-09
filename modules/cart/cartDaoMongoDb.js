const { ClientMongoDb } = require('../../dataBase/clientMongoDb');
const { cartSchema } = require('../../dataBase/cartSchema');
const { Cart } = require('./cart');
const { Database } = require('../../dataBase/connectionDatabase');

const connect = Database.getConnection(); 

class CartDaoMongoDb {
  constructor() {
    this.clientMongoDb = new ClientMongoDb(cartSchema, connect);
  }

  async saveCart(cart) {
    const dto = await cart.toDTO();
    return this.clientMongoDb.save(dto);
  }

  async getById(id) {
    const dto = await this.clientMongoDb.getById(id);
    return Cart.fromDTO(dto[0]);
  }
  
  async updateById(id, cart) {
    const dto = await cart.toDTO();
    return this.clientMongoDb.replaceById(id, dto);
  }

  /* async getProducts() { */
  /*     const products = await this.clientMongoDb.getAll(); */
  /*     return products.map(prodDto => Product.fromDTO(prodDto)); */
  /* } */

  async deleteById(id) {
      return await this.clientMongoDb.deleteById(id);
  }
}

module.exports = { CartDaoMongoDb };