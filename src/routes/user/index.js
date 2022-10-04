const routing = require('express').Router()

routing.get('/', (request, response) => {
    app.userService.
    response.send({message : "oi"})
})

routing.post('/', (request, response) => {
    response.send({message : "oi"})
})

routing.put('/', (request, response) => {
    response.send({message : "oi"})
})

routing.delete('/', (request, response) => {
    response.send({message : "oi"})
})

module.exports = routing;