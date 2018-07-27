const Router = require('koa-router')
const mongoose = require('mongoose')

const getMongoUri = require('../getMongoUri')
const Item = require('../models/Item')
const Log = require('../models/Log')

const router = new Router({
  prefix: '/items',
})

router.get('/', async (ctx) => {
  mongoose.connect(getMongoUri(), { useNewUrlParser: true })
  const result = await Item.find({ deleted: { $ne: true } }).sort({ _id: 1 })
  ctx.body = result
})

router.post('/', async (ctx) => {
  if (!ctx.request.body) {
    ctx.throw(400, 'No request body')
  }
  mongoose.connect(getMongoUri(), { useNewUrlParser: true })
  const result = await Item.create(ctx.request.body)

  await Log.create({
    action: 'add',
    itemSnapshot: {
      title: result.title,
      column: result.column,
    },
  })

  ctx.body = result
})

router.delete('/:id', async (ctx) => {
  if (!ctx.params.id) {
    ctx.throw(400, 'Bad Request')
  }
  mongoose.connect(getMongoUri(), { useNewUrlParser: true })
  const result = await Item.findByIdAndUpdate(ctx.params.id, { $set: { deleted: true } })

  await Log.create({
    action: 'delete',
    itemSnapshot: {
      title: result.title,
      column: result.column,
    },
  })

  ctx.body = result
})

module.exports = router
