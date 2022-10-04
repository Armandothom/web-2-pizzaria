const HttpError = require("./http.error");

class HttpUnauthorizedError extends HttpError {
    constructor(message) {
        super(message);
        this.message = message ? message : this.message;
        this.code = 401;
    }
}

module.exports = HttpUnauthorizedError