const { OrderDaoFactory } = require('./orderDaoFactory');
const { Order } = require('./order');
const sendMail = require('../../../utils/mailer');
const sendWhatsapp = require('../../../utils/whatsapp');
const { argsparse } = require('../../../utils/argsparse');

const daoFactory = new OrderDaoFactory();
const persistenceType = argsparse.persistenceType;

class OrderService {
  constructor() {
    this.dao = daoFactory.create(persistenceType);
  }
    //hacer
  async createOrder(email, products) {
    const timestamp = Date.now();
    const condition = "generada";
    const order = new Order(condition, email, timestamp, products);
    const newOrder = await this.dao.saveOrder(order);
    console.log("newOrder en serviceOrders", newOrder)
    return newOrder.id;
  }

  async getListOrders() {
    const allOrders = await this.dao.getOrders();
    return allOrders;
  }

  async getOrder(id) {
    const orderFinded = await this.dao.getOrderById(id);
    return orderFinded;
  }

  async deleteOrder(id) {
    //Para poder devolver el usuario completo
    //arreglar no tratar de borrar si no lo encontró
    const orderFinded = await this.dao.getOrderById(id);
    const result = await this.dao.deleteOrderById(id);
    if (!result) return null;
    else return orderFinded;
  }
    
  //TODO ver desde donde mando el aviso de compra
  //Envío de los avisos de compra por mail y whatsapp
  async sendPurchaseNotices(user, orderNumber, productsInCart, totalOrder) {
    sendWhatsapp(user);
    const dataCheckout = {
      user: user,
      number: orderNumber,
      products: productsInCart,
      total: totalOrder
    }
    sendMail(dataCheckout);
    return dataCheckout;
  }
};
    
module.exports = { OrderService };