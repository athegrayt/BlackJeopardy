const mongoose = require('mongoose')
const {Schema} = mongoose


const receiptSchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipient: String,
    _user: {type: Schema.Types.ObjectId, ref: 'User'}, 
    dateSent: Date,
});

mongoose.model('receipts', receiptSchema)