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
  WechatApi
} from "../../apis/wechat.api.js";
import {
  OrderApi
} from "../../apis/order.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id = 5;
    super.onLoad(options);

    var id = this.Base.options.id;

    var api = new ProjectApi();
    api.info({
      id: id
    }, (yimininfo) => {
      this.Base.setMyData({
        yimininfo
      })
    })
    this.Base.setMyData({
      kehu_id: 0,
      kehuinfo: null,
      ziliao: [],
      xuqiu: ""
    })

  }
  onMyShow() {
    var that = this;
    var kehu_id = this.Base.getMyData().kehu_id;
    if (kehu_id > 0) {
      var memberApi = new MemberApi();
      memberApi.kehuinfo({
        id: kehu_id
      }, (kehuinfo) => {
        this.Base.setMyData({
          kehuinfo
        })
      });
    }
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
  create() {

    var kehu_id = this.Base.getMyData().kehu_id;
    if(kehu_id==0){
      this.Base.info("请选择客户信息");
      return;
    }
    var project_id = this.Base.options.id;
    var xuqiu = this.Base.getMyData().xuqiu;
    var ziliao = this.Base.getMyData().ziliao;
    var ziliao0name = ziliao[0] == undefined ? "" : ziliao[0].filename;
    var ziliao0file = ziliao[0] == undefined ? "" :ziliao[0].file;
    var ziliao1name = ziliao[1] == undefined ? "" : ziliao[1].filename;
    var ziliao1file = ziliao[1] == undefined ? "" :ziliao[1].file;
    var ziliao2name = ziliao[2] == undefined ? "" : ziliao[2].filename;
    var ziliao2file = ziliao[2] == undefined ? "" :ziliao[2].file;
    var ziliao3name = ziliao[3] == undefined ? "" : ziliao[3].filename;
    var ziliao3file = ziliao[3] == undefined ? "" :ziliao[3].file;
    var ziliao4name = ziliao[4] == undefined ? "" : ziliao[4].filename;
    var ziliao4file = ziliao[4] == undefined ? "" :ziliao[4].file;

    //return
    var api = new OrderApi();

    api.createorder({
      kehu_id,
      project_id,
      xuqiu,
      ziliao0file,
      ziliao0name,
      ziliao1file,
      ziliao1name,
      ziliao2file,
      ziliao2name,
      ziliao3file,
      ziliao3name,
      ziliao4file,
      ziliao4name
    }, (res) => {
      console.log(res);
      if (res.code == '0') {
        wx.navigateTo({
          url: '/pages/successfulpayment/successfulpayment?id=' + res.return,
        })
      }
    })
  }
  selectkehu() {
    wx.navigateTo({
      url: '/pages/mykehu/mykehu?select=1'
    })
  }
  uploadziliao() {
    var ziliao = this.Base.getMyData().ziliao;
    this.Base.uploadMessageFIle("project", (res) => {
      ziliao.push(res);
      console.log(ziliao);
      this.Base.setMyData({
        ziliao
      });
    })
  }
  deleteziliao(e) {
    this.Base.confirm
    var id = e.currentTarget.id;
    var oldziliao = this.Base.getMyData().ziliao;
    var ziliao = [];
    for (var i = 0; i < oldziliao.length; i++) {
      if (i != id) {
        ziliao.push(oldziliao[i]);
      }
    }
    this.Base.setMyData({
      ziliao
    });
  }
  xuqiu(e) {
    this.Base.setMyData({
      xuqiu: e.detail.value
    })
    console.log(e);
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
body.selectkehu = content.selectkehu;
body.uploadziliao = content.uploadziliao;
body.deleteziliao = content.deleteziliao;
body.xuqiu = content.xuqiu;
Page(body)