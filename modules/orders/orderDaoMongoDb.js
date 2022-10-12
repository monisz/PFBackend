const { ClientMongoDb } = require('../../dataBase/clientMongoDb');
const { orderSchema } = require('../../dataBase/orderSchema');
const { Order } = require('./order');
const { Database } = require('../../dataBase/connectionDatabase');

const connect = Database.getConnection();

class OrderDaoMongoDb {
  constructor() {
    this.clientMongoDb = new ClientMongoDb(orderSchema, connect);
  }

  async saveOrder(order) {
    const dto = await order.toDTO();
    return this.clientMongoDb.save(dto);
  }

  async getOrders() {
    const orders = await this.clientMongoDb.getAll();
    return orders.map(orderDto => Order.fromDTO(orderDto));
  }

  async getOrderById(id) {
    const dto = await this.clientMongoDb.getById(id);
    if (!dto) return null
    console.log(dto)
    return Order.fromDTO(dto[0]);
  }

  async deleteOrderById(id) {
    return await this.clientMongoDb.deleteById(id);
  }
}

module.exports = { OrderDaoMongoDb };