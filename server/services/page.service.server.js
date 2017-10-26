module.exports = function (app) {

    let pages = [
        {'_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem'},
        {'_id': '432', 'name': 'Post 2', 'websiteId': '456', 'description': 'Lorem'},
        {'_id': '543', 'name': 'Post 3', 'websiteId': '456', 'description': 'Lorem'}
    ];


    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findPageByWebsiteId);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        let websiteId = req.params.websiteId;
        let page = req.body;
        page._id = Math.floor(Math.random() * 100000).toString();
        page.websiteId = websiteId;
        pages.push(page);
        res.status(201);
        res.send(page);
    }

    function findPageByWebsiteId(req, res) {
        let websiteId = req.params.websiteId;
        const list = [];
        for (let x = 0; x < pages.length; x++) {
            if (pages[x].websiteId === websiteId) {
                list.push(pages[x]);
            }
        }
        res.status(200);
        res.send(list);
    }


    function findPageById(req, res) {
        let pageId = req.params.pageId;
        for (let x = 0; x < pages.length; x++) {
            if (pages[x]._id === pageId) {
                res.status(200);
                res.send(pages[x]);
            }
        }
        res.status(404);
        res.send({
            "error": "page ID not found"
        });
    }

    function updatePage(req, res) {
        let pageId = req.params.pageId;
        let page = req.body;
        for (let x = 0; x < pages.length; x++) {
            if (pages[x]._id === pageId) {
                pages[x] = page;
                res.status(200);
                res.send({
                    "message" : "updated successfully"
                });
            }
        }
        res.status(404);
        res.send({
            "error": "page ID not found"
        });
    }

    function deletePage(req, res) {
        let pageId = req.params.pageId;
        for (let x = 0; x < pages.length; x++) {
            if (pages[x]._id === pageId) {
                pages.splice(x, 1);
                res.status(200);
                res.send({
                    "message" : "deleted successfully"
                });
            }
        }
        res.status(404);
        res.send({
            "error": "page ID not found"
        });
    }
};