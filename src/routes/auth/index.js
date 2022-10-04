const routing = require('express').Router()

routing.post('/', async (request, response, next) => {
    try {
        const token = await request.app.get('authService').login(request.body.email, request.body.password);
        response.send(token);
    } catch(err) {
        next(err);
    }
})

module.exports = routing;