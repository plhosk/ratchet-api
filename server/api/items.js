const Router = require('koa-router')
const mongoose = require('mongoose')

const Item = require('../models/Item')

const router = new Router({
  prefix: '/items',
})

//   .get('/items', items.get)
//   .post('/items', items.post)
//   .del('/items/:id', items.delete)

router.get('/', async (ctx) => {
  mongoose.connect(process.env.MONGO_URI)
  const result = await Item.find({ deleted: { $ne: true } })
  ctx.body = result
})

module.exports = router
