const mongoose = require('mongoose')
const {Schema} = mongoose
const snlQuoteSchema = require('./SNLQuote')

const snlSchema = new Schema({
    value: Number,
    quote: snlQuoteSchema
})

mongoose.model('snl', snlSchema)