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

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var api = new MemberApi;
    api.info({
      id: this.Base.options.id
    }, (info) => {
      this.Base.setMyData({
        memberinfo: info
      })
    })
  }
  bindpic(e) {
    if (this.Base.options.id != this.Base.getMyData().memberinfo.id) {
      return
    }
    var that = this;
    this.Base.uploadOneImage("member", (ret) => {
      that.Base.setMyData({
        avatarUrl: ret,
        xiala: false
      });
      var memberapi = new MemberApi();
      memberapi.updatetouxiang({
        id: this.Base.getMyData().memberinfo.id,
        avatarUrl: this.Base.getMyData().avatarUrl
      }, (updatetouxiang) => {
        this.Base.setMyData({
          updatetouxiang
        });
        this.onMyShow();
        wx.showToast({
          title: '修改完成',
          icon: 'none'
        })
        
      });

    }, undefined, ['album', 'camera']);

  }
  bindemail(e) {
    this.Base.setMyData({
      email: e.detail.value
    })
  }
  bindmobile(e) {
    this.Base.setMyData({
      mobile: e.detail.value
    })
  }
  bindpwd(e) {
    this.Base.setMyData({
      password: e.detail.value
    })
  }
  bindname(e) {
    this.Base.setMyData({
      name: e.detail.value
    })
  }
  tijiao() {
    // var mobile = this.Base.getMyData().mobile;
    var password = this.Base.getMyData().password;
    var name = this.Base.getMyData().name;
    var email = this.Base.getMyData().email;
    var memberinfo = this.Base.getMyData().memberinfo;
    // if (mobile == undefined) {
    //   mobile = memberinfo.mobile;
    // }
  
    if (name == undefined) {
      name = memberinfo.nickName;
    }
    if (email == undefined) {
      email = memberinfo.email;
    }

    if (password == undefined || password=='') {
      password = memberinfo.password;


      var json = {
        id: this.Base.options.id,
        name: name,
        // mobile: mobile,
        password: password,
        email: email,
        flag:'N'
      }
      console.log(json)

      var api = new MemberApi;
      api.xiugai(json, (ret) => {
        console.log(ret)
        if (ret.code = "0") {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
          })
          setTimeout(()=>{
            wx.switchTab({
              url: '/pages/my/my',
            })
          },2000)
         
        }
      })

    }else {


      var json = {
        id: this.Base.options.id,
        name: name,
        // mobile: mobile,
        password: password,
        email: email,
        flag:'Y'
      }
      console.log(json)

      var api = new MemberApi;
      api.xiugai(json, (ret) => {
        console.log(ret)
        if (ret.code = "0") {

          wx.showToast({
            title: '修改成功',
            icon: 'none',
          })

          setTimeout(() => {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }, 2000)
        }
      })

    }



  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.bindpic = content.bindpic;
body.bindemail = content.bindemail;
body.bindmobile = content.bindmobile;
body.bindpwd = content.bindpwd;
body.bindname = content.bindname;
body.tijiao = content.tijiao;

Page(body)