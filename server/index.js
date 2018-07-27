require('dotenv').config()
const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')

const items = require('./api/items')
const log = require('./api/log')

const app = new Koa()
app.use(cors())
app.use(bodyParser())

app.use(items.routes()).use(items.allowedMethods())
app.use(log.routes()).use(log.allowedMethods())

const port = process.env.PORT || 3000

module.exports = app.listen(port, () => {
  console.log(`API server listening on port ${port}`) // eslint-disable-line no-console
})
