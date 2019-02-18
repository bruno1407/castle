var URLHotel=require('./URLHotel.js');
var PrixDesHotels=require('./PrixHotel.js');
var HotelId=require('./RecupererId.js');


var tableauURLHotel=new Array();
var MapId=new Map();
var tabPrix=new Array();

async function HotelURL(){
    tableauURLHotel=await URLHotel();
    console.log(tableauURLHotel);
}
function IdHotel()
{
    return HotelURL().then(async function(){
        MapId=await HotelId(tableauURLHotel);
        console.log(MapId);
    })
}
function PrixHotel()
{
    return IdHotel().then(async function(){
    tabPrix=await PrixDesHotels(MapId);
    console.log(tabPrix);
    })
}


var MonHotel=function()
{  
    return new Promise(function (resolve,reject){
        PrixHotel().then(async function(){
            await boucle();
            resolve(tabPrix);
        })
    }) 
}
function boucle()
{
    return new Promise(function (resolve,reject){
        for(var i=0;i<tabPrix.length;i++){
            PrixLesSamedi(tabPrix[i]);
        }
        if(i==tabPrix.length)
        {
            resolve();
        }
    })
}
function PrixLesSamedi(PrixSamedi)
{ 
    var ListePrix=new Array();
    for(var j=0;j<PrixSamedi.PrixHotel.length;j++)
    {
        var nombre=/[0-9]{3,4}/.exec(PrixSamedi.PrixHotel[j]);
        ListePrix.push(nombre);
    }
    var min=ListePrix[0]
    var index=0;
    for (var k=1;k<ListePrix.length;k++)
    {
        if (ListePrix[k]<min)
        {
            min=ListePrix[k];
            index=k;
        }

    } 
    if(PrixSamedi.PrixHotel.length==0)
    {
        PrixSamedi.SamediMoinsChère="Pas de disponibilité le mois de mars";
        PrixSamedi.index=0;
    }
    else
    {
        PrixSamedi.SamediMoinsChère="Pour le mois de mars, le samedi "+PrixSamedi.jour[index]+" sera le moins cher à "+ListePrix[index]+"$";
        PrixSamedi.index=index;
    }
    
    console.log(PrixSamedi.SamediMoinsChère);
}

module.exports=MonHotel;

      