class Message {
  constructor(type, email, timestamp, messageBody) {
    this.type = type,
    this.email = email,
    this.timestamp = timestamp,
    this.messageBody = messageBody
  }

  static fromDTO(dto) {
    const message = new Message();
    message.id = dto.id;
    message.type = dto.type;
    message.email = dto.email;
    message.timestamp = dto.timestamp;
    message.messageBody = dto.messageBody;
    return message;
  }

  toDTO() {
    const { type, email, timestamp, messageBody } = this;
    return {
      type,
      email,
      timestamp, 
      messageBody
    }
  }
}

module.exports = { Message };