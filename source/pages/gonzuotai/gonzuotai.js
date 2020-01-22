
// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { GonzuotaiApi } from "../../apis/gonzuotai.api.js";
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
    var api = new GonzuotaiApi();
    api.gonzuotailist({}, (gonzuotailist) => {
      gonzuotailist.map((item) => {

        if (item.ifunlock == 0) {

          item.xuanzhon = false;
        }
        else {
          item.xuanzhon = true;
        }

      })
      var list = gonzuotailist.filter((item) => {

        return item.xuanzhon == true;

      })
      this.Base.setMyData({ gonzuotailist, xzlist: list, add: false });

    })
  }

  add() {

    this.Base.setMyData({ add: true })


  }
  xuanzhon(e) {
    var id = e.currentTarget.dataset.id;
    var gonzuotailist = this.Base.getMyData().gonzuotailist;
    console.log(id);
    console.log(gonzuotailist);

    gonzuotailist.map((item) => {

      if (item.id == id) {


        item.xuanzhon = !item.xuanzhon;
      }

    })
    this.Base.setMyData({ gonzuotailist });




  }
  create() {
    var that = this;
    var canshu = '';
    var gonzuotailist = this.Base.getMyData().gonzuotailist;

    gonzuotailist.map((item) => {

      if (item.xuanzhon == true) {



        canshu += item.id + ',';



      }

    })
    console.log(canshu);
    this.tianjia(canshu);

  }
  tianjia(id) {

    var that = this;
    var id = id.substring(0, id.length - 1);
    var api = new GonzuotaiApi();
    api.addgonzuotai({ canshu: id }, (res) => {

      that.onMyShow();


    })


  }

  detail(e) {
    console.log(e);
    var name = e.currentTarget.dataset.current;
    console.log(name);

    if (name == "我的收藏") {
      wx.navigateTo({
        url: '/pages/shoucan/shoucan',
      })
    }
    if (name == "佣金表单") {
      wx.navigateTo({
        url: '/pages/yonjinbiaodan/yonjinbiaodan',
      })
    }
    if (name == "我的客户") {
      wx.navigateTo({
        url: '/pages/mykehu/mykehu',
      })
    }
    if (name == "我的渠道") {
      wx.navigateTo({
        url: '/pages/myqudao/myqudao',
      })
    }
    if (name == "成交客户") {
      wx.navigateTo({
        url: '/pages/chenjiaokehu/chenjiaokehu',
      })
    }
    if (name == "合作销售") {
      wx.navigateTo({
        url: '/pages/lurukehu/lurukehu?id=1',
      })
    }
    if (name == "增值服务") {
      wx.navigateTo({
        url: '/pages/other-services/other-services',
      })

    }
    if (name == "通知中心") {
      wx.navigateTo({
        url: '/pages/xiaoxitonzhi/xiaoxitonzhi',
      })

    }
    if (name == "我的佣金") {
      wx.navigateTo({
        url: '/pages/myyonjin/myyonjin',
      })

    }

    if (name == "我的客服") {
      var instinfo = this.Base.getMyData().instinfo;
      console.log(instinfo);
      wx.showActionSheet({
        itemList: ["拨打电话"],
        success(e) {
          if (e.tapIndex == 0) {
            wx.makePhoneCall({
              phoneNumber: instinfo.customerservicemobile
            })
          }
        }
      })
    }

    if (name == '活动报名') {
      wx.navigateTo({
        url: '/pages/activitysuccess/activitysuccess',
      })
    }

    if (name == '我的银行') {
      wx.navigateTo({
        url: '/pages/mybank/mybank',
      })
    }

  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.add = content.add;
body.xuanzhon = content.xuanzhon;
body.create = content.create;
body.tianjia = content.tianjia;
body.detail = content.detail;
Page(body)