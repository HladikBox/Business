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
    var leixin = ['房产项目', '移民项目', '保险项目'];
    var shifou = ['是', '否'];

    var kehu = this.Base.options.id == 0 ? '自有客户' : '平台客户';

    this.Base.setMyData({
      name: '',
      shouji: '',
      weixin: '',
      youxian: '',
      leixin: leixin,
      shifou: shifou,
      jianyi: '',
      kehu: kehu,
      index1:0

    })
  }
  onMyShow() {
    var that = this;
  }
  name(e) {
    this.Base.setMyData({
      name: e.detail.value
    })
  }
  shouji(e) {
    this.Base.setMyData({
      shouji: e.detail.value
    })
  }
  weixin(e) {
    this.Base.setMyData({
      weixin: e.detail.value
    })
  }
  youxian(e) {
    this.Base.setMyData({
      youxian: e.detail.value
    })
  }
  jianyi(e) {
    this.Base.setMyData({
      jianyi: e.detail.value
    })
  }
  bindleixin(e) {

    console.log(e);
    this.Base.setMyData({
      index: e.detail.value
    })


  }
  bindshifou(e) {

    console.log(e);
    this.Base.setMyData({
      index1: e.detail.value
    })


  }
  tijiao() {
    var name = this.Base.getMyData().name;
    var shouji = this.Base.getMyData().shouji;
    var weixin = this.Base.getMyData().weixin;
    var youxian = this.Base.getMyData().youxian;
    var index = this.Base.getMyData().index;
    var kehu = this.Base.options.id;
    var beizhu = this.Base.getMyData().beizhu;
    var index1 = this.Base.getMyData().index1;

    if (name == '') {
      this.Base.info("请输入姓名");
      return
    }
    if (shouji == '') {
      this.Base.info("请输入手机");
      return
    }
    if (weixin == '') {
      this.Base.info("请输入微信");
      return
    }
    // if (youxian == '') {
    //   this.Base.info("请输入邮箱");
    //   return
    // }
    if (index == undefined) {
      this.Base.info("请选择项目类型");
      return
    }
    if (index1 == undefined) {
      this.Base.info("请选择销售协作");
      return
    }

    var api = new MemberApi();

    api.addkehu({ name: name, shouji: shouji, weixin: weixin, youxian: youxian, leixin: index, beizhu: beizhu, shifou: index1, kehuleixin: kehu }, (res) => {
          
          console.log(res);

      if (res.code =="0") {
        wx.navigateBack({

        })

      }

    })





  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.name = content.name;
body.shouji = content.shouji;
body.weixin = content.weixin;
body.youxian = content.youxian;
body.jianyi = content.jianyi;
body.bindleixin = content.bindleixin;
body.bindshifou = content.bindshifou;
body.tijiao = content.tijiao;
Page(body)