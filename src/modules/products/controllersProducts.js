const { ProductService } = require(`./serviceProducts`);
const logger = require('../../../utils/loggers/winston');

const productService = new ProductService();

const getAllProducts = async (req, res) => {
  const allProducts = await productService.getListProducts();
  const products = productsToShow(allProducts);
  const user = req.user;
  const idCart = req.cart;
  const admin = process.env.ADMIN;
  res.render('products', {products, user, admin, idCart});
};

const getProductsByData = async (req, res) => {
  const user = req.user;
  const idCart = req.cart;
  const data = parseInt(req.params.dataToSearch);
  if (isNaN(data)) {
    //considero que si no ingresan un número buscan categoría
    const category = req.params.dataToSearch;
    const productsByCategory = await productService.getProductsByCategory(category);
    if (!productsByCategory) {
      logger.info("no hay productos de esa categoría");
      res.render('products', {user, idCart, category});
  } else {
  const products = productsByCategory;
  console.log("productsByCategory en controller", productsByCategory)
  res.render('products', {products, user, idCart});
  }
} else {
  const id = data;
    const productFinded = await productService.getProductById(id);
    if (!productFinded) {
      logger.info("prod no encontrado");
      res.render('products', {user, idCart, id});
    }
    else {
      const products = [productFinded];
      console.log("productFinded en controller", products)
      res.render('products', {products, user, idCart});
    }
  }
};

const addProduct = async (req, res) => {
  const newProduct = req.body;
  const newId = await productService.addProductToList(newProduct);
  const products = await productService.getListProducts();
  const user = req.user;
  const admin = process.env.ADMIN;
  res.render('products', {products, user, admin, newId});
};

//Recibe un id para actualizar un producto
const getUpdateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  res.render('updateProduct', {id})
};

//Recibe los datos y actualiza un producto por id
const updateProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const newData = req.body;
  const updatedProduct = await productService.replaceProduct(id, newData);
  if (updatedProduct.length == 0) res.status(404).send({error: "producto no encontrado"});
  else {
    const { id, title, description, price, category, thumbnail } = updatedProduct[0];
    res.render('updateProduct', {id, title, description, price, category, thumbnail});
  };
};

const deleteProductById = async (req, res) => {
  const id = parseInt(req.params.id);
  const productDeleted = await productService.deleteProduct(id);
  const { title, description } = productDeleted;
  res.status(200).send(`producto eliminado id: ${id} ${title} ${description}`);
};

const productsToShow = (items) => {
  let products = [];
  items.forEach(element => {
    products.push({
      id: element.id,
      title: element.title,
      price: element.price,
      category: element.category,
      thumbnail: element.thumbnail
    })
  });
  return products;
};

module.exports = { 
  getAllProducts, 
 /*  getProductById,  */
 /*  getProductsByCategory, */
  getProductsByData,
  addProduct, 
  getUpdateProduct, 
  updateProduct, 
  deleteProductById 
};