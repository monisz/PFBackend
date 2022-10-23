const { OrderDaoMongoDb } = require('./orderDaoMongoDb');

class OrderDaoFactory {
  create(persistenceType) {
    if(persistenceType === "mongoDb") return new OrderDaoMongoDb();
    if(persistenceType === "memory") return new OrderDaoMemory;
    if(persistenceType === "file") return new OrderDaoFile;
    if(persistenceType === "firebase") return new OrderDaoFirebase;
  }
};

module.exports = { OrderDaoFactory };