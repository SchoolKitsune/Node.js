var express = require('express');
var fs = require('fs'); 
var mysql = require('mysql');

var app = express();
var con = mysql.createConnection({host:"mikkel-mysql.mysql.database.azure.com",
 user:"im", password:"!", database:"test", port:3306, ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}});
 
app.use(express.static('public'));
app.set('view engine', 'ejs');
 
app.get('/', function (req, res) {
    con.connect(function(err) {
        //if (err) throw err;
        con.query("SELECT * FROM new_table", function (err, result, fields) {
           if (err) throw err;
           console.log(result);     
                         
           res.render('index.ejs', {
              data: result,
              var1: "tekst"
                 
         }); // render
        }); // select
   });// connect
 }) // app get
 
 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })