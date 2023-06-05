var express = require('express');
var fs = require('fs'); 
var mysql = require('mysql');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

var app = express();

//Kan hende at user er mikkel
app.use(express.static('public'));
app.set('view engine', 'ejs');
 
app.get('/test', function (req, res) {

   var con = mysql.createConnection({host:"mikkel-mysql.mysql.database.azure.com", user:"mikkel", password:"1drossaP", 
   database:"spontanlaanbank", port:3306, ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}});

    con.connect(function(err) {
        //if (err) throw err;
        con.query("SELECT * FROM brukere", function (err, result, fields) {
           if (err) throw err;
           console.log(result);     
                         
           res.render('index.ejs', {
              data: result,
              innhold: result.fornavn


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

 
// a variable to save a session
var session;
 
app.get('/', function (req, res) {
     session=req.session;
     if(session.userid){ //if already logged in
        res.render('index.ejs', {
            userid: session.userid
        });
 
     } 
     else {
        res.render('login.ejs', { });
     }
})

app.post('/login', function (req, res) {
    var con = mysql.createConnection({host:"mikkel-mysql.mysql.database.azure.com", user:"mikkel", password:"1drossaP", 
   database:"spontanlaanbank", port:3306, ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}});

 
    // hent brukernavn og passord fra skjema på login
    var person_nr = req.body.person_nr;
    var passord = req.body.password;

    console.log(person_nr, passord)
 
    // perform the MySQL query to check if the user exists
    var sql = 'SELECT * FROM brukere WHERE person_nr = ? AND passord = ?';
    
    con.query(sql, [person_nr, passord], (error, results) => {
        if (error) {
            res.status(500).send('Internal Server Error');
        } else if (results.length === 1) {
            session = req.session;
            session.userid=req.body.person_nr; // set session userid til brukernavn
            res.redirect('/konto');
 
        } else {
            res.redirect('/login?error=invalid'); // redirect med error beskjed i GET
        }
    });
});



app.get('/logout', function (req, res) {
    req.session.destroy();
    res.render('login.ejs', {     
    });
 
})
app.get('/konto', function (req, res) {

    session = req.session

    person_nr = session.userid


    var con = mysql.createConnection({host:"mikkel-mysql.mysql.database.azure.com", user:"mikkel", password:"1drossaP", 
    database:"spontanlaanbank", port:3306, ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}});
 
     con.connect(function(err) {
         //if (err) throw err;
         var sql = 'SELECT * FROM brukere WHERE person_nr = ?';
    
         con.query(sql, [person_nr], (error, results) => {
            if (err) throw err;
            console.log(results);     
                          
            res.render('konto.ejs', {
               data: results
              
                  
          }); // render
         }); // select
    });// connect
  }) // app get
 

 
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})