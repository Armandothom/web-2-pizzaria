const HttpError = require('../models/errors/http.error')

function handleError(err, req, res, next) {
    console.error(err)
    if(!err.code || err.code < 400 && err.code > 500) {
        err = new HttpError(err.message ? err.message : null);
    }
    res.status(err.code).send({
        code : err.code,
        message : err.message
    });
}

module.exports = handleError;