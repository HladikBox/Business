// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
var WxParse = require('../../wxParse/wxParse');
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.needauth = true;
  }
  onMyShow() {
    var that = this;
    this.getinfo();

  }
  getinfo() {
    var api = new InstApi;
    var that = this;
    api.clause({ id: 1 }, (list) => {
      console.log(list)
      for (let item of list) {
        console.log(item.content)
        // item.content = that.Base.util.HtmlDecode(item.content);
        WxParse.wxParse('content', 'html', item.content, that, 10);
      }

      that.Base.setMyData({
        list: list
      })
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.getinfo = content.getinfo;

Page(body)