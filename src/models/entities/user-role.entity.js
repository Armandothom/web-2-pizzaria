const BaseEntity = require('./base.entity')
const { DataTypes, } = require('sequelize');

class UserRoleEntity extends BaseEntity {
    constructor() {
        super("UserRole");
        this.setAttributes({
            nomeRole  : {
                type : DataTypes.STRING,
                unique : false
            },
                adminRights : {
                type : DataTypes.BOOLEAN,
                unique : false
            }
        })
    }
    
}

module.exports = UserRoleEntity