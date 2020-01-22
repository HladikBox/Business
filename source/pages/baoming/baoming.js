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
  ActivityApi
} from "../../apis/activity.api.js";
import {
  PurchaseApi
} from "../../apis/purchase.api.js";
import {
  WechatApi
} from "../../apis/wechat.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    // options.id=1;
    super.onLoad(options);

  }
  onMyShow() {
    var that = this;
    this.Base.setMyData({
      title: that.Base.options.type
    })
  }
  tijiao() {
    var mobile = this.Base.getMyData().mobile;
    var num = this.Base.getMyData().num;
    var name = this.Base.getMyData().name;
    var price = Number(this.Base.options.activity_free) ;
    console.log(name, num, mobile);
    var api = new ActivityApi;
    var that = this;
    var type = this.Base.getMyData().title;
    var aty = ""
    if (type == "考察") {
      aty = "A";
    } else if (type == "会展") {
      aty = "B";
    } else if (type == "课程") {
      aty = "C";
    } else if (type == "培训") {
      aty = "D";
    }


    
    if (mobile==undefined || name==undefined || num==undefined) {
      wx.showToast({
        title: '信息没填完，请继续填写！',
        icon: 'none'
      })
      return;
    } else {

     

   

      var api1 = new PurchaseApi;
      api1.createactivity({ 
        activity_id: that.Base.options.activity_id,
        amount: price
        },(ret)=>{
          if (ret.code == '0') {
            if (ret.return.pstatus == 'Y') {
              var json = {
                activity_type: aty,
                name: name,
                moblie: mobile,
                pernum: num,
                member_id: that.Base.getMyData().memberinfo.id,
                activity_id: that.Base.options.activity_id,
              };
              api.addbaoming(json, (ret) => {
                console.log(ret);
                if (ret) {
                  var json2 = {
                    name: name,
                    moblie: mobile,
                    pernum: num,
                    activity_id: that.Base.options.activity_id,
                    baostatus: 'A',
                    id: ret.return
                  }
                  wx.navigateTo({
                    url: '/pages/zhifuchengong/zhifuchengongming?id=' + ret.return,
                  })
                }
              })
              
              return;
            }else {

            var wechatapi = new WechatApi();
            console.log(ret);
              console.log("哈哈哈0");
              console.log(AppBase.UserInfo.openid,"哈哈哈0");
              wechatapi.prepay({ id: ret.return.id, openid: AppBase.UserInfo.openid}, (payret) => {
              payret.complete = function (e) {
                console.log(e);
                console.log("嚯嚯嚯嚯嚯嚯");
                console.log(payret,'ooo')

                if (e.errMsg == "requestPayment:ok") {
                 
                  var json = {
                    activity_type: aty,
                    name: name,
                    moblie: mobile,
                    pernum: num,
                    member_id: that.Base.getMyData().memberinfo.id,
                    activity_id: that.Base.options.activity_id,
                    orderno: payret.orderno
                  };
                  api.addbaoming(json, (ret) => {
                    console.log(ret);
                    if (ret) {
                      var json2 = {
                        name: name,
                        moblie: mobile,
                        pernum: num,
                        activity_id: that.Base.options.activity_id,
                        baostatus: 'A',
                        id: ret.return,
                        orderno: payret.orderno
                      }
                      wx.navigateTo({
                        url: '/pages/zhifuchengong/zhifuchengongming?id=' + ret.return,
                      })
                    }
                  })

                }
                else {

                  wx.showToast({
                    title: '支付失败',
                    icon: 'none'
                  })
                  console.log("支付失败");

                }

              }
              console.log(payret);
              wx.requestPayment(payret)
            });
          }
          }
      })


    }


  }
  bindnum(e) {
    this.Base.setMyData({
      num: e.detail.value
    })
  }
  bindmobile(e) {
    this.Base.setMyData({
      mobile: e.detail.value
    })
  }
  bindname(e) {
    this.Base.setMyData({
      name: e.detail.value
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.tijiao = content.tijiao;
body.bindnum = content.bindnum;
body.bindmobile = content.bindmobile;
body.bindname = content.bindname;

Page(body)