const BDService = require("./bd.service");
const { UserEntity, PublicationEntity } = require("../models/entities");

class PublicationService {
    constructor(bdService = new BDService()) {
        this.bd = bdService;
        this.userEntity = new UserEntity();
        this.publicationEntity = new PublicationEntity();
    }

    async criarPublicacao(publicacaoDto, userId) {
        try {
            publicacaoDto.user_id = userId;
            await this.bd.insert(this.publicationEntity.modelName, publicacaoDto);
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}

module.exports = PublicationService