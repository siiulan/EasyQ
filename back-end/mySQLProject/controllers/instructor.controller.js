const { password } = require("../configs/db.config.js");
const Instructor = require("../model/instructor.model.js");

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