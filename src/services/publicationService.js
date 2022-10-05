const BDService = require("./bd.service");
const { UserEntity, PublicationEntity } = require("../models/entities");
const { Op } = require("sequelize");

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

    async getPublicacao(valorMaximo, ingredientes) {
        try {
            return await this.bd.getAll(this.publicationEntity.modelName, {
                where : {
                    ...(ingredientes ? {ingredientes : {[Op.iLike]: `${ingredientes}%`}} : {}),
                    ...(valorMaximo ? {valor : {[Op.lte]: +valorMaximo}} : {})
                }
            })
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async likePublicacao(publicacaoId) {
        try {
            const publicacao = await this.bd.getById(this.publicationEntity.modelName, publicacaoId);
            publicacao.likes += 1;
            await this.bd.editItem(this.publicationEntity.modelName, publicacao, publicacao.id);
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}

module.exports = PublicationService