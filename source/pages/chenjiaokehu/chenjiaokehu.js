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
  MemberApi
} from "../../apis/member.api.js";

import {
  OrderApi
} from "../../apis/order.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      tab: 0
    })
  }
  onMyShow() {
    var that = this;

    this.getorder();
  }
  getkehu() {
    var api = new MemberApi();

    var myorder = this.Base.getMyData().myorder;


    api.mykehu({}, (mykehu) => {

      myorder.map((item) => {

        mykehu.map((item1) => {

          if (item.kehu_id == item1.id) {
            item1.cjkh = true
          }

        })


      })


      var ziyoukehu = mykehu.filter((item) => {
        return item.kehuleixin == '0'&&item.cjkh==true;
      })
      var pintaikehu = mykehu.filter((item) => {
        return item.kehuleixin == '1'&&item.cjkh==true;
      })


      this.Base.setMyData({
        mykehu,
        ziyoukehu,
        pintaikehu
      })
    })


  }
  getorder() {
    var that = this;
    var api = new OrderApi();
    api.getmyorder({}, (myorder) => {
      this.Base.setMyData({
        myorder
      });
     

      that.getkehu()
    })

  }
  switchtab(e) {
    console.log(e);
    this.Base.setMyData({
      tab: e.currentTarget.id
    })
  }
  addkehu() {
    wx.navigateTo({
      url: '/pages/lurukehu/lurukehu?id=0',
    })

  }
  kehuziliao(e) {

    wx.navigateTo({
      url: '/pages/kehuziliao/kehuziliao?id=' + e.currentTarget.dataset.id,

    })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getkehu = content.getkehu;
body.switchtab = content.switchtab;
body.addkehu = content.addkehu;
body.kehuziliao = content.kehuziliao;
body.getorder = content.getorder;
Page(body)