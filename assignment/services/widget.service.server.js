module.exports = function (app) {

	let multer = require('multer');
	let upload = multer({dest: __dirname + '/../../public/uploads'});
	let widgetModel = require('../model/widget/widget.model.server');

	app.post('/api/page/:pageId/widget', createWidget);
	app.get('/api/page/:pageId/widget', findWidgetsByPageId);
	app.get('/api/widget/:widgetId', findWidgetById);
	app.put('/api/widget/:widgetId', updateWidget);
	app.delete('/api/widget/:widgetId', deleteWidget);
	app.post("/api/upload", upload.single('myFile'), uploadImage);

	function createWidget(req, res) {
		let pageId = req.params.pageId;
		let widget = req.body;
		widgetModel.createWidget(pageId, widget)
			.then(function (result) {
				res.status(201).send(result);
			})
			.catch(function (error) {
				res.status(400);
				res.send({
					"error": "error while creating widget"
				});
			});
	}

	function findWidgetsByPageId(req, res) {
		let pageId = req.params.pageId;
		widgetModel.findAllWidgetsForPage(pageId)
			.then(function (result) {
				if (result === null) {
					res.status(404).send({
						"error": "widget not found"
					});
					return;
				}
				res.status(200).send(result);
			})
			.catch(function (error) {
				res.status(400).send({
					"error": "error while finding widgets for page"
				});
			});
	}

	function findWidgetById(req, res) {
		let widgetId = req.params.widgetId;
		widgetModel.findWidgetById(widgetId)
			.then(function (result) {
				if (result === null) {
					res.status(404).send({
						"error": "widget not found"
					});
					return;
				}
				res.status(200).send(result);
			})
			.catch(function (error) {
				res.status(404).send({
					"error": "widget ID not found"
				});
			});
	}

	function updateWidget(req, res) {
		let widgetId = req.params.widgetId;
		let widget = req.body;
		widgetModel.updateWidget(widgetId, widget)
			.then(function (result) {
				if (result.nModified === 0) {
					res.status(404).send({
						"error": "widget ID not found"
					});
					return;
				}
				res.status(200).send({
					"message": "widget updated successfully"
				});
			})
			.catch(function (error) {
				res.status(404).send({
					"error": "widget ID not found"
				});
			})
	}

	function deleteWidget(req, res) {
		let widgetId = req.params.widgetId;
		widgetModel.deleteWidget(widgetId)
			.then(function (result) {
				if (result.result.n === 0) {
					res.status(404).send({
						"error": "widget ID not found"
					});
					return;
				}
				res.status(200);
				res.send({
					"message": "widget deleted successfully"
				});
			})
			.catch(function (error) {
				res.status(404);
				res.send({
					"error": "widget ID not found"
				});
			});
	}

	function uploadImage(req, res) {

		let widgetId = req.body.widgetId;
		let width = req.body.width;
		let myFile = req.file;


		let userId = req.body.userId;
		let websiteId = req.body.websiteId;
		let pageId = req.body.pageId;

		let originalname = myFile.originalname; // file name on user's computer
		let filename = myFile.filename;     // new file name in upload folder
		let path = myFile.path;         // full path of uploaded file
		let destination = myFile.destination;  // folder where file is saved to
		let size = myFile.size;
		let mimetype = myFile.mimetype;

		widget = getWidgetById(widgetId);
		widget.url = '/uploads/' + filename;
		let callbackUrl = "/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";

		res.redirect(callbackUrl);

	}

	function getWidgetById(widgetId) {
		return widgetModel.findWidgetById(widgetId)
			.then(function (result) {
				if (result === null) {
					return null;
				}
				return result
			})
			.catch(function (error) {
				return null
			});
	}
};