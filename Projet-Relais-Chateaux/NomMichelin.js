var request = require('request');
var cheerio = require('cheerio');
var TableauResto=new Array();
var tableauMichelin=function(){
	return new Promise(function(resolve,reject){
		for(var i=1;i<39;i++)
		{
			request('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-'+i+'', function (error, response, html) {
				if (!error && response.statusCode == 200) {
					var $ = cheerio.load(html);
					$('div.poi_card-display-title').each(function(i, element){
						var a = $(this);
					 	TableauResto.push(a.text().trim());			 
						if (TableauResto.length==626)
						{
							resolve(TableauResto)
						}						
					});
				}
			});
		}
	})
}
module.exports=tableauMichelin;
