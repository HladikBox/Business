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
    


    this.Base.setMyData({
      navH: AppBase.statusBarHeight
    })
  }
  onMyShow() {
    var that = this;
    console.log("12313");
  }
  handlerGobackClick() {



    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: 1
      });
    } else {
      wx.navigateTo({
        url: '/pages/index/index'
      });
    }



  }
  handlerGohomeClick() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.handlerGohomeClick = content.handlerGohomeClick;
body.handlerGobackClick = content.handlerGobackClick;
Page(body)