const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const port = 3000

app.use(bodyParser.json())
app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


function createServices() {
  
}