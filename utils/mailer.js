const nodemailer = require('nodemailer');
const logger = require('./loggers/winston');

const sendMail = (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: 'mvszewczuk@gmail.com',
      pass: process.env.PW_GMAIL
    }
  });

  let subject = "";
  let content = "";
  let attachments = [];

  if (data.products) {
    subject = `Orden de compra Nº: ${data.number}, de ${data.user.name}, email: ${data.user.username}`;
    let list = "";
    data.products.forEach(product => {
      list = list + `<li>${product.cant} ${product.title}, Precio unitario: ${product.price}</li>`            
    });
    content = `
      <h2>Detalle de la orden:</h2>
      <ul>
          ${list}
      </ul>
      <h3>Total de la compra: $ ${data.total}
      `;
  } else {
    subject = "Nuevo registro";
    content = `
      <h1>Datos del nuevo registro:</h1>
      <p>nombre de usuario (email): ${data.username}</p>
      <p>nombre y apellido: ${data.name}</p>
      <p>dirección: ${data.address}</p>
      <p>edad: ${data.age}</p>
      <p>teléfono: ${data.phone}</p>
      `;
    attachments = [
      {
        path: __dirname + `../public/avatars/${data.username}.jpeg`
      }
    ]
  };

  const mailOptions = {
    from: 'Backend <ms@coder.com>',
    to: process.env.GMAIL_USER,
    subject: subject,
    html: content,
    attachments: attachments
  };
    
  transporter.sendMail(mailOptions)
  .then((result) => {
    logger.info(result);
  }).catch (console.log);
};

module.exports = sendMail;
