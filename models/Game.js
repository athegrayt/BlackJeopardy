const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
	200: Boolean,
	400: Boolean,
	600: Boolean,
});

module.exports = gameSchema;
