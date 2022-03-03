module.exports = app => {
    const instructors = require("../controllers/instructor.controller.js");
    var router = require("express").Router();
    // get class: return a list of class that a instructor have
    router.post('/getClass', instructors.getClass)
    app.use('/api/user/instructor', router)
};