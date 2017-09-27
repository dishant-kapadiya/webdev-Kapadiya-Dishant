module.exports = function(app)
{

    app.get('/api', (req, res) => {
        res.send('App works');
    });
    app.get("/api/test", findAllMessages);
    app.post("/api/test", createMessage);
    app.delete("/api/test/:id", deleteMessage);


    let connectionString = 'mongodb://localhost:27017/test'; // for local

    if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
        let username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
        let password = process.env.MLAB_PASSWORD_WEBDEV;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds129144.mlab.com:29144/heroku_twd21hmz'; // use yours
    }

    let mongoose = require("mongoose");
    mongoose.connect(connectionString, {
        useMongoClient: true
    });

    let TestSchema = mongoose.Schema({
        message: String
    });

    let TestModel = mongoose.model("TestModel", TestSchema);

    function findAllMessages(req, res) {

        TestModel
            .find()
            .then(
                function(tests) {
                    res.json(tests);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createMessage(req, res) {
        console.log("in app");
        TestModel
            .create(req.body)
            .then(
                function(test) {
                    res.json(test);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMessage(req, res) {
        TestModel
            .remove({_id: req.params.id})
            .then(
                function(result) {
                    res.json(result);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};
