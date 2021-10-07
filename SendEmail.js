const nodemailer = require("nodemailer");

const OPEN_EMAIL = "你的邮箱地址";

let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    service: "qq",
    port: 465,
    secureConnection: true,
    auth: {
        user: OPEN_EMAIL,
        pass: "你的qq邮箱",
    },
});

// 发送
module.exports=function send(msg) {
    let time = new Date()
    let mailOptions = {
        from: `签到提醒<${OPEN_EMAIL}>`,
        to: "需要发送的邮箱",
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
