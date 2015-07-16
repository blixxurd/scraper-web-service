/* LOAD DEPENDENCIES */
var express 	= 	require('express');
var request 	= 	require('request');
var cheerio	 	= 	require('cheerio');
var app     	= 	express();

/* MAIN ROUTE LISTENER */
app.get('/', function(req, res){


	url = req.query.url ? req.query.url : "http://google.com/";
	console.log("Scrape Request initiated: "+url);
	request(url, function(error, response, html){
			console.log("Successfully retrieved data from "+url);
			if(!error){
					var $ = cheerio.load(html);

					var output = {}, rawScript;

					output.request_url = url;
					output.assets= {};
					output.scripts= {};
					output.images= {};
					output.markup= html;

					$('link').each(function(i, ele) {
						output.assets[i] = $(this).attr('href');
					});

					$('script').each(function(i, ele) {
						output.scripts[i] = $(this).attr('src');
					});

					$('img').each(function(i, ele) {
						output.images[i] = $(this).attr('src');
					});

			}
			console.log("Outputting Scrape Data for "+url);
			res.json(output);

	});

});

/* LISTEN ON PORT */
app.listen('8081')
console.log('Scraper Started on Port 8081');
exports = module.exports = app;