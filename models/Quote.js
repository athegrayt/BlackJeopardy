const mongoose = require('mongoose');
const { Schema } = mongoose;

const quoteSchema = new Schema({
	speaker: String,
	quote: String,
	title: String,
});

module.exports = quoteSchema;
