const BaseEntity = require('./base.entity')
const { DataTypes, } = require('sequelize');
const UserEntity = require('./user.entity');

class PublicationEntity extends BaseEntity {
    constructor() {
        super("publicacao");
        this.setAttributes({
            nome  : {
                type : DataTypes.STRING,
                unique : false
            },
            descricao  : {
                type : DataTypes.STRING,
                unique : false
            },
            ingredientes  : {
                type : DataTypes.STRING,
                unique : false
            },
            foto  : {
                type : DataTypes.STRING,
                unique : false
            },
            valor  : {
                type : DataTypes.DECIMAL,
                unique : false
            },
            likes  : {
                type : DataTypes.INTEGER,
                unique : false,
                defaultValue : 0
            },
            user_id : {
                type : DataTypes.INTEGER,
                allowNull : false,
                references : {
                    model : new UserEntity().getTableName(),
                    key : "id",
                    field : "user_id"
                }
            }
        })
    }
    
}

module.exports = PublicationEntity