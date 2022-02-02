const mysql = require('mysql2');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qwe.1234',
    database: 'test'
});
con.connect((err) => {
    if(err){
    console.log(err);
    return;
    }
    console.log('Connection established');
});