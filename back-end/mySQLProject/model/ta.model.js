const sql = require("../db.js");
var uuid = require('uuid');
const { reject } = require("async");
var ohqueue  = require('./queue.model.js');
var ohstudent  = require('./student.model.js');

// constructor
const TA = function(user) {
  this.username = user.username;
  this.firstName = user.firstName
  this.lastName = user.lastName;
  this.id = uuid.v4();
  this.role = user.role;
  this.password = user.password;
};

function getstudentinfobyid(stuid){
    return new Promise ((resolve,reject) =>{
        sql.query(`SELECT * FROM user_info WHERE USER_ID = ?`, stuid, (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res)
        });
    })
}

TA.Startofficehour = async (classid,taid,meetinglink,description,result) =>{
    // create unique office_hour_id for this officehour
    let token = uuid.v4();
    // create a queue in redis by token
    officehour = new ohqueue(token);
    // put officehour info into mysql:
    // classid,taid,meeting_link,description,active
    const ohInfo = {
        OFFICE_HOUR_ID: token, 
        USER_ID: taid,
        CLASS_ID: classid, 
        MEETING_LINK: meetinglink,
        DESCRIPTION: description,
        ACTIVE: true
    };

    sql.query("INSERT INTO office_hour SET ?", ohInfo, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(error, null);
            return;
        } 
        console.log("created officehour");
    });

    //return office_hour_id to front_end.
    let response = {
        OFFICE_HOUR_ID:token
    }
    result(null,response)
    return
};

TA.Popstudent = async (officehourid,result) =>{
    officehour = new ohqueue(officehourid);
    let newstu = officehour.popUser(); /// popuser should return student's userid
    let newstuinfo = getstudentinfobyid(newstu);
    let response = {
        EMAIL_ADDRESS : newstuinfo.EMAIL_ADDRESS,
        FIRST_NME : newstuinfo.FIRST_NME,
        LAST_NME : newstuinfo.LAST_NME,
    }
    result(null,response)
    return
}

TA.Getqueuelength = async (officehourid,result) =>{
    officehour = new ohqueue(officehourid);
    let queuelength = officehour.inlineUser(); 
    let response = {
        QUEUE_LENGTH : queuelength
    }
    result(null,response)
    return
}

TA.Endofficehour = async (officehourid,result) =>{
    officehour = new ohqueue(officehourid);
    officehour.deleteSet(); 
    sql.query(
        'UPDATE office_hour SET ACTIVE = ? WHERE OFFICE_HOUR_ID = ?',officehourid,
        (err, result) => {
        if (err){
            let response = {
                SUCEESSFULLY_ENDED : false
            }
            throw err;}
        else {response = {SUCEESSFULLY_ENDED : true }}
        } 
    );
    result(null,response)
    return
}

function classLookup(id){
    return new Promise ((resolve,reject) =>{
        sql.query(`SELECT CLASS_ID FROM class WHERE TA_ID = ?`, [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res)
        });
    })
}

function getclassinfobyid(classid){
    return new Promise ((resolve,reject) =>{
        sql.query(`SELECT * FROM class WHERE CLASS_ID = ?`, classid, (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res)
        });
    })
}

TA.getClassesinfo = async (id,result) =>{
    // console.log(id)
    const classesinfo=[]
    const response={};
    let classes = await classLookup(id)
    for (let i=0;i<classes.length;i++){
        classesinfo[i] = await getclassinfobyid(classes[i])  
    }
    if (classes.length){
        row=classes[0]
    }
    for (let j=0;j<classes.length;j++){
        let jsonclass = {
            CLASS_ID : classesinfo[j].CLASS_ID,
            CLASS_NUMBER : classesinfo[j].CLASS_NUMBER,
            CLASS_NAME : classesinfo[j].CLASS_NAME,
            CLASS_INFO : classesinfo[j].CLASS_INFO,
            CLASS_TERM : classesinfo[j].CLASS_TERM,
            INSTRUCTOR_ID : classesinfo[j].INSTRUCTOR_ID
        }
        let response = Object.assign(response,jsonclass);
    }

    result(null,response)
    return
};

TA.getClassinfo = async (classid,result) =>{
    // console.log(id)
    let classinfo = await getclassinfobyid(classid)  
    let jsonclass = {
        CLASS_ID : classesinfo.CLASS_ID,
        CLASS_NUMBER : classesinfo.CLASS_NUMBER,
        CLASS_NAME : classesinfo.CLASS_NAME,
        CLASS_INFO : classesinfo.CLASS_INFO,
        CLASS_TERM : classesinfo.CLASS_TERM,
        INSTRUCTOR_ID : classesinfo.INSTRUCTOR_ID
    }
    result(null,jsonclass)
    return
};

TA.editClassinfo = async (id,name,number,info,term,instructor,result)=>{
    sql.query(
        'UPDATE class SET CLASS_NAME = ? WHERE CLASS_ID = ?',
        [name, id],
        (err, result) => {
          if (err) throw err;
        }
    );
    sql.query(
        'UPDATE class SET CLASS_NUMBER = ? WHERE CLASS_ID = ?',
        [number, id],
        (err, result) => {
          if (err) throw err;
        }
    );
    sql.query(
        'UPDATE class SET CLASS_INFO = ? WHERE CLASS_ID = ?',
        [info, id],
        (err, result) => {
          if (err) throw err;
        }
    );
    sql.query(
        'UPDATE class SET CLASS_TERM = ? WHERE CLASS_ID = ?',
        [term, id],
        (err, result) => {
          if (err) throw err;
        }
    );
    sql.query(
        'UPDATE class SET CLASS_INSTRUCTOR = ? WHERE CLASS_ID = ?',
        [instructor, id],
        (err, result) => {
          if (err) throw err;
        }
    );

    let response = {
        SuccessfullyEdited:True
    }
    result(null,response)
    return    
}

module.exports = TA;