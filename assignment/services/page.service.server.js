module.exports = function (app) {

	let pageModel = require('../model/page/page.model.server');


	app.post('/api/website/:websiteId/page', createPage);
	app.get('/api/website/:websiteId/page', findPageByWebsiteId);
	app.get('/api/page/:pageId', findPageById);
	app.put('/api/page/:pageId', updatePage);
	app.delete('/api/page/:pageId', deletePage);

	function createPage(req, res) {
		let websiteId = req.params.websiteId;
		let page = req.body;
		pageModel.createPage(websiteId, page)
			.then(function (result) {
				res.status(201).send(result);
			})
			.catch(function (error) {
				res.status(400).send({
					"error": "error while creating page"
				});
			});
	}

	function findPageByWebsiteId(req, res) {
		let websiteId = req.params.websiteId;
		pageModel.findPageByWebsiteId(websiteId)
			.then(function (result) {
				if (result === null) {
					res.status(404).send({
						"error": "page not found"
					});
					return;
				}
				res.status(200).send(result);
			})
			.catch(function (error) {
				res.status(400).send({
					"error": "error while finding pages for website"
				});
			});
	}


	function findPageById(req, res) {
		let pageId = req.params.pageId;
		pageModel.findPageById(pageId)
			.then(function (result) {
				if (result === null) {
					res.status(404).send({
						"error": "page not found"
					});
					return;
				}
				res.status(200).send(result);
			})
			.catch(function (error) {
				res.status(404).send({
					"error": "page ID not found"
				});
			});
	}

	function updatePage(req, res) {
		let pageId = req.params.pageId;
		let page = req.body;
		pageModel.updatePage(pageId, page)
			.then(function (result) {
				if (result.nModified === 0) {
					res.status(404).send({
						"error": "page not found"
					});
					return;
				}
				res.status(200).send({
					"message": "updated successfully"
				});
			})
			.catch(function (error) {
				res.status(404).send({
					"error": "page ID not found"
				});
			});
	}

	function deletePage(req, res) {
		let pageId = req.params.pageId;

		pageModel.deletePage(pageId)
			.then(function (result) {
				if (result.result.n === 0) {
					res.status(404).send({
						"error": "page not found"
					});
					return;
				}
				res.status(200).send({
					"message": "deleted successfully"
				});
			})
			.catch(function (error) {
				res.status(404).send({
					"error": "page ID not found"
				});
			});
	}
};