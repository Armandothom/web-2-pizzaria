const jwtService = require("jsonwebtoken");
const { jwtSecret } = require('../../config/json-secret')
const handleError = require('./error-handler')
const HttpForbiddenError = require('../models/errors/http-forbidden.error')
const { noAuthRoutes, adminRoutes } = require('../routes/whitelisted-routes')

async function handleAuth(req, res, next) {
    try {
        const url = replaceUrlToHandle(req.originalUrl);
        const method = req.method;
        if (noAuthRoutes.find(noAuthRoute => {
            if(url.includes("docs") || (noAuthRoute.url == url && noAuthRoute.method == method)) {
                return true;
            }
        })) {
            next();
            return;
        }
        const token = req.headers["authorization"];
        req.userInfo = jwtService.verify(token, jwtSecret);
        if (!req.userInfo) {
            throw new HttpForbiddenError("Usuário não autenticado");
        } else if(!req.userInfo.userrole.adminRights && 
            adminRoutes.find(adminRoute => adminRoute.url == url && adminRoute.method == method)) {
            throw new HttpForbiddenError("Usuário sem permissão para acessar essa rota");
        }
        next();
    } catch (error) {
        if(!(error instanceof HttpForbiddenError)) {
            error = new HttpForbiddenError("Usuário não autenticado");
        }
        handleError(error, res, res, next)
    }
}

    function replaceUrlToHandle(urlString) {
        let url = urlString.split('?')[0];
        url = url.replace(/[0-9]/g, '');
        return url[url.length - 1] == '/' ? url.substring(0, url.length - 1) : url
    }

module.exports = handleAuth;