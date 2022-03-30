const { password } = require("../configs/db.config.js");
const Instructor = require("../model/instructor.model.js");
let lib = require("../configs/nodemailer.config.js")

exports.getClass = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }
    let id = req.body.user_ID
    Instructor.getClasses(id, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
        else res.json(data)
    });
}

exports.editClass = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }
    let classObject = req.body
    Instructor.editClasses(classObject, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
        else res.json(data)
    });
}

exports.addClass = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }
    let classObject = req.body
    Instructor.addClasses(classObject, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
        else res.json(data)
    });
}

exports.removeClass = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }
    let class_id = req.body.class_id
    Instructor.removeClass(class_id, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
        else res.json(data)
    });
}

exports.getClassMembers = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }
    let class_id = req.body.class_id
    Instructor.getClassMembers(class_id, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
        else res.json(data)
    });
}

exports.classAddTA = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }
    let email_adress = req.body.email_adress
    let class_id = req.body.class_id
    Instructor.classAddTA(email_adress, class_id, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
        else res.json(data)
    });
}

exports.registeredConfirmation = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }

    var invitation_token = req.params.invitation_token

    Instructor.registeredConfirmation(invitation_token, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while sending confirmation email"
            });
        if (data){
            // redirecting url to
            res.redirect(`${lib.url}/TAConfirm/success`)
        } else {
            // redirecting url to
            res.redirect(`${lib.url}/TAConfirm/fail`)
        }
    });
}

exports.getStudentInvitationCode = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }

    var class_id = req.body.class_id

    Instructor.getStudentInvitationCode(class_id, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
        else res.json(data)
    });
}

exports.invitedTARegistration = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }

    var class_id = req.body.class_id

    Instructor.getStudentInvitationCode(class_id, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
        else res.json(data)
    });
}

exports.unregisteredConfirmation = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Cotent can not be empty"
        })
    }

    var invitation_token = req.params.invitation_token
    let user = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        password : req.body.password
    }

    Instructor.unregisteredConfirmation(invitation_token, user, (err, data) => {
        if (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
        } else {
            if (data.success){
                // redirecting url to
                res.redirect(`${lib.url}/TAConfirm/success`)
            } else {
                // redirecting url to
                res.redirect(`${lib.url}/TAConfirm/fail`)
            }
        } 
    });
}