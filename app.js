const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./src/routes')
const port = 3000
const {BDService, AuthService} = require('./src/services')
const handleError = require('./src/middleware/error-handler')

app.use(bodyParser.json())
app.use('/', routes);
createServices();
app.use(handleError)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


function createServices() {
  const bdService = new BDService();
  app.set('bdService', bdService);
  const authService = new AuthService(bdService);
  app.set('authService', authService);
}