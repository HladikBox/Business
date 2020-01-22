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
  ProjectApi
} from "../../apis/project.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";

import {
  OrderApi
} from "../../apis/order.api.js";

import {
  WechatApi
} from "../../apis/wechat.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    var id = this.Base.options.id;

    var api = new ProjectApi();
    api.fanchaninfo({
      id: id
    }, (fanchaninfo) => {

      api.gethouseinfo({
        id: fanchaninfo.houseproject_id
      }, (houseinfo) => {


        this.Base.setMyData({
          houseinfo
        })

      })
      this.Base.setMyData({
        fanchaninfo
      })


    })
    this.Base.setMyData({

      zhenmian: '',
      beimian: '',
      huzhaoshouye: '',
      index: '',
      shenfenzhen: '',
      xianjudi: '',
      huzhao: '',
      date: ''

    })

  }
  onMyShow() {
    var that = this;
    var api = new MemberApi();
    api.mykehu({}, (kehu) => {

      this.Base.setMyData({
        kehu
      })


    })

  }
  bindkehu(e) {
    this.Base.setMyData({

      index: e.detail.value
    })


  }
  xianjudi(e) {
    this.Base.setMyData({
      xianjudi: e.detail.value
    })
  }
  shenfenzhen(e) {
    this.Base.setMyData({
      shenfenzhen: e.detail.value
    })
  }
  huzhao(e) {
    this.Base.setMyData({
      huzhao: e.detail.value
    })
  }

  zhenmian() {

    var that = this;
    this.Base.uploadImage("order", (ret) => {
      console.log(ret);
      that.Base.setMyData({
        zhenmian: ret
      });
    }, undefined);
  }
  beimian() {
    var that = this;
    this.Base.uploadImage("order", (ret) => {
      console.log(ret);
      that.Base.setMyData({
        beimian: ret
      });
    }, undefined);

  }
  huzhaoshouye() {
    var that = this;
    this.Base.uploadImage("order", (ret) => {
      console.log(ret);
      that.Base.setMyData({
        huzhaoshouye: ret
      });
    }, undefined);

  }
  bindDateChange(e) {
    this.Base.setMyData({
      date: e.detail.value
    })
    console.log(e);

  }
  tishi(){
   
    wx.showModal({
      title: '提示',
      content: '您还没有客户,请先添加客户',
      success (res) {
      if (res.confirm) {
      wx.navigateTo({
        url: '/pages/lurukehu/lurukehu',
      })
        
      } else if (res.cancel) {
      console.log('用户点击取消')
      }
      }
      })
     

    
  }
  create() {
    var fanchaninfo = this.Base.getMyData().fanchaninfo;


    var kehu = this.Base.getMyData().kehu;
    var index = this.Base.getMyData().index;
    var shenfenzhen = this.Base.getMyData().shenfenzhen;
    var xianjudi = this.Base.getMyData().xianjudi;
    var zhenmian = this.Base.getMyData().zhenmian;
    var beimian = this.Base.getMyData().beimian;
    var huzhao = this.Base.getMyData().huzhao;
    var date = this.Base.getMyData().date;
    var huzhaoshouye = this.Base.getMyData().huzhaoshouye;
    var houseinfo = this.Base.getMyData().houseinfo;
    if (index == '') {
      this.Base.info('请选择客户');
      return
    }
    if (shenfenzhen == '') {
      this.Base.info('请输入身份证号');
      return
    }
    if (xianjudi == '') {
      this.Base.info('请输入现居住地');
      return
    }
    if (zhenmian == '') {
      this.Base.info('请上传身份证正面');
      return
    }
    if (beimian == '') {
      this.Base.info('请上传身份证背面');
      return
    }
    if (huzhao == '') {
      this.Base.info('请输入护照号');
      return
    }
    if (date == '') {
      this.Base.info('请输入护照有效期');
      return
    }
    if (huzhaoshouye == '') {
      this.Base.info('请上传护照首页');
      return
    }


    //return
    var api = new OrderApi();

    api.createorder({
      ordertype: 'A',
      houseproject_id: fanchaninfo.houseproject_id,
      fanchan_id: fanchaninfo.id,
      kehu_id: kehu[index].id,
      idnumber: shenfenzhen,
      juzhudi: xianjudi,
      fanmian: beimian,
      zhenmian: zhenmian,
      huzhaohao: huzhao,
      youxiaoqi: date,
      huzhaoshouye: huzhaoshouye,
      amount: houseinfo.dinjin
    }, (res) => {

      console.log(res);
      if (res.code == '0') {
           

        var api = new WechatApi();
           
         api.prepay1({id:res.return,openid:AppBase.UserInfo.openid},(payret)=>{

          payret.complete = function (e) {


            if (e.errMsg == "requestPayment:ok") {


            wx.navigateTo({
           url: '/pages/successfulpayment/successfulpayment?id=' + res.return,
       })

            }
            else {

              wx.navigateTo({
                url: '/pages/myorder/myorder?id=' + res.return,
            })

            }

          }
          console.log(payret);
          wx.requestPayment(payret)

         })
        

        // wx.navigateTo({
        //   url: '/pages/successfulpayment/successfulpayment?id=' + res.return,
        // })

      }

    })





  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindkehu = content.bindkehu;
body.shenfenzhen = content.shenfenzhen;
body.xianjudi = content.xianjudi;
body.huzhao = content.huzhao;
body.zhenmian = content.zhenmian;
body.beimian = content.beimian;
body.huzhaoshouye = content.huzhaoshouye;
body.bindDateChange = content.bindDateChange;
body.create = content.create;
body.tishi=content.tishi;
Page(body)