module.exports = function (app) {
    let users = [
        {
            _id: '123',
            username: 'alice',
            password: 'alice',
            firstName: 'Alice',
            lastName: 'Wonder'
        },
        {
            _id: '234',
            username: 'bob',
            password: 'bob',
            firstName: 'Bob',
            lastName: 'Marley'
        },
        {
            _id: '345',
            username: 'charly',
            password: 'charly',
            firstName: 'Charly',
            lastName: 'Garcia'
        },
        {
            _id: '456',
            username: 'jannunzi',
            password: 'jannunzi',
            firstName: 'Jose',
            lastName: 'Annunzi'
        }
    ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);


    function createUser(req, res) {
        let random = Math.floor(Math.random() * 100000).toString();
        let user = req.body;
        user._id = random;
        users.push(user);
        res.statusCode = 201;
        res.send(user);
    }

    function findUser(req, res) {
        let query = req.query;
        if(query.hasOwnProperty('password')) {
            findUserByCredentials(query, res)
        } else {
            findUserByUsername(query, res);
        }
    }

    function findUserByUsername(req, res) {
        let userName = req.username;
        for (let x = 0; x < users.length; x++) {
            if (users[x].username === userName) {
                res.statusCode = 200;
                res.send(users[x]);
            }
        }
        res.status(404);
        res.send({
            "error" : "Not Found"
        });
    }

    function findUserByCredentials(req, res) {
        let username = req.username;
        let password = req.password;
        for (let x = 0; x < users.length; x++) {
            if (users[x].username === username &&
                users[x].password === password) {
                res.statusCode = 200;
                res.send(users[x]);
            }
        }
        res.status(404);
        res.send({
            "error" : "Not Found"
        });
    }

    function findUserById(req, res) {
        let userId = req.params.userId;
        for (let x = 0; x < users.length; x++) {
            if (users[x]._id === userId) {
                res.statusCode = 200;
                res.send(users[x]);
            }
        }
        res.status(404);
        res.send({
            "error" : "Not Found"
        });
    }

    function updateUser(req, res) {
        let userId = req.params.userId;
        let user = req.body;
        for (let x = 0; x < users.length; x++) {
            if (users[x]._id === userId) {
                users[x] = user;
                res.statusCode = 200;
                res.send({
                    "message" : "updated successfully"
                });
            }
        }
        res.status(404);
        res.send({
            "error" : "Not Found"
        });
    }

    function deleteUser(req, res) {
        let userId = req.params.userId;
        for (let x = 0; x < users.length; x++) {
            if (users[x]._id === userId) {
                res.statusCode = 200;
                res.send({
                    "message" : "deleted successfully"
                });
            }
        }
        res.status(404);
        res.send({
            "error" : "Not Found"
        });
    }
};
