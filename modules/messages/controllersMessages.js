const { MessageService } = require(`./serviceMessages`);
const logger = require('../../utils/loggers/winston');

const messageService = new MessageService();

const getMessages = async (req, res) => {
  if (!req.user) res.render('login');
  else {
    const allMessages = await messageService.getListMessages();
    const username = req.user.username;
    res.render('messages', { allMessages, username })
  }
};

const sendMessage = async (req, res) => {
  const email = req.user.username;
  console.log("email en controller", email)
  const message = req.body;
  const newMessage = await messageService.saveMessage(message, email);
  res.send('mensaje enviado', newMessage)
}

const getMessagesByEmail = async (req, res) => {
  /* const user = req.session.user; */
  const email = req.params.email;
  console.log(email)
  const allMessages = await messageService.getListMessages();
  const messagesByEmail = allMessages.filter(message => message.email === email)
  console.log("messabesbyemail", messagesByEmail)
  if (!messagesByEmail) {
    logger.info("no existen mensajes de ese email");
    res.status(404).send("no existen mensajes de ese email");
  }
  else {
    const username = req.user.username;
    console.log("username en getbyemail", username)
    // agregar vista para orderFinded - agregar idCart?
    /* res.render('orders', { orderFinded }); */
    res.render('messages', { messagesByEmail, username })
  }
};

/* const productsToShow = (items) => { */
/*   let products = []; */
/*   items.forEach(element => { */
/*     products.push({ */
/*       id: element.id, */
/*       code: element.code, */
/*       title: element.title, */
/*       price: element.price, */
/*       thumbnail: element.thumbnail */
/*     }) */
/*   }); */
/*   return products; */
/* }; */

module.exports = { getMessages, sendMessage, getMessagesByEmail };