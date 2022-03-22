const con = require("../db.js");
let table = "";
if(process.argv[2] == null){
  console.log("please provide table name in arg");
} else {
  table = process.argv[2]
}

var sql = `DELETE FROM ${table}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
});

return