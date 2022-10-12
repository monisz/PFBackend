const router = require('express').Router();
const { getCartById, addProductToCart, deleteCartById, deleteProductFromCart, checkout } = require('./controllersCart');

//Al finalizar la compra 
router.post('/compra', checkout);

//Para listar todos los productos de un carrito según su id
router.get('/:id', getCartById);

//Para agregar un producto al carrito por id del producto
//el id del carrito es el de la session
router.post('/:id', addProductToCart);

//Para borrar un carrito según su id
router.delete('/:id', deleteCartById);

//Para eliminar del carrito(id) el producto (id_prod)
router.delete('/:id/:id_prod', deleteProductFromCart);

module.exports = router;