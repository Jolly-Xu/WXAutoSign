# WXAutoSign
微信自动化签到

## 1.使用Google浏览获取加密后的用户名和密码
### 1 用F12打开控制台打开网络(network)选项
### 2 输入密码点击登录，查看请求路径为login(一般为前两个请求)的接口信息中的payload参数，获取里面的加密后的密码(用户名和密码相同)
### 3 在index.js文件中填入加密后的密码，和需要发送签到信息的邮箱
### 4 去qq邮箱申请pop3服务
![image](https://user-images.githubusercontent.com/87808465/136646652-5b0e9050-2c31-4b45-8b34-08d282b59c82.png)
### 5修改sendemail.js中需要的变量，填入申请的qq号，和申请的qq邮箱令牌
