class User {
  constructor(username, password, name, address, phone) {
    this.username = username,
    this.password = password,
    this.name = name,
    this.address = address,
    this.phone = phone
  }

  static fromDTO(dto) {
    const user = new User();
    user.username = dto.username;
    user.password = dto.password;
    user.name = dto.name;
    user.address = dto.address;
    user.phone = dto.phone;
    return user;
  }

  toDTO() {
    const { username, password, name, address, phone } = this;
    return {
      username, 
      password, 
      name,
      address,
      phone 
    }
  }
}

module.exports = { User };