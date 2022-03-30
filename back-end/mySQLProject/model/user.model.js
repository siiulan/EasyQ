const sql = require("../db.js");
var uuid = require('uuid');
const { reject } = require("async");
const lib = require("./emailSender.model.js");
const { response } = require("express");
const bcrypt = require('bcrypt')

// const { user } = require("../configs/db.config.js");
// constructor
const User = function(user) {
    // nnn
  this.username = user.username;
  this.firstName = user.firstName
  this.lastName = user.lastName;
  this.id = uuid.v4();
  this.role = user.role;
  this.password = user.password;
};

// auxilary functions
function check_user_registration (username){
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM user_info WHERE EMAIL_ADRESS = ?`, username, (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res)
        });
    })
}

function check_user_login (username, password){
    return new Promise((resolve, reject) => {
        let qry = `SELECT * FROM login_authentication LEFT JOIN user_info ON user_info.USER_ID = login_authentication.USER_ID WHERE login_authentication.EMAIL_ADRESS = ?`
        sql.query(qry, [username], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res)
        });
    })
}

function findUserByID (uid, dbName){
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM ${dbName} WHERE USER_ID = ?`, [uid], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res)  
        });
    })
}

function findByVerifyToken (verifyToken){
    return new Promise((resolve, reject) => {
        sql.query('SELECT USER_ID FROM user_info WHERE VERIFYCODE = ?',
        [verifyToken], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res)  
        });
    })
}

function verifyToken (token){
    return new Promise((resolve, reject) => {
        sql.query('SELECT * FROM user_info WHERE RESET_TOKEN = ?',
        [token], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res)  
        });
    })
}

function getConfirmationToken(username){
    return new Promise((resolve, reject) => {
        sql.query('SELECT * FROM user_info WHERE EMAIL_ADRESS = ?',
        [username], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            resolve(res)  
        });
    })
}

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

// function command
// create a new user
User.signUp = async (user, result) => {
    flag = true
    // Does Email adress has been registered?
    let userRes = await check_user_registration(user.username)
    let hashedPassword = await hashPassword(user.password)
    if(userRes.length){
        flag = false
        let judge = { 
            isRegistered: true,
        };
        result(null, judge);
        return;
    }
    
    // If not found: insert the user
    if(flag){
        let verifyToken = uuid.v1()
        const uLoginAuth = {
            USER_ID: user.id,
            EMAIL_ADRESS: user.username, 
            PSWORD: hashedPassword,
            // PSWORD: password,
            VERIFIED: false
        };

        const uInfo = {
            USER_ID: user.id, 
            FIRST_NME: user.firstName,
            LAST_NME: user.lastName, 
            USER_ROLE: user.role,
            EMAIL_ADRESS: user.username,
            VERIFYCODE: verifyToken,
            RESET_TOKEN: '',
            IN_QUEUE: false
        };

        sql.query("INSERT INTO user_info SET ?", uInfo, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(error, null);
                return;
            } 
            console.log("created user: ", { id: res.insertId, ...user });
        });

        sql.query('INSERT INTO login_authentication SET ?', uLoginAuth, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(error, null);
                return;
            }
            console.log("created user: ", { id: res.insertId, ...user });      
        });
        let judge = { 
            isRegistered: false,
        };
        //If the user has not yet verified:
        let name = user.firstName + ' ' + user.lastName
	    lib.sendConfirmationEmail(name, user.username, verifyToken)
        result(null, judge);
        return;
    }
};

// match the username and password of user
User.loginMatch = async (username, password, result) => {
    // let hashedpwd = await hashPassword(password)
    // console.log("Hashed input: " + hashedpwd)
    let item = await check_user_login(username, password)
    // let item = await check_user_login(username, password)
    if (item.length) {
        let recordpwd = item[0].PSWORD
        // console.log(`input: ${hashedpwd}, record: ${recordpwd}`)
        // let matchRes = false
        // if (password == recordpwd){
        //     matchRes = true
        // }
        let matchRes = await matchPassword(password, recordpwd)
        console.log(`match info: ${matchRes}`)
        if(matchRes){
            console.log("found user: ", item[0]);
            let uRole = await findUserByID(item[0].USER_ID, 'user_info')
            console.log(uRole[0])
            let judge = { 
                id: item[0].USER_ID,
                name: item[0].FIRST_NME + ' ' + item[0].LAST_NME,
                isVerified: item[0].VERIFIED,
                isMatched: true,
                role: uRole[0].USER_ROLE
            };
            result(null, judge)
            // console.log("1")
            return;
        }   
    }
    // not found Tutorial with the id
    let judge = { 
        id: '',
        isVerified: false,
        isMatched: false,
        role: ''
    };
    result(null, judge);
    return;
};


// update user info by their ID:
User.updateById = (id, table, attribute, updateValue, result) => {
    sql.query(
      `UPDATE user_info SET RESET_TOKEN = ? WHERE USER_ID = ?`,
      [updateValue, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated user: ");
        result(null, id);
      }
    );
};

User.confirmEmail = async (verifyToken, result) => {
    let uid = await findByVerifyToken(verifyToken)
    if (uid.length) {
        row = uid[0]
        sql.query(
            'UPDATE login_authentication SET VERIFIED = ? WHERE USER_ID = ?',
            [true, row.USER_ID],
            (err, result) => {
              if (err) throw err;
          
              console.log(`Changed ${result.changedRows} row(s)`);
            }
        );
        result(null, true)
    } else {
        console.log("User ID not found while sending confirm EMail ");
        result(null, false)
        return;
    }
}

User.resetPassword = async (username, result) => {
    let uid = await check_user_registration(username)
    if (uid.length) {
        row = uid[0]
        let name = row.FIRST_NME + ' ' + row.LAST_NME
        let resetToken = uuid.v4()
        lib.sendResetEmail(name, username, resetToken)
        sql.query(
            'UPDATE user_info SET RESET_TOKEN = ? WHERE USER_ID = ?',
            [resetToken, row.USER_ID],
            (err, result) => {
              if (err) throw err;
              console.log(`Changed ${result.changedRows} row(s)`);
            }
        );
        let response = {
            resetToken: resetToken,
            isUserRegistered: true
        }
        result(null, response)
        return    
    } else {
        let response = {
            resetToken: "",
            isUserRegistered: false
        }
        result(null, response)
        return    
    }
}

User.passwordChange = async (newPassword, token, result) => {
    let user  = await verifyToken(token)
    let hashedPassword = await hashPassword(newPassword)
    if (user.length) {
        row = user[0]
        sql.query(
            'UPDATE login_authentication SET PSWORD = ? WHERE USER_ID = ?',
            [hashedPassword, row.USER_ID],
            (err, result) => {
              if (err) throw err;
              console.log(`Changed ${result.changedRows} row(s)`);
            }
        );

        sql.query(
            'UPDATE user_info SET RESET_TOKEN = ? WHERE USER_ID = ?',
            ['', row.USER_ID],
            (err, result) => {
              if (err) throw err;
              console.log(`Changed ${result.changedRows} row(s)`);
            }
        );
        let response = {
            success : true
        }
        let name = row.FIRST_NME + ' ' + row.LAST_NME
        lib.sendSuccessEmail (name, row.EMAIL_ADRESS)
        result(null, response)
        return    
    } else {
        console.log(`Token match failed`);
        let response = {
            success : false
        }
        result(null, response)
        return    
    }

}

User.emailTesting = (email, name, result) => {
    lib.emailTesting(email, name)
    result(null, true)
    return
}

User.resendVerifyEmail = async (email, result) => {
    let user = await getConfirmationToken(email)
    if(user.length){
        let confirmationToken = user[0].VERIFYCODE
        let name = user[0].firstName + ' ' + user[0].lastName
        lib.sendConfirmationEmail(name, email, confirmationToken)
        let response = {
            success : true
        }
        result(null, response)
    } else {
        let response = {
            success : false
        }
        result(null, response)
    }
    return
}

module.exports = User