const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
var sleep = require('sleep');
const app = express();
const port = process.env.PORT || "8000";

const pg = require('pg');
const R = require('ramda');
    
const cs = 'postgres://flnjrxba:YaMxq5w2wYQHDInY-jHCWI0pAFZ8VWV_@kashin.db.elephantsql.com/flnjrxba';
let data;
var dataArray;
var datasend;
const client = new pg.Client(cs);
client.connect();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
  });

app.get("/css/bootstrap.min.css", (req, res) => {
    res.sendFile(path.join(__dirname+'/css/bootstrap.min.css'));
  });

app.get("/css/bootstrap.min.css", (req, res) => {
    res.sendFile(path.join(__dirname+'/css/bootstrap.min.css.map'));
  });
app.get("/forestlogo.svg", (req, res) => {
    res.sendFile(path.join(__dirname+'/forestlogo.svg'));
  });
app.get("/functions.js", (req, res) => {
    res.sendFile(path.join(__dirname+'/functions.js'));
  });
app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname+'/style.css'));
  });
app.get("/img/image0.jpg", (req, res) => {
    res.sendFile(path.join(__dirname+'/img/image0.jpg'));
  });
  app.get("/img/image1.jpg", (req, res) => {
    res.sendFile(path.join(__dirname+'/img/image1.jpg'));
  });
  app.get("/img/image2.jpg", (req, res) => {
    res.sendFile(path.join(__dirname+'/img/image2.jpg'));
  });
  app.get("/img/image3.jpg", (req, res) => {
    res.sendFile(path.join(__dirname+'/img/image3.jpg'));
  });
  app.get("/img/image4.jpg", (req, res) => {
    res.sendFile(path.join(__dirname+'/img/image4.jpg'));
  });
  app.get("/img/image5.jpg", (req, res) => {
    res.sendFile(path.join(__dirname+'/img/image5.jpg'));
  });
  

app.post('/queryGET', async function(req,res)
{
    var Qstring = req.body.str;
    console.log(Qstring);
    var result = await sendQuery(Qstring);
    //console.log("result is " + result +" "+ Date.now());
    res.send(result);

});

app.post('/queryMGET', async function(req,res)
{
    var Qstring = req.body.str;
    console.log(Qstring);
    var result = await sendQueryM(Qstring);
    //console.log("result is " + result +" "+ Date.now());
    res.send(result);

});
app.post('/queryDGET', async function(req,res)
{
    var Qstring = req.body.str;
    console.log(Qstring);
    var result = await sendQueryM(Qstring);
    //console.log("result is " + result +" "+ Date.now());
    res.send(result);

});

app.post('/insertSEND', async function(req,res)
{
    var Qstring = req.body.str;
    console.log(Qstring);
    var result = await sendQueryR(Qstring);
    //console.log("result is " + result +" "+ Date.now());
    res.send(result);

});



app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });

async function sendQuery(Qdata)
{
    
      var returnString ="";

      const query = {
          text: 'SELECT * FROM campsite',
          rowMode: 'array'
      };
      query.text = Qdata;
      var data;
      await client.query(query).then(res => {
      
          data = res.rows;
          data.forEach(row => {
              var rowString = "ZName: " + row[0] +" ZReservable: "+ row[1]+" ZCamp is Open: " +row[2] + " ZWater Provided: " +row[3]+" ZGarbage on site: "+ row[4] + " ZToilet type: " + row[5] +" ZElevation(ft): " + row[6] + " ZFee: $"+ row[7]+" END ";
              console.log(rowString);
              returnString +=rowString;
        
          });
          
  });
  return returnString;
  }

  async function sendQueryM(Qdata)
{
    
      var returnString ="";

      const query = {
          text: 'SELECT * FROM campsite',
          rowMode: 'array'
      };
      query.text = Qdata;
      var data;
      await client.query(query).then(res => {
      
          data = res.rows;
          data.forEach(row => {
              var rowString = "ZName: " + row[0] +" ZRanger District Office: "+ row[1]+" END ";
              console.log(rowString);
              returnString +=rowString;
        
          });
          
  });
  return returnString;
  }

  async function sendQueryR(Qdata)
{
    
      var returnString ="";

      const query = {
          text: 'SELECT * FROM campsite',
          rowMode: 'array'
      };
      query.text = Qdata;
      var data;
      await client.query(query).then(res => {
      
          console.log(res);
          
          
  });
  return returnString;
  }





