/**
 * Created by sesha on 6/2/17.
 */

// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const session = require('express-session');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
let secret = process.env.SESSION_SECRET || 'aeioubcdfghjklmnopqrstvwxyz02468';
app.use(session({
	secret: secret,
	resave: true,
	saveUninitialized: true
}));


// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));


// CORS
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:4200");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
});


const port = process.env.PORT || '3100';
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);

app.use(passport.initialize());
app.use(passport.session());

server.listen(port, () => console.log('Running'));
app.get('/healthCheck', function (req, res) {
	res.status(200);
	res.send({
		'message': 'healthy'
	});
});
require('./assignment/app')(app);


// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});
