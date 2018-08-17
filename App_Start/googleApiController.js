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
var googleApiRouter = express.Router();              
var basePlaceUrl ='https://maps.googleapis.com/maps/api/place/';
var apiKey = "AIzaSyDTgAS16RiZZhtLWhto1WaS8Zi6p5xD950";

//AIzaSyDbWtB3xyRwNcZncepWJlhR-aVh5l3bIFQ
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
googleApiRouter.get('/', function(req, res) {
     res.json({ message: 'hooray! welcome to our api!' });
});
googleApiRouter.post('/GetPlaces',function(req, res) {
	//console.log(req.body);
    //res.json({ message: 'hooray! welcome to our api!' });
	req.body.key = apiKey;

	if(!req.body.radius)
		req.body.radius = 10;

	req.body.radius = req.body.radius*1609.34;
	if(req.body.type)
		req.body.type = req.body.type.toLowerCase();
	//var responseObject;
	httpClient.getRequest(basePlaceUrl+"nearbysearch/json?"+querystring.stringify(req.body),null).then(result=>{
		console.log(result);
		if(result &&  (result.data.status == "OK" || result.data.status == "ZERO_RESULTS"))
			res.status(200).json(result.data);
		else
			res.status(500).json(result.data);
	}).catch(function (error) {
		console.log(error);
       res.status(500).json(error);
     });

	//console.log(responseObject);
	//res.status(200).json(responseObject);
});

googleApiRouter.post('/GetPlaceDetails',function(req, res) {
	//console.log(req.body);
    //res.json({ message: 'hooray! welcome to our api!' });
	req.body.key = apiKey;

	
	//var responseObject;
	httpClient.getRequest(basePlaceUrl+"details/json?"+querystring.stringify(req.body),null).then(result=>{
		console.log(result);
		if(result &&  (result.data.status == "OK" || result.data.status == "ZERO_RESULTS"))
			res.status(200).json(result.data);
		else
			res.status(500).json(result.data);
	}).catch(function (error) {
		console.log(error);
       res.status(500).json(error);
     });

	//console.log(responseObject);
	//res.status(200).json(responseObject);
});
googleApiRouter.post('/GetNexPlaces',function(req, res) {
	//console.log(req.body);
    //res.json({ message: 'hooray! welcome to our api!' });
	req.body.key = apiKey;


	//var responseObject;
	httpClient.getRequest(basePlaceUrl+"nearbysearch/json?"+querystring.stringify(req.body),null).then(result=>{
		console.log(result);
		if(result &&  (result.data.status == "OK" || result.data.status == "ZERO_RESULTS"))
			res.status(200).json(result.data);
		else
			res.status(500).json(result.data);
	}).catch(function (error) {
		console.log(error);
       res.status(500).json(error);
     });

	//console.log(responseObject);
	//res.status(200).json(responseObject);
});
googleApiRouter.get('/GetPlacesGET',function(req, res) {
	console.log(req.query);
    //res.json({ message: 'hooray! welcome to our api!' });
	req.query.key = apiKey;

	if(!req.query.radius)
		req.query.radius = 10;

	req.query.radius = req.query.radius*1609.34;
	if(req.query.type)
		req.query.type = req.query.type.toLowerCase();
	//var responseObject;
	httpClient.getRequest(basePlaceUrl+"nearbysearch/json?"+querystring.stringify(req.query),null).then(result=>{
		//console.log(result);
		if(result &&  (result.data.status == "OK" || result.data.status == "ZERO_RESULTS"))
			res.status(200).json(result.data);
		else
			res.status(500).json(result.data);
	}).catch(function (error) {
		console.log(error);
       res.status(500).json(error);
     });

	//console.log(responseObject);
	//res.status(200).json(responseObject);
});
googleApiRouter.post('/GetGeocode',function(req, res) {
	
	//var responseObject;
	req.body.key = apiKey;
	httpClient.getRequest("https://maps.googleapis.com/maps/api/geocode/json?"+querystring.stringify(req.body),null).then(result=>{
		console.log(result);
		if(result &&(result.data.status == "OK" || result.data.status == "ZERO_RESULTS"))
		{
			res.status(200).json(result.data);
		}
		else
			res.status(500).json(result.data);
		
	}).catch(function (error) {
		console.log(error);
       res.status(500).json(error);
     });

	//console.log(responseObject);
	//res.status(200).json(responseObject);
});
module.exports = googleApiRouter;
