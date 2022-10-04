const { DataTypes } = require('sequelize');

class BaseEntity {
    attributes = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        deletedAt : {
            allowNull : true,
            type : DataTypes.DATE
        }
    }
    constructor(modelName) {
        this.modelName = modelName
    }

    setAttributes(attributesEntity) {
        this.attributes = {
            ...this.attributes,
            ...attributesEntity
        }
    }

    getAttributes() {
        return this.attributes;
    }

    getTableName() {
        return this.modelName.toLowerCase();
    }
}

module.exports = BaseEntity