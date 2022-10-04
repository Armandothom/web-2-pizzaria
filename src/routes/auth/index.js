const routing = require('express').Router()

routing.post('/', async (request, response, next) => {
    try {
        await request.app.get('authService').login(request.body.email, request.body.password);
        return {"success" : true}
    } catch(err) {
        next(err);
    }
})

module.exports = routing;