module.exports = app => {
    const students = require("../controllers/student.controller.js");
    var router = require("express").Router();
    router.post('/test', students.test_con)//just test
    router.post('/addclass', students.addClass_con)//successful
    router.post('/classes', students.getClassAll_con)//successful
    router.post('/classes/class', students.getClassOne_con)//seccessful
    router.post('/officehour', students.joinOffice_con)
    router.post('/officehour/quit', students.quitOffice_con)
    app.use('/api/user/student', router)
};