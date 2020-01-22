// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { JipiaoApi } from '../../apis/jipiao.api';
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
      date: '年-月-日',
      region: [],
      jgimages: [],
      htimages: [],
      skimages: [],
      htimgs: [],
      list: [],
      kclist: [],
      tc: false,
      qzlx: [
        { name: '商务签证', value: '商务签证' },
        { name: '旅游签证', value: '旅游签证' }
      ]

    })

  }
  onMyShow() {
    var that = this;
    // var riqi = util.formatTime(new Date());
    // var date = riqi;
  }

  //日期选择
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
   this.setData({
     date: e.detail.value
  })
}


  formSubmit(e) {
    console.log(e.detail.value);
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var zhengjianhao = e.detail.value.zhengjianhao;
    var riqi = e.detail.value.riqi;
    var guojia = e.detail.value.guojia;
    var chengshi = e.detail.value.chengshi;
    var xingcheng = e.detail.value.xingcheng;
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
    } else if (zhengjianhao == null || zhengjianhao == '') {
      wx.showToast({
        title: '请输入证件号',
        duration: 2000,
        icon: 'none'
      })
    } else if (riqi == null || riqi == '') {
      wx.showToast({
        title: '请选出行时间',
        duration: 2000,
        icon: 'none'
      })
      
    } else if (guojia == null || guojia == '') {
      wx.showToast({
        title: '请输入出行国家',
        duration: 2000,
        icon: 'none'
      })

    } else if (chengshi == null || chengshi == '') {
      wx.showToast({
        title: '请输入出行国家的城市',
        duration: 2000,
        icon: 'none'
      })

    } else if (xingcheng == null || xingcheng == '') {
      wx.showToast({
        title: '请填写您的行程安排',
        duration: 2000,
        icon: 'none'
      })

    }  else {
      var jipiaoApi = new JipiaoApi();
      jipiaoApi.jipiao({
        'name': name,
        'phone': phone,
        'zhengjianhao': zhengjianhao,
        'riqi': riqi,
        'guojia': guojia,
        'chengshi': chengshi,
        'xingcheng': xingcheng,
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
body.htuploadimg = content.htuploadimg;
body.htminusImg = content.htminusImg;
body.bindDateChange = content.bindDateChange;
body.formSubmit = content.formSubmit;


Page(body)