module.exports = function (app) {
    let websites = [
        {'_id': '123', 'name': 'Facebook', 'developerId': '456', 'description': 'Lorem'},
        {'_id': '234', 'name': 'Tweeter', 'developerId': '456', 'description': 'Lorem'},
        {'_id': '456', 'name': 'Gizmodo', 'developerId': '456', 'description': 'Lorem'},
        {'_id': '890', 'name': 'Go', 'developerId': '123', 'description': 'Lorem'},
        {'_id': '567', 'name': 'Tic Tac Toe', 'developerId': '123', 'description': 'Lorem'},
        {'_id': '678', 'name': 'Checkers', 'developerId': '123', 'description': 'Lorem'},
        {'_id': '789', 'name': 'Chess', 'developerId': '234', 'description': 'Lorem'}
    ];


    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findWebsitesByUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function createWebsite(req, res) {
        let userId = req.params.userId;
        let website = req.body;
        website._id = Math.floor(Math.random() * 100000).toString();
        website.developerId = userId;
        websites.push(website);
        res.status(201);
        res.send(website);
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
            "message": "website ID not found"
        })
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
            "message": "website ID not found"
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
            "message": "website ID not found"
        });
    }
};