const routing = require('express').Router()

routing.post('/', async (request, response, next) => {
    try {
        await request.app.get('publicationService').criarPublicacao(request.body, request.userInfo.id);
        response.send({success : true});
    } catch(err) {
        next(err);
    }
})

routing.post('/comment/:idpublicacao', async (request, response, next) => {
    try {
        
        await request.app.get('publicationService').commentPublicacao(request.body, request.params.idpublicacao);
        response.send({success : true});
    } catch(err) {
        next(err);
    }
})

routing.get('/comment/:idpublicacao', async (request, response, next) => {
    try {
        const comentarios = await request.app.get('publicationService').getComentarios(request.params.idpublicacao);
        response.send(comentarios)
    } catch(err) {
        next(err);
    }
})

routing.get('/', async (request, response, next) => {
    try {
        const publicationItems = await request.app.get('publicationService').getPublicacao(request.query.valor, request.query.ingredientes);
        response.send(publicationItems);
    } catch(err) {
        next(err);
    }
})

routing.put('/like/:id', async (request, response, next) => {
    try {
        await request.app.get('publicationService').likePublicacao(request.params.id);
        response.send({success : true});
    } catch(err) {
        next(err);
    }
})
module.exports = routing;