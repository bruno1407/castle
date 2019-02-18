var cheerio = require('cheerio');
var request = require('request');
var tableauURLResto=new Array();
var compteur=0;
var LiensResto=function(TableauURLHotel)
{
    return new Promise(function(resolve,reject){
        TableauURLHotel.forEach(element => {               
            request(element, function (error, response, html) {
                if (response.statusCode == 200) { 
                    compteur++;                  
                    var reponseHTML = cheerio.load(html);              
                    reponseHTML('body > div.jsSecondNav.will-stick > ul.jsSecondNavMain > li:nth-child(2) > a').each(function(i, element){                    
                        var a = reponseHTML(this);       
                        var site=a.attr('href')             
                        console.log(a.attr('href'));
                        if(site.includes('restaurant'))
                        {
                            tableauURLResto.push(a.attr('href'));  
                        }
                                                                
                    })
                    reponseHTML('#propertyBookingTab > div > div > div.propertyBookingTab.bookStayTab > div > div.tabMainContent.bookAStay').each(function(i, element){                    
                        var a = reponseHTML(this);                       
                        console.log(a.attr('data-hotel-synxis-id'));                                       
                    })                                                         
                }
                else{
                    console.log("erreur numero "+console.log(response.statusCode)+". Erreur reseau");
                    compteur++;
                };
                if(compteur==TableauURLHotel.length)
                {
                   
                    resolve(tableauURLResto);
                }
                
            });
        });
    })       
}
module.exports=LiensResto;