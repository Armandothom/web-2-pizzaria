const BDService = require("./bd.service");
const { UserRoleEntity, UserEntity } = require("../models/entities");
const HttpBadRequest = require("../models/errors/http-bad-request.error");

class UserService {
    regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    regexPassword = /^[a-zA-Z0-9]*$/ 
    constructor(bdService = new BDService()) {
        this.bd = bdService;
        this.userEntity = new UserEntity();
        this.userRoleEntity = new UserRoleEntity();
    }

    validarFields(cadastroDto) {
        try {
            if(!this.regexEmail.test(cadastroDto.email)) {
                throw new HttpBadRequest("E-mail inválido")
            }
            if(!this.regexPassword.test(cadastroDto.password)) {
                throw new HttpBadRequest("Senha inválida. Insira apenas letras e números")
            }
        } catch (error) {
            throw error;
        }
    }

    async cadastrarUsuario(cadastroDto) {
        try {
            console.log(cadastroDto)
            this.validarFields(cadastroDto);
            await this.bd.insert(this.userEntity.modelName, cadastroDto);
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}

module.exports = UserService