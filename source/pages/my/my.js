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
  GonzuotaiApi
} from "../../apis/gonzuotai.api.js";
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

      this.Base.setMyData({
        gonzuotailist
      });

      this.Base.setMyData({
        gonzuotailist
      });


    })
    console.log("12313");
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
  lianxi() {

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

  myorder() {



    wx.navigateTo({
      url: '/pages/myorder/myorder',
    })

  }

  myrenzhen() {

 
      wx.navigateTo({
        url: '/pages/myrenzhen/myrenzhen',
      })


     

   

  }
  shezhi() {
    wx.navigateTo({
      url: '/pages/shezhi/shezhi',
    })
  }
  myyaoqinma() {

    if (this.Base.getMyData().memberinfo.isrenzhen_value == 'Y') {
      wx.navigateTo({
        url: '/pages/myyaoqinma/myyaoqinma',
      })

      
    }
    else{
      this.Base.info("您还未认证,请先前往认证认证");
      return
    }

 
  }
  xiugai(){
    wx.navigateTo({
      url: '/pages/mydata/mydata?id='+this.Base.getMyData().memberinfo.id,
    })
  }
  myyuyue(){
wx.navigateTo({
  url: '/pages/myyuyue/myyuyue',
})


  }
}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.myorder = content.myorder;
body.myrenzhen = content.myrenzhen;

body.shezhi = content.shezhi;
body.detail = content.detail;
body.myyaoqinma = content.myyaoqinma;
body.lianxi = content.lianxi;
body.xiugai = content.xiugai;
body.myyuyue = content.myyuyue;

Page(body)