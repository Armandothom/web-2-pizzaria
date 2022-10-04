
    const UserRoleEntity = require('../src/entities//user-role.entity')
const UserEntity = require('../src/entities//user.entity')

    'use strict';

    /** @type {import('sequelize-cli').Migration} */
    module.exports = {
      async up (queryInterface, Sequelize) {
        let userrole = new UserRoleEntity()
                

                queryInterface.createTable("userrole", userrole.getAttributes())
let user = new UserEntity()
                

                queryInterface.createTable("user", user.getAttributes())

      },
    
      async down (queryInterface, Sequelize) {
    
      }
    };
    