module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Sign Up: Create a new a user
    router.post('/registration', users.signUp)
    //Login: match the user info
    router.post('/login', users.loginMatch)
    app.use('/api/user', router)
};