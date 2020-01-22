// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { AliyunApi } from "../../apis/aliyun.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    this.Base.needauth = true;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    this.Base.setMyData({
      show: false,
      send: false,
      reminder: 0
    });
  }
  bindyanzhengma(e) {
    console.log(e)
    this.Base.setMyData({
      yangzhengma: e.detail.value
    })
  }
  pwdFn(e) {
    this.Base.setMyData({
      password: e.detail.value
    })
  }
  mobileFn(e) {
    this.Base.setMyData({
      mobile: e.detail.value
    })
  }
  sendverifycode(e) {
    console.log(e)
    var send = this.Base.getMyData().send;
    var mobile = this.Base.getMyData().mobile;
    var reminder = this.Base.getMyData().reminder;
    console.log(mobile);
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var api = new AliyunApi;
    var that =this;
    if (!(myreg.test(mobile))) {
      wx.showToast({
        title: '手机号码不正确，请重新输入',
        icon: 'none'
      })
      return
    }
    api.sendverifycode({
      mobile: mobile,
      type:'forgetpassword'
    }, (ret) => {
      if (ret) {
      
        that.Base.setMyData({
          send: true,
          reminder :60
        })
        that.setInVerify();
      }
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
  denglu(){
    var mobile = this.Base.getMyData().mobile;
    var password = this.Base.getMyData().password;
    var yangzhengma = this.Base.getMyData().yangzhengma;
    var api = new MemberApi;

    api.verifycode({
      mobile: mobile,
      verifycode: yangzhengma,
      type: "forgetpassword"
    }, (ret) => {
      if (ret.code == "0") {
        api.editpassword({
          mobile: mobile,
          password: password
        }, (ret) => {
          console.log(ret);
          if(ret.code=="0"){
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }else {
            wx.showToast({
              title: '手机号码错误',
              icon: 'none'
            })
          }
        })
      }
    })

    
  }
  fanhui(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.bindyanzhengma = content.bindyanzhengma;
body.pwdFn = content.pwdFn;
body.mobileFn = content.mobileFn;
body.sendverifycode = content.sendverifycode;
body.setInVerify = content.setInVerify;
body.denglu = content.denglu;
body.fanhui = content.fanhui;

Page(body)