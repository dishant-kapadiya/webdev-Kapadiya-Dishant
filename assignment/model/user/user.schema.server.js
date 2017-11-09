let mongoose = require('mongoose');
module.exports = mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'website'}],
	dateCreated: {type: Date, default: Date.now()}
}, {collection: 'user'});