const sql = require("../db.js");
var uuid = require('uuid');
const { reject } = require("async");

// constructor
const Instructor = function(user) {
  this.username = user.username;
  this.firstName = user.firstName
  this.lastName = user.lastName;
  this.id = uuid.v4();
  this.role = user.role;
  this.password = user.password;
};

function classLookUp(id){
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM class WHERE INSTRUCTOR_ID = ?`, [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res)
        });
    })
}



Instructor.getClasses = async (id, result) => {
    console.log(id)
    let classes = await classLookUp(id)
    console.log(classes.length)
    // if(classes.length){
    //     row = classes[0]
    //     console.log(row)
    // }
    let response = {
        courseList: classes
    }
    result(null, response)
    return
};

module.exports = Instructor;