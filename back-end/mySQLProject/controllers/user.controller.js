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

exports.confirmEmail = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }

    var confirmationToken = req.params.confirmationCode
    console.log(confirmationToken)

    User.confirmEmail(confirmationToken, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while sending confirmation email"
            });
    });

}

exports.resetPassword = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }

    var username = req.body.username
    
    User.resetPassword(username, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while sending confirmation email"
            });
        else res.json(data)
    });

}

exports.passwordChange = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }

    var username = req.body.username
    var newPassword = req.body.newPassword
    var verifyToken = req.body.verifyToken
    var vToken = req.params.verityToken

    if(vToken != verifyToken){
        res.status(400).send({
            message: "Reset Failure: Token not matched"
        })
    } else {
        User.passwordChange(username, newPassword, vToken, (err, data) => {
            if (err)
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while sending confirmation email"
                });
            else res.json(data)
        });
    }



}