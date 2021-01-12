const mongoose = require('mongoose')
const {Schema} = mongoose
const scoreSchema = require('./Score')

const recordSchema = new Schema({
    records: [scoreSchema],
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
})

mongoose.model('records', recordSchema)