const nodemailer = require("nodemailer");
const devSetting = require("./devMode.config.js");

const user = "easyqece651@gmail.com";
const pass = "Qwe.1234";

// local testing url
var url = "http://localhost:8080";
// server url
if(devSetting.devMode == 1){
  url = "http://52.55.84.132";
}

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports = {transport, url};