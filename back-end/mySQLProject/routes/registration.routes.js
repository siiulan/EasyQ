module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Sign Up: Create a new a user
    router.post('/registration', users.signUp)
    //Login: match the user info
    router.post('/login', users.loginMatch)
    router.get('/confirm/:confirmationCode', users.confirmEmail)
    router.post('/reset/passwordreset', users.resetPassword)
    router.post('/reset/request/:verityToken', users.passwordChange)
    app.use('/api/user', router)
};