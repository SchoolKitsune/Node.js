var express = require('express');
var fs = require('fs'); 
var mysql = require('mysql');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

var app = express();

//Kan hende at user er mikkel
app.use(express.static('public'));
app.set('view engine', 'ejs');
 
app.get('/', function (req, res) {

   var con = mysql.createConnection({host:"mikkel-mysql.mysql.database.azure.com", user:"mikkel", password:"1drossaP", 
   database:"spontanlaanbank", port:3306, ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}});

    con.connect(function(err) {
        //if (err) throw err;
        con.query("SELECT * FROM brukere", function (err, result, fields) {
           if (err) throw err;
           console.log(result);     
                         
           res.render('index.ejs', {
              data: result
             
                 
         }); // render
        }); // select
   });// connect
 }) // app get

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 
const oneDay = 1000 * 60 * 60 * 24; // calculate one day
 
// express app should use sessions
app.use(sessions({
    secret: "thisismysecrctekeyfhgjkgfhkgfjlklkl",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
 
// set the view engine to ejs
app.set('view engine', 'ejs');
 
//username and password   
const myusername = 'user1';
const mypassword = '123';
 
// a variable to save a session
var session;
 
app.get('/', function (req, res) {
     session=req.session;
     if(session.userid){
        res.render('login_index.ejs', { 
            userid: session.userid      
        });
 
     } 
     else {
        res.render('login.ejs', { });
     }
})
 
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.render('login.ejs', {     
    });
 
})
app.get('/konto', function (req, res) {


    var con = mysql.createConnection({host:"mikkel-mysql.mysql.database.azure.com", user:"mikkel", password:"1drossaP", 
    database:"spontanlaanbank", port:3306, ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}});
 
     con.connect(function(err) {
         //if (err) throw err;
         con.query("SELECT * FROM brukere", function (err, result, fields) {
            if (err) throw err;
            console.log(result);     
                          
            res.render('konto.ejs', {
               data: result
              
                  
          }); // render
         }); // select
    });// connect
  }) // app get
 
app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})
 
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})