const sql = require("../db.js");
var uuid = require('uuid');
const { reject } = require("async");
const { response } = require("express");
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

function classtest(id, role){
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM user_info WHERE USER_ID = ? AND USER_ROLE = ?`, [id, role], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res);
        });
    })
}

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
        sql.query(`SELECT CLASS_ID FROM enrollment WHERE USER_ID = ? AND USER_ROLE = 'student'`, [id],  (err,res) =>{
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
        sql.query(`SELECT * FROM class WHERE CLASS_ID = ?`, [classes_id], (err,res) =>{
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res);
        })
    })
}

function getTAinfo(class_id){
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM enrollment WHERE CLASS_ID = ? AND USER_ROLE = 'TA'`, [class_id], (err, res) => {
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
        sql.query(`SELECT * FROM class WHERE CLASS_ID = ?`, [classes_id], (err,res) =>{
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res);
        })
    })
}
//find instructor's or TA's name by his/her user id
function findNameInstructor(user_id){
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM user_info WHERE USER_ID = ? AND USER_ROLE = 'instructor'`, [user_id], (err,res) =>{
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res);
        })
    })
}

function findNameTA(user_id){
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM user_info WHERE USER_ID = ? AND USER_ROLE = 'TA'`, [user_id], (err,res) =>{
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
        sql.query(`SELECT * FROM office_hour WHERE CLASS_ID = ? AND ACTIVE = ?`, [class_id], true, (err, res) => {
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
        sql.query(`SELECT * FROM enrollment WHERE USER_ID = ? AND CLASS_ID = ? AND USER_ROLE = 'student'`, [id, class_id],  (err, res) => {
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
        sql.query(`SELECT * FROM invitation_code WHERE INVITATION_CODE = ? AND CLASS_ID = ?`, [invi_code, class_id], (err, res) =>{
            if (err){
                console.log("error: ", err);
                reject(err);
            }
            resolve(res);
        })
    })
}

Student.test = async (id, role, result) => {
    console.log(id);
    let testset = await classtest(id, role);
    console.log(testset.length);
    let response = {
        personList: testset[0].USER_ROLE
    }
    result(null, response)
    return
}   

Student.classAdd = async (id , class_number, invi_code, result) => {
    console.log(class_number);
    let item = await classGetinfo(class_number);
    if(!item.length){
        let judge = {
            isclassexisted : false
        }
        result(null, judge);
        return
    }
    let class_id = item[0].CLASS_ID;
    console.log(class_id);
    flag_notenrolled = true
    // Does student has been enrolled in this class?
    let ifEnrolled = await check_student_enrolled(id, class_id)
    console.log(ifEnrolled);
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
        console.log(ifCode)
        //invitation code is not right
        if (!ifCode.length){
            flag_coderight = false;
            let judge = {
                isEnrolled: false,
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
                CLASS_ID: class_id,
                USER_ROLE: 'student'
                
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
    const response = [];
    let classes_id = await classGetid(id);
    console.log(classes_id);
    if (classes_id.length){
        for (let i=0; i<classes_id.length; i++){
            classes_shortinfo[i] = await classGetshortinfo(classes_id[i].CLASS_ID);
            console.log(classes_shortinfo[i][0].INSTRUCTOR_ID);
        }
        for (let j=0; j<classes_shortinfo.length; j++){
            let item = await findNameInstructor(classes_shortinfo[j][0].INSTRUCTOR_ID);
            console.log(item);
            var instructor_name = item[0].FIRST_NME+' '+ item[0].LAST_NME;
            let json_oneclass = {
                CLASS_ID : classes_shortinfo[j][0].CLASS_ID,
                CLASS_NUMBER : classes_shortinfo[j][0].CLASS_NUMBER,
                CLASS_NAME : classes_shortinfo[j][0].CLASS_NAME,
                INSTRUCTOR_NAME : instructor_name
            }
            response.push(json_oneclass);
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
    //console.log(class_info)
    let TA_info = await getTAinfo(class_id);
    //console.log(TA_info);
    let TA_allname = [];
    if (class_info.length){
        let item_Instructor = await findNameInstructor(class_info[0].INSTRUCTOR_ID);
        var Instructor_NAME = item_Instructor[0].FIRST_NME+' '+ item_Instructor[0].LAST_NME;
        if(TA_info.length){
            for(let i=0; i<TA_info.length; i++){
                console.log('here is ', i)
                let item_TA = await findNameTA(TA_info[i].USER_ID);
                console.log(item_TA);
                TA_allname[i] = item_TA[0].FIRST_NME+' '+ item_TA[0].LAST_NME;
                console.log(TA_allname[i]);
            }
        }
        console.log(TA_allname);
        let response = {
            CLASS_ID : class_info[0].CLASS_ID,
            CLASS_NUMBER : class_info[0].CLASS_NUMBER,
            CLASS_NAME : class_info[0].CLASS_NAME,
            CLASS_INFO : class_info[0].CLASS_INFO,
            CLASS_TERM : class_info[0].CLASS_TERM,
            INSTRUCTOR_NAME : Instructor_NAME,
            TA_NAME : TA_allname
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
        //let queue_total = await QueueSet.inlineUser();
        if (queue_rank==0){
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
        isQuit : true
    }
    result(null, judge);
    return;
}

module.exports = Student;