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

function sendConfirmationEmail (name, email, confirmationCode){
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:8080/API/user/confirm/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
}

function sendResetEmail (name, email, confirmationCode){
  console.log("Check");
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please reset your password",
    html: `<h1>Password Reset</h1>
        <h2>Hello ${name}</h2>
        <p>We heard you've lost your EasyQ password, sorry about that. Please reset your password by clicking on the following link</p>
        <a href=http://localhost:8080/api/user/reset/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
}

function sendSuccessEmail (name, email){
  console.log("Check");
  transport.sendMail({
    from: user,
    to: email,
    subject: "Your password was reset",
    html: `<h1>Password Reset</h1>
        <h2>Hello ${name},</h2>
        <p>We want to let you know that your EasyQ password was reset successfully.</p>
        </div>`,
  }).catch(err => console.log(err));
}

module.exports = { sendConfirmationEmail, sendResetEmail, sendSuccessEmail};