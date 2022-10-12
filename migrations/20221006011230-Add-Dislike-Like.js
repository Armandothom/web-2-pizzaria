
const CommentEntity = require('../src/models/entities/comment.entity')
const PublicationEntity = require('../src/models/entities/publication.entity')
const UserRoleEntity = require('../src/models/entities/user-role.entity')
const UserEntity = require('../src/models/entities/user.entity')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log("1")
      await queryInterface.sequelize.query(`
      DROP TABLE IF exists publicacao CASCADE;
      DROP TABLE IF exists "user" CASCADE;
      DROP TABLE IF exists userrole CASCADE;
      DROP TABLE IF exists comentario CASCADE;`);

      let userrole = new UserRoleEntity()
      console.log("2")


      await queryInterface.createTable("userrole", userrole.getAttributes())
      console.log("3")
      let user = new UserEntity()


      await queryInterface.createTable("user", user.getAttributes())
      console.log("4")

      let publicacao = new PublicationEntity()

      console.log("5")

      await queryInterface.createTable("publicacao", publicacao.getAttributes())

      let comentario = new CommentEntity()
      console.log("6")

      await queryInterface.createTable("comentario", comentario.getAttributes())

    } catch (error) {
      console.log(error)
      console.log(JSON.stringify(error))
    }

  },

  async down(queryInterface, Sequelize) {

  }
};
