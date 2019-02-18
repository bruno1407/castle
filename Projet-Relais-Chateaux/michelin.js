var Michelin=require('./NomMichelin.js');
var URLHotel=require('./URLHotel.js');
var URLResto=require('./LiensResto.js');
var NomResto=require('./NomResto.js');

var tableauURLHotel=new Array();
var tableauURLResto=new Array();
var tableauNomResto=new Array();
var tableauRestoEtoile=new Array();
var tableauInfoHotel=new Array();

async function RestoMichelin()
{
        tableauNomResto=await Michelin()           
        console.log(tableauNomResto);  
}

async function HotelURL(){
    tableauURLHotel=await URLHotel();
    console.log(tableauURLHotel);
}

function RestoURL()
{
    return HotelURL().then(async function(){
        tableauURLResto=await URLResto(tableauURLHotel);
        console.log(tableauURLResto);
    })
}
function RestoNom()
{
    return RestoURL().then(async function(){
        tableauInfoHotel=await NomResto(tableauURLResto);
        console.log(tableauInfoHotel);
    })
}

var ComparerResto=function()    
{
    return new Promise(function(resolve,reject){
    RestoNom().then(function(){
        return RestoMichelin();
    }).then(function(){
        return new Promise(function(resolve1,reject1){
            var i;
            for (i=0;i<tableauNomResto.length;i++)
            {               
                for (var j=0;j<tableauInfoHotel.length;j++) 
                {        
                    if(tableauInfoHotel[j].NomResto.search(tableauNomResto[i])!=-1)
                    {
                        tableauRestoEtoile.push(tableauNomResto[i]);
                        console.log("Le resto '"+tableauInfoHotel[j].NomResto+"' de l'hotel '"+tableauInfoHotel[j].NomHotel+"' est étoilé de chez michelin");
                    }
                }
            }
            if (i==tableauNomResto.length)
            {
                resolve1(tableauRestoEtoile)
                resolve(tableauRestoEtoile);
            }
        })
       
        
    })
})
}


module.exports=ComparerResto;

      