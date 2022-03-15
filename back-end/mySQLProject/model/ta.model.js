const sql = require("../db.js");
var uuid = require('uuid');
const { reject } = require("async");
var ohqueue  = require('./queue.model.js');
var ohqueuehash  = require('./hash.model.js');
// constructor
const TA = function(user) {
  this.username = user.username;
  this.firstName = user.firstName
  this.lastName = user.lastName;
  this.id = uuid.v4();
  this.role = user.role;
  this.password = user.password;
};
// input student's user_id, and return student's user_info table

function getstudentinfobyid(stuid){
    return new Promise ((resolve,reject) =>{
        sql.query(`SELECT * FROM user_info WHERE USER_ID = ?`, [stuid], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res)
            console.log("in function",res)
        });
    })
}
// input user_id, and return user's firstname + lastname
function getnamebyid(stuid){
    return new Promise ((resolve,reject) =>{
        sql.query(`SELECT * FROM user_info WHERE USER_ID = ?`, [stuid], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            let name = res.FIRST_NME + ' ' + res.LAST_NME
            resolve(name)
        });
    })
}

TA.Startofficehour = async (classid,taid,meetinglink,description,result) =>{
    // create unique office_hour_id for this officehour
    let token = uuid.v4();
    // create a queue in redis by token
    officehour = new ohqueue(token);
    console.log(officehour.inlineUser())
    // put officehour info into mysql:
    // classid,taid,meeting_link,description,active
    const ohInfo = {
        OFFICE_HOUR_ID: token, 
        USER_ID: taid,
        CLASS_ID: classid, 
        MEETING_LINK: meetinglink,
        // DESCRIPTION: description,
        ACTIVE: true
    };

    sql.query("INSERT INTO office_hour SET ?", [ohInfo], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(error, null);
            return;
        } 
        console.log("created officehour in MYSQL");
    });

    //return office_hour_id to front_end.
    let response = {
        OFFICE_HOUR_ID:token
    }
    result(null,response)
    return
};

TA.Popstudent = async (officehourid,result) =>{
    let officehour = new ohqueue(officehourid);
    let officehourhash = new ohqueuehash(`${officehourid}hash`);
    // let newstu = officehour.popUser(); /// popuser should return student's userid
    officehour.popUser(1,(err,data) =>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "some error occured"
            })
        else{
            console.log("input of function:",data)
            sql.query(`SELECT * FROM user_info WHERE USER_ID = ?`, [data], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                console.log("in function",res)
                let newstuinfo = res;
                console.log("newstuinfo in tamodel",newstuinfo);
                let name = newstuinfo[0].FIRST_NME + ' '+ newstuinfo[0].LAST_NME;
                officehourhash.getQuestion(data,(err,dataa) =>{
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "some error occured"
                        })
                    else{
                        let response = {
                            EMAIL_ADDRESS : newstuinfo[0].EMAIL_ADRESS,
                            NAME : name,
                            QUESTION : dataa
                        }
                        result(null,response)
                        return
                    }
                })
            });
        }
    })
}

TA.Getqueuelength = async (officehourid,result) =>{
    let officehour = new ohqueue(officehourid);
    officehour.inlineUser(1,(err,data) =>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "some error occured"
            })
        else{
            let queuelength = data;
            let response = {
                QUEUE_LENGTH : queuelength
            }
            result(null,response)
            return
        }
    })
}

TA.Endofficehour = async (officehourid,result) =>{
    let officehour = new ohqueue(officehourid);
    officehour.deleteSet(); 
    sql.query(
        'UPDATE office_hour SET ACTIVE = ? WHERE OFFICE_HOUR_ID = ?', [false , officehourid],
        (err, res) => {
        if (err){
            let response = {
                SUCCESSFULLY_ENDED : false
            }
            throw err;}
        } 
    );
    response = {
        SUCCESSFULLY_ENDED : true 
    }
    result(null,response)
    return
}
// input TA's user_id, return the list of class_id where TA is TAing for
function classLookup(id){
    return new Promise ((resolve,reject) =>{
        sql.query(`SELECT CLASS_ID FROM enrollment WHERE USER_ID = ? AND USER_ROLE = ?`, [id,'TA'], (err, res) => {
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
        sql.query(`SELECT * FROM class WHERE CLASS_ID = ?`, [classid], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res)
            console.log("function",res)
        });
    })
}

TA.getClassesinfo = async (id,result) =>{
    const classesinfo=[]
    const response=[];
    let classes = await classLookup(id)
    for (let i=0;i<classes.length;i++){
        classesinfo[i] = await getclassinfobyid(classes[i].CLASS_ID)  
    }
    for (let j=0;j<classes.length;j++){
        console.log("classid-j0",classesinfo[j][0].CLASS_ID)
        let instructname = getnamebyid(classesinfo[j][0].INSTRUCTOR_ID)
        let classnamenum = classesinfo[j][0].CLASS_NUMBER + ' ' + classesinfo[j][0].CLASS_NAME;
        let jsonclass = {
            CLASS_ID : classesinfo[j][0].CLASS_ID,
            CLASS_NAME : classnamenum,
            CLASS_INFO : classesinfo[j][0].CLASS_INFO,
            CLASS_TERM : classesinfo[j][0].CLASS_TERM,
            INSTRUCTOR_NAME : instructname
        }
        response.push(jsonclass)
    }
    result(null,response)
    return
};

TA.getClassinfo = async (classid,result) =>{
    let classinfo = await getclassinfobyid(classid)
    let instructname = getnamebyid(classinfo[0].INSTRUCTOR_ID)
    let classnamenum = classinfo[0].CLASS_NUMBER + ' ' + classinfo[0].CLASS_NAME;
    let jsonclass = {
        CLASS_ID : classinfo[0].CLASS_ID,
        CLASS_NAME : classnamenum,
        CLASS_INFO : classinfo[0].CLASS_INFO,
        CLASS_TERM : classinfo[0].CLASS_TERM,
        INSTRUCTOR_NAME : instructname
    }
    console.log("return value in model",jsonclass)
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
    // let instructor_id = getidbyname (instructor);
    // sql.query(
    //     'UPDATE class SET CLASS_INSTRUCTOR = ? WHERE CLASS_ID = ?',
    //     [instructor_id, id],
    //     (err, result) => {
    //       if (err) throw err;
    //     }
    // );

    let response = {
        SuccessfullyEdited:true
    }
    result(null,response)
    return    
}

module.exports = TA;