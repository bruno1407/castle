var cheerio = require('cheerio');
var fetch=require('node-fetch');
var tableauURLHotel=new Array();
var LiensHotel= function (){
    return new Promise (function(resolve,reject){
        var compteur=0;
	    for(var page=1;page<9;page++){
			fetch('https://www.relaischateaux.com/fr/update-destination-results', 
			{
				"credentials":"include",
				"headers":
				{
					"accept":"*/*",
					"accept-language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
					"content-type":"application/x-www-form-urlencoded; charset=UTF-8",
					"x-requested-with":"XMLHttpRequest"
				},
				"referrer":"https://www.relaischateaux.com/fr/destinations/europe/france",
				"referrerPolicy":"origin-when-cross-origin",
				"body":"rc_destination_availability_type%5Barea%5D=78&rc_destination_availability_type%5Bstart%5D=&rc_destination_availability_type%5Bend%5D=&rc_destination_availability_type%5BnbRooms%5D=1&rc_destination_availability_type%5B_token%5D=kDUa3iIcFhM65bbJehR03feJpS_7Qyu2wc0okgKKEe4&page="+page+"&submit=true&areaId=78",
				"method":"POST",
				"mode":"cors"
			}).then(function(response){
				response.json().then(function(value){
					compteur++;
					var reponseHTML=cheerio.load(value.html);
					reponseHTML('.mainTitle3').each(function(i, element){
						var a = reponseHTML(this);
						tableauURLHotel.push(a.children().attr('href'));
					    });
	                if(compteur==8){
                        resolve(tableauURLHotel)	
                        reject("rejet")				 
					}
				})
            }).catch(err=>console.log(err));
        }
    }).catch(err=>console.log(err))
}
module.exports=LiensHotel;


