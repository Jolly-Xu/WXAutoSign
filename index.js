const schedule = require('node-schedule');
const Login = require('./AutoSignApi');
const  scheduleCronstyle = ()=>{
    console.log("程序开始执行");
    schedule.scheduleJob('0 30 10 * * *',()=>{
        console.log("执行程序----->时间  "+new Date());
        Login();
    }); 
}

scheduleCronstyle();