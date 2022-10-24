const { ProductDaoFactory } = require("./productDaoFactory");
const { Product } = require("./product");
const { argsparse } = require('../../../utils/argsparse');
 
const daoFactory = new ProductDaoFactory();
const persistenceType = argsparse.persistenceType;

class ProductService {
  constructor() {
    this.dao = daoFactory.create(persistenceType);
  }

  async getListProducts () {
    const allProducts = await this.dao.getProducts();
    return allProducts; 
  }

  async addProductToList (newProduct) {
    newProduct.timestamp = Date.now();
    const { title, description, thumbnail, price, category, timestamp } = newProduct;
    const newProd = new Product(title, description, thumbnail, price, category, timestamp);
    const newP = await this.dao.saveProduct(newProd);
    return newP;
  }

  //Recibe y actualiza un producto por id
  async replaceProduct (id, newData) {
    const { title, description, thumbnail, price, category, timestamp } = newData;
    const modifiedProduct = new Product(title, description, thumbnail, price, category, timestamp);
    const updatedProduct = await this.dao.updateById(id, modifiedProduct);
    return updatedProduct;
  }

  async getProductById (id) {
    const productFinded = await this.dao.getProductById(id);
    if (!productFinded) return null;
    return productFinded;
  }

  async getProductsByCategory (category) {
    const productsFinded = await this.dao.getProductsByCategory(category);
    if (!productsFinded) return null;
    return productsFinded;
  }

  async deleteProduct (id) {
    //Para poder devolver el producto completo
    const productFinded = await this.dao.getProductById(id);
    const result = await this.dao.deleteProductById(id);
    if (result == 0) res.status(404).send({error: "producto no encontrado"});
    else return productFinded;
  }
}

module.exports = { ProductService };