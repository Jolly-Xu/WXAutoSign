const nodemailer = require("nodemailer");

const OPEN_EMAIL = "发送账号的邮箱";

let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    service: "qq",
    port: 465,
    secureConnection: true,
    auth: {
        user: OPEN_EMAIL,
        pass: "发送账号邮箱安全令牌",
    },
});

// 发送
module.exports=function send(msg,toEmail) {
    let time = new Date()
    let mailOptions = {
        from: `签到提醒<${OPEN_EMAIL}>`,
        to: toEmail,
        subject: msg,
        text: msg + time
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
    });
}
