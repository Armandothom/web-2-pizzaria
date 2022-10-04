const BDService = require("./bd.service");
const UserEntity = require("../models/entities/user.entity");
const HttpUnauthorizedError = require("../models/errors/http-unauthorized.error");
const HttpBadRequest = require("../models/errors/http-bad-request.error");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require('../../config/json-secret');
const { UserRoleEntity } = require("../models/entities");

class AuthService {
    constructor(bdService = new BDService()) {
        this.bd = bdService;
        this.userEntity = new UserEntity();
        this.userRoleEntity = new UserRoleEntity();
    }

    async login(email, password) {
        try {
            if(!email || !password) {
                throw new HttpBadRequest("Insira e-mail ou password")
            }
            const usersRetrieved = await this.bd.getAll(this.userEntity.modelName, {
                where : {
                    email : email,
                    password : password
                },
                include : [
                    {
                    model : this.bd.getModel(this.userRoleEntity.modelName)
                }
            ]
            });
            if(usersRetrieved.length == 0) {
                throw new HttpUnauthorizedError("E-mail ou senha incorretos");
            }
            const user = usersRetrieved[0];
            return {
                token : jwt.sign(user, jwtSecret, {expiresIn : '1h'})
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService