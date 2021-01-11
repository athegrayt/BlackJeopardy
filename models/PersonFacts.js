const mongoose = require('mongoose');
const { Schema } = mongoose;

const personFactsSchema = new Schema({
	name: String,
	birthDate: String,
	deathDate: String,
	education: String,
	placeOfBirth: String,
	placeOfDeath: String,
	didYouKnow: [String],
	image: String,
});

module.exports = personFactsSchema
