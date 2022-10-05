const routing = require('express').Router()

routing.post('/', async (request, response, next) => {
    try {
        await request.app.get('publicationService').criarPublicacao(request.body, request.userInfo.id);
        response.send({success : true});
    } catch(err) {
        next(err);
    }
})

module.exports = routing;