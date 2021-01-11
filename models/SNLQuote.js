const mongoose = require('mongoose');
const quoteSchema = require('./Quote');
const { Schema } = mongoose;

const snlQuoteSchema = new Schema({
	question: String,
	answer: String,
});

module.exports = snlQuoteSchema
