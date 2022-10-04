const HttpError = require("./http.error");

class HttpBadRequest extends HttpError {
    constructor(message) {
        super(message);
        this.message = message ? message : this.message;
        this.code = 400;
    }
}

module.exports = HttpBadRequest