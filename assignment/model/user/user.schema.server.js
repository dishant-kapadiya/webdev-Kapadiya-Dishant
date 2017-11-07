module.exports = require('mongoose').Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	// websites: [require('../website/website.schema.server')],
	dateCreated: Date,
}, {collection: 'user'});