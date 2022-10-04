const BDService = require("./bd.service");
const UserEntity = require("../models/entities/user.entity");
const HttpUnauthorizedError = require("../models/errors/http-unauthorized.error");
const HttpBadRequest = require("../models/errors/http-bad-request.error");

class AuthService {
    constructor(bdService = new BDService()) {
        this.bd = bdService;
        this.userEntity = new UserEntity();
    }

    async login(email, password) {
        try {
            if(!email || !password) {
                throw new HttpBadRequest("Insira e-mail ou password")
            }
            const user = await this.bd.getAll(this.userEntity.modelName, {
                email : email,
                password : password
            });
            if(user.length == 0) {
                throw new HttpUnauthorizedError("E-mail ou senha incorretos");
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService