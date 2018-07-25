const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  action: { type: String, required: true },
  itemSnapshot: {
    title: { type: String, required: true },
    column: { type: Number, required: true },
  },
  // itemRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
}, { capped: true, size: 1048576, max: 20 }) // Specify a capped collection with maximum 20 items

module.exports = mongoose.model('LogEntry', schema)
