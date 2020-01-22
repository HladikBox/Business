// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
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
    this.Base.setMyData({ shifou: ['是', '否'], name: '', dianhua: '', shixian: '', renshu: '', index1: '', shijian: '' })

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
  }
  bindshifou(e) {
    this.Base.setMyData({ index1: e.detail.value })
  }
  name(e) {
    this.Base.setMyData({ name: e.detail.value })

  }
  shouji(e) {
    this.Base.setMyData({ dianhua: e.detail.value })

  }
  shixian(e) {
    this.Base.setMyData({ shixian: e.detail.value })

  }
  renshu(e) {
    this.Base.setMyData({ renshu: e.detail.value })

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
  setPickerTime(val) {

    console.log(val);
    let data = val.detail;
    var startTime = data.startTime;
    console.log(startTime);

    var oldTime = (new Date(startTime)).getTime();
    console.log(oldTime);
    var curTime = this.format(new Date(oldTime), "yyyy/MM/dd HH:mm");
    console.log(curTime);
    this.setData({
      shijian: curTime,

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
  tijiao() {
    var name = this.Base.getMyData().name;
    var shouji = this.Base.getMyData().dianhua;
    var shixian = this.Base.getMyData().shixian;
    var renshu = this.Base.getMyData().renshu;
    var shifou = this.Base.getMyData().index1;
    var shijian = this.Base.getMyData().shijian;

    if (name == '') {
      this.Base.info("姓名不能为空");
      return
    }
    if (shouji == '') {
      this.Base.info("手机电话不能为空");
      return
    }
    if (shixian == '') {
      this.Base.info("处理事项不能为空");
      return
    }
    if (renshu == '') {
      this.Base.info("随行人数不能为空");
      return
    }
    if (shifou == '') {
      this.Base.info("请选择是否客户随同");
      return
    }
    if (shijian == '') {
      this.Base.info("请选择预约到访时间");
      return
    }
    var immigrantproject_id = this.Base.options.immigrantproject_id;
    var houseproject_id = this.Base.options.houseproject_id;
    var insuranceproject_id = this.Base.options.insuranceproject_id;

    if (immigrantproject_id == undefined) {
      immigrantproject_id = -1;
    }
    if (houseproject_id == undefined) {
      houseproject_id = -1;
    }
    if (insuranceproject_id == undefined) {
      insuranceproject_id = -1;
    }

    var json = {
      name: name, shouji: shouji, shixian: shixian, renshu: renshu, shifou: shifou, shijian: shijian,
      houseproject_id: houseproject_id, immigrantproject_id: immigrantproject_id, insuranceproject_id: insuranceproject_id
    }


    var api = new MemberApi();



    api.yuyuedaofan( json, (res) => {

   if(res.code==0)
   {

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
body.tijiao = content.tijiao;
Page(body)