// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ProjectApi } from "../../apis/project.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    var type = [
      { id: 1, name: '海外房产' },
      { id: 2, name: '海外移民' },
      { id: 3, name: '海外保险' },
    ];
    this.Base.setMyData({ type, seq: 0, })
  }
  onMyShow() {
    var that = this;
    this.getyimin();
    this.getbaoxian();
    this.getfanchan();
  }
  //查询移民列表的接口
  getyimin() {
    var aa=0;
    var api = new ProjectApi;
    api.getyimin({}, (yiminlist) => {
      //拼接房型字符串
      yiminlist.map((item) => {
        var fanxintext = '';
        item.biaoqian.map((item1, idx) => {
          fanxintext += item1.name;
          if (idx + 1 != item.biaoqian.length) {
            fanxintext += '/';
          }
         
        })
        if (item.jiangli_id_name.indexOf("礼品") > -1) {
          item.aa = 1;
        }
        if (item.jiangli_id_name.indexOf("现金") > -1) {
          item.aa = 2;
        }
        if (item.jiangli_id_name.indexOf("佣金") > -1) {
          item.aa = 3;
        }
        item.fanxintext = fanxintext;
      })
      this.Base.setMyData({

        yiminlist: yiminlist
      })

    })
  }
  //查询海外保险的接口
  getbaoxian() {
    var aa=0;
    var api = new ProjectApi;
    api.getbaoxian({}, (baoxianlist) => {
      //拼接房型字符串
      // baoxianlist.map((item) => {
      //   var fanxintext = '';
      //   item.biaoqian.map((item1, idx) => {
      //     fanxintext += item1.name;
      //     if (idx + 1 != item.biaoqian.length) {
      //       fanxintext += '/';
      //     }
      //   })
      //   item.fanxintext = fanxintext;
      // })
      for (var i = 0; i < baoxianlist.length; i++) {
        var fanxintext = '';
        for (var j = 0; j < baoxianlist[i].biaoqian.length; j++) {
          if (j + 1 != baoxianlist[i].biaoqian.length) {
            fanxintext += '/';
          }
         
        }
        if (baoxianlist[i].jiangli_id_name.indexOf("礼品") > -1) {
          baoxianlist[i].aa = 1;
        }
        if (baoxianlist[i].jiangli_id_name.indexOf("现金") > -1) {
          baoxianlist[i].aa = 2;
        }
        if (baoxianlist[i].jiangli_id_name.indexOf("佣金") > -1) {
          baoxianlist[i].aa = 3;
        }
        baoxianlist.fanxintext = fanxintext;
      }
      this.Base.setMyData({

        baoxianlist: baoxianlist
      })

    })
  }
  //查询海外房产的接口
  getfanchan() {

    var api = new ProjectApi;
    var aa=0;
    api.gethouselist({}, (houselist) => {
      //拼接房型字符串
      houselist.map((item) => {
        var fanxintext = '';
        item.fanxin.map((item1, idx) => {
          fanxintext += item1.name;
          if (idx + 1 != item.fanxin.length) {
            fanxintext += '/';
          }
          
        })
        if (item.jiangli_id_name.indexOf("礼品") >= 0) {
          item.aa = 1;
        }
        if (item.jiangli_id_name.indexOf("现金") > -1) {
          item.aa = 2;
        }
        if (item.jiangli_id_name.indexOf("佣金") > -1) {
          item.aa = 3;
        }
        item.fanxintext = fanxintext;
      })

      this.Base.setMyData({

        houselist: houselist
      })

    })


  }

  switchs(e) {
    console.log(e);
    this.Base.setMyData({
      seq: e.currentTarget.id
    })
  }
  detail(e) {
    console.log(e);
    var id = e.currentTarget.id;
    var xm = e.currentTarget.dataset.xm;
    if (xm == 'fc') {
      wx.navigateTo({
        url: '/pages/productinfo/productinfo?id=' + id,
      })
    } else if (xm == 'ym') {
      wx.navigateTo({
        url: '/pages/yimininfo/yimininfo?id=' + id,
      })
    } else if (xm == 'bx') {
      wx.navigateTo({
        url: '/pages/baoxianinfo/baoxianinfo?id=' + id,
      })
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.switchs = content.switchs;
body.getfanchan = content.getfanchan;
body.getbaoxian = content.getbaoxian;
body.getyimin = content.getyimin;
body.detail = content.detail; 
Page(body)