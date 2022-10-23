const { ClientMongoDb } = require('../../dataBase/clientMongoDb');
const { productSchema } = require('../../dataBase/productSchema');
const { Product } = require('./product');
const { Database } = require('../../dataBase/connectionDatabase');

const connect = Database.getConnection();
class ProductDaoMongoDb {
  constructor() {
    this.clientMongoDb = new ClientMongoDb(productSchema, connect);
  }

  async saveProduct(product) {
    const dto = await product.toDTO();
    return this.clientMongoDb.save(dto);
  }

  async updateById(id, product) {
    const dto = await product.toDTO();
    return this.clientMongoDb.replaceById(id, dto);
  }

  async getProductById(id) {
    const dto = await this.clientMongoDb.getById(id);
    if (!dto) return null;
    console.log("dto en daomongo", dto)
    return Product.fromDTO(dto[0]);
  }

  async getProductsByCategory(category) {
    const products = await this.clientMongoDb.getByCategory(category);
    /* if (!dto) return null; */
    /* console.log("dto en daomongo", dto) */
    /* return Product.fromDTO(dto[0]); */
    if(!products) return null;
    return products.map(prodDto => Product.fromDTO(prodDto));
  }


  async getProducts() {
    const products = await this.clientMongoDb.getAll();
    return products.map(prodDto => Product.fromDTO(prodDto));
  }

  async deleteProductById(id) {
    return await this.clientMongoDb.deleteById(id);
  }
}

module.exports = { ProductDaoMongoDb };