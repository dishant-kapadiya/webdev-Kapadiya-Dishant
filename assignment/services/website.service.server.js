module.exports = function (app) {

	let websiteModel = require('../model/website/website.model.server');

	app.post('/api/user/:userId/website', createWebsite);
	app.get('/api/user/:userId/website', findWebsitesByUser);
	app.get('/api/website/:websiteId', findWebsiteById);
	app.put('/api/website/:websiteId', updateWebsite);
	app.delete('/api/website/:websiteId', deleteWebsite);

	function createWebsite(req, res) {
		let userId = req.params.userId;
		websiteModel.createWebsiteForUser(userId, req.body)
			.then(function(website){
				res.status(201);
				res.send(website);
			})
			.catch(function(err){
				res.status(400);
				res.send({
					"error": "error while creating website"
				})
			});
	}

	function findWebsitesByUser(req, res) {
		let userId = req.params.userId;
		websiteModel.findWebsitesByUser(userId)
			.then(function(result){
				res.status(200).send(result);
			})
			.catch(function(error){
				res.status(400).send({
					"error": "error while fetching websites for user"
				});
			});
	}

	function findWebsiteById(req, res) {
		let websiteId = req.params.websiteId;
		websiteModel.findWebsiteById(websiteId)
			.then(function(result){
				res.status(200).send(result)
			})
			.catch(function(error){
				res.status(404);
				res.send({
					"error": "website ID not found"
				});
			});
	}

	function updateWebsite(req, res) {
		let websiteId = req.params.websiteId;
		let website = req.body;
		websiteModel.updateWebsite(websiteId, website)
			.then(function (result) {
				res.status(200).send({
					"message": "website updated successfully"
				})
			})
			.catch(function (error) {
				res.status(404).send({
					"error": "website ID not found"
				});
			});
	}

	function deleteWebsite(req, res) {
		let websiteId = req.params.websiteId;
		websiteModel.deleteWebsite(websiteId)
			.then(function(result){
				res.status(200).send({
					"message": "website deleted successfully"
				});
			})
			.catch(function(error){
				res.status(404).send({
					"error": "website ID not found"
				});
			});
	}
};