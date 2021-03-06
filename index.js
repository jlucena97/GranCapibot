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
restService.post("/webhook",function(req,res){
	var respuesta;
	let rtag = req.body.result.action //We can change the tag to get differents gifs
 	/*promise = new Promise(function(resolve){
    	request("http://api.giphy.com/v1/gifs/random?api_key=fOrbc4xCvjkD29N0UPFtH6E2SCIerdi8&tag=party&rating=PG-13",function(err,res,body){
      		resolve(response = JSON.parse(body).data.images.original.url)
    	});
  	});
  	promise.then(function(response){
    	return res.json({
      		messages:[
        	{
          		type : 3,
          		imageUrl : response
        	}
      		],
      		source : "webhook-echo-sample"
	    	},
    
  		);
	  });*/
	  var options = { method: 'GET',
		url: 'http://api.giphy.com/v1/gifs/random',
		qs: { tag: rtag, api_key: GIPHY_TOKEN },
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
