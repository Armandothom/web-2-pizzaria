const express = require('express')
const app = express()
const routes = require('./src/routes')
const port = 3000
const {BDService, AuthService} = require('./src/services')
const handleError = require('./src/middleware/error-handler')
const handleAuth = require('./src/middleware/auth-handler')
const UserService = require('./src/services/userService')
const PublicationService = require('./src/services/publicationService')

app.use(express.json())
app.use(handleAuth)
app.use('/', routes);
createServices();
app.use(handleError)

app.listen(port, () => {
  console.log(`WEB 2 APLICAÇÃO`)
})


function createServices() {
  const bdService = new BDService();
  app.set('bdService', bdService);
  const authService = new AuthService(bdService);
  app.set('authService', authService);
  const userService = new UserService(bdService);
  app.set('userService', userService);
  const publicationService = new PublicationService(bdService);
  app.set('publicationService', publicationService);
}