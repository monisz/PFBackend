const { MessageDaoMongoDb } = require('./messageDaoMongoDb');

class MessageDaoFactory {
  create(persistenceType) {
    if(persistenceType === "mongoDb") return new MessageDaoMongoDb();
    if(persistenceType === "memory") return new OrderDaoMemory;
    if(persistenceType === "file") return new OrderDaoFile;
    if(persistenceType === "firebase") return new OrderDaoFirebase;
  }
};

module.exports = { MessageDaoFactory };