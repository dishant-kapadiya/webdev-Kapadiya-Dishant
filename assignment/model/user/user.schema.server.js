module.exports = require('mongoose').Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	websites: [String],
	dateCreated: {type: Date, default: Date.now()}
}, {collection: 'user'});