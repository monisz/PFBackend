const logger = require('../../utils/loggers/winston');
logger.info("conectados a mongo");
class ClientMongoDb {
  constructor (collection, connect) {
    this.connection = connect;
    this.collection = collection;
    this.id = 1;
  }    

  async save(dto) {
    try {
      const allItems = await this.collection.find(); 
      dto['id'] = allItems.length + 1;
      try {
        const elementToSave = new this.collection(dto)
        const newElement = await elementToSave.save();
        logger.info(`agregado exitoso ${dto.id}`);
        return newElement
      }
      catch (error) {
        logger.error(`el error al guardar fue: ${error}`);
        return null
      }
    }
    catch (error) {
      logger.error(`error en Save ${error}`);
    }
  } 

  async saveUser(user) {
    try {
      const userToSave = new this.collection(user[0])
      await userToSave.save();
      logger.info(`agregado exitoso ${user.username}`);
    }
    catch (error) {
      logger.error(`el error al guardar fue: ${error}`);
    }
    return user.username;
  }
        
  async replaceById(idSearch, data) {
    try {
      await this.collection.findOneAndUpdate({id: idSearch}, {$set: data});
      const result = await this.collection.find({id: idSearch});
      logger.info(`replace id: ${result[0].id}`);
      return result
    }
    catch (error) {
      logger.error(`error al reemplazar datos ${error}`);
      return null
    }
  }  

  async replaceUserById(username, data) {
    try {
      await this.collection.findOneAndUpdate({username: username}, {$set: data});
      const result = await this.collection.find({username: username});
      logger.info(`replace id: ${result[0].username}`);
      return result
    }
    catch (error) {
      logger.error(`error al reemplazar datos ${error}`);
      return null
    }
  }

  async getById(idSearch) {
    try {
      const objectFinded = await this.collection.find({id: idSearch});
      if (objectFinded.length > 0) {
          logger.info(`objeto encontrado en getById, id: ${objectFinded[0].id}`);
          return objectFinded;
      }
      else return null;
    }
    catch (error) {
      logger.error(`error al buscar por id ${error}`);
    }
  }

  async getByCategory(categorySearch) {
    try {
      const items = await this.collection.find({category: categorySearch});
      if (items.length > 0) {
          logger.info(`items encontrados en getByCategory, category: ${categorySearch}`);
          return items;
      }
      else return null;
    }
    catch (error) {
      logger.error(`error al buscar por category ${error}`);
    }
  }


  async getUserById(username) {
    try {
      const userFinded = await this.collection.find({username: username});
      console.log("userFinded en client", userFinded)
      return userFinded;
    }
    catch (error) {
      logger.error(`error al buscar por id ${error}`);
    }
  }

  async getAll() {
    try {
      const allItems = await this.collection.find();
      return allItems;
    }
    catch (error) {
      logger.error(`error en getAll ${error}`);
      return [];
    }
  }

  async deleteById(idSearch) {
    try {
      const result = await this.collection.deleteOne({id: idSearch});
      return result;
    }
    catch (error) {
      logger.error(`error en deleteById ${error}`);
    }
  }

  async deleteUserById(username) {
    try {
      return result = await this.collection.deleteOne({username: username});
    }
    catch (error) {
     logger.error(`error en deleteById ${error}`);
    }
  }
};

/* class Carts extends Container { */
/*     constructor(){ */
/*         super(Cart); */
/*     } */
/* }; */
/* const colCart = new Carts(); */
/* class Users extends Container { */
/*     constructor() { */
/*         super(User); */
/*     } */
/* }; */
/* const colUser = new Users(); */

module.exports = { ClientMongoDb/* , mongooseConnection *//* colCart, colUser */ };