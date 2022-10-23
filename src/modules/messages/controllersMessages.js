const { MessageService } = require(`./serviceMessages`);
const logger = require('../../../utils/loggers/winston');

const messageService = new MessageService();
const admin = process.env.ADMIN;

const getMessages = async (req, res) => {
  if (!req.user) res.render('login');
  else {
    const allMessages = await messageService.getListMessages();
    const user = req.user;
    let messageType = "usuario";
    if (admin) messageType = "sistema";
    res.render('messages', { allMessages, user, messageType })
  }
};

/* const sendMessage = async (req, res) => { */
/*   const email = req.user.username; */
/*   console.log("email en controller", email) */
/*   const message = req.body; */
/*   const newMessage = await messageService.saveMessage(message, email); */
/*   res.send('mensaje enviado', newMessage) */
/* } */

const getMessagesByEmail = async (req, res) => {
  const email = req.params.email;
  console.log("email en controller", email)
  const allMessages = await messageService.getListMessages();
  const messagesByEmail = allMessages.filter(message => message.email === email);
  const user = req.user;
  let messageType = "usuario";
  if (admin) messageType = "sistema";
  if (messagesByEmail.length === 0) {
    const notMessagesByEmail = true;
    res.render('messages', { notMessagesByEmail, user, messageType, email });
  }
  res.render('messages', { messagesByEmail, user, messageType })
};

module.exports = { getMessages, /* sendMessage, */ getMessagesByEmail };