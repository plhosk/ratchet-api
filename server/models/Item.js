const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  title: { type: String, required: true },
  column: { type: Number, required: true },
  deleted: Boolean,
})

module.exports = mongoose.model('Item', schema)
