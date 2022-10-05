
const { Sequelize } = require('sequelize');
const config = require('../../config/config.json')
const {BaseEntity, UserEntity, UserRoleEntity, PublicationEntity, CommentEntity} = require('../models/entities')
const ModelNotFoundError = require('../models/errors/model-not-found.error')

class BDService {
    initializedEntities = [];
    constructor() {
        this.sequelize = new Sequelize(`postgres://${config.development.username}:${config.development.password}@${config.development.host}:${config.development.port}/${config.development.database}`);
        this.initializeEntities();
        this.setAssociation();
    }

    initializeEntities() {
        const entities = [UserEntity, BaseEntity, UserRoleEntity, PublicationEntity, CommentEntity]
        for (const Entity of entities) {
            const instantiatedEntity = new Entity();
            this.initializedEntities.push(instantiatedEntity)
            const tableName = instantiatedEntity.getTableName();
            if(tableName) {
                this.sequelize.define(instantiatedEntity.modelName, instantiatedEntity.getAttributes(), 
                {tableName : tableName,
                freezeTableName : true,
                paranoid : true})
            }
        }
    }

    setAssociation() {
        for (const entity of this.initializedEntities) {
            for (const key of Object.keys(entity.getAttributes())) {
                if(entity.attributes[key].references) {
                    const modelReferencedName = entity.attributes[key].references.model;
                    const modelReferenced = this.getModel(modelReferencedName);
                    const modelParent = this.getModel(entity.modelName);
                    modelParent.belongsTo(modelReferenced, {
                        targetKey : "id",
                        foreignKey : entity.attributes[key].references.field
                    });
                }
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

    async getAll(modelName, options = null, association = null) {
        try {
            let model = this.getModel(modelName);
            const modelValue = await model.findAll(options ? options : {})
            return modelValue.map((model) => model.get({plain : true}))
        } catch (error) {
            throw error;
        }
    }

    async getById(modelName, id) {
        try {
            let model = this.getModel(modelName);
            const modelValue = await model.findOne({
                where : {
                    id : id
                }
            })
            return modelValue ? modelValue.get({plain : true}) : null
        } catch (error) {
            throw error;
        }
    }

    
}

module.exports = BDService