const nodemailer = require("nodemailer");

const user = "easyqece651@gmail.com";
const pass = "Qwe.1234";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

function sendResetEmail (name, email, confirmationCode){
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please reset your password",
      html: `<h1>Password Reset</h1>
          <h2>Hello ${name}</h2>
          <p>We heard you've lost your EasyQ password, sorry about that. Please reset your password by clicking on the following link</p>
          <a href=http://localhost:3000/API/user/reset/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  }

module.exports = { sendConfirmationEmail};