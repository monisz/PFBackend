class Product {
  constructor(title, description, thumbnail, price, category, timestamp) {
    this.title = title,
    this.description = description,
    this.thumbnail = thumbnail,
    this.price = price,
    this.category = category,
    this.timestamp = timestamp
  }

  static fromDTO(dto) {
    const prod = new Product();
    prod.title = dto.title;
    prod.description = dto.description;
    prod.thumbnail = dto.thumbnail;
    prod.price = dto.price;
    prod.category = dto.category;
    prod.timestamp = dto.timestamp;
    prod.id = dto.id;
    return prod;
  }

  toDTO() {
    const { title, description, thumbnail, price, category, timestamp, id } = this;
    return {
      title, 
      description, 
      thumbnail, 
      price, 
      category, 
      timestamp, 
      id
    }
  }
};

module.exports = { Product };