const express = require('express');
const app = express();
// mysql module
const mysql = require('mysql2');
// encrpytion module for password security
const bcrpty = require('bcrypt');
app.use(express.json())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qwe.1234',
    database: 'test'
});

// 
app.get('/users', (req, res) => {
    res.json(users)
});

con.connect((err) => {
    if(err){
      console.log(err);
      return;
    }
    console.log('Connection established');
});

con.query('SELECT * FROM user_info', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
  });
  
con.end((err) => {
    // The connection is terminated gracefully
    // Ensures all remaining queries are executed
    // Then sends a quit packet to the MySQL server.
});