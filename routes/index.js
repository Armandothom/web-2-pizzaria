const routes = require('express').Router();
const userRouter = require('./user');
const userRoleRoutes = require('./userrole');

routes.use('/user', userRouter);
routes.use('/userrole', userRoleRoutes);

module.exports = routes;