module.exports = function (app, model) {
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
    app.get('/api/user?username=username', findUserByUsername);
    app.get('/api/user?username=username&password=password', findUserByCredentials);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);


    function createUser(req, res) {
        let random = Math.floor(Math.random() * 100000).toString();
        while (this.findUserById(random)) {
            random = Math.floor(Math.random() * 100000).toString();
        }
        let user = req.body;
        user._id = random;
        this.users.push(user);
        res.status(201);
        res.send(user);
    }

    function findUserByUsername(req, res) {
        let userName = req.params.username;
        for (let x = 0; x < this.users.length; x++) {
            if (this.users[x].username === userName) {
                res.status(200);
                res.send(this.users[x]);
            }
        }
    }

    function findUserById(req, res) {
        let userId = req.params.userId;
        for (let x = 0; x < this.users.length; x++) {
            if (this.users[x]._id === userId) {
                res.status(200);
                res.send(this.users[x]);
            }
        }
    }

    function findUserByCredentials(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        for (let x = 0; x < this.users.length; x++) {
            if (this.users[x].username === username &&
                this.users[x].password === password) {
                res.status(200);
                res.send(this.users[x]);
            }
        }
    }

    function updateUser(req, res) {
        let userId = req.params.userId;
        for (let x = 0; x < this.users.length; x++) {
            if (this.users[x]._id === userId) {
                this.users[x] = user;
                res.status(200);
                res.send({});
            }
        }
    }

    function deleteUser(req, res) {
        let userId = req.params.userId;
        for (let x = 0; x < this.users.length; x++) {
            if (this.users[x]._id === userId) {
                res.status(200);
                res.send({});
            }
        }
    }
};
