// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  ProjectApi
} from "../../apis/project.api.js";

import {
  ZixunApi
} from "../../apis/zixun.api.js";
var WxParse = require('../../wxParse/wxParse');
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
        this.Base.setMyData({
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom,
     
    })
  }
  onMyShow() {
    var that = this;
     var api = new InstApi;
    api.guojiainfo({id:this.Base.options.id}, (guojiainfo) => {
      guojiainfo.xianqin = that.Base.util.HtmlDecode(guojiainfo.xianqin);
      WxParse.wxParse('content', 'html', guojiainfo.xianqin, that, 10);
      this.Base.setMyData({
        guojiainfo: guojiainfo
      });

      var api = new ZixunApi();
      api.zixunlist({ title: guojiainfo.name }, (zixunlist) => {

        this.Base.setMyData({ zixunlist });

      })
    
    })


    var api = new ProjectApi;
    api.gethouselist({ country_id:this.Base.options.id}, (houselist) => {
      //拼接房型字符串
      houselist.map((item) => {
        var fanxintext = '';
        item.fanxin.map((item1, idx) => {
          fanxintext += item1.name;
          if (idx + 1 != item.fanxin.length) {
            fanxintext += '/';
          }
        })
        item.fanxintext = fanxintext;
      })

      this.Base.setMyData({

        houselist: houselist
      })

    })

  
   
   

  }
  gotozixun(e) {
  console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/zixundetail/zixundetail?id=' + id,
    })


  }

  productinfo(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/productinfo/productinfo?id=' + e.currentTarget.dataset.id,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.gotozixun = content.gotozixun;
body.productinfo = content.productinfo;
Page(body)