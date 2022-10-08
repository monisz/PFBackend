const { UserDaoFactory } = require('./userDaoFactory');
const { User } = require('./user');
const sendMail = require('../../utils/mailer');
const argsparse = require('../../utils/argsparse');

const daoFactory = new UserDaoFactory();
const persistenceType = argsparse.persistenceType;

class UserService {
    constructor() {
        this.dao = daoFactory.create(persistenceType);
    }
    
    defineUser(dataUser) {
        const { username, password, name, address, age, phone } = dataUser;
        const user = new User(username, password, name, address, age, phone);
        return user;
    }

    async getListUsers() {
        const allUsers = await this.dao.getUsers();
        return allUsers;
    }

    async findUser(username) {
        console.log("en finduser")
        const userFinded = await this.dao.getUserById(username);
        console.log(userFinded)
        return userFinded;
    };
    
    //Para agregar un nuevo usuario
    async saveUser(newUser) {
        await this.dao.saveUser(newUser);
    };

    async updateById(username, newData) {
        const { password, name, address, age, phone } = newData;
        const userModified = new User(username, password, name, address, age, phone);
        const updatedUser = await this.dao.updateById(username, userModified);
        return updatedUser;
    }

    async deleteUser(username) {
        //Para poder devolver el usuario completo
        //arreglar no tratar de borrar si no lo encontró
        const userFinded = await this.dao.getUserById(username);
        const result = await this.dao.deleteUserById(username);
        if (result == 0) res.status(404).send({error: "producto no encontrado"});
        else return userFinded;
    }
    
    //Envío de los avisos de compra por mail y whatsapp
    async sendRegistrationNotices(user) {
        sendMail(user);
    };
}
    
module.exports = { UserService };