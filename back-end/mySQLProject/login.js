//import modules
var express=require("express");
var bodyParser=require("body-parser");
// mysql module
const mysql = require('mysql2');
// encrpytion module for password security
const bcrpty = require('bcrypt');
var mysql2 = require('mysql2/promise');
var async = require('async')
// initialize express object
var app = express()
app.use(express.json())
// build up connection to db
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qwe.1234',
    database: 'test'
});
console.log('Service Enabled');

var isVerified = false;
var matched = false;
var role = 'unfilled';


app.post('/API/user/login', function(req,res){
    con.connect((err) => {
        if(err){
        console.log(err);
        return;
        }
        console.log('Connection established');
    });

    var username = req.body.username;
    var password = req.body.password;
    isVerified = false;
    matched = false;
    role = 'unfilled';

    // if username match with password
    con.query('SELECT PSWORD, VERIFIED FROM login_authentication WHERE EMAIL_ADRESS = ?',
    [username], (err, ress) => {
        if(err) throw err;

        console.log(ress)
        row = ress[0]
        if(row != null){
            console.log(`${row.PSWORD} and ${password}`)
                isVerified = row.VERIFIED
                if (row.PSWORD == password){
                    console.log("find")
                    matched = true
                    console.log(`1 ${matched}`)
                }
                role = row.role
            }
        console.log(`2 ${matched}`)
        let judge = { 
            isVerified: isVerified,
            isMatched: matched,
            role: role
        };
        res.json(judge);
        });
    console.log(`3 ${matched}`)

    
	con.query('SELECT * FROM login_authentication', (err,rows) => {
		if(err) throw err;
	  
		console.log('Data received from Db:');
		console.log(rows);
	});
});

app.listen(3000)