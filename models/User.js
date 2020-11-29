const { Mongoose } = require('mongoose')
const mongoose =require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
	googleID: String,
	facebookID: String,
	email: String
});
mongoose.model('users', userSchema)