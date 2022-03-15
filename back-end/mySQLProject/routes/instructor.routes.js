module.exports = app => {
    const instructors = require("../controllers/instructor.controller.js");
    var router = require("express").Router();
    // get class: return a list of class that a instructor have
    router.post('/getClass', instructors.getClass)
    router.post('/editClass', instructors.editClass)
    router.post('/addClass', instructors.addClass)
    router.post('/removeClass', instructors.removeClass)
    router.post('/getClassMembers', instructors.getClassMembers)
    router.post('/classAddTA', instructors.classAddTA)
    router.post('/getStudentInvitationCode', instructors.getStudentInvitationCode)
    router.post('/invitedTARegistration/:invitation_token', instructors.invitedTARegistration)
    router.get('/registeredInvitationConfirmation/:invitation_token', instructors.registeredConfirmation)
    router.post('/unregisteredInvitationConfirmation/:invitation_token', instructors.unregisteredConfirmation)

    app.use('/api/user/instructor', router)
};