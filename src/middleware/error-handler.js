const HttpError = require('../models/errors/http.error')
const HttpBadRequest = require('../models/errors/http-bad-request.error')
function handleError(err, req, res, next) {
    console.log(err)
    if (err.name == 'SequelizeValidationError' || err.name == "SequelizeUniqueConstraintError") {
        const sequelizeErrorDetail = err.errors[0];
        switch (sequelizeErrorDetail.validatorKey) {
            case "is_null":
                err = new HttpBadRequest(`O campo ${sequelizeErrorDetail.path} não pode ser nulo`)
                break;
            case "not_unique":
                err = new HttpBadRequest(`Valor do campo ${sequelizeErrorDetail.path} já existente na plataforma`)
                break;
            default:
                break;
        }
    }
    if (!err.code || err.code < 400 && err.code > 500) {
        err = new HttpError(err.message ? err.message : null);
    }
    res.status(err.code).send({
        code: err.code,
        message: err.message
    });
}

module.exports = handleError;