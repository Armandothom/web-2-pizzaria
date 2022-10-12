const BDService = require("./bd.service");
const { UserEntity, PublicationEntity, CommentEntity } = require("../models/entities");
const { Op } = require("sequelize");
const HttpNotFoundError = require("../models/errors/http-not-found.error");
const HttpBadRequest = require("../models/errors/http-bad-request.error");

class PublicationService {
    constructor(bdService = new BDService()) {
        this.bd = bdService;
        this.userEntity = new UserEntity();
        this.publicationEntity = new PublicationEntity();
        this.commentEntity = new CommentEntity();
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

    async getPublicacaoMostLikes() {
        try {
            const resp = await this.bd.getAll(this.publicationEntity.modelName, {
                order : [['likes', "DESC"]]
            })
            return resp.length > 0 ? resp[0] : []
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async getComentarios(idPublicacao) {
        try {
            const comentarios = await this.bd.getAll(this.commentEntity.modelName, {
                where : {
                    publicacao_id : idPublicacao
                }
            })
            return comentarios.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes))
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async likeComment(commentId) {
        try {
            const comment = await this.bd.getById(this.commentEntity.modelName, commentId);
            if(!comment) {
                throw new HttpNotFoundError(`Comentario inexistente`);
            }
            comment.likes += 1;
            await this.bd.editItem(this.commentEntity.modelName, comment, comment.id);
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async dislikeComment(commentId) {
        try {
            const comment = await this.bd.getById(this.commentEntity.modelName, commentId);
            if(!comment) {
                throw new HttpNotFoundError(`Comentario inexistente`);
            }
            comment.dislikes += 1;
            await this.bd.editItem(this.commentEntity.modelName, comment, comment.id);
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async likePublicacao(publicacaoId) {
        try {
            const publicacao = await this.bd.getById(this.publicationEntity.modelName, publicacaoId);
            if(!publicacao) {
                throw new HttpNotFoundError(`Publicação inexistente`);
            }
            publicacao.likes += 1;
            await this.bd.editItem(this.publicationEntity.modelName, publicacao, publicacao.id);
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async commentPublicacao(commentDto, publicacaoId) {
        try {
            const publicacao = await this.bd.getById(this.publicationEntity.modelName, publicacaoId);
            if(!publicacao) {
                throw new HttpNotFoundError(`Publicação inexistente`);
            }
            commentDto.publicacao_id = publicacaoId;
            if(commentDto && commentDto.mensagem.length == 0) {
                throw new HttpBadRequest("O comentário não pode ser vazio")
            } 
            await this.bd.insert(this.commentEntity.modelName, commentDto);
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}

module.exports = PublicationService