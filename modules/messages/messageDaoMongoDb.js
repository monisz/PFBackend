const { ClientMongoDb } = require('../../dataBase/clientMongoDb');
const { messageSchema } = require('../../dataBase/messageSchema');
const { Message } = require('./message');
const { Database } = require('../../dataBase/connectionDatabase');

const connect = Database.getConnection();

class MessageDaoMongoDb {
  constructor() {
    this.clientMongoDb = new ClientMongoDb(messageSchema, connect);
  }

  async getAllMessages() {
    const messages = await this.clientMongoDb.getAll();
    return messages.map(messageDto => Message.fromDTO(messageDto));
  }

  async saveMessage(message) {
    console.log(message)
    const dto = await message.toDTO();
    console.log("dto", dto)
    return this.clientMongoDb.save(dto);
  }
}

module.exports = { MessageDaoMongoDb };