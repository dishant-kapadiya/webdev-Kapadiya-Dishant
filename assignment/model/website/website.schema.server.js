let mongoose = require('mongoose');
module.exports = mongoose.Schema({
	_user : {type : mongoose.Schema.ObjectId, ref: "User"},
	name : String,
	description : String,
	pages:[{type: mongoose.Schema.Types.ObjectId, ref:'Page'}],
	dateCreated: {type: Date, default: Date.now()}
}, {collection: 'website'});