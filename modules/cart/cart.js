class Cart {
  constructor(timestamp, products) {
    this.timestamp = timestamp,
    this.products = products
  }

  static fromDTO(dto) {
    const cart = new Cart();
    cart.timestamp = dto.timestamp;
    cart.id = dto.id;
    cart.products = dto.products;
    return cart;
  }

  toDTO() {
    const { timestamp, id, products } = this;
    return {
      timestamp, 
      id, 
      products
    }
  }
}

module.exports = { Cart };