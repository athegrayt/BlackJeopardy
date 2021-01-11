const mongoose = require('mongoose');
const { Schema } = mongoose;
const quoteSchema = require('./Quote');

const movieQuoteSchema = new Schema({
	value: Number,
	quote: [quoteSchema],
});

mongoose.model('movieQuote', movieQuoteSchema);
