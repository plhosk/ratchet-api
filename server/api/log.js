const Router = require('koa-router')
const mongoose = require('mongoose')

const getMongoUri = require('../getMongoUri')
const Log = require('../models/Log')

const router = new Router({
  prefix: '/log',
})

router.get('/', async (ctx) => {
  mongoose.connect(getMongoUri(), { useNewUrlParser: true })
  const result = await Log.find().sort({ $natural: -1 }).limit(10)
  ctx.body = result
})

// router.post('/', async (ctx) => {
//   if (!ctx.request.body) {
//     ctx.throw(400, 'No request body')
//   }
//   mongoose.connect(getMongoUri(), { useNewUrlParser: true })
//   const result = await Log.create(ctx.request.body)
//   ctx.body = result
// })

module.exports = router
