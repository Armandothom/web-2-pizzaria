const BaseEntity = require('./base.entity')
const { DataTypes, } = require('sequelize');
const PublicationEntity = require('./publication.entity')

class CommentEntity extends BaseEntity {
    constructor() {
        super("comentario");
        this.setAttributes({
            mensagem  : {
                type : DataTypes.STRING,
                unique : false,
                allowNull : false
            },
            publicacao_id : {
                type : DataTypes.INTEGER,
                allowNull : false,
                references : {
                    model : new PublicationEntity().getTableName(),
                    key : "id",
                    field : "publicacao_id"
                }
            },
            likes  : {
                type : DataTypes.INTEGER,
                unique : false,
                defaultValue : 0
            },
            
            dislikes  : {
                type : DataTypes.INTEGER,
                unique : false,
                defaultValue : 0
            },
        })
    }
    
}

module.exports = CommentEntity