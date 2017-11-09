let PageSchema = require('./page.schema.server');
let mongoose = require('mongoose');
let websiteModel = require('../website/website.model.server');
let pageModel = mongoose.model("PageModel", PageSchema);

pageModel.createPage = createPage;
pageModel.findPageByWebsiteId = findPageByWebsiteId;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;

module.exports = pageModel;

function createPage(websiteId, page) {
	return new Promise(function (resolve, reject) {
		page._website = websiteId;
		pageModel.create(page)
			.then(function (result) {
				page = result;
				websiteModel.addPage(websiteId, page._id)
					.then(function (result) {
						resolve(page);
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

function findPageByWebsiteId(websiteId) {
	return pageModel.find({_website: websiteId});
}


function findPageById(pageId) {
	return pageModel.findOne({_id: pageId})
}

function updatePage(pageId, page) {
	return pageModel.update({_id: pageId}, {
		$set: {
			name: page.name,
			title: page.title,
			description: page.description
		}
	});
}

function deletePage(pageId) {
	return pageModel.remove({_id: pageId})
}

function addWidget(pageId, widgetId) {
	return pageModel.update({_id: pageId}, {$push: {widgets: widgetId}});
}