// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ZixunApi } from "../../apis/zixun.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { ApiUtil } from "../../apis/apiutil.js";
var WxParse = require('../../wxParse/wxParse');
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    // options.id=2;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    this.getinfo();
    this.getpinlun();
    this.Base.setMyData({
      aa: "", contents:''
    })
    this.getdian();
    setTimeout(()=>{
      if (this.Base.options.bb == '1') {
        this.Base.setMyData({
          inputShowed: true
        })
      }
    },500)
    
  }
  getdian() {

    var api = new MemberApi;
    var that = this;
    console.log(that.Base.getMyData().memberinfo.id)
    api.dianzanlist({
      member_id: that.Base.getMyData().memberinfo.id,
      pinglun_id:that.Base.options.id
    }, (dianlist) => {
      console.log(dianlist, 'dian');
      if (dianlist.length > 0) {
        that.Base.setMyData({
          dian: true
        })
      }else {
        that.Base.setMyData({
          dian: false
        })
      }

  

    })
  }
  getinfo(){
    var api = new ZixunApi;
    var that = this;
    api.zixundetail({id:this.Base.options.id},(detail)=>{
      console.log(detail);
      detail.content = ApiUtil.HtmlDecode(detail.content)
      WxParse.wxParse('content', 'html', detail.content, that, 10);
      
      that.Base.setMyData({detail});
    })
  }

  getpinlun(){
    var api = new MemberApi;
    var that = this;
    var arr=[];
    var huifu=[];
    api.pinglunlist({ pinglun_id: this.Base.options.id},(pinlunlist)=>{
      console.log(pinlunlist);
      for(var i=0;i<pinlunlist.length;i++){
        pinlunlist[i].pin_time = ApiUtil.TimeAgo(pinlunlist[i].pin_time_timespan);
        if (pinlunlist[i].reply_comment_id=="0"){
          arr.push(pinlunlist[i]);
        }else {
          huifu.push(pinlunlist[i]);
        }

      }
      console.log(arr, 'arr2');
      console.log(huifu, 'huifu');
      for(var k=0;k<arr.length;k++){
        arr[k].huifu1 = [];
        arr[k].huifu2 = [];
        arr[k].show=true
         for(var j=0;j<huifu.length;j++){
           if (arr[k].id == huifu[j].reply_comment_id){
            //  arr[k].huifu1.push(huifu[j]);
             arr[k].huifu2.push(huifu[j]);
           }
         }
        if (arr[k].huifu2.length>0){
          arr[k].huifu1.push(arr[k].huifu2[0]);
        }
      }

    
      that.Base.setMyData({
        pinlunlist:arr
      })
     
    })
  }
  check(item,arr){
    for(let aa of arr){
      if (item.id == aa.reply_comment_id){
        return aa
      }
    }
    return false
  }
  inputFn(e){
    this.Base.setMyData({
      contents: e.detail.value
    })
  }
  sendcontent(){
    var detail = this.Base.getMyData().detail;
    var contents = this.Base.getMyData().contents;
    var item = this.Base.getMyData().huifu1;
    console.log(contents);
    console.log(item,'huifu');
    var api = new MemberApi;
    var that = this;

    if(item!=undefined){
      var json ={
        pinglun_id: this.Base.options.id,
        member_id: this.Base.getMyData().memberinfo.id,
        content: contents,
        reply_member_id:item.member_id,
        reply_comment_id:item.id
      }
    }else {
      var json={
        pinglun_id: this.Base.options.id,
        member_id: this.Base.getMyData().memberinfo.id,
        content: contents,
      }
    }
    console.log(item,'item')
    api.addpinglun(json,(ret)=>{
      console.log(ret)
      if(ret.code == "0"){
        var zixunapi = new ZixunApi;
        zixunapi.pingnum({
          id: that.Base.options.id,
        },(ret)=>{
          console.log(ret)
          if(ret.code=='0') {
            that.Base.setMyData({
              contents: "", aa: "", huifu1:undefined,
              detail:detail
            })
            that.getpinlun();
            that.getinfo();
          }
        })
        
      }
    })
  }
  huifu(e){
    console.log(e);
    var item = e.currentTarget.dataset.current;
    this.Base.setMyData({
      aa:"回复"+item.member_id_name,huifu1:item
    })
  }

  dianzhan(e) {
    console.log(e)
    var cur = this.Base.options.id;
    var dian = this.Base.getMyData().dian;
    var api = new MemberApi;
    var that = this;
    var detail = this.Base.getMyData().detail;

    if (dian == false) {
      api.dianzhan({
        pinglun_id: cur,
        member_id: that.Base.getMyData().memberinfo.id
      }, (ret) => {
        console.log(ret)
        if (ret) {
          that.jiadian(cur);
          detail.dianzhan = Number(detail.dianzhan) +1;
          this.Base.setMyData({
            dian: true,
            detail:detail
          })
        }
      })
    } else {
      api.deletedianzhan({
        pinglun_id: cur,
        member_id: that.Base.getMyData().memberinfo.id
      }, (ret) => {
        console.log(ret)
        if (ret) {
          detail.dianzhan = Number(detail.dianzhan) - 1;
          that.jiandian(cur);
          this.Base.setMyData({
            dian: false,
            detail:detail
          })
        }
      })
    }


  }

  jiadian(id) {
    var api = new ZixunApi;
    api.dianzhan({
      id: id
    }, (ret) => {
      console.log(ret)
    })
  }

  jiandian(id) {
    var api = new ZixunApi;
    api.jiandian({
      id: id
    }, (ret) => {
      console.log(ret)
    })
  }

  onShareAppMessage(ops) {
    var that = this;
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    var api = new ZixunApi;
    api.zhuanfa({ id: that.Base.options.id }, (ret) => {
      console.log(ret)
    })
    return {
      title: '小程序',
      path: 'pages/zixundetail/zixundetail?id=' + that.Base.options.id, // 路径，传递参数到指定页面。
      // imageUrl: '../../imgs/xx.png', // 分享的封面图
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        

      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  }
  zhankai(e){
    console.log(e);
    var pinlist = this.Base.getMyData().pinlunlist;
    var pinlunId = e.currentTarget.dataset.current2.id;
    var item = e.currentTarget.dataset.current2;
    var cc = e.currentTarget.dataset.cc;
    if(cc=='zk'){
      for (var i = 0; i < pinlist.length; i++) {
        if (pinlist[i].id == pinlunId) {
          pinlist[i].show = false;
          pinlist[i].huifu1 = pinlist[i].huifu2;
        }
      }
    
    }else {
      for (var i = 0; i < pinlist.length; i++) {
        if (pinlist[i].id == pinlunId) {
          pinlist[i].show = true;
          pinlist[i].huifu1 = [];
          pinlist[i].huifu1.push(pinlist[i].huifu2[0]);
        }
      }
    }
    this.Base.setMyData({ pinlunlist: pinlist });
    console.log(pinlist);
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.getinfo = content.getinfo;
body.getpinlun = content.getpinlun;
body.inputFn = content.inputFn;
body.sendcontent = content.sendcontent;
body.huifu = content.huifu;
body.check = content.check;
body.getdian = content.getdian;
body.jiandian = content.jiandian;
body.jiadian = content.jiadian;
body.dianzhan = content.dianzhan;
body.onShareAppMessage = content.onShareAppMessage;
body.zhankai = content.zhankai;

Page(body)