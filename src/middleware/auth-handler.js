const jwtService = require("jsonwebtoken");
const { jwtSecret } = require('../../config/json-secret')
const handleError = require('./error-handler')
const HttpForbiddenError = require('../models/errors/http-forbidden.error')

async function handleAuth(req, res, next) {
    try {
        const whitelistedRoutes = ["/auth"];
        if(whitelistedRoutes.includes(req.originalUrl)) {
            next();
            return;
        }
        const token = req.headers["authorization"];
        req.userInfo = jwtService.verify(token, jwtSecret);
        if (!req.userInfo) {
            throw new HttpForbiddenError("Usuário não autenticado");
        }
        next();
    } catch (error) {
        console.error(error)
        handleError(new HttpForbiddenError("Usuário não autenticado"), res, res, next)
    }
}

module.exports = handleAuth;