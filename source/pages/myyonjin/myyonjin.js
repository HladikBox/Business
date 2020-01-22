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
  SalesorderApi
} from "../../apis/salesorder.api.js";
import {
  MemberApi
} from "../../apis/member.api";
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

    var api = new SalesorderApi();



    api.summary({}, (yonjin) => {

      this.Base.setMyData({
        yonjin
      });

    })

    api.mycommission({}, (ziyoukehu) => {

      this.Base.setMyData({
        ziyoukehu
      });

    })

    api.channelcommission({}, (pintaikehu) => {

      this.Base.setMyData({
        pintaikehu
      });

    })
    var api = new MemberApi();
    api.tixianjilu({}, (tixianjilu) => {
      var jiner=0;
      tixianjilu.map((item)=>{

        jiner+=Number(item.amount);

      })
  
     this.Base.setMyData({jiner})

    })

  }
  switchtab(e) {
    console.log(e);
    this.Base.setMyData({
      tab: e.currentTarget.id
    })
  }
  tixianjilu() {

    wx.navigateTo({
      url: '/pages/tixianjilu/tixianjilu',
    })

  }
  tixian() {

    wx.navigateTo({
      url: '/pages/tixian/tixian',
    })

  }
  yonjinxianqin(e) {

    wx.navigateTo({
      url: '/pages/yonjinxianqin/yonjinxianqin?id=' + e.currentTarget.id,
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.switchtab = content.switchtab;
body.tixianjilu = content.tixianjilu;
body.tixian = content.tixian;
body.yonjinxianqin = content.yonjinxianqin;
Page(body)