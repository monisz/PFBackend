const { ClientMongoDb } = require('../../dataBase/clientMongoDb');
const { userSchema } = require('../../dataBase/userSchema');
const { User } = require('./user');
const { Database } = require('../../dataBase/connectionDatabase');

const connect = Database.getConnection(); 

class UserDaoMongoDb {
  constructor() {
    this.clientMongoDb = new ClientMongoDb(userSchema, connect);
  }

  async saveUser(user) {
    const dto = await user.toDTO();
    return this.clientMongoDb.save(dto);
  }

  async updateById(username, user) {
    const dto = await user.toDTO();
    return this.clientMongoDb.replaceUserById(username, dto);
  }

  async getUserById(username) {
    const dto = await this.clientMongoDb.getUserById(username);
    if (dto.length == 0) return dto;
    else return User.fromDTO(dto[0]);
  }

  async getUsers() {
    const users = await this.clientMongoDb.getAll();
    return users.map(userDto => User.fromDTO(userDto));
  }
};

module.exports = { UserDaoMongoDb };