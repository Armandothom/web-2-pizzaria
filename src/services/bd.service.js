
const { Sequelize } = require('sequelize');
const config = require('../../config/config.json')
const {BaseEntity, UserEntity, UserRoleEntity} = require('../models/entities')
const ModelNotFoundError = require('../models/errors/model-not-found.error')

class BDService {
    constructor() {
        this.sequelize = new Sequelize(`postgres://${config.development.username}:${config.development.password}@${config.development.host}:${config.development.port}/${config.development.database}`);
        this.initializeEntities();
    }

    initializeEntities() {
        const entities = [UserEntity, BaseEntity, UserRoleEntity]
        for (const Entity of entities) {
            const instantiatedEntity = new Entity();
            const tableName = instantiatedEntity.getTableName();
            if(tableName) {
                this.sequelize.define(instantiatedEntity.modelName, instantiatedEntity.getAttributes(), 
                {tableName : tableName,
                freezeTableName : true})
            }
        }
    }

    getModel(modelName) {
        try {
            const model = this.sequelize.model(modelName);
            if(!model) {
                throw new ModelNotFoundError();
            }
            return model;
        } catch (error) {
            throw error;
        }
    }

    async insert(modelName, body) {
        try {
            let model = this.getModel(modelName);
            const dataDto = await model.create(body);
            return dataDto;
        } catch (error) {
            throw error;
        }
    }

    async delete(modelName, id) {
        try {
            let model = this.getModel(modelName);
            return await model.destroy({
                where : {
                    id : id
                }
            })
        } catch (error) {
            throw error;
        }
    }


    async editItem(modelName, body, id) {
        try {
            let model = this.getModel(modelName);
            return await model.update(body, {
                where : {
                    id : id
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getAll(modelName, whereOptions = null) {
        try {
            let model = this.getModel(modelName);
            return await model.findAll(whereOptions ? {
                where : whereOptions
            } : {})
        } catch (error) {
            throw error;
        }
    }

    async getById(modelName, whereOptions = null) {
        try {
            let model = this.getModel(modelName);
            return await model.findOne({
                where : whereOptions
            })
        } catch (error) {
            throw error;
        }
    }

    
}

module.exports = BDService