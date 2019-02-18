
var castle=require('./castle.js');
var michelin=require('./michelin.js')
var fs=require('fs');


var TableauRestoEtoile=new Array();
var TableauHotelFinal=new Array();

async function PrixHotelLeSamedi()
{
    TableauHotelFinal=await castle();
    console.log(TableauHotelFinal);
    var string=JSON.stringify(TableauHotelFinal,null,'\t');
    fs.writeFile('./castle.json',string,function(err) { 
        if(err) return console.error(err); 
        console.log('done'); 
    })
}
async function HotelRestaurantEtoile()
{
    TableauRestoEtoile=await michelin();
    console.log(TableauRestoEtoile);
    var string=JSON.stringify(TableauRestoEtoile,null,'\t');
    fs.writeFile('./michelin.json',string,function(err) { 
        if(err) return console.error(err); 
        console.log('done'); 
    })
}

PrixHotelLeSamedi(); //Retourne un tableau d'objet contenant le nom de l'hotel avec ses prix du mois de mars et le samedi le moins cher
//HotelRestaurantEtoile();//Retourne la liste des restaurant relais chateau étoilé michelin


      