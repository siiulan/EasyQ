const sql = require("../db.js");
var uuid = require('uuid');
const { reject } = require("async");
const lib = require("./emailSender.model.js");
const { response } = require("express");
const bcrypt = require('bcrypt');
const e = require("express");


/*   Brcpyt helper function */

async function hashPassword(password) {
    const salt = 10
    const hash = await bcrypt.hash(password, salt)
    console.log("hashed password: " + hash)
    return hash
}

async function matchPassword(password, password2) { // updated
    const isSame = await bcrypt.compare(password, password2) // updated
    console.log("matchign password: " + isSame) // updated  
    return isSame
}

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


// function to add a class
function lookUpClassMember(class_id){
    return new Promise((resolve, reject) => {
        sql.query(
            `SELECT user_info.FIRST_NME, user_info.LAST_NME, user_info.USER_ID, enrollment.USER_ROLE FROM enrollment 
            LEFT JOIN user_info ON enrollment.USER_ID = user_info.USER_ID
            WHERE CLASS_ID = ?;`,
            [class_id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                resolve(res)
            }
        );
    })
}

function checkIfTAexist(uid, class_id){
    return new Promise((resolve, reject) => {
        sql.query(
            `SELECT * FROM enrollment WHERE USER_ID = ? and CLASS_ID = ?;`,
            [uid, class_id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                resolve(res)
            }
        );
    })

}

function lookUpUser(email_adress){
    return new Promise((resolve, reject) => {
        sql.query(
            `SELECT USER_ID FROM user_info WHERE EMAIL_ADRESS = ?;`,
            [email_adress],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                resolve(res)
            }
        );
    })
}

function addTAtoClass(user_id, class_id){
    return new Promise((resolve, reject) => {
        uid = uuid.v4()
        // add TA enrollment into the class
        sql.query(
            `INSERT INTO enrollment (ENROLLMENT_ID, USER_ID, CLASS_ID, USER_ROLE) VALUES
            (?, ?, ?, 'TA');`,
            [uid, user_id, class_id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
            }
        );
        // update role in user_info to TA
        sql.query(
            `UPDATE user_info SET USER_ROLE = 'TA' WHERE USER_ID = ?`,
            [user_id],
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

function updateStudentStatus(enrollment_id){
    // update role in enrollment to TA
    return new Promise((resolve, reject) => {
        sql.query(
            `UPDATE enrollment SET USER_ROLE = 'TA' WHERE ENROLLMENT_ID = ?`,
            [enrollment_id],
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

function getInstructor(class_id){
    return new Promise((resolve, reject) => {
        sql.query(
            `SELECT user_info.FIRST_NME, user_info.LAST_NME FROM class LEFT JOIN user_info on class.INSTRUCTOR_ID = user_info.USER_ID WHERE CLASS_ID = ?;`,
            [class_id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                resolve(res)
            }
        );
    }) 
}

function storeToken(token, class_id, uid, use){
    return new Promise((resolve, reject) => {
        sql.query(
            `INSERT INTO invitation_token (INVITATION_TOKEN, CLASS_ID, USER_ID, IN_USE) VALUES (?, ?, ?, ?);`,
            [token, class_id, uid, use],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                resolve(res)
            }
        );
    }) 
}

function lookUpInvitationToken(invitation_token, use){
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM invitation_token WHERE IN_USE = '${use}' AND INVITATION_TOKEN = '${invitation_token}';`
        console.log(query)
        sql.query(query,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                console.log(res.length)
                resolve(res)
            }
        );

        sql.query(
            `DELETE FROM invitation_token WHERE INVITATION_TOKEN = ?;`,
            [invitation_token],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
            }
        );
    }) 
}

function lookUpInvitationTokenByClass(class_id, use){
    return new Promise((resolve, reject) => {
        sql.query(
            `SELECT * FROM invitation_token WHERE CLASS_ID = ? AND IN_USE = ?;`,
            [class_id, use],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                resolve(res)
            }
        );
    })
}

function userRegistration(uLoginAuth, uInfo){
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO user_info SET ?", uInfo, (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            } 
            console.log("created user");
        });

        sql.query('INSERT INTO login_authentication SET ?', uLoginAuth, (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            console.log("created user: ");
            resolve(res)      
        });
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
    console.log("Instructor id: " + classObject.INSTRUCTOR_ID + " adding class")
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

Instructor.getClassMembers = async (class_id, result) => {
    console.log("getting members of class of id: " + class_id)
    let res = await lookUpClassMember(class_id)
    console.log("Data: " + res)
    let response = {
        memberList: res
    }
    result(null, response)
    return
};

Instructor.classAddTA = async (email_adress, class_id, result) => {
    console.log("email: " + email_adress)
    console.log("class: " + class_id)
    let res = await lookUpUser(email_adress)
    let instructor_name = await getInstructor(class_id)
    var name = ''
    let class_item = await classLookUp(class_id)
    var class_name = ''

    if (class_item.length && instructor_name.length){
        name = instructor_name[0].FIRST_NME + " " + instructor_name[0].LAST_NME
        class_name = class_item[0].CLASS_NUMBER + " " + class_item[0].CLASS_NAME
    } else {
        console.log('class_item: ' + class_item.length)
        console.log('class_item: ' + class_item.length)
        let response = {
            exist : false,
            success : false
        }
        result(null, response)
        return
    }
    // if user exists
    if(res.length){
        // check if TA already in the class
        let check = await checkIfTAexist(res[0].USER_ID, class_id)
        if(check.length == 0){
            // prepare Invitation_token
            let invitation_token = uuid.v4()
            // store the token into the database
            await storeToken(invitation_token , class_id, res[0].USER_ID, 'invite-registered-TA')
            // send invitation link by nodemailer
            lib.sendInivitationEmail (email_adress, name, class_name, invitation_token, true)
            // add TA to this class
            // let address = await addTAtoClass(res[0].USER_ID, class_id)
            let response = {
                exist : false,
                success : true
            }
            result(null, response)
            return
        } else {
            if (check[0].USER_ROLE == 'student'){
                await updateStudentStatus(check[0].ENROLLMENT_ID)
                let response = {
                    exist : true,
                    success : true
                }
                result(null, response)
                return
            } else {
                console.log('TA enrollment detected')
                let response = {
                    exist : true,
                    success : false
                }
                result(null, response)
                return
            }
        }
    // if user is not registered
    } else {
        // prepare Invitation_token
        let invitation_token = uuid.v4()
        // store the token into the database
        await storeToken(invitation_token, class_id, email_adress, 'invite-unregistered-TA')
        // send invitation link by nodemailer
        lib.sendInivitationEmail(email_adress, name, class_name, invitation_token, true)
        let response = {
            exist : false,
            success : true
        }
        result(null, response)
        return
    }
};

Instructor.registeredConfirmation = async (invitation_token, result) => {
    let res = await lookUpInvitationToken(invitation_token, 'invite-registered-TA')
    if (res.length){
        await addTAtoClass(res[0].USER_ID, res[0].CLASS_ID)
        let response = {
            success: true
        }
        result(null, response)
        return
    } else {
        let response = {
            success: false
        }
        result(null, response)
        return
    }
};

Instructor.getStudentInvitationCode = async (class_id, result) => {
    console.log('get class id: '  + class_id)
    let res = await lookUpInvitationTokenByClass(class_id, 'add-student')
    // if invitation code exist:
    if (res.length){
        let code = res[0].INVITATION_TOKEN
        console.log('code exist:' + code)
        let response = {
            invitation_code : code
        }
        result(null, response)
        return
    } else {
        let code = uuid.v4()
        await storeToken(code, class_id, '', 'add-student')
        console.log('code not exist:' + code)
        let response = {
            invitation_code : code
        }
        result(null, response)
        return
    }
};

Instructor.unregisteredConfirmation = async (invitation_token, user, result) => {
    console.log(invitation_token)
    let item = await lookUpInvitationToken(invitation_token, 'invite-unregistered-TA')
    // if token exist: proceed registration
    console.log(item.length)
    if(item.length){
        let email_adress = item[0].USER_ID
        // check if user already registered
        let res = await lookUpUser(item[0].USER_ID)
        if (res.length == 0){
            let hashedPassword = await hashPassword(user.password)
            let uid = uuid.v1()
            const uLoginAuth = {
                USER_ID: uid,
                EMAIL_ADRESS: email_adress, 
                PSWORD: hashedPassword,
                // PSWORD: password,
                VERIFIED: true
            };

            const uInfo = {
                USER_ID: uid, 
                FIRST_NME: user.first_name,
                LAST_NME: user.last_name, 
                USER_ROLE: 'TA',
                EMAIL_ADRESS: email_adress,
                RESET_TOKEN: '',
                IN_QUEUE : false
            };
            let res = await userRegistration(uLoginAuth, uInfo)
            console.log("res: " + res.affectedRows)
            let enrollment = await addTAtoClass(uid, item[0].CLASS_ID)
            console.log("res: " + enrollment.affectedRows)
            let response = {
                success : true,
                exist: false
            }
            result(null, response)
            return
        // if user found, do the registered user registration
        } else {
            await addTAtoClass(res[0].USER_ID, item[0].CLASS_ID)
            let response = {
                success : true,
                exist: true
            }
            result(null, response)
            return
        }
    // if no token found, return token expire
    } else {
        let response = {
            success : false,
            exist: false
        }
        result(null, response)
        return
    }
};

module.exports = Instructor;