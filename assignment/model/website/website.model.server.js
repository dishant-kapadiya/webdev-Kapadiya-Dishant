let WebsiteSchema = require('./website.schema.server');
let mongoose = require('mongoose');
let userModel = require('../user/user.model.server');
let websiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;

module.exports = websiteModel;

function createWebsiteForUser(userId, website) {
	website._user = userId;
	return new Promise(function (resolve, reject) {
		websiteModel.create(website)
			.then(function (result) {
				website = result;
				userModel.addWebsite(userId, website._id)
					.then(function (result) {
						resolve(website);
					})
					.catch(function (error) {
						reject(error);
					})
			})
			.catch(function (error) {
				reject(error)
			})
	});
}

function findWebsitesByUser(userId) {
	return websiteModel.find({_user: userId});
}

function findWebsiteById(websiteId) {
	return websiteModel.findOne({_id: websiteId});
}

function updateWebsite(websiteId, website) {
	return websiteModel.update({_id: websiteId}, {
		$set: {
			name: website.name,
			description: website.description
		}
	});
}

function deleteWebsite(websiteId) {
	return websiteModel.remove({_id: websiteId});
}

function addPage(websiteId, pageId) {
	return userModel.update({_id: websiteId}, {$push: {pages: pageId}});
}