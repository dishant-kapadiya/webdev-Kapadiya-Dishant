module.exports = require('mongoose').Schema({
	_user: String,
	name : String,
	description : String,
	pages: [String],
	dateCreated: {type: Date, default: Date.now()}
}, {collection: 'website'});