let WebsiteSchema = require('./website.schema.server');
let mongoose = require('mongoose');
let userModel = require('../user/user.model.server');
let websiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function createWebsite(website) {
	return new Promise(function(resolve, reject) {
		websiteModel.create(website)
			.then(function(result){
				console.log(result);
				website = result;
				userModel.addWebsite(website._user, website._id)
					.then(function(result) {
						resolve(website)
					})
					.error(function(error) {
						reject(error)
					})
			})
			.error(function(error){
				reject(error)
			})
	});
}

function findWebsitesByUser(userId) {
	return websiteModel.find({user: userId});
}

function findWebsiteById(websiteId) {
	return websiteModel.findOne({_id: websiteId});
}

function updateWebsite(websiteId, website) {
	return websiteModel.update({_id: websiteId}, website);
}

function deleteWebsite(websiteId) {
	return websiteModel.remove({_id: websiteId});
}