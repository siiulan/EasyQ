module.exports = app => {
    const students = require("../controllers/student.controller.js");
    var router = require("express").Router();
    router.post('/addclass', students.addClass_con)//successful
    router.post('/classes', students.getClassAll_con)//successful
    router.post('/classes/class', students.getClassOne_con)//seccessful
    router.post('/officehour', students.joinOffice_con)//successful
    router.post('/officehour/inqueue', students.intheOffice_con)//successful
    router.post('/officehour/quit', students.quitOffice_con)//successful
    app.use('/api/user/student', router)
};