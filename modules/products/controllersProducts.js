const { ProductService } = require(`./serviceProducts`);

const productService = new ProductService();

//Vista de todos los productos
const getAllProducts = async (req, res) => {
    const allProducts = await productService.getListProducts();
    const products = productsToShow(allProducts);
    const user = req.session.user;
    const idCart = req.session.cart;
    const admin = process.env.ADMIN;
    res.render('products', {products, user, admin, idCart});
};


//Para obtener un producto según su id
const getProductById = async (req, res) => {
    const user = req.session.user;
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).send({error: "el parámetro no es un número"});
    const productFinded = await productService.getProduct(id);
    if (!productFinded) {
        logger.info("prod no encontrado");
        res.status(404).send("producto no encontrado");
    }
    else {
       // agregar vista para productFinded - agregar idCart?
        res.render('products', {productFinded, user});
    }
};


//Para agregar un producto
const addProduct = (req, res) => {
    const newProduct = req.body;
    const newId = productService.addProductToList(newProduct);
    /* productService.getListProducts(); */
        res.send('producto agregado');
    /* res.render('products', {products, user}); */
}

//Recibe y actualiza un producto por id
const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const newData = req.body;
    const updatedProduct = productService.replaceProduct(id, newData);
    if (updatedProduct.length == 0) res.status(404).send({error: "producto no encontrado"});
    else res.status(200).send(updatedProduct);
};

//Para borrar un producto según el id
const deleteProductById = async (req, res) => {
    const id = parseInt(req.params.id);
    /* const result = productService.deleteProduct(id); */
    /* if (result.deletedCount == 0) res.status(404).send({error: "producto no encontrado"}); */
    /* else res.send("producto eliminado"); */
    const productDeleted = await productService.deleteProduct(id);
    res.status(200).send(productDeleted);
};

const productsToShow = (items) => {
    let products = [];
    items.forEach(element => {
        products.push(
            {
                id: element.id,
                code: element.code,
                title: element.title,
                price: element.price,
                thumbnail: element.thumbnail
        })
    });
    return products;
};

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProductById };