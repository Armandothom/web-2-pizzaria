const BaseEntity = require('./base.entity')
const { DataTypes } = require('sequelize');
const UserRoleEntity = require('./user-role.entity');

class UserEntity extends BaseEntity {
    constructor() {
        super("user");
        this.setAttributes({
            email : {
                type : DataTypes.STRING,
                allowNull : false,
                unique : true
            },
            password : {
                type : DataTypes.STRING,
                allowNull : false,
                unique : false
            },
            user_role_id : {
                type : DataTypes.INTEGER,
                allowNull : false,
                references : {
                    model : new UserRoleEntity().getTableName(),
                    key : "id",
                    field : "user_role_id"
                }

            }
        })
    }
    
}

module.exports = UserEntity