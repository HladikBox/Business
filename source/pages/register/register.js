// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";
import {
  AliyunApi
} from "../../apis/aliyun.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.needauth = true;
   
     var yaoqinma=this.Base.options.yaoqinma;
     if(yaoqinma!=undefined)
     {
      this.Base.setMyData({

        yaoqinma
      })

     }
     else{
      this.Base.setMyData({

        yaoqinma:''
      })

     }
      


    this.Base.setMyData({
      show: false,
      send: false,
      reminder: 0
    });
  }
  onMyShow() {
    var that = this;

  }
  xuanze() {
    var show = this.Base.getMyData().show;
    show = !show;
    this.Base.setMyData({
      show: show
    });
  }

  sendverifycode(e) {
    console.log(e)
    var send = this.Base.getMyData().send;
    var mobile = this.Base.getMyData().mobile;
    var reminder = this.Base.getMyData().reminder;
    console.log(mobile);
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var api = new AliyunApi;
    var that = this;
    if (!(myreg.test(mobile))) {
      wx.showToast({
        title: '手机号码不正确，请重新输入',
        icon: 'none'
      })
      return
    }
    api.sendverifycode({
      mobile: mobile,
      type: 'register'
    }, (ret) => {
      if (ret) {
        that.Base.setMyData({
          send: true,
          reminder: 60
        })
        that.setInVerify();
      }
    })
  }
  bindmoile(e) {
    console.log(e)
    this.Base.setMyData({
      mobile: e.detail.value
    })
  }
  bindyanzhengma(e) {
    console.log(e)
    this.Base.setMyData({
      yangzhengma: e.detail.value
    })
  }
  bindcode(e) {
    console.log(e)
    this.Base.setMyData({
      code: e.detail.value
    })
  }
  bindpwd(e) {
    console.log(e)
    this.Base.setMyData({
      password: e.detail.value
    })
  }
  zuce() {
    var yaoqinma=this.Base.getMyData().yaoqinma;
    var show = this.Base.getMyData().show;
    var mobile = this.Base.getMyData().mobile;
    var password = this.Base.getMyData().password;
    var yangzhengma = this.Base.getMyData().yangzhengma;
    var code = this.Base.getMyData().code;
    if(yaoqinma!='')
    {
      code=yaoqinma;
    }
    var api = new MemberApi;
    console.log(password.length)

    if (password.length < 6 || password.length > 20) {
      wx.showToast({
        title: '密码长度不对，长度应为6~20位',
        icon: 'none'
      })
      return
    }

    if (show == false) {
      wx.showToast({
        title: '请阅读并接受《服务条款》',
        icon: 'none'
      })
      return
    }

  var that = this;
    api.verifycode({
      mobile: mobile,
      verifycode: yangzhengma,
      type: "register"
    }, (ret) => {
      console.log(ret)
      if (ret.code == "0") {
        if (password != undefined && password != "") {
          api.register({
            mobile: mobile,
            password: password,
            code: code
          }, (ret) => {
            console.log(ret, 'ss')
            if (ret.code == "0") {
              // wx.showModal({
              //   title: '提示',
              //   content: '注册成功',
              //   confirmText: "去登陆",
              //   success: function(res) {
              //     if (res.confirm) {
              //       wx.navigateTo({
              //         url: '/pages/login/login',
              //       })

              //     } else {

              //     }
              //   }
              // })
              api.login({
                mobile: mobile,
                password: password
              }, (ret) => {

                console.log(ret, 'ret')
                if (ret.code == "0") {

                  wx.setStorageSync("token", ret.return);

                  that.Base.needauth = true;
                  wx.switchTab({
                    url: '/pages/home/home'
                  })
                }
              })
            

            } else {
              wx.showToast({
                title: '手机号已被占用！',
                icon: 'none'
              })
            }
          })
        } else {
          wx.showToast({
            title: '密码为空，请重新输入',
            icon: 'none'
          })
        }


      } else {
        wx.showToast({
          title: '验证码校验失败，请重新尝试',
          icon: 'none'
        })
      }
    })


  }
  denglu() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
  setInVerify() {

    // var timer=null;
    var reminder = this.Base.getMyData().reminder;
    var k = setInterval(() => {
      if (reminder >= 0) {
        var mm = reminder--;
        this.Base.setMyData({
          reminder: mm
        })
      }
      if (reminder < 0) {
        clearInterval(k);
      }

    }, 1000);
  }
  tiaokuan() {
    wx.navigateTo({
      url: '/pages/tiaokuan/tiaokuan',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.xuanze = content.xuanze;
body.denglu = content.denglu;
body.sendverifycode = content.sendverifycode;
body.bindmoile = content.bindmoile;
body.bindyanzhengma = content.bindyanzhengma;
body.bindpwd = content.bindpwd;
body.bindcode = content.bindcode;
body.zuce = content.zuce;
body.setInVerify = content.setInVerify;
body.tiaokuan = content.tiaokuan;

Page(body)