const sql = require("../db.js");
var uuid = require('uuid');
const { reject } = require("async");
const { response, response } = require("express");
const bcrypt = require('bcrypt')
const Queue = require("./queue.model.js");


const Student = function(user) {
  this.username = user.username;
  this.firstName = user.firstName
  this.lastName = user.lastName;
  this.id = user.id;
  this.role = user.role;
  this.password = user.password;
};

//find the class information by class_number
function classGetinfo(class_number){
    return new Promise((resolve, reject) =>{
        sql.query(`SELECT * FROM class WHERE CLASS_NUMBER = ?`, [class_number] ,(err,res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res);
        })
    })
}
//get the classes id by user_id
function classGetid(id){
    return new Promise((resolve, reject) =>{
        sql.query(`SELECT CLASS_ID FROM enrollment WHERE USER_ID = ?`, id, (err,res) =>{
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res);
        })
    })
}
//get the classes homepage information by classes id, but just have instructor id
function classGetshortinfo(classes_id){
    return new Promise((resolve, reject) =>{
        sql.query(`SELECT CLASS_ID, CLASS_NUMBER, CLASS_NAME, INSTRUCTOR_ID FROM class WHERE CLASS_ID = ?`, classes_id, (err,res) =>{
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res);
        })
    })
}
//class's all information
function classGetwholeinfo(classes_id){
    return new Promise((resolve, reject) =>{
        sql.query(`SELECT * FROM class WHERE CLASS_ID = ?`, classes_id, (err,res) =>{
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res);
        })
    })
}
//find instructor's or TA's name by his/her user id
function findName(user_id){
    return new Promise((resolve, reject) => {
        sql.query(`SELECT FIRST_NME, LAST_NME FROM user_info WHERE USER_ID = ?`, user_id, (err,res) =>{
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res);
        })
    })
}
function findOffice(class_id){
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM office_hour WHERE CLASS_ID = ? AND ACTIVE = ?`, class_id, true, (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res);
        })
    })
}
// check the student has been enrolled in this class
function check_student_enrolled (id, class_id){
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM enrollment WHERE USER_ID = ? AND CLASS_ID = ?`, id, class_id,  (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res)
        });
    })
}

function check_student_invitationcode (invi_code, class_id){
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM invitation_code WHERE INVITATION_CODE = ? AND CLASS_ID = ?`, invi_code, class_id, (err, res) =>{
            if (err){
                console.log("error: ", err);
                reject(err);
            }
            resolve(res);
        })
    })
}

Student.classAdd = async (id , class_number, invi_code, result) => {
    let item = classGetinfo(class_number);
    let class_id = item[0].CLASS_ID;
    flag_notenrolled = true
    // Does student has been enrolled in this class?
    let ifEnrolled = await check_student_enrolled(id, class_id)
    //student has been enrolled in this class
    if(ifEnrolled.length){
        flag_notenrolled = false
        let judge = { 
            isEnrolled: true,
        };
        result(null, judge);
        return;
    }
    // If not found: check the invitation code
    if (flag_notenrolled){
        flag_coderight = true;
        let ifCode = await check_student_invitationcode(invi_code, class_id);
        //invitation code is not right
        if (!ifCode.length){
            flag_coderight = false;
            let judge = {
                isCodeRight: false,
            }
            result(null, judge);
            return;
        }
        //invitation code is right, insert the enrolled and return true
        if (flag_coderight){
            let enrollmentID = uuid.v1();//is it useful?
            const uEnroll = {
                ENROLLMENT_ID: enrollmentID,
                USER_ID: id,
                CLASS_ID: class_id
            }
            sql.query('INSERT INTO enrollment SET ?', uEnroll, (err, result) => {
                if (err){
                        console.log("error: ", err);
                        result(error, null);
                        return;
                        } 
                console.log("class enrolled");
            });
            let judge = {
                isEnrolled: false,
                isCodeRight: true
            }
            result(null, judge);
            return;
        }
    }
}
    
Student.getClassAll = async (id, result) => {
    classes_shortinfo = []; 
    const response = {};
    let classes_id = await classGetid(id);
    if (classes_id.length){
        for (let i=0; i<classes_id.length; i++){
            classes_shortinfo[i] = await classGetshortinfo(classes_id[i]);
            let item = await findName(classes_shortinfo[i].INSTRUCTOR_ID);
            var instructor_name = item.join();
            classes_shortinfo[i].INSTRUCTOR_ID = instructor_name;
        }
        for (let j=0; j<classes_shortinfo.length; j++){
            let json_oneclass = {
                CLASS_ID : classes_shortinfo[j].CLASS_ID,
                CLASS_NUMBER : classes_shortinfo[j].CLASS_NUMBER,
                CLASS_NAME : classes_shortinfo[j].CLASS_NAME,
                INSTRUCTOR_NAME : classes_shortinfo[j].INSTRUCTOR_ID
            }
            let response = Object.assign(response, json_oneclass);
        }
        result(null, response);
        return
    } else {
        let judge = {
            isEmpty : true
        }
        result(null, judge);
        return;
    }
}

Student.getClassOne = async (class_id, result) => {
    let class_info = await classGetwholeinfo(class_id);
    if (class_info.length){
        let item_TA = await findName(class_info[0].TA_ID);
        let item_Instructor = await findName(class_info[0].INSTRUCTOR_ID);
        var TA_NAME = item_TA.join();
        var Instructor_NAME = item_Instructor.join();
        class_info[0].TA_ID = TA_NAME;
        class_info[0].INSTRUCTOR_ID = Instructor_NAME;
        
        let response = {
            CLASS_ID : class_info[0].CLASS_ID,
            CLASS_NUMBER : class_info[0].CLASS_NUMBER,
            CLASS_NAME : class_info[0].CLASS_NAME,
            CLASS_INFO : class_info[0].CLASS_INFO,
            CLASS_TERM : class_info[0].CLASS_TERM,
            INSTRUCTOR_NAME : class_info[0].INSTRUCTOR_ID,
            TA_NAME : class_info[0].TA_ID
        }
        result(null, response);
        return
    } else {
        let judge = {
            isEmpty : true
        }
        result(null, judge);
        return;
    }

}

Student.joinOffice = async (class_id, user_id, result) => {
    let getOffice = await findOffice(class_id);
    if (!getOffice.length){
        let judge = {
            isActive : false
        }
        result(null, judge);
        return;
    } else {
        let item_TA = await findName(getOffice[0].USER_ID);
        var TA_Name = item_TA.join();
        let item_classNumber = await classGetwholeinfo(class_id);
        var Class_Number = item_classNumber.CLASS_NUMBER
        let Office_token = getOffice[0].OFFICE_HOUR_ID;
        var QueueSet  = new Queue(`${Office_token}`);
        await QueueSet.addUser(user_id);
        let queue_rank = await QueueSet.rankUser(user_id);
        let queue_total = await QueueSet.inlineUser();
        if (queue_total==0){
            let response = {
                OFFICE_HOUR_ID : Office_token,
                CLASS_NUMBER : Class_Number,
                QUEUE_INDEX : queue_rank,
                TA_NAME : TA_Name
            }
            result(null, response)
            return;
        } else {
            let response = {
                OFFICE_HOUR_ID : Office_token,
                CLASS_NUMBER : Class_Number,
                TA_NAME : TA_Name,
                OFFICE_HOUR_LINK : getOffice[0].MEETING_LINK 
            }
            result(null, response)
            return;
        }
    }
}

Student.quitOffice = async (user_id, office_hour_id, result) => {
    let Office_token = office_hour_id;
    var QueueSet  = new Queue(`${Office_token}`);
    await QueueSet.removeUser(user_id);
    let judge = {
        isQuit = true
    }
    result(null, judge);
    return;
}

module.exports = Student;