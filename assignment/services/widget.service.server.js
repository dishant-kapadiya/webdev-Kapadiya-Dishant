module.exports = function (app) {
    let widgets = [
        {'_id': '123', 'widgetType': 'HEADING', 'pageId': '321', 'size': 2, 'text': 'GIZMODO'},
        {'_id': '234', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
        {
            '_id': '345', 'widgetType': 'IMAGE', 'pageId': '321', 'width': '100%',
            'url': 'http://lorempixel.com/400/200/'
        },
        {'_id': '456', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'},
        {'_id': '567', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
        {
            '_id': '678', 'widgetType': 'YOUTUBE', 'pageId': '321', 'width': '100%',
            'url': 'https://www.youtube.com/embed/AM2Ivdi9c4E'
        },
        {'_id': '789', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'}
    ];

    let multer = require('multer');
    let upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findWidgetsByPageId);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        let pageId = req.params.pageId;
        let widget = req.body;
        widget._id = Math.floor(Math.random() * 100000).toString();
        widget.pageId = pageId;
        widgets.push(widget);
        res.status(201);
        res.send(widget);
    }

    function findWidgetsByPageId(req, res) {
        let pageId = req.params.pageId;
        const list = [];
        for (let x = 0; x < widgets.length; x++) {
            if (widgets[x].pageId === pageId) {
                list.push(widgets[x]);
            }
        }
        res.status(200);
        res.send(list);
    }

    function findWidgetById(req, res) {
        let widgetId = req.params.widgetId;
        for (let x = 0; x < widgets.length; x++) {
            if (widgets[x]._id === widgetId) {
                res.status(200);
                res.send(widgets[x]);
            }
        }
        res.status(404);
        res.send({
            "error": "website ID not found"
        });
    }

    function updateWidget(req, res) {
        let widgetId = req.params.widgetId;
        let widget = req.body;
        for (let x = 0; x < widgets.length; x++) {
            if (widgets[x]._id === widgetId) {
                widgets[x] = widget;
                res.status(200);
                res.send({
                    "message": "widget updated successfully"
                });
            }
        }
        res.status(404);
        res.send({
            "error": "website ID not found"
        });
    }

    function deleteWidget(req, res) {
        let widgetId = req.params.widgetId;
        for (let x = 0; x < widgets.length; x++) {
            if (widgets[x]._id === widgetId) {
                widgets.splice(x, 1);
                res.status(200);
                res.send({
                    "message": "widget deleted successfully"
                });
            }
        }
        res.status(404);
        res.send({
            "error": "website ID not found"
        });
    }

    function uploadImage(req, res) {

        let widgetId = req.body.widgetId;
        let myFile = req.file;


        let userId = req.body.userId;
        let websiteId = req.body.websiteId;
        let pageId = req.body.pageId;

        let filename = myFile.filename;     // new file name in upload folder

        let widget = getWidgetById(widgetId);
        widget.url = '/uploads/' + filename;
        let callbackUrl = "/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";

        res.redirect(callbackUrl);
    }

    function getWidgetById(widgetId) {
        for (let x = 0; x < widgets.length; x++) {
            if (widgets[x]._id === widgetId) {
                return widgets[x];
            }
        }
        return null;
    }
};