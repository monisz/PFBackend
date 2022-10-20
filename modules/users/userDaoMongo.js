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
    console.log("user en datomongo", user)
    const dto = await user.toDTO();
    /* const { username, password, name, phone } = newUser; */
    /* const dto = { username, password, name, phone } */
    console.log("dto", dto)
    return this.clientMongoDb.save(dto);
  }

  async updateById(username, user) {
    const dto = await user.toDTO();
    return this.clientMongoDb.replaceUserById(username, dto);
  }

  async getUserById(username) {
    console.log("username en daomongo", username)
    const dto = await this.clientMongoDb.getUserById(username);
    console.log(dto)
    if (dto.length == 0) return dto;
    else return User.fromDTO(dto[0]);
  }

  async getUsers() {
    const users = await this.clientMongoDb.getAll();
    return users.map(userDto => User.fromDTO(userDto));
  }

  async deleteUserById(username) {
    return await this.clientMongoDb.deleteUserById(username);
  }
};

module.exports = { UserDaoMongoDb };