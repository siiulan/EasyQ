const { password } = require("../configs/db.config.js");
const User = require("../model/user.model.js");

exports.signUp = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }
    //user creation
    const user = new User({
        username : req.body.username,
        firstName : req.body.firstname,
        lastName : req.body.lastname,
        role: 'student',
        password: req.body.password,
    });
    // create user in the database
    User.signUp(user, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
        else res.json(data)
    });
}

exports.loginMatch = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }
    //user creation
    const user = new User({
        username : req.body.username,
        fistName : req.body.firstname,
        lastName : req.body.lastname,
        role : 'student',
        password : req.body.password,
    });
    // create user in the database
    User.loginMatch(user.username, user.password, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
        else res.json(data)
    });
}
