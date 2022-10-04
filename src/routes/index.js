const routes = require('express').Router();
const userRouter = require('./user');
const userRoleRoutes = require('./userrole');
const authService = require('./auth')

routes.use('/user', userRouter);
routes.use('/userrole', userRoleRoutes);
routes.use('/auth', authService);

module.exports = routes;