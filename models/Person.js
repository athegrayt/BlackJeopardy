const mongoose = require('mongoose');
const { Schema } = mongoose;
const personFactsSchema = require('./PersonFacts')

const personSchema = new Schema({
	value: Number, 
	facts: personFactsSchema
});

mongoose.model('person', personSchema);
