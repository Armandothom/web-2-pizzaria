class ModelNotFoundError extends Error {
    constructor(message) {
        this.message = message ? message : "Modelo SEQUELIZE não encontrado"
    }
}

module.exports = ModelNotFoundError