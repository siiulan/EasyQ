const { password } = require("../configs/db.config.js");
const Student = require("../model/student.model.js");


exports.addClass_con = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        })
    }
    let id = req.body.user_ID;
    let class_number = req.body.class_NUMBER;
    let invi_code = req.body.invitation_CODE;
    Student.addClass(id, class_number, invi_code, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while enrolling the class."
            });
        else res.json(data)
    });
}

exports.getClassAll_con = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        })
    }
    let id = req.body.user_ID;
    Student.getClassAll(id, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while getting the classes."
            });
        else res.json(data);
    })
}

exports.getClassOne_con = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        })
    }
    let class_id = req.body.class_ID;
    Student.getClassAll(class_id, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while getting the class."
            });
        else res.json(data);
    })
}

exports.joinOffice_con = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        })
    }
    let class_id = req.body.class_ID;
    let user_id = req.body.user_ID;
    Student.joinOffice(class_id, user_id, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while getting the office hour."
            });
        else res.json(data);
    })
}

exports.quitOffice_con = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        })
    }
    let user_id = req.body.user_ID;
    let office_hour_id = req.body.office_hour_ID;
    Student.quitOffice(user_id, office_hour_id, (err, data) =>{
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while quitting the office hour."
            });
        else res.json(data);
    })
}