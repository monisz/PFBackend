const mongoose = require('mongoose');

const messageModel = new mongoose.Schema({
  type: {type: String, require: true},
  email: {type: String, require: true},
  timestamp: {type: String, require: true},
  messageBody : {type: String, require: true},
  id: {type: Number, require: true},
});

const messageSchema = mongoose.model("message", messageModel);

module.exports = { messageSchema };