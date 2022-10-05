
    const CommentEntity = require('../src/models/entities/comment.entity')
const PublicationEntity = require('../src/models/entities/publication.entity')
const UserRoleEntity = require('../src/models/entities/user-role.entity')
const UserEntity = require('../src/models/entities/user.entity')

    'use strict';

    /** @type {import('sequelize-cli').Migration} */
    module.exports = {
      async up (queryInterface, Sequelize) {
        let comentario = new CommentEntity()
                

                queryInterface.createTable("comentario", comentario.getAttributes())
let publicacao = new PublicationEntity()
                

                queryInterface.createTable("publicacao", publicacao.getAttributes())
let userrole = new UserRoleEntity()
                

                queryInterface.createTable("userrole", userrole.getAttributes())
let user = new UserEntity()
                

                queryInterface.createTable("user", user.getAttributes())

      },
    
      async down (queryInterface, Sequelize) {
    
      }
    };
    