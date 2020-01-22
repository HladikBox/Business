// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { JiejiApi } from '../../apis/jieji.api';
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
      jiedate: "年-月-日",
      songdate: '年-月-日',
      jietime: '时-分',
      songtime: '时-分',
      region: [],
      jgimages: [],
      htimages: [],
      skimages: [],
      htimgs: [],
      list: [],
      kclist: [],
      tc: false,
    })

  }
  onMyShow() {
    var that = this;
  }

  //日期选择
  jieDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      jiedate: e.detail.value
    })
  }
  songDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      songdate: e.detail.value
    })
  }
//时间选择
  jieTimeChange(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      jietime: e.detail.value
    })
  }

  songTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      songtime: e.detail.value
    })
  }


  formSubmit(e) {
   
    
    console.log(e.detail.value);
    var jiedate = e.detail.value.jiedate;
    var jietime = e.detail.value.jietime;
    var songdate = e.detail.value.songdate;
    var songtime = e.detail.value.songtime;
    console.log(jiedate);
    console.log(jietime);
    console.log(songdate);
    console.log(songtime);
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var jiehao = e.detail.value.jiehao;
    var jiedatetime = e.detail.value.jiedate +"  " + e.detail.value.jietime
    console.log(jiedatetime);
    var songhao = e.detail.value.songhao;
    var songdatetime = e.detail.value.songdate + e.detail.value.songtime ;
    var renshu = e.detail.value.renshu;
    var xingli = e.detail.value.xingli;
    var gwphone = e.detail.value.gwphone;
    var weixin = e.detail.value.weixin;
    var yinger = e.detail.value.yinger;
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
    } else if (jiedatetime == null || jiehao == '') {
      wx.showToast({
        title: '请输入接机航班号',
        duration: 2000,
        icon: 'none'
      })
    } else if (jiedate == null || jiedate === "年-月-日") {
      wx.showToast({
        title: '请选择接机日期',
        duration: 2000,
        icon: 'none'
      })
    }  else if (jietime == null || jietime === "时-分") {
      wx.showToast({
        title: '请选择接机时间',
        duration: 2000,
        icon: 'none'
      })
    }  else if (songhao == null || songhao == '') {
      wx.showToast({
        title: '请输入送机航班号',
        duration: 2000,
        icon: 'none'
      })
    } else if (songdate == null || songdate === '年-月-日') {
      wx.showToast({
        title: '请选择送机具体日期',
        duration: 2000,
        icon: 'none'
      })
    } else if (songtime == null || songtime === '时-分') {
      wx.showToast({
        title: '请选择送机具体时间',
        duration: 2000,
        icon: 'none'
      })
    } else if (renshu == null || renshu == '') {
      wx.showToast({
        title: '请填写出行人数',
        duration: 2000,
        icon: 'none'
      })

    } else if (xingli == null || xingli == '') {
      wx.showToast({
        title: '请输入行李数',
        duration: 2000,
        icon: 'none'
      })

    } else if (gwphone == null || gwphone == '') {
      wx.showToast({
        title: '请输入国外电话',
        duration: 2000,
        icon: 'none'
      })

    } else if (weixin == null || weixin == "") {
      wx.showToast({
        title: '请填写微信号',
        duration: 2000,
        icon: 'none'
      })

    } else if (yinger == null || yinger == "") {
      wx.showToast({
        title: '请填写是否有婴儿 ',
        duration: 2000,
        icon: 'none'
      })

    } else {
      var jiejiApi = new JiejiApi();
      jiejiApi.jieji({
        'name': name,
        'phone': phone,
        'jiehao': jiehao,
        'jiedatetime': jiedatetime,
        'songhao': songhao,
        'songdatetime': songdatetime,
        'renshu': renshu,
        'xingli': xingli,
        'gwphone': gwphone,
        'weixin': weixin,
        'yinger': yinger,
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
body.jieDateChange = content.jieDateChange;
body.songDateChange = content.songDateChange;
body.jieTimeChange = content.jieTimeChange;
body.songTimeChange = content.songTimeChange;
body.formSubmit = content.formSubmit;


Page(body)