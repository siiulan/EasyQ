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

app.get('/API/user/confirm/:confirmationCode', function(req,res){
    con.connect((err) => {
        if(err){
        console.log(err);
        return;
        }
        console.log('Connection established');
    });

    var confirmationToken = req.params.confirmationCode
    console.log(confirmationToken)

    // if username match with password
    con.query('SELECT USER_ID FROM login_authentication WHERE VERIFYCODE = ?',
    [confirmationToken], (err, ress) => {
        if(err) throw err;

        console.log(ress)
        row = ress[0]
        if(row != null){
            con.query(
                'UPDATE login_authentication SET VERIFIED = ? WHERE USER_ID = ?',
                [true, row.USER_ID],
                (err, result) => {
                  if (err) throw err;
              
                  console.log(`Changed ${result.changedRows} row(s)`);
                }
              );
              
        } else {
            return res.status(404).send({ message: "User Not found." });
        }
        });
});
app.listen(3000)