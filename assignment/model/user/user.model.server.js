let mongoose = require('mongoose');

let UserSchema = require('./user.schema.server');
let userModel = mongoose.model("UserModel", UserSchema);
userModel.createUser = createUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;

module.exports = userModel;

function createUser(user) {
	return userModel.create(user);
}

function findUserByUsername(userName) {
	return userModel.findOne({username: userName});
}

function findUserByCredentials(username, password) {
	return userModel.findOne({username: username, password: password});
}

function findUserById(userId) {
	return userModel.findOne({_id: userId});
}

function updateUser(userId, user) {
	return userModel.update({_id: userId}, {
		$set: {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email
		}
	});
}

function deleteUser(userId) {
	return userModel.remove({_id: userId});
}

function addWebsite(userId, websiteId) {
	return userModel.update({_id: userId}, {$push: {websites: websiteId}});
}
