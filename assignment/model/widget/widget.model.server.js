let WidgetSchema = require('./widget.schema.server');
let mongoose = require('mongoose');
let pageModel = require('../page/page.model.server');
let widgetModel = mongoose.model("WidgetModel", WidgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidgets;

module.exports = widgetModel;

function createWidget(pageId, widget) {
	widget._page = pageId;
	return new Promise(function (resolve, reject) {
		widgetModel.create(widget)
			.then(function (result) {
				widget = result;
				pageModel.addWidget(pageId, widget._id)
					.then(function (result) {
						resolve(widget);
					})
					.catch(function (error) {
						reject(error);
					});
			})
			.catch(function (error) {
				reject(error);
			});
	});
}

function findAllWidgetsForPage(pageId) {
	return widgetModel.find({_page: pageId}).sort({position: 1});
}

function findWidgetById(widgetId) {
	return widgetModel.findOne({_id: widgetId});
}

function updateWidget(widgetId, widget) {
	return widgetModel.update({_id: widgetId}, widget);
}

function deleteWidget(widgetId) {
	return widgetModel.remove({_id: widgetId});
}

function reorderWidgets(pageId, startIndex, endIndex) {
	return widgetModel.find({_page: pageId}, function (err, widgets) {
		widgets.forEach(function (widget) {
			if (startIndex < endIndex) {
				if (widget.position === startIndex) {
					widget.position = endIndex;
					widget.save();
				} else if (widget.position > startIndex
					&& widget.position <= endIndex) {
					widget.position--;
					widget.save();
				} else {
					if (widget.position === startIndex) {
						widget.position = endIndex;
						widget.save();
					} else if (widget.position < startIndex
						&& widget.position >= endIndex) {
						widget.position++;
						widget.save();
					}
				}
			}
		})
	})
}
