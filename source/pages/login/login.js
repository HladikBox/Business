// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    this.Base.needauth=true;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
  }

  zhuce(){
    wx.navigateTo({
      url: '/pages/register/register'
    })
  }
  denglu(){
    var that = this;
    var mobile = this.Base.getMyData().mobile;
    var password = this.Base.getMyData().password;
    var api = new MemberApi;
    console.log(mobile,password);
  //  wx.setStorageSync("token","");
    api.login({
      mobile: mobile,
      password:password
    },(ret)=>{
       
      console.log(ret,'ret')
      if (ret.code == "0") {

        wx.setStorageSync("token", ret.return);
        
        that.Base.needauth = true;
        wx.switchTab({
          url: '/pages/home/home'
        })

      } else {
        this.Base.info("用户名或密码不存在"+ret.result);
      }
    })

  }
  pwdFn(e){
    this.Base.setMyData({
      password: e.detail.value
    })
  }
  mobileFn(e) {
    this.Base.setMyData({
      mobile: e.detail.value
    })
  }
  forgetpwd(){
    wx.navigateTo({
      url: '/pages/forgetpassword/forgetpassword',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.zhuce = content.zhuce;
body.denglu = content.denglu;
body.mobileFn = content.mobileFn;
body.pwdFn = content.pwdFn;
body.forgetpwd = content.forgetpwd;

Page(body)