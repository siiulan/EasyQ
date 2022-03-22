let lib = require("../configs/nodemailer.config.js")
let transport = lib.transport
let url = lib.url
const user = "easyqece651@gmail.com";

function sendConfirmationEmail (name, email, confirmationCode){
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=${url}/api/user/confirm/${confirmationCode}> Click here</a>
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
        <a href=${url}/resetpassword/${confirmationCode}> Click here</a>
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

function emailTesting (email, name){
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Testing Email",
      html: `<h1>Testing email</h1>
          <h2>Hello ${name},</h2>
          <p>We want to test if this email has sent to you successfully.</p>
          </div>`,
    }).catch(err => console.log(err));
}

function sendInivitationEmail (email, name, class_name, invitation_token, is_registered){
  console.log("Check");
  var registered_message = ``
  if (is_registered){
    registered_message = `<h1>TA Invitation from EasyQ</h1>
    <h2>Hello,</h2>
    <p>Instructor ${name} invited you to become a TA in the class ${class_name} on EasyQ. To use our office hour queue service, click the link to accept the invitiation and set up your office hour </p>
    <a href=${url}/api/user/instructor/registeredInvitationConfirmation/${invitation_token}> Click here</a>
    </div>`;
  } else {
    registered_message = `<h1>TA Invitation from EasyQ</h1>
    <h2>Hello,</h2>
    <p>Instructor ${name} invited you to become a TA in the class ${class_name} on EasyQ. To use our office hour queue service, click the link to finish your registration </p>
    <a href=${url}/api/user/instructor/invitationConfirm/${invitation_token}> Click here</a>
    </div>`;
  }
  transport.sendMail({
    from: user,
    to: email,
    subject: "[EasyQ] you have a TA Invitation",
    html: registered_message,
  }).catch(err => console.log(err));
}

module.exports = {sendConfirmationEmail, sendResetEmail, sendSuccessEmail, emailTesting, sendInivitationEmail};
