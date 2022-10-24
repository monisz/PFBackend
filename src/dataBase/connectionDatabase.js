const mongoose = require('mongoose');
const logger = require('../../utils/loggers/winston');

/* const { MongoClient } = require('mongodb'); */

let connection = null;
class Database {
  constructor() {
    if (process.env.NODE_ENV === "PROD") {
      const config = {
        mongoDb: {
          url: process.env.MONGO_ATLAS_CONNECTION,
          options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }
        }
      }

      const connectToMongoAtlas = () => {
        try {
          mongoose.connect(config.mongoDb.url, config.mongoDb.options);
          console.log('conectado a Mongo Atlas');
        } catch (error) {
          logger.error(`error en Mongo Atlas ${error}`);
        }
      }
      this.connection = connectToMongoAtlas();

    } else {
      const connectToMongoLocal = () => {
        try {
          mongoose.connect(process.env.MONGO_DB);
          console.log('conectado a Mongo local');
        } catch (error) {
          logger.error(`error en Mongo local ${error}`);
        }
      }
      this.connection = connectToMongoLocal();
    }
  }
  
  static getConnection() {
    if (!connection) connection = new Database();
    return connection;
  }
};

//Prueba Singleton
const database = Database.getConnection();
const database2 = Database.getConnection();
console.log("Database connection, database === database2:", database === database2);

module.exports = { Database };