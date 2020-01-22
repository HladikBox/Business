// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

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
  }
  feedback(){
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  }
  guanyu(){
    wx.navigateTo({
      url: '/pages/aboutbantop/aboutbantop',
    })
  }
  logouts(){
    wx.showModal({
      title: '提示',
      content: '退出登录',
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync("token");
          wx.navigateTo({
            url: '/pages/login/login',
          })

        } else {

        }
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.feedback = content.feedback;
body.guanyu = content.guanyu;
body.logouts = content.logouts;
Page(body)