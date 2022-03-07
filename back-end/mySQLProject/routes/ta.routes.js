module.exports = app => {
    const tas = require("../controllers/ta.controller.js");
    var router = require("express").Router();
    // get class: return a list of class that a TA have
    router.post('/getClass', tas.getClass)
    router.post('/getsingleClass',tas.getsingleClassinfo)
    router.post('/editClass',tas.editClass)
    router.post('/startofficehour', tas.startofficehour)
    router.post('/popstudent',tas.popstudent)
    router.post('/getqueuelength',tas.getqueuelength)
    router.post('/endofficehour', tas.endofficehour)
    app.use('/api/user/ta', router)
};