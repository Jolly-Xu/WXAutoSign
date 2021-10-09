const schedule = require('node-schedule');
const Login = require('./AutoSignApi');
let UsersInfo = [
    {login_id:"",email:""},
    {login_id:"",email:""}
    // 填写加密后的用户名和发送的邮箱的地址
]
const scheduleCronstyle = () => {
    console.log("微信签到程序开始执行");
    schedule.scheduleJob('0 29 10 * * *', () => {
        let index = 0; 
        const timer = setInterval(()=>{
            console.log("用户",index+1,"开始签到,时间---->",new Date());
            Login(UsersInfo[index].login_id,UsersInfo[index].email)
            if(++index === UsersInfo.length){
                console.log('今日签到结束');
                clearInterval(timer);
            }
        },1000*60)
    });
}
scheduleCronstyle();