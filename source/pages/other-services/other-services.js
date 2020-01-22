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
  chuzu() {
    wx.navigateTo({
      url: '/pages/chuzu/chuzu',
    })
  }

  zhuanrang() {
    wx.navigateTo({
      url: '/pages/zhuanrang/zhuanrang',
    })
  }

  ershou() {
    wx.navigateTo({
      url: '/pages/ershou/ershou',
    })
  }
  daikuan() {
    wx.navigateTo({
      url: '/pages/daikuan/daikuan',
    })
  }
  qianzheng() {
    wx.navigateTo({
      url: '/pages/qianzheng/qianzheng',
    })
  }
  jipiao() {
    wx.navigateTo({
      url: '/pages/jipiao/jipiao',
    })
  }
  jieji() {
    wx.navigateTo({
      url: '/pages/jieji/jieji',
    })
  }
  anjia() {
    wx.navigateTo({
      url: '/pages/anjia/anjia',
    })
  }
  qiandan() {
    wx.navigateTo({
      url: '/pages/qiandan/qiandan',
    })
  }
  liuxue() {
    wx.navigateTo({
      url: '/pages/liuxue/liuxue',
    })
  }



}
var content = new Content();
var body = content.generateBodyJson();
body.chuzu = content.chuzu;
body.zhuanrang = content.zhuanrang;
body.ershou = content.ershou;
body.daikuan = content.daikuan;
body.qianzheng = content.qianzheng;
body.jipiao = content.jipiao;
body.jieji = content.jieji;
body.anjia = content.anjia;
body.qiandan = content.qiandan;
body.liuxue = content.liuxue;


body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)