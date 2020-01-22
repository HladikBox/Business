import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ActivityApi } from "../../apis/activity.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { ApiUtil } from "../../apis/apiutil.js";
var WxParse = require('../../wxParse/wxParse');
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    // options.id=4;
    super.onLoad(options);

    this.Base.setMyData({
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom,
      indexcurrent: 0
    })
    
  }
  onMyShow() {
    var that = this;
    console.log("12313");
    this.getinfo();
  }
  setPageTitle(){

  }
  getinfo(){
    var that = this;
    var api = new ActivityApi;
    console.log(that.Base.options.id);
    api.activitydetail({ id: that.Base.options.id }, (detail) => {
      console.log(detail);
      that.getshoucaninfo();
      detail.content = ApiUtil.HtmlDecode(detail.content)
      detail.content = WxParse.wxParse('content', 'html', detail.content, that, 10);
      this.Base.setMyData({ detail: detail })
      
    })

  }
  getshoucaninfo(){
    var api = new MemberApi;
    var that = this;
    api.shoucanlist({ type: "A", member_id: that.Base.getMyData().memberinfo.id, activity_id: that.Base.options.id },(shoucan)=>{
      console.log(shoucan)
      if(shoucan.length>0){
        that.Base.setMyData({
          shoucan: true
        })
      }else {
        that.Base.setMyData({
          shoucan: false
        })
      }
    })
  }
  shoucan(){
    var that = this;
    var api = new MemberApi;
    var detail = this.Base.getMyData().detail;
    var shoucan = this.Base.getMyData().shoucan;
    console.log(detail);
    console.log(that.Base.getMyData().memberinfo.id);
    var json = {
      member_id: that.Base.getMyData().memberinfo.id,
      type: "A",
      activity_id: that.Base.options.id
    };
    if(shoucan){
      api.deleteshoucan(json,(ret)=>{
        console.log(ret);
        shoucan = !shoucan;
        that.Base.setMyData({
          shoucan: shoucan
        })
      })
    }else {
      
      api.addshoucan(json, (ret) => {
        console.log(ret);
        shoucan = !shoucan;
        that.Base.setMyData({
          shoucan: shoucan
        })
      })
    }
    
  }
  baomin(){
    var detail = this.Base.getMyData().detail;
    console.log(detail);
    detail.apply_endTime = detail.apply_endTime.replace(/-/g,'/');
    var date1 = new Date();

    var date2 = new Date(date1);
    date2.setDate(date1.getDate());

    var time2 = date2.getFullYear() + "/" + (date2.getMonth() + 1) + "/" + date2.getDate() + " ";

    var time = new Date(time2).getTime();
    var endtime = new Date(detail.apply_endTime).getTime();

    console.log(time2, time, 'time');
    console.log(detail.apply_endTime, endtime,'time2');

    if (time > endtime){
      wx.showToast({
        title: '活动报名已截止',
        icon: 'none'
      })
    }else {
      
      wx.navigateTo({
        url: '/pages/baoming/baoming?type=' + detail.activitytype_id_name + '&activity_id=' + detail.id + '&activity_free=' + detail.price,
      })
    }
      
    
  }
  downloadwenjian(e) {
    console.log(e.currentTarget.id);
    var url = e.currentTarget.id;
    wx.downloadFile({
      url: url, //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);

          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success: function (res) {
              console.log(res);
              var savedFilePath = res.savedFilePath;
              console.log('文件已下载到' + savedFilePath);
              // 查看下载的文件列表
              wx.getSavedFileList({
                success: function (res) {
                  console.log(res);
                }
              })
              // 打开文档
              wx.openDocument({
                filePath: savedFilePath,
                success: function (res) {
                  console.log('打开文档成功')
                }
              })
            }
          })
        }
      }
    })


  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.getinfo = content.getinfo;
body.shoucan = content.shoucan;
body.getshoucaninfo = content.getshoucaninfo;
body.baomin = content.baomin;
body.downloadwenjian = content.downloadwenjian;


Page(body)