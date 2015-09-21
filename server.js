/* LOAD DEPENDENCIES */
var express 	= 	require('express');
var request 	= 	require('request');
var cheerio	 	= 	require('cheerio');
var slug			=		require('slug');
var app     	= 	express();

/* GAME SPECIFIC */
var platforms = ['xboxone', 'ps4', 'wii-u'];

app.get('/', function(req, res){
	output = {};
	res.json(output);
});
/* REVIEWS ROUTE LISTENER */
app.get('/reviews', function(req, res){
	plat = req.query.p ? req.query.p : platforms[0];
	url = "http://www.metacritic.com/browse/games/release-date/available/"+plat+"/date";
	console.log("Scrape Request initiated: "+url);
	request(url, function(error, response, html){
			console.log("Successfully retrieved data from "+url);
			if(!error){
					var $ = cheerio.load(html);

					var output = { request_url: url, games: {}, errors: ""  }, rawScript;

					if($('ol.list_products .game_product').length > 0) {
						$('ol.list_products .game_product').each(function(i, ele) {
							title = slug($(this).find(".product_title a").text().trim()).toLowerCase();
							output.games[title] = {};
							//output.games[i].html = $(this).html();
							output.games[title].title = $(this).find(".product_title a").text().trim();
							output.games[title].slug = title;
							output.games[title].meta_score = $(this).find(".metascore_w").text().trim();
							output.games[title].user_score = $(this).find(".product_avguserscore").text().split(":")[1].trim();
							output.games[title].html = $(this).html();
						});				
					} else {
						output.html = html;
					}
			}
			console.log("Outputting Scrape Data for "+url);
			res.json(output);
			res.end(function() {
				request.connection.destroy();
			});
	});

});

/* LISTEN ON PORT */
app.listen('8081');
console.log('Scraper Started on Port 8081');
exports = module.exports = app;