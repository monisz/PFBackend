const { MessageDaoFactory } = require('./messageDaoFactory');
const { Message } = require('./message');
const { argsparse } = require('../../../utils/argsparse');

const daoFactory = new MessageDaoFactory();
console.log("argsparse en servmess", argsparse)
const persistenceType = argsparse.persistenceType;

class MessageService {
  constructor() {
    this.dao = daoFactory.create(persistenceType);
  }
    
  async getListMessages() {
    const allMessages = await this.dao.getAllMessages();
    return allMessages;
  }

  async saveMessage(message/* , email */) {
    const { type, email, timestamp, messageBody } = message
    /* const timestamp = Date.now(); */
    /* const type = "usuario"; */
    /* if (process.env.ADMIN === "true") type = "sistema"; */
    const newMessage = new Message(type, email, timestamp, messageBody);
    console.log("message en service", newMessage)
    const messageSaved = await this.dao.saveMessage(newMessage);
    console.log("newMessage en service", messageSaved)
    return messageSaved;
  }
};
    
module.exports = { MessageService };