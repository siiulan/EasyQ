module.exports = app => {
    const student = require("../controllers/student.controller.js");
    var router = require("express").Router();
    router.post('/addclass', student.addClass_con);
    router.post('/classes', student.getClassAll_con);
    router.post('/classes/class', student.getClassOne_con);
    router.post('/officehour', student.joinOffice_con);
    router.post('/officehour/quit', student.quitOffice_con);
    app.use('/api/user/student', router)
};