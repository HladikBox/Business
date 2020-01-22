// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { QiandanApi } from '../../apis/qiandan.api';
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
    var guojia = e.detail.value.guojia;
    var chengshi = e.detail.value.chengshi;
    var renshu = e.detail.value.renshu;
    var xingcheng = e.detail.value.xingcheng;
    var yaoqiu = e.detail.value.yaoqiu;
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
    } else if (guojia == null || guojia == '') {
      wx.showToast({
        title: '请输入陪同国家',
        duration: 2000,
        icon: 'none'
      })
    } else if (chengshi == null || chengshi == '') {
      wx.showToast({
        title: '请输入陪同城市',
        duration: 2000,
        icon: 'none'
      })

    } else if (renshu == null || renshu == '') {
      wx.showToast({
        title: '请输入陪同人数',
        duration: 2000,
        icon: 'none'
      })

    } else if (xingcheng == null || xingcheng == '') {
      wx.showToast({
        title: '请填写您的行程安排',
        duration: 2000,
        icon: 'none'
      })

    } else if (yaoqiu == null || yaoqiu == '') {
      wx.showToast({
        title: '请填写您的陪同要求',
        duration: 2000,
        icon: 'none'
      })

    } else {
      var qiandanApi = new QiandanApi();
      qiandanApi.qiandan({
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