// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ shifou: ['是', '否'], })

    this.Base.setMyData({
      isPickerRender: false,
      isPickerShow: false,
      pickerConfig: {
        endDate: false,
        column: "minute",
        dateLimit: true,
        limitEndTime: "2055/05/06 12:32:44"
      }
    })
  }
  onMyShow() {
    var that = this;

    var api = new MemberApi();
    api.yuyueinfo({ id: this.Base.options.id }, (yuyueinfo) => {
      if(yuyueinfo.Insuranceproject_id>0)
      {
        yuyueinfo.asdasd=yuyueinfo.Insuranceproject_id_name;
      }
      if(yuyueinfo.houseproject_id>0)
      {
        yuyueinfo.asdasd=yuyueinfo.houseproject_id_name;
      }
      if(yuyueinfo.immigrantproject_id>0)
      {
        yuyueinfo.asdasd=yuyueinfo.immigrantproject_id_name;
      }
      this.Base.setMyData({ yuyueinfo });
    })


  }
  bindshifou(e) {

    var yuyueinfo = this.Base.getMyData().yuyueinfo;
    yuyueinfo.shifou = e.detail.value;
    yuyueinfo.shifou_name = e.detail.value == 0 ? '是' : '否';
    this.Base.setMyData({ yuyueinfo })


  }
  name(e) {
    var yuyueinfo = this.Base.getMyData().yuyueinfo;
    yuyueinfo.name = e.detail.value;

    this.Base.setMyData({ yuyueinfo })

  }
  shouji(e) {
    var yuyueinfo = this.Base.getMyData().yuyueinfo;
    yuyueinfo.shouji = e.detail.value;

    this.Base.setMyData({ yuyueinfo })

  }
  shixian(e) {
    var yuyueinfo = this.Base.getMyData().yuyueinfo;
    yuyueinfo.shixian = e.detail.value;

    this.Base.setMyData({ yuyueinfo })

  }
  renshu(e) {
    var yuyueinfo = this.Base.getMyData().yuyueinfo;
    yuyueinfo.renshu = e.detail.value;

    this.Base.setMyData({ yuyueinfo })

  }
  pickerShow() {
    console.log(123132);
    this.Base.setMyData({
      isPickerShow: true,
      isPickerRender: true,
      chartHide: true
    });
  }
  pickerHide() {
    this.Base.setMyData({
      isPickerShow: false,
      chartHide: false
    })


  }
  setPickerTime(val) {

    console.log(val);
    let data = val.detail;
    var startTime = data.startTime;
    console.log(startTime);

    var oldTime = (new Date(startTime)).getTime();
    console.log(oldTime);
    var curTime = this.format(new Date(oldTime), "yyyy-MM-dd HH:mm");
    console.log(curTime);

    var yuyueinfo = this.Base.getMyData().yuyueinfo;
    yuyueinfo.shijian = curTime;
    yuyueinfo.shijian_formatting = curTime;
    this.setData({
      yuyueinfo

    });
  }
  format(time, format) {

    var t = new Date(time);
    var tf = function (i) { return (i < 10 ? '0' : '') + i };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
          break;
        case 'MM':
          return tf(t.getMonth() + 1);
          break;
        case 'mm':
          return tf(t.getMinutes());
          break;
        case 'dd':
          return tf(t.getDate());
          break;
        case 'HH':
          return tf(t.getHours());
          break;
        case 'ss':
          return tf(t.getSeconds());
          break;
      };
    });
  }
  bindPickerChange(e) {
    this.getData(this.data.sensorList[e.detail.value].id);
    // let startDate = util.formatTime(new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 7));
    // let endDate = util.formatTime(new Date());
    this.setData({
      index: e.detail.value,
      sensorId: this.data.sensorList[e.detail.value].id
      // startDate,
      // endDate
    });


  }
  quxiao() {
    var that = this;
    var api = new MemberApi();

    wx.showModal({
      title: '提示',
      content: '确认是否取消',
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          api.quxiaoyuyue({ id: that.Base.options.id }, () => {

            wx.navigateBack({

            })


          })
        } else {

        }
      }
    })

  }
  xiugai() {
   var api=new MemberApi();
    var yuyueinfo=this.Base.getMyData().yuyueinfo;

    var json = {
      name: yuyueinfo.name, shouji: yuyueinfo.shouji, shixian: yuyueinfo.shixian, renshu: yuyueinfo.renshu, shifou: yuyueinfo.shifou, shijian: yuyueinfo.shijian,
      houseproject_id: yuyueinfo.houseproject_id, immigrantproject_id: yuyueinfo.immigrantproject_id, insuranceproject_id: yuyueinfo.insuranceproject_id, primary_id: yuyueinfo.id
    }

    api.yuyuedaofan(json, (res) => {

      if (res.code == 0) {

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
body.bindshifou = content.bindshifou;
body.name = content.name;
body.shouji = content.shouji;
body.shixian = content.shixian;
body.renshu = content.renshu;
body.pickerShow = content.pickerShow;
body.pickerHide = content.pickerHide;
body.setPickerTime = content.setPickerTime;
body.bindPickerChange = content.bindPickerChange;
body.format = content.format;
body.quxiao = content.quxiao;
body.xiugai = content.xiugai;
Page(body)