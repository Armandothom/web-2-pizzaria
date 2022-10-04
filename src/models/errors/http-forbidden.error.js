const HttpError = require("./http.error");

class HttpForbiddenError extends HttpError {
    constructor(message) {
        super(message);
        this.message = message ? message : this.message;
        this.code = 403;
    }
}

module.exports = HttpForbiddenError