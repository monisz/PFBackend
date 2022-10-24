const { MessageDaoFactory } = require('./messageDaoFactory');
const { Message } = require('./message');
const { argsparse } = require('../../../utils/argsparse');

const daoFactory = new MessageDaoFactory();
const persistenceType = argsparse.persistenceType;
class MessageService {
  constructor() {
    this.dao = daoFactory.create(persistenceType);
  }
    
  async getListMessages() {
    const allMessages = await this.dao.getAllMessages();
    return allMessages;
  }

  async saveMessage(message) {
    const { type, email, timestamp, messageBody } = message
    const newMessage = new Message(type, email, timestamp, messageBody);
    const messageSaved = await this.dao.saveMessage(newMessage);
    return messageSaved;
  }
};
    
module.exports = { MessageService };