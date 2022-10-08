const { UserDaoMongoDb } = require('./userDaoMongo');

class UserDaoFactory {
    create(persistenceType) {
        if(persistenceType === "mongoDb") return new UserDaoMongoDb();
        if(persistenceType === "memory") return new UserDaoMemory;
        if(persistenceType === "file") return new UseerDaoFile;
        if(persistenceType === "firebase") return new UserDaoFirebase;
    }
}

module.exports = { UserDaoFactory };