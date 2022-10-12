const { OrderService } = require(`./serviceOrders`);
const logger = require('../../utils/loggers/winston');

const orderService = new OrderService();

const getOrders = async (_, res) => {
  const allOrders = await orderService.getListOrders();
  /* const products = productsToShow(allProducts); */
  /* const user = req.session.user; */
  /* const idCart = req.session.cart; */
  /* const admin = process.env.ADMIN; */
  /* res.render('orders', { allOrders }); */
  res.send(allOrders)
};

const getOrderById = async (req, res) => {
  /* const user = req.session.user; */
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send({error: "el parámetro no es un número"});
  const orderFinded = await orderService.getOrder(id);
  if (!orderFinded) {
    logger.info("no existe esa orden");
    res.status(404).send("no existe esa orden");
  }
  else {
    // agregar vista para orderFinded - agregar idCart?
    /* res.render('orders', { orderFinded }); */
    res.send(orderFinded)
  }
};

const deleteOrderById = async (req, res) => {
  const id = parseInt(req.params.id);
  /* const result = productService.deleteProduct(id); */
  /* if (result.deletedCount == 0) res.status(404).send({error: "producto no encontrado"}); */
  /* else res.send("producto eliminado"); */
  const result = await orderService.deleteOrder(id);
  console.log("result en controller", result)
  if (!result) res.status(404).send({error: "no existe esa orden"});
  else res.status(200).send(`orden nº ${id} eliminada`);
};

/* const productsToShow = (items) => { */
/*   let products = []; */
/*   items.forEach(element => { */
/*     products.push({ */
/*       id: element.id, */
/*       code: element.code, */
/*       title: element.title, */
/*       price: element.price, */
/*       thumbnail: element.thumbnail */
/*     }) */
/*   }); */
/*   return products; */
/* }; */

module.exports = { getOrders, getOrderById, deleteOrderById };