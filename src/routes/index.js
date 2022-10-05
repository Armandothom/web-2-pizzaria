const routes = require('express').Router();
const userRouter = require('./user');
const userRoleRoutes = require('./userrole');
const authRoutes = require('./auth');
const publicationRoutes = require('./publication');


routes.use('/user', userRouter);
routes.use('/userrole', userRoleRoutes);
routes.use('/auth', authRoutes);
routes.use('/publication', publicationRoutes);

module.exports = routes;