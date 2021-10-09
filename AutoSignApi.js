const axios = require('axios');
const send = require("./SendEmail")
axios.defaults.withCredentials = true;
let sid = ""
let fromid = ""
let apply_user_id = ""
let username = ""
let userid = ""
let sex = ""
let department_id = ""
let Email = ""
module.exports = async function Login(login_username, toEmail) {
    console.log("开始登录");
    Email = toEmail;
    let rep = await axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: 'https://wb.scujj.edu.cn/relax/mobile/rpc?p=/v2/login/login',
        data: {
            "jsonrpc": "2.0",
            "method": "/v2/login/login",
            "id": 2,
            "params": [login_username, login_username, false]
        }
    })
    sid = rep.headers["set-cookie"][0].split("=")[1].split(";")[0];

    if (rep.status === 200) {
        console.log("登录成功，开始执行获得Id");
        apply_user_id = rep.data.result.id
        username = rep.data.result.display_name
        userid = rep.data.result.name
        sex = rep.data.result.sex.name
        department_id = rep.data.result.department.id
         getId();
        console.log(apply_user_id, username, userid, sex, department_id, sid);
    }
    else {
        send("签到失败,请自己抓紧时间签到", toEmail)
    }
    
}

async function getId() {
    let rep = await axios({
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": "sid=" + sid
        },
        url: 'https://wb.scujj.edu.cn/relax/mobile/rpc?p=/v2/fight/ncp/health/report/getId&t',
        data: {
            "jsonrpc": "2.0", "method": "/v2/fight/ncp/health/report/getId", "id": "1", "params": []
        }
    })
    fromid = rep.data.result;
    console.log(fromid);
     sign();
}


async function sign() {
    console.log("开始提交表单");
    let rep = await axios({
        headers: {
            "Content-Type": "application/json",
            "Cookie": "sid=" + sid
        },
        url: 'https://wb.scujj.edu.cn/relax/mobile/rpc?p=/v2/workorder/action/createWithValidate&t',
        data: {
            "jsonrpc": "2.0",
            "method": "/v2/workorder/action/createWithValidate",
            "id": "1",
            "params": [[{
                "id": fromid,
                "type": "40bca208-5184-11ea-887d-cb65bdaac481",
                "source": "mobile", "F202101081807070234": "提示：请先查询所在地区风险等级信息！",
                "F202101101641390975": "<a href=\"https://www.baidu.com\" target=_self\">点击进行风险地区信息查询</a>", "F202002181707170395": null,
                "apply_user": apply_user_id,
                "xm": username, "xh": userid, "xb": sex,
                "xzbmzz": department_id,
                "lxdh": null, "F202002181709010991": null, "jkzt": "健康",
                "shifoufare": "否", "tiwen": null, "qitazhuangkuang": "无",
                "qitazhengzhuang": null, "shifoujiuzhenzhuyuan": null, "yiyuanmingcheng": null,
                "shifougeli": "fou", "gelifangshi": null, "gelidizhi": null, "F202002181709370531": null,
                "dingwei": "{\"point\":{\"Q\":30.213861219619,\"R\":103.87323160807301,\"lng\":103.873232,\"lat\":30.213861},\"address\":\"四川省眉山市彭山区观音街道锦江大道67号四川大学锦江学院\",\"addressComponent\":{\"citycode\":\"1833\",\"adcode\":\"511403\",\"businessAreas\":[],\"neighborhoodType\":\"\",\"neighborhood\":\"\",\"building\":\"\",\"buildingType\":\"\",\"street\":\"锦江大道\",\"streetNumber\":\"67号\",\"country\":\"中国\",\"province\":\"四川省\",\"city\":\"眉山市\",\"district\":\"彭山区\",\"township\":\"观音街道\"}}",
                "dingweibuchong": null,
                "szdqfxdj": "低风险地区", "cunjieqijianshifouzaixiao": "fou", "shifouzaixiao": "shi",
                "shifouyifanhuihuocongweilikaixuexiao": "yifanhui",
                "muqiansuozaichengshi": "guoneishengshi",
                "sheng": "36a1a900-4ffb-11eb-94b5-3fe47a638b81",
                "shi": "4256974d-4ffb-11eb-a77c-dff7589e956a",
                "qu": "510a22ee-4ffb-11eb-afd0-7318d2337604",
                "guowaidizhi": null, "F202002181711450937": null,
                "jinyigeyueshifouquguohubei": "fou",
                "jinyigeyueshifoujiechuguoquezhenbingli": "fou",
                "jinyigeyueshifoujiechuguoyisibingli": "fou",
                "miqiejiechuguanxi": "qinyoujiqita"
            }], ["8a525ad7-5187-11ea-a13f-53bf2079bf35"]]
        }
    })
    if (rep.data.result.state === true) {
        console.log("发送邮件");
        send("签到成功", Email);
    }
    else {
        console.log("签到失败");
        send("签到失败，提交表单异常，请自行签到", Email)
    }
}
