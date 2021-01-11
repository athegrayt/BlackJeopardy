const mongoose = require('mongoose');
const { Schema } = mongoose;
const gameSchema = require('./Game');

const curGameSchema = new Schema({
	score: Number,
	mq: gameSchema,
	snl: gameSchema,
	person: gameSchema,
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('curGame', curGameSchema);
