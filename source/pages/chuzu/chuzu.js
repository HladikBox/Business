// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { HtupApi } from '../../apis/htup.api';
var util = require('../../utils/util.js');

class Content extends AppBase {
  constructor() {
    super();
  } 
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    //图片上传初始化
    this.Base.setMyData({
      currentItemId: 2,
      show: 1,
      region: [],
      jgimages: [],
      htimages: [],
      skimages: [],
      htimgs:[],
      list: [],
      kclist: [],
      tc: false
    })

  }
  onMyShow() {
    var that = this;
  }

  // 图片上传调用

  htuploadimg() {
    var that = this;
    this.Base.uploadImage("hetong", (ret) => {
      var htimages = that.Base.getMyData().htimages;
      htimages.push(ret);
      that.Base.setMyData({
        htimages
      });
    }, 9, undefined);
  }

  htminusImg(e) {
    var that = this;
    var seq = e.currentTarget.id;
    var htimages = that.Base.getMyData().htimages;
    var htimgs = [];
    for (var i = 0; i < htimages.length; i++) {
      if (seq != i) {
        htimgs.push(htimages[i]);
      }
    }
    that.Base.setMyData({
      htimages: htimgs
    });
  }

  formSubmit(e) {
    console.log(e.detail.value);
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var addr = e.detail.value.addr;
    var homeaddr = e.detail.value.homeaddr;
    var price = e.detail.value.price;
    var htimgs = this.Base.getMyData().htimages;
    var uptime = util.formatTime(new Date());
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    //console.log(uptime);
    //console.log(name);
    if (name == null || name == '') {
      wx.showToast({
        title: '请输入姓名',
        duration: 2000,
        icon: 'none'
      })
    } else if (phone == null || phone == '' ) {
      wx.showToast({
        title: '请输入手机号码',
        duration: 2000,
        icon: 'none'
      })
    } else if (!myreg.test(phone)) {
      wx.showToast({
        title: '请输入正确手机号码',
        duration: 2000,
        icon: 'none'
      })
    }     else if (addr == null || addr == '') {
      wx.showToast({
        title: '请输入联系地址',
        duration: 2000,
        icon: 'none'
      })
    } else if (homeaddr == null || homeaddr == '') {
      wx.showToast({
        title: '请输入楼盘地址',
        duration: 2000,
        icon: 'none'
      })
    } else if (price == null || price == '') {
      wx.showToast({
        title: '请输入预期租金',
        duration: 2000,
        icon: 'none'
      })
    } else {

      var htupApi=new HtupApi();
      htupApi.htup({
        'name': name,
        'phone': phone,
        'addr': addr,
        'homeaddr': homeaddr,
        'price': price,
        'status':'B',
        'htimgs': htimgs.join(","),
        'uptime': uptime
      },(ret)=>{
        console.log(ret);
      });
    





    }














  }



}







var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.htuploadimg = content.htuploadimg;
body.htminusImg = content.htminusImg;
body.formSubmit = content.formSubmit;


Page(body)