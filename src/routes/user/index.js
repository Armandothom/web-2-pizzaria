const routing = require('express').Router()

routing.get('/', (request, response) => {
    response.send({message : "oi"})
})

routing.post('/', async (request, response, next) => {
    try {
        await request.app.get('userService').cadastrarUsuario(request.body);
        response.send({success : true})
    } catch (error) {
        next(error)
    }
})

routing.put('/:id', (request, response) => {
    response.send({message : "oi"})
})

module.exports = routing;