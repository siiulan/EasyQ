//import modules
var express=require("express");
var async =require("async");
// mysql module
const mysql = require('mysql2');
// encrpytion module for password security
const bcrpty = require('bcrypt');
const promise = require('mysql2/promise');
// uuid module:
var uuid = require('uuid');
const { request } = require("express");
const lib = require("./configs/nodemailer.config");
// initialize express object
var app = express()
app.use(express.json())
console.log('Service Enabled');

// build up connection to db
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qwe.1234',
    database: 'test'
});

// async function search

async function dbFind(db, dbName, attribute, value) {
	let users;
	try{
		const users = await db.promise().query(`SELECT EMAIL_ADRESS FROM ${dbName} WHERE ${attribute} = ?`, [value]);
		console.log('1111111')
		console.log(users[0])
		if (users) {
			return users;
		} else {
			return null;
		}
	} catch (err){
		console.log(err)
	}
}


// parse the json file from front-end and save it in variable data
app.post('/API/user/registration', function(req,res){
	con.connect((err) => {
		if(err){
		console.log(err);
		return;
		}
		console.log('Connection established');
	});

	var username = req.body.username;
    var password = req.body.password;
	var invicode = req.body.invitation_code;
	var name = req.body.name;

	// variable initialization
	var invitationCodeMatched = false;
	var role = 'student';
	const uid = uuid.v4();
	var verifyToken = uuid.v1()
	var flag = true;


	// // check if the username have already been registered  isRegistered

	if (dbFind(con, 'login_Authentication', 'EMAIL_ADRESS', username) != null){
		flag = false
	} else {
		flag = true
	}
	console.log(`1 ${flag}`)

	// con.query('SELECT EMAIL_ADRESS FROM login_authentication', (err,rows) => {
	// 	if(err) throw err;

	// 	console.log('Data received from Db:');
	// 	rows.forEach( (row) => {
	// 		// find
	// 		if (flag && row.USER_NAME == username){
	// 			flag = false
	// 			console.log(`1 ${flag}`)
	// 		}
	// 	});
	// 	console.log(rows);
	//   });
	  // check invitation code to see if a user qualify for a TA:
	  con.query('SELECT INVITATION_CODE FROM invitation_code', (err,rows) => {
		if(err) throw err;

		rows.forEach( (row) => {
			// find
			if (row.INVITATION_CODE == invicode){
				role = 'TA';
				invitationCodeMatched = true
			}
		});
		console.log(rows);
	  });

	  // otherwisr: insert it into te database:
	  const uLoginAuth = {
		USER_ID: uid,
		EMAIL_ADRESS: username, 
		PSWORD:password,
		VERIFIED: false,
		VERIFYCODE: verifyToken
	  };

	  const uInfo = {
		USER_ID: uid, 
		NME: name, 
		USER_ROLE: role,
		EMAIL_ADRESS: username
	  };

	  if(flag){
		con.query('INSERT INTO login_authentication SET ?', uLoginAuth, (err, res) => {
			if(err) throw err;
		  
			console.log('Last insert ID:', res.insertId);
		  });

		//con.query('INSERT INTO user_info(USER_ID, NME, USER_ROLE,EMAIL_ADRESS) VALUES ?', uInfo, (err, res) => {
		con.query('INSERT INTO user_info SET ?', uInfo, (err, res) => {
			if(err) throw err;
	
			console.log('Last insert ID:', res.insertId);
		});
	  }

	con.query('SELECT * FROM user_info', (err,rows) => {
		if(err) throw err;
	  
		console.log('Data received from Db:');
		console.log(rows);
	});

	// con.end((err) => {
	// 	// The connection is terminated gracefully
	// 	// Ensures all remaining queries are executed
	// 	// Then sends a quit packet to the MySQL server.
	// });
	//send json file to the front end
	// 'use strict';
	// const fs = require('fs');

	console.log(`2 ${flag}`)

	let judge = { 
		isRegistered: flag,
		invitationCodeMatched: invitationCodeMatched
	};
	res.json(judge);
	//If the user has not yet verified:
	lib.sendConfirmationEmail(name, username, verifyToken)
});

app.listen(3000)
