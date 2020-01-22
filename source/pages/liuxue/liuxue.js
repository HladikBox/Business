// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { LiuxueApi } from '../../apis/liuxue.api';
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
      list: [],
      kclist: [],
      tc: false,
    })

  }
  onMyShow() {
    var that = this;

  }



  formSubmit(e) {
    console.log(e.detail.value);
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var sqr = e.detail.value.sqr;
    var nianling = e.detail.value.nianling;
    var jiaoyu = e.detail.value.jiaoyu;
    var guojia = e.detail.value.guojia;
    var xuexiao = e.detail.value.xuexiao;
    var yuyan = e.detail.value.yuyan;
    var uptime = util.formatTime(new Date());
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    //console.log(leixing);
    //console.log(name);
    if (name == null || name == '') {
      wx.showToast({
        title: '请输入姓名',
        duration: 2000,
        icon: 'none'
      })
    } else if (phone == null || phone == '') {
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
    } else if (sqr == null || sqr == '') {
      wx.showToast({
        title: '请输入申请人姓名',
        duration: 2000,
        icon: 'none'
      })
    } else if (nianling == null || nianling == '') {
      wx.showToast({
        title: '请输入申请人年龄',
        duration: 2000,
        icon: 'none'
      })

    } else if (jiaoyu == null || jiaoyu == '') {
      wx.showToast({
        title: '请输入教育程度',
        duration: 2000,
        icon: 'none'
      })

    } else if (guojia == null || guojia == '') {
      wx.showToast({
        title: '请填写意向国家',
        duration: 2000,
        icon: 'none'
      })

    } else if (xuexiao == null || xuexiao == '') {
      wx.showToast({
        title: '请填写意向学校',
        duration: 2000,
        icon: 'none'
      })

    } else if (yuyan == null || yuyan  == '') {
      wx.showToast({
        title: '请填写外语水平',
        duration: 2000,
        icon: 'none'
      })

    } else {
      var liuxueApi = new LiuxueApi();
      liuxueApi.liuxue({
        'name': name,
        'phone': phone,
        'guojia': guojia,
        'chengshi': chengshi,
        'renshu': renshu,
        'xingcheng': xingcheng,
        'yaoqiu': yaoqiu,
        'status': 'B',
        'uptime': uptime
      }, (ret) => {
        console.log(ret);
      });


    }


  }

}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.formSubmit = content.formSubmit;


Page(body)