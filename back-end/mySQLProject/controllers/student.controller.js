const { password } = require("../configs/db.config.js");
const Student = require("../model/student.model.js");


exports.addClass_con = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        })
    }
    let id = req.body.userId;
    let term = req.body.term;
    let class_number = req.body.classNumber;
    let invi_code = req.body.invitationCode;
    Student.classAdd(id, term, class_number, invi_code, (err, data) => {
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
    let id = req.body.userId;
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
    let class_id = req.body.classId;
    Student.getClassOne(class_id, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while getting the class."
            });
        else res.json(data);
    })
}
exports.displayOffice_con = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        })
    }
    let class_id = req.body.classId;
    let user_id = req.body.userId;
    Student.displayOffice(class_id, user_id, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while getting the office hour."
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
    let class_id = req.body.classId;
    let user_id = req.body.userId;
    Student.joinOffice(class_id, user_id, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while getting the office hour."
            });
        else res.json(data);
    })
}
exports.intheOffice_con = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        })
    }
    let user_id = req.body.userId;
    let officehour_id = req.body.office_hour_Id;
    let class_id = req.body.classId;
    Student.intheOffice(user_id, officehour_id, class_id, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while quitting the office hour."
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
    let user_id = req.body.userId;
    let office_hour_id = req.body.office_hour_Id;
    Student.quitOffice(user_id, office_hour_id, (err, data) =>{
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while quitting the office hour."
            });
        else res.json(data);
    })
}