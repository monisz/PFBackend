const { CartDaoMongoDb } = require('./cartDaoMongoDb');

class CartDaoFactory {
  create(persistenceType) {
    if(persistenceType === "mongoDb") return new CartDaoMongoDb();
    if(persistenceType === "memory") return new CartDaoMemory;
    if(persistenceType === "file") return new CartDaoFile;
    if(persistenceType === "firebase") return new CartDaoFirebase;
  }
}

module.exports = { CartDaoFactory };