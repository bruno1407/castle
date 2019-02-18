var cheerio = require('cheerio');
var request = require('request');
var tableauNomResto=new Array();
var compteur=0;
function HotelInfo(NomResto, NomHotel) {
    this.NomHotel = NomHotel;
    this.NomResto = NomResto;
 
  }
var NomResto =function(UrlResto){
    return new Promise (function(resolve,reject){
        UrlResto.forEach(element => {              
            request(element, function (error, response, html) {
                if (response.statusCode == 200) { 
                    compteur++;                
                    var reponseHTML = cheerio.load(html);                              
                    var restoNom=reponseHTML('h3.mainTitle2.noVerticalMargin').text().trim();                                                               
                    var NomHotel=reponseHTML('h1.mainTitle2').text().trim();
                    var MonResto=new HotelInfo(restoNom,NomHotel);
                    tableauNomResto.push(MonResto);
                }
                else(console.log("erreur"),compteur++);            
                if(compteur==UrlResto.length)
                {
                    resolve(tableauNomResto);
                }  
            });
        })
    })
}
module.exports=NomResto;