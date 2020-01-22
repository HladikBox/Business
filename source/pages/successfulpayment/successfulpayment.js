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
  fanhui() {
    wx.navigateTo({
   
       url:'/pages/myorder/myorder'

    })
  }
  chakan() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.fanhui = content.fanhui;
body.chakan = content.chakan;

Page(body)