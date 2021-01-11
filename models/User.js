const mongoose =require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
	googleID: String,
	facebookID: String,
	email: {type: String, required: true},
	password: String,
	name: {type: String, required: true}, 
	credits: {type: Number, default: 0}
});
mongoose.model('users', userSchema)