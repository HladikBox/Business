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
    // console.log(JSON.parse(this.Base.options.data) , 'data')
  }
  onMyShow() {
    var that = this;
    
  }
  fanhui(){
    wx.switchTab({
      url: '/pages/activity/activity'
    })
  }
  chakan(){
    console.log(this.Base.options.data,'data')
    
    // var json = JSON.parse(this.Base.options.data);
    // console.log(json,'ll')
    wx.navigateTo({
      url: '/pages/dingdandetail/dingdandetail?id=' + this.Base.options.id,
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