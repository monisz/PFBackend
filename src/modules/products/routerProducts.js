const router = require('express').Router();
const isAdmin = require('../../middlewares/isAdmin');
const logger = require('../../../utils/loggers/winston');
const { getAllProducts, getProductsByData, addProduct, getUpdateProduct, updateProduct, deleteProductById } = require('./controllersProducts');

const admin = process.env.ADMIN;
logger.info(`admin en routerProducts ${admin}`);

//Vista de todos los productos
router.get('/', getAllProducts);

//Para obtener un producto según su id (si se ingresa un número)
//o los productos de una categoría 
router.get('/:dataToSearch', getProductsByData);

//Para agregar un producto
router.post('/', isAdmin, addProduct);

//Recibe un producto por id para actualizar
//lo uso de esta manera porque el form no me permite usar method "PUT"
router.get('/put/:id', isAdmin, getUpdateProduct);

//Recibe los nuevos datos del producto y lo actualiza
//lo uso de esta manera porque el form no me permite usar method "PUT"
router.post('/put/:id', isAdmin, updateProduct);

//Para borrar un producto según su id
//lo uso de esta manera porque el form no me permite usar method "DELETE"
router.post('/delete/:id', isAdmin, deleteProductById);


module.exports = router;