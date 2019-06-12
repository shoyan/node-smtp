const nodemailer = require("nodemailer");

// メッセージ
var message = {
  from: "localhost@example.com",
  to: "info@example.com",
  subject: "タイトル",
  text: "本文"
};

var smtpConfig = {
  host: "localhost",
  port: 5870,
  secure: false, // SSL
};

var transporter = nodemailer.createTransport(smtpConfig);

transporter.sendMail(message, function (err, response) {
  console.log(err || response);
});
