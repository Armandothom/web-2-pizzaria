const BDService = require("./bd.service");
const { UserRoleEntity, UserEntity } = require("../models/entities");
const HttpBadRequest = require("../models/errors/http-bad-request.error");

class UserService {
    regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    regexPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/ 
    constructor(bdService = new BDService()) {
        this.bd = bdService;
        this.userEntity = new UserEntity();
        this.userRoleEntity = new UserRoleEntity();
    }

    validarFields(usuarioDto) {
        try {
            if(usuarioDto.email && !this.regexEmail.test(usuarioDto.email)) {
                throw new HttpBadRequest("E-mail inválido")
            }
            if(usuarioDto.password && !this.regexPassword.test(usuarioDto.password)) {
                throw new HttpBadRequest("Senha inválida. Insira letras e números")
            }
        } catch (error) {
            throw error;
        }
    }

    async cadastrarUsuario(usuarioDto) {
        try {
            this.validarFields(usuarioDto);
            await this.bd.insert(this.userEntity.modelName, usuarioDto);
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async editarUsuario(usuarioDto, id, isAdmin) {
        try {
            usuarioDto = isAdmin ? usuarioDto : {nome : usuarioDto.nome, email : usuarioDto.email, password : usuarioDto.password};
            this.validarFields(usuarioDto);
            await this.bd.editItem(this.userEntity.modelName, usuarioDto, id);
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async getUsuarios() {
        try {
            return await this.bd.getAll(this.userEntity.modelName);
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async deleteUsuario(id) {
        try {
            return await this.bd.delete(this.userEntity.modelName, id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService