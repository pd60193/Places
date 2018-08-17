// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var bodyParser = require('body-parser');
var path = require("path");					// path required to send back the html from a location
var googleApiRouter = require('./googleApiController');  //api router
var yelpApiRouter = require('../controllers/yelpApiController');
// define our app using express
var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 8081;        

// ROUTES FOR OUR HTML
// =============================================================================

// get an instance of the express Router
var htmlRouter = express.Router();              


// test route to make sure everything is working (accessed at GET http://localhost:37095/)
// htmlRouter.get('/', function(req, res) {
//     // res.json({ message: 'hooray! welcome to our api!' });
// 	console.log("Reached here");
// 	res.sendFile(path.join(__dirname + '/../Views/index.html'));  
// });

// htmlRouter.get('/search', function(req, res) {
// 	console.log("Reached here");
//     // res.json({ message: 'hooray! welcome to our api!' });
// 	res.sendFile(path.join(__dirname + '/../Views/index.html'));  
// });
// htmlRouter.get('/results', function(req, res) {
//     // res.json({ message: 'hooray! welcome to our api!' });
// 	console.log("Reached here");
// 	res.sendFile(path.join(__dirname + '/../Views/index.html'));  
// });

// REGISTER OUR ROUTES -------------------------------
// all html routes will be prefixed with /
// app.use('/', htmlRouter);
// app.use('/search', htmlRouter);
// app.use('/results', htmlRouter);
// all api routes will be prefixed with /api

app.use("[/](?!(api|AngularJSViews|lib))*",express.static(path.join(__dirname, '/../Views')));
app.use('/api/GoogleService', googleApiRouter);
app.use('/api/YelpService', yelpApiRouter);
// all angular resources will be prefixed with / in the UI
app.use('/AngularJSViews',express.static(path.join(__dirname, '/../AngularJSViews')));
// all libraries will be prefixed with /lib/ in the UI
app.use('/lib',express.static(path.join(__dirname, '/../lib')));

// START THE SERVER
// =============================================================================
app.listen(port);


console.log('Magic happens on port ' + port);

