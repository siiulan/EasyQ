const sql = require("../db.js");
var uuid = require('uuid');
const { reject } = require("async");
const { response } = require("express");
const bcrypt = require('bcrypt')
const Queue = require("./queue.model.js");
const Hash = require("./hash.model.js")

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
function classGetinfo(class_number, term){
    return new Promise((resolve, reject) =>{
        sql.query(`SELECT * FROM class WHERE CLASS_NUMBER = ? AND CLASS_TERM = ?`, [class_number, term] ,(err,res) => {
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
//find TA name by user_id
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
//find office hour info by class_id
function findOffice(class_id){
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM office_hour WHERE CLASS_ID = ? AND ACTIVE = true`, [class_id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res);
        })
    })
}
//find office hour info by tocken
function findOffice_by_tocken(officehour_id){
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM office_hour WHERE OFFICE_HOUR_ID = ? AND ACTIVE = true`, [officehour_id], (err, res) => {
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
//check the invitation code is right or not
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

Student.test = async (id, tocken, question, result) => {
    var QueueSet  = new Queue(`${tocken}`);
    var HashSet = new Hash(`${tocken}hash`);
    await QueueSet.addUser(id);
    await HashSet.addQuestion(id, question);
    HashSet.getQuestion(id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "some error occured"
            })
        else{
            let response = {
                Question : data
            }
            result(null,response);
            return;
        }
    })
    
    
}

Student.classAdd = async (id , term, class_number, invi_code, result) => {
    let item = await classGetinfo(class_number, term);
    if(!item.length){
        let judge = {
            isclassexisted : false
        }
        result(null, judge);
        return
    }
    let class_id = item[0].CLASS_ID;
    flag_notenrolled = true
    // Does student has been enrolled in this class?
    let ifEnrolled = await check_student_enrolled(id, class_id)
    //console.log(ifEnrolled);
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
    if (classes_id.length){
        for (let i=0; i<classes_id.length; i++){
            classes_shortinfo[i] = await classGetshortinfo(classes_id[i].CLASS_ID);
        }
        for (let j=0; j<classes_shortinfo.length; j++){
            let item = await findNameInstructor(classes_shortinfo[j][0].INSTRUCTOR_ID);
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
                let item_TA = await findNameTA(TA_info[i].USER_ID);
                TA_allname[i] = item_TA[0].FIRST_NME+' '+ item_TA[0].LAST_NME;
            }
        }
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
Student.displayOffice = async (class_id, user_id, result) => {
    let getOffice = await findOffice(class_id);
    if (!getOffice.length){
        let judge = {
            isActive : false
        }
        result(null, judge);
        return;
    } else {
        let item_TA = await findNameTA(getOffice[0].USER_ID);
        let TA_name = item_TA[0].FIRST_NME+' '+ item_TA[0].LAST_NME;
        let item_classNumber = await classGetwholeinfo(class_id);
        var Class_Number = item_classNumber[0].CLASS_NUMBER;
        var class_Name = item_classNumber[0].CLASS_NAME;
        let Office_token = getOffice[0].OFFICE_HOUR_ID;
        let response = {
            OFFICE_HOUR_ID : Office_token,
            CLASS_NUMBER : Class_Number,
            CLASS_ID : class_id,
            CLASS_NAME : class_Name,
            TA_NAME : TA_name,
            TA_ID : getOffice[0].USER_ID
        }
        result(null, response)
        return
    }
}
Student.joinOffice = async (class_id, user_id, question, result) => {
    let getOffice = await findOffice(class_id);
    if (!getOffice.length){
        let judge = {
            isActive : false
        }
        result(null, judge);
        return;
    } else {
        let item_TA = await findNameTA(getOffice[0].USER_ID);
        let TA_name = item_TA[0].FIRST_NME+' '+ item_TA[0].LAST_NME;
        console.log(TA_name);
        let item_classNumber = await classGetwholeinfo(class_id);
        var Class_Number = item_classNumber[0].CLASS_NUMBER;
        let Office_token = getOffice[0].OFFICE_HOUR_ID;
        var QueueSet  = new Queue(`${Office_token}`);
        QueueSet.addUser(user_id);
        var HashSet = new Hash(`${Office_token}hash`);
        await QueueSet.addUser(user_id);
        await HashSet.addQuestion(user_id, question);
        QueueSet.rankUser(user_id,(err,data) =>{
            if (err)
                res.status(500).send({
                    message:
                        err.message || "some error occured"
                })
            else{
                let response = {
                    isinQueue: true,
                    OFFICE_HOUR_ID : Office_token,
                    CLASS_NUMBER : Class_Number,
                    CLASS_ID : class_id,
                    QUEUE_INDEX : data,
                    CLASS_NAME : item_classNumber[0].CLASS_NAME,
                    TA_NAME : TA_name,
                    TA_ID : getOffice[0].USER_ID
                }
                console.log('in the queue now')
                result(null, response)
                return;
            }
        })
    }
}
Student.intheOffice = async (user_id, officehour_id, class_id,  result) => {
    let Office_info = await findOffice_by_tocken(officehour_id);
    let item_TA = await findNameTA(Office_info[0].USER_ID);
    let TA_name = item_TA[0].FIRST_NME+' '+ item_TA[0].LAST_NME;
    console.log(TA_name);
    let item_classNumber = await classGetwholeinfo(class_id);
    var Class_Number = item_classNumber[0].CLASS_NUMBER;
    let Office_token = officehour_id;
    var QueueSet  = new Queue(`${Office_token}`);
    QueueSet.rankUser(user_id,(err,data) =>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "some error occured"
            })
        else{
            console.log(data)
            if(data!=null){
                let response = {
                    isinQueue: true,
                    OFFICE_HOUR_ID : Office_token,
                    CLASS_NUMBER : Class_Number,
                    CLASS_ID : class_id,
                    QUEUE_INDEX : data,
                    TA_NAME : TA_name,
                    CLASS_NAME : item_classNumber[0].CLASS_NAME,
                    TA_ID : item_TA[0].USER_ID
                }
                console.log('still in the queue')
                result(null, response)
                return;
            } else if(data==null) {
                let response = {
                    isinQueue: false,
                    MEETING_LINK : Office_info[0].MEETING_LINK,
                    OFFICE_HOUR_ID : Office_token,
                    CLASS_NUMBER : Class_Number,
                    CLASS_ID : class_id,
                    QUEUE_INDEX : data,
                    TA_NAME : TA_name,
                    CLASS_NAME : item_classNumber[0].CLASS_NAME,
                    TA_ID : Office_info[0].USER_ID
                }
                console.log('be popped')
                result(null, response)
                return;
            }
        }
    })
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