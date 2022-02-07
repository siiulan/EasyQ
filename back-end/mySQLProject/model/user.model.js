const sql = require("../db.js");
var uuid = require('uuid');
const { reject } = require("async");
// const { user } = require("../configs/db.config.js");
// constructor
const User = function(user) {
  this.username = user.username;
  this.firstName = user.firstName
  this.lastName = user.lastName;
  this.id = uuid.v4();
  this.role = user.role;
  this.password = user.password;
};

// auxilary functions
function check_user_registration (user){
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM user_info WHERE EMAIL_ADRESS = ?`, user.username, (err, res) => {
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
        sql.query(`SELECT * FROM login_authentication WHERE EMAIL_ADRESS = ? AND PSWORD = ?`, [username, password], (err, res) => {
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

// function command
// create a new user
User.signUp = async (user, result) => {
    flag = true
    // Does Email adress has been registered?
    let userRes = await check_user_registration(user)

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
        const uLoginAuth = {
            USER_ID: user.id,
            EMAIL_ADRESS: user.username, 
            PSWORD:user.password,
            VERIFIED: false,
            VERIFYCODE: uuid.v1()
        };

        const uInfo = {
            USER_ID: user.id, 
            FIRST_NME: user.firstName,
            LAST_NME: user.lastName, 
            USER_ROLE: user.role,
            EMAIL_ADRESS: user.username
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
        result(null, judge);
        return;
    }
};

// match the username and password of user
User.loginMatch = async (username, password, result) => {
    let item = await check_user_login(username, password)
    if (item.length) {
        console.log("found user: ", item[0]);
        let uRole = await findUserByID(item[0].USER_ID, 'user_info')
        console.log(uRole[0])
        let judge = { 
            id: item[0].USER_ID,
            isVerified: item[0].VERIFIED,
            isMatched: true,
            role: uRole[0].USER_ROLE
        };
        result(null, judge)
        return;
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

// find user by their id
User.findById = (id, result) => {
    sql.query(`SELECT * FROM user_info WHERE USER_ID = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

// update user info by their ID:
User.updateById = (id, user, result) => {
    sql.query(
      "UPDATE user_info SET NME = ?, USER_ROLE = ?, EMAIL_ADRESS = ? WHERE USER_ID = ?",
      [user.name, user.role, user.username, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
};

module.exports = User