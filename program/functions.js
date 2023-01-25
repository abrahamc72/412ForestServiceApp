//const { query } = require("express");

var queryData;
var queryString;
var dataReturned;
var choppedArray;
var reserveStatus;
var reservationSpot;
var reservationTable = new Array();
var entry = new Array();
        entry[0] ="Camp: Little Elden Springs Horse Camp";
        entry[1] ="Name: Abraham Cervantes";
        entry[2]="Phone: 111-111-1111";
        entry[3]="Arrival Date: 04-29-2021";
        entry[4]="Departure Date: 05-03-2021";
    this.reservationTable[0] = entry;
    entry = new Array();
        entry[0] ="Camp: Lynx Campground";
        entry[1] ="Name: Luke Dantuono";
        entry[2]="Phone: 222-222-2222";
        entry[3]="Arrival Date: 08-01-2021";
        entry[4]="Departure Date: 08-07-2021";
    this.reservationTable[1] = entry;
function grabAll()
{
    //numPeople
    //paySelect
    //horseSelect
    //trashSelect
    //waterSelect
    //toiletSelect

    var entry = new Array();
        entry[0] ="Camp: Little Elden Springs Horse Camp";
        entry[1] ="Name: Abraham Cervantes";
        entry[2]="Phone: 111-111-1111";
        entry[3]="Arrival Date: 04-29-2021";
        entry[4]="Departure Date: 05-03-2021";
    this.reservationTable[0] = entry;
    var entry = new Array();
        entry[0] ="Camp: Lynx Campground";
        entry[1] ="Name: Luke Dantuono";
        entry[2]="Phone: 222-222-2222";
        entry[3]="Arrival Date: 08-01-2021";
        entry[4]="Departure Date: 08-07-2021";
    this.reservationTable[1] = entry;



    var div = document.getElementById("addDiv");
    div.innerHTML="";
    queryString = "SELECT * from ";
    horseCheck = 0;
    if(document.getElementById("horseSelect").value==1)
    {
        horseCheck=1;
        queryString += "campsite INNER JOIN horse_campground ON (horse_campground.campsite_name=campsite.campsite_name)";
    }
    else{
        queryString += "campsite";
    }

    if(horseCheck == 0)
    {
        if(document.getElementById("paySelect").value==1)
        {
            queryString += " WHERE daily_fee = 0";
        }
        else
        {
            queryString += " WHERE daily_fee >= 0";
        }
    
        if(document.getElementById("trashSelect").value==1)
        {
            queryString += " AND has_garbage = true";
        }
    
        if(document.getElementById("waterSelect").value==1)
        {
            queryString += " AND has_water = true";
        }
    
        if(document.getElementById("toiletSelect").value==1)
        {
            queryString += " AND toilet_type != Compost";
        } 
    }
    var Url ='http://localhost:8000/queryGET';

    var dataReturned ="";
    var post = $.ajax({
        traditional: true,
        async: false,
        type: 'POST',
        dataType:'text',
        data:{str:queryString},
        url: '/queryGET',
        success: function (data) {
             return data;
        }
     });

     dataReturned = (post.responseText);
     console.log(queryString);

     var splitArray = dataReturned.split("END");
     //console.log(dataReturned);
     //console.log(splitArray);

     var div = document.getElementById("addDiv");
     var choppedArray = new Array();
     for(i = 0;i<splitArray.length-1;i++)
     {
        choppedArray[i] = splitArray[i].split("Z");
     }
     //console.log(choppedArray);
     this.choppedArray = choppedArray;
     var imageNum = getRandomInt(6);
     if(splitArray.length)
     for(i = 0;i<splitArray.length-1;i++)
     {
        if(imageNum==6)
        {
            imageNum=0;
        }
        var reserveStatus = "No";
        if((choppedArray[i][2]).includes("true"))
        {
            reserveStatus = "Yes";
        }
        this.reserveStatus = reserveStatus;
        div.innerHTML += "<div class=\"row\"> <svg width=\"700\" height=\"20\"> <rect width=\"600\" height=\"20\" style=\"fill:#ffd200;stroke-width:3;stroke:black;\" /></svg> </div>"+
        "<div class=\"row\" style=\"margin.top:20px;\"> <div class = col> <img  src=\"/img/image"+imageNum+".jpg\""+" style=\"width:200px;height:200px;\"> </div>"+
        "<div class =col> <h6 class=text-white>" + choppedArray[i][1] + "<h6><h6 class=text-white>Reservable: " + reserveStatus + "<h6><button onclick=\"location.href='#BetterView';grabChopped("+i+","+imageNum+");\" style=\"margin-left:25px;margin-top:25px;\" class=\"btn btn-lg btn-outline-primary btn-block\" type=\"button\" id=addedButton"+i+" >Closer View</button></div>";


        imageNum++;

     }
    


}

function grabChopped(i,j)
{
    console.log(choppedArray[i][1]);
    var getimg = "/img/image" +j+".jpg";
    var queryName = (choppedArray[i][1]).substr(6);
    document.getElementById("bvIMG").src = getimg;
    document.getElementById("bvTitle").innerHTML = queryName;
    document.getElementById("bv1").innerHTML = choppedArray[i][2];
    document.getElementById("bv2").innerHTML = choppedArray[i][3];
    document.getElementById("bv3").innerHTML = choppedArray[i][4];
    document.getElementById("bv4").innerHTML = choppedArray[i][5];
    document.getElementById("bv5").innerHTML = choppedArray[i][6];
    document.getElementById("bv6").innerHTML = choppedArray[i][7];
    document.getElementById("bv7").innerHTML = choppedArray[i][8];


    reservable = (choppedArray[i][2]).substr(12);
    console.log(reservable);
    if(reservable =="false ")
    {
        document.getElementById("reserveButton").classList.add("disabled");
    }
    else
    {
        document.getElementById("reserveButton").className = "btn btn-lg btn-outline-primary btn-block";
    }

    var queryName = (choppedArray[i][1]).substr(6);
    queryName = queryName.substr(0,queryName.length-1);
    this.reservationSpot = queryName;
    var query2 = 'SELECT * from manages WHERE campsite_name=\''+queryName+'\'';
    console.log(query2);

    var post = $.ajax({
        traditional: true,
        async: false,
        type: 'POST',
        dataType:'text',
        data:{str:query2},
        url: '/queryMGET',
        success: function (data) {
             return data;
        }
     });

    var dataReturned2 = (post.responseText);
    console.log(dataReturned2);
    var splitArray2 = dataReturned2.split("END");
    var choppedArray2 = new Array();
    for(i = 0;i<splitArray2.length-1;i++)
    {
       choppedArray2[i] = splitArray2[i].split("Z");
    }
    console.log(choppedArray2[0][2]);

    document.getElementById("bv8").innerHTML = choppedArray2[0][2];
    var query3 = (choppedArray2[0][2]).substr(24);
    query3 = query3.substr(0,query3.length-1);
    var queryStr3 = 'SELECT * from ranger_district WHERE district_name=\''+query3+'\'';
    console.log(queryStr3);

    var phone ='';
    phone+="("+(getRandomInt(9)+1);phone+=(getRandomInt(9)+1);phone+=(getRandomInt(9)+1);phone+=")-"+(getRandomInt(8)+1);phone+=(getRandomInt(8)+1);phone+=(getRandomInt(8)+1);phone+="-"+(getRandomInt(8)+1);phone+=(getRandomInt(8)+1);phone+=(getRandomInt(8)+1);phone+=(getRandomInt(8)+1);
    console.log(phone);
    document.getElementById("bv9").innerHTML = "Phone Number: "+phone;
}

function clearForm()
{
    document.getElementById("fName").value="";
    document.getElementById("pNum").value="";
    document.getElementById("arriveD").value="";
    document.getElementById("departD").value="";
}
function sendReserve()
{
    queryR = "INSERT INTO reserves VALUES(\'";
    var fVal = document.getElementById("fName").value;
    var pVal = document.getElementById("pNum").value;
    var aVal = document.getElementById("arriveD").value;
    var dVal = document.getElementById("departD").value;
    queryR += reservationSpot;
    queryR += "\',\'";
    queryR += pVal;
    queryR += "\',\'";
    queryR += aVal;
    queryR += "\',\'";
    queryR += dVal;
    queryR += "\')";

    if(fVal==""||pVal==""||aVal==""||dVal=="")
    {
        document.getElementById("reserveResult").innerHTML ="Failure. Please Follow the Format and Try Again";
    }
    else
    {
        console.log(queryR);
        var entry = new Array();
        entry[0] ="Camp: "+reservationSpot;
        entry[1] ="Name: "+fVal;
        entry[2]="Phone: "+pVal;
        entry[3]="Arrival Date: "+aVal;
        entry[4]="Departure Date: "+dVal;
        var spot = this.reservationTable.length;
        this.reservationTable[spot] = entry;
        document.getElementById("reserveResult").innerHTML ="Success.";
        //console.log(this.reservationTable);
    }
    

}

function viewReserve()
{
    var div = document.getElementById("reserveDiv");
    div.innerHTML = "";
    console.log(reservationTable[1]);
    for(i =0; i<this.reservationTable.length;i++)
    {
        
        div.innerHTML += "<div class=\"row\"><svg width=\"700\" height=\"20\"> <rect width=\"600\" height=\"20\" style=\"fill:#ffd200;stroke-width:3;stroke:black;\" /></svg></div> "+
        "<div class=\"row\" style=\"margin.top:20px;\">"+
        "<div class =col> <h6 class=text-white>" + this.reservationTable[i][0] + "</h6><h6 class=text-white>" + this.reservationTable[i][1] + "<h6></h6><h6 class=text-white>" + this.reservationTable[i][2] + "<h6></h6><h6 class=text-white>" + this.reservationTable[i][3] + "<h6></h6><h6 class=text-white>" + this.reservationTable[i][4] + "<h6></div>";

    }
}

function getRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}

function takeOut(result)
{
    dataReturned = result;
}

function createHTML(data)
{
    console.log(data);
}

function hideElement()
{
    var element = document.getElementById("Home");
    element.style.display = "none";
}

function showElement()
{
    var element = document.getElementById("Home");
    element.style.display = "block";
}

function startConnection()
{
    console.log("yes");
}
