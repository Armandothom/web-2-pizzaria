class HttpError extends Error {
    constructor(message) {
        super(message)
        this.message = message ? "Ocorreu um erro inesperado" : message
        this.code = 500;
    }
}

module.exports = HttpError