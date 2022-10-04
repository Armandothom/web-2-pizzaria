const routing = require('express').Router()
const HttpForbiddenError = require('../../models/errors/http-forbidden.error')



routing.get('/', async (request, response, next) => {
    try {
        const usuarios = await request.app.get('userService').getUsuarios();
        response.send(usuarios);
    } catch (error) {
        next(error)
    }
})

routing.delete('/:id', async (request, response, next) => {
    try {
        await request.app.get('userService').deleteUsuario(request.params.id);
        response.send({success : true})
    } catch (error) {
        next(error)
    }
})

routing.post('/', async (request, response, next) => {
    try {
        await request.app.get('userService').cadastrarUsuario(request.body);
        response.send({success : true})
    } catch (error) {
        next(error)
    }
})

routing.put('/myself', async (request, response, next) => {
    try {
        await request.app.get('userService').editarUsuario(request.body, request.userInfo.id, request.userInfo.userrole.adminRights);
        response.send({success : true})
    } catch (error) {
        next(error);
    }
})

routing.put('/:id', async (request, response, next) => {
    try {
        const userId = request.params.id;
        if(!request.userInfo.userrole.adminRights && request.userInfo.id != userId) {
            throw new HttpForbiddenError("Usuário sem permissão para acessar a rota");
        } 
        await request.app.get('userService').editarUsuario(request.body, userId, request.userInfo.userrole.adminRights);
        response.send({success : true})
    } catch (error) {
        next(error);
    }
})

module.exports = routing;