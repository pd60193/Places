// webapiconfig.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var httpClient = require('../Common/WebServiceClientHelper');
var querystring = require('querystring');
// ROUTES FOR OUR API
// =============================================================================

// get an instance of the express Router
var yelpApiRouter = express.Router();              
var basePlaceUrl ='https://api.yelp.com/v3/businesses/';
var apiKey = "CHcy5R_RSM-xU4bMvIPdTcIaQIi8wjGKFaOANOGryR-r5q2XosgdmPqPZ_ACJPJJxl20MsIKwbIWaG_DYIhuXAg0Od4o83aK0Mt9rgrvnw1O3Z_Fbm8skRrdi1zDWnYx";
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
yelpApiRouter.get('/', function(req, res) {
	
	res.json({ message: 'hooray! welcome to our api!' });
});
yelpApiRouter.post('/match', function(req, res) {
	
	httpClient.getRequest(basePlaceUrl+"matches/best?"+querystring.stringify(req.body),apiKey).then(result=>{
		console.log(result);
		res.status(200).json(result.data);
	}).catch(function (error) {
		console.log(error);
       res.status(500).json(error);
     });
});
yelpApiRouter.post('/reviews', function(req, res) {
	
	httpClient.getRequest(basePlaceUrl+req.body.id+"/reviews",apiKey).then(result=>{
		console.log(result);
		res.status(200).json(result.data);
	}).catch(function (error) {
		console.log(error);
       res.status(500).json(error);
     });
});

module.exports = yelpApiRouter;