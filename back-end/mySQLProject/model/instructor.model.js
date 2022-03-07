const sql = require("../db.js");
var uuid = require('uuid');
const { reject } = require("async");
const { response } = require("express");

// constructor
const Instructor = function(user) {
  this.username = user.username;
  this.firstName = user.firstName
  this.lastName = user.lastName;
  this.id = uuid.v4();
  this.role = user.role;
  this.password = user.password;
};

// auxilary function to look up the class info
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

// auxilary function to look up the class info
function editClass(classObject){
    return new Promise((resolve, reject) => {
        sql.query(
            `UPDATE class SET CLASS_NUMBER = ?, CLASS_NAME = ?, CLASS_INFO = ?, CLASS_TERM = ? WHERE CLASS_ID = ?`,
            [classObject.CLASS_NUMBER, classObject.CLASS_NAME, classObject.CLASS_INFO, classObject.CLASS_TERM, classObject.CLASS_ID],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                console.log(`Changed ${res.changedRows} row(s)`);
                resolve(res)
            }
        );
    })
}

// auxilary function to add a class
function addaClass(classObject){
    return new Promise((resolve, reject) => {
        sql.query(
            `INSERT INTO class SET ? `,
            [classObject],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                console.log("created class");
                resolve(res)
            }
        );
    })
}

// auxilary function to delete a class
function removeaClass(class_id){
    return new Promise((resolve, reject) => {
        sql.query(
            `DELETE FROM class WHERE CLASS_ID = ?;`,
            [class_id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                console.log("class removed");
                resolve(res)
            }
        );
    })
}

// function that get class info by instructor's id
Instructor.getClasses = async (id, result) => {
    console.log(id)
    let classes = await classLookUp(id)
    console.log(classes.length)
    if(classes.length){
        row = classes[0]
        console.log(row)
    }
    let response = {
        courseList: classes
    }
    result(null, response)
    return
};

// get class info by instructor's id
Instructor.editClasses = async (classObject, result) => {
    let res = await editClass(classObject)
    if (res.changedRows > 0){
        let response = {
            success : true
        }
        result(null, response)
        return
    }
    let response = {
        success : false
    }
    result(null, response)
    return
};

// adding class object into the database
Instructor.addClasses = async (classObject, result) => {
    let uid = uuid.v1()
    const classInfo = {
        CLASS_ID : uid,
	    CLASS_NUMBER : classObject.CLASS_NUMBER,
	    CLASS_NAME : classObject.CLASS_NAME,  
        CLASS_INFO : classObject.CLASS_INFO,
        CLASS_TERM : classObject.CLASS_TERM,
	    INSTRUCTOR_ID : classObject.INSTRUCTOR_ID
    };

    let res = await addaClass(classInfo)
    let response = {
        success : true
    }
    result(null, response)
    return
};

Instructor.removeClass = async (class_id, result) => {
    let res = await removeaClass(class_id)
    let response = {
        success : true
    }
    result(null, response)
    return
};
module.exports = Instructor;