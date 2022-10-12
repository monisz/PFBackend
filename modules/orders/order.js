class Order {
  constructor(condition, email, timestamp, products) {
    this.condition = condition,
    this.email = email,
    this.timestamp = timestamp,
    this.products = products
  }

  static fromDTO(dto) {
    const order = new Order();
    order.id = dto.id;
    order.condition = dto.condition;
    order.email = dto.email;
    order.timestamp = dto.timestamp;
    order.products = dto.products;
    return order;
  }

  toDTO() {
    const { id, condition, email, timestamp, products } = this;
    return {
      id, 
      condition,
      email,
      timestamp, 
      products
    }
  }
}

module.exports = { Order };