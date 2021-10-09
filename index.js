const schedule = require('node-schedule');
const Login = require('./AutoSignApi');
const scheduleCronstyle = () => {
    console.log("程序开始执行");
    schedule.scheduleJob('0 30 10 * * *', () => {
        console.log("执行第一个账号----->时间  " + new Date());
        Login("加密后的账号","邮箱");
        setTimeout(() => {
            console.log("执行第二个账号");
            Login("加密后的账号","邮箱");
        }, 1000 * 10 * 6)
    });



}

scheduleCronstyle();