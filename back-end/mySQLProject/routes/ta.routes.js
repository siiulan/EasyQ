module.exports = app => {
    const tas = require("../controllers/ta.controller.js");
    var router = require("express").Router();
    router.post('/getClass', tas.getClass) //okay
    router.post('/getsingleClass',tas.getsingleClassinfo) //okay
    router.post('/editClass',tas.editClass) //okay
    router.post('/startofficehour', tas.startofficehour) //okay
    router.post('/popstudent',tas.popstudent)
    router.post('/getqueuelength',tas.getqueuelength) //okay
    router.post('/endofficehour', tas.endofficehour) //okay

    app.use('/api/user/ta', router)
};