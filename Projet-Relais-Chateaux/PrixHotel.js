var fetch=require('node-fetch');
var MapPrix=new Map();
var MapID2=new Map();
var Maliste=new Array();
var compteur=0;
var MonHotel=new Object()
function HotelInfo(NomHotel,ID,jour,PrixHotel) {
    this.NomHotel = NomHotel;
    this.ID = ID;
    this.PrixHotel = PrixHotel;
    this.jour = jour;
 
  }

var PrixHotel=function(MapId)
{
    return new Promise(function(resolve,reject){
        for (var [clé, valeur] of MapId) 
        { 
            InfoHotel(clé,valeur).then(function(result){                  
                          
                Maliste.push(result);
                compteur++;
                if(compteur==MapId.size)
                {
                    resolve(Maliste)
                }
            });
           
        }
       
    })
}
function InfoHotel(IDHotel,NomHotel)
{
    return new Promise(function(resolve,reject){
    fetch("https://www.relaischateaux.com/fr/popin/availability/check?month=2019-3&idEntity="+IDHotel+"%7C%7CSTD1DD&pax=2&room=1", 
            { 
                "credentials": "include", 
                "headers": {
                    "accept": "application/json, text/javascript, /; q=0.01",
                    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7", 
                    "x-requested-with": "XMLHttpRequest" 
                },
                "referrer": "https://www.relaischateaux.com/fr/france/castelclara-morbihan-bangor",
                "referrerPolicy": "origin-when-cross-origin", 
                "body": null, 
                "method": "GET", 
                "mode": "cors" 
            }).then(function(response){
               
				response.json().then(function(value){              
                    var prix=[]
                    var jour=[]
                    for (var i=1;i<32;i++){
                        var weekend=new Date('2019-03-'+i);
                        if (weekend.getDay()==6 && value['2019-3'].pricesPerDay[i]!=undefined){
                            prix.push(value['2019-3'].pricesPerDay[i]); 
                            jour.push(i)    
                        }                   
                    }
                    MapPrix.set(jour,prix); 
                    var MonResto=new HotelInfo(NomHotel,IDHotel,jour,prix);
                 
                    resolve(MonResto);
                       
				})
            }) 
        })
}
module.exports=PrixHotel;


