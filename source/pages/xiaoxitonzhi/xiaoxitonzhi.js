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
    var api = new MemberApi();
    api.myxiaoxi({}, (myxiaoxi) => {

      this.Base.setMyData({
        myxiaoxi
      });

      var dindanxiaoxi = myxiaoxi.filter((item) => {
        return item.type == 'B'
      })
      
      var wddindanxiaoxi = myxiaoxi.filter((item) => {
        return item.type == 'B'&&item.isread_value=='N'
      })
      var xitonxiaoxi = myxiaoxi.filter((item) => {
        return item.type == 'A'
      })
      var wdxitonxiaoxi = myxiaoxi.filter((item) => {
        return item.type == 'A'&&item.isread_value=='N'
      })
      var huodonxiaoxi = myxiaoxi.filter((item) => {
        return item.type == 'C'
      })
      var wdhuodonxiaoxi = myxiaoxi.filter((item) => {
        return item.type == 'C'&&item.isread_value=='N'
      })
      var chanpinxiaoxi = myxiaoxi.filter((item) => {
        return item.type == 'D'
      })
      var wdchanpinxiaoxi = myxiaoxi.filter((item) => {
        return item.type == 'D'&&item.isread_value=='N'
      })
      var qudaoxiaoxi = myxiaoxi.filter((item) => {
        return item.type == 'E'
      })
      var wdqudaoxiaoxi = myxiaoxi.filter((item) => {
        return item.type == 'E'&&item.isread_value=='N'
      })
      var yonjinxiaoxi = myxiaoxi.filter((item) => {
        return item.type == 'F'
      })
      var wdyonjinxiaoxi = myxiaoxi.filter((item) => {
        return item.type == 'F'&&item.isread_value=='N'
      })

      this.Base.setMyData({
        dindanxiaoxi,xitonxiaoxi,huodonxiaoxi,chanpinxiaoxi,qudaoxiaoxi,yonjinxiaoxi,
        wddindanxiaoxi,wdxitonxiaoxi,wdhuodonxiaoxi,wdchanpinxiaoxi,wdqudaoxiaoxi,wdyonjinxiaoxi,
      });
    })
  }
  xiaoxiinfo(e) {
 
    //  if(e.currentTarget.dataset.id=='D')
    //  {
    //    this.Base.info("功能完善中");
    //    return
    //  }
     
    wx.navigateTo({
      url: '/pages/xitoninfo/xitoninfo?id=' + e.currentTarget.dataset.id,
    })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.xitoninfo = content.xitoninfo;
body.xiaoxiinfo=content.xiaoxiinfo;
Page(body)