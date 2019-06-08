/**
* Webhook for Dialogflow V1
* @author Pablo Leon & Nieves Borrero
*/

"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const restService = express();
const GIPHY_TOKEN = process.env.giphy; // Defined as env var on Heroku

restService.use(
  bodyParser.urlencoded({ extended: true })
);

restService.use(bodyParser.json());

/**
* Webhook connected to Dialogflow through Heroku app
*/
restService.get("/webhook",function(req,res){
	var respuesta;
	let promise;
	let tags = req.body.result.action //We can change the tag to get differents gifs 

	  var options = { method: 'GET',
		url: 'http://api.giphy.com/v1/gifs/random',
		qs: { tag: 'party', api_key: 'fOrbc4xCvjkD29N0UPFtH6E2SCIerdi8' },
		body: '{}' };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		respuesta = JSON.parse(body).data.images.original.url;
		return res.json({
			messages:[
		  {
				type : 3,
				imageUrl : respuesta
		  }
			],
			source : "webhook-echo-sample"
		  });
	});
});

restService.get('/', (req, res) => {
	res.send('send memes!!');

});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
