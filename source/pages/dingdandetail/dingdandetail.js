import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ActivityApi } from "../../apis/activity.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { WechatApi } from "../../apis/wechat.api.js";
var WxParse = require('../../wxParse/wxParse');
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    // options.id=5;
    super.onLoad(options);

    

    this.Base.setMyData({
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom,
      indexcurrent: 0,
    })
   
  
  }
  onMyShow() {
    var that = this;
    console.log("12313");
    var quxiao = 'A';

    // var data = JSON.parse(this.Base.options.data);
 

    // this.Base.setMyData({
    //  data:data
    // });
    this.getbao();
    
  
    // console.log(data,'data')
  }
 
  getinfo(id) {
    var that = this;
    var api = new ActivityApi;
    var data = this.Base.getMyData().data;
    api.activitydetail({ id: id }, (detail) => {
      console.log(detail);
      
      detail.content = WxParse.wxParse('content', 'html', detail.content, that, 10);
      this.Base.setMyData({ detail: detail })

    })

  }
 
  getbao(){
    var data = this.Base.getMyData().data;
    var api = new ActivityApi;
    api.baomindetail({ id: this.Base.options.id},(baomingxinfo)=>{
      console.log(baomingxinfo,'baomimginfo')
        if (baomingxinfo.baostatus == 'B') {
          this.Base.setMyData({
            quxiao: 'B'
          })
        } else if (baomingxinfo.baostatus == 'A') {
          this.Base.setMyData({
            quxiao: 'A'
          })
        } else if (baomingxinfo.baostatus == 'C') {
          this.Base.setMyData({
            quxiao: 'C'
          })
        }
      this.Base.setMyData({ baomingxinfo})
      this.getinfo(baomingxinfo.activity_id);
    })
  }

  baomin() {
    var that =this;
    var api = new ActivityApi;
    var detail = this.Base.getMyData().detail;
    var data = this.Base.getMyData().data;
    console.log(detail);
    var quxiao = this.Base.getMyData().quxiao;
    var nowtime = (new Date()).getTime();
    console.log(data,'data')
    var endtime = new Date(detail.apply_endTime).getTime();
    console.log(endtime)
    if(endtime-nowtime>24*60*60*1000){
      wx.showModal({
        title: '提示',
        content: '是否要取消报名',
        confirmText: "是",
        success: function (res) {
          if (res.confirm) {
            
            api.updatestatus({id:data.id,orderno:data.orderno},(ret)=>{
              console.log(ret);
              if(ret){
                that.Base.setMyData({
                  quxiao: 'B'
                })
              }
            }) 

          

          } else {

          }
        }
      })

    }else {
      wx.showToast({
        title: '活动即将开始，不能取消报名',
        icon: 'none'
      })
    }
    
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.getinfo = content.getinfo;
body.baomin = content.baomin;
body.getbao = content.getbao;


Page(body)