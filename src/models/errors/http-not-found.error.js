const HttpError = require("./http.error");

class HttpNotFoundError extends HttpError {
    constructor(message) {
        super(message);
        this.message = message ? message : this.message;
        this.code = 404;
    }
}

module.exports = HttpNotFoundError