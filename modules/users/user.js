class User {
  constructor(username, password, name, phone) {
    this.username = username,
    this.password = password,
    this.name = name,
    this.phone = phone
  }

  static fromDTO(dto) {
    const user = new User();
    user.username = dto.username;
    user.password = dto.password;
    user.name = dto.name;
    user.phone = dto.phone;
    return user;
  }

  toDTO() {
    const { username, password, name, phone } = this;
    return {
      username, 
      password, 
      name,
      phone 
    }
  }
}

module.exports = { User };