const routes = require('express').Router();
const userRouter = require('./user');
const authRoutes = require('./auth');
const publicationRoutes = require('./publication');


routes.use('/user', userRouter);
routes.use('/auth', authRoutes);
routes.use('/publication', publicationRoutes);
module.exports = routes;