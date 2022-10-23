class Cart {
  constructor(timestamp, products, email, address) {
    this.timestamp = timestamp,
    this.products = products,
    this.email = email,
    this.address = address
  }

  static fromDTO(dto) {
    const cart = new Cart();
    cart.timestamp = dto.timestamp;
    cart.id = dto.id;
    cart.products = dto.products;
    cart.email = dto.email;
    cart.address = dto.address;
    return cart;
  }

  toDTO() {
    const { timestamp, id, products, email, address } = this;
    return {
      timestamp, 
      id, 
      products,
      email,
      address
    }
  }
}

module.exports = { Cart };