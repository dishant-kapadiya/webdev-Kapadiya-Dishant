module.exports = function (app) {

	let websiteModel = require('../model/website/website.model.server');

	app.post('/api/user/:userId/website', createWebsite);
	app.get('/api/user/:userId/website', findWebsitesByUser);
	app.get('/api/website/:websiteId', findWebsiteById);
	app.put('/api/website/:websiteId', updateWebsite);
	app.delete('/api/website/:websiteId', deleteWebsite);

	function createWebsite(req, res) {
		websiteModel.createWebsite(req.body)
			.then(function(website){
				res.status(201);
				res.send({
					"message": "hoofad"
				});
			})
			.catch(function(err){
				res.status(400);
				res.send({
					"error": "error while creating website"
				})
			})
	}

	function findWebsitesByUser(req, res) {
		let userId = req.params.userId;
		let list = [];
		for (let x = 0; x < websites.length; x++) {
			if (websites[x].developerId === userId) {
				list.push(websites[x]);
			}
		}
		res.status(200);
		res.send(list);
	}

	function findWebsiteById(req, res) {
		let websiteId = req.params.websiteId;
		for (let x = 0; x < websites.length; x++) {
			if (websites[x]._id === websiteId) {
				res.status(200);
				res.send(websites[x]);
			}
		}
		res.status(404);
		res.send({
			"error": "website ID not found"
		});
	}

	function updateWebsite(req, res) {
		let websiteId = req.params.websiteId;
		let website = req.body;
		for (let x = 0; x < websites.length; x++) {
			if (websites[x]._id === websiteId) {
				websites[x] = website;
				res.status(200);
				res.send({
					"message": "website updated successfully"
				})
			}
		}
		res.status(404);
		res.send({
			"error": "website ID not found"
		});
	}

	function deleteWebsite(req, res) {
		let websiteId = req.params.websiteId;
		for (let x = 0; x < websites.length; x++) {
			if (websites[x]._id === websiteId) {
				websites.splice(x, 1);
				res.status(200);
				res.send({
					"message": "website deleted successfully"
				});
			}
		}
		res.status(404);
		res.send({
			"error": "website ID not found"
		});
	}
};