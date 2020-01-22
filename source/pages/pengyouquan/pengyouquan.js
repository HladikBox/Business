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
    var tabs = [
      // { id: 1, name: "首页" },
      { id: 2, name: "谁看了我" },
      { id: 3, name: "我的关注" },
      { id: 4, name: "转载历史" },
      { id: 5, name: "智能分析" },
    ];
    var kanwo = [
      { id: 1, name: "全球" },
      { id: 2, name: "标签" },
      { id: 3, name: "来源" },
    ]
    this.Base.setMyData({ tabs, seq: 1, kanwo });
    this.getfriendinfo();
  }
  onMyShow() {
    var that = this;
    
  }
  getfriendinfo(){
    var api = new MemberApi;
    var that = this;
    api.friendlist({},(flist)=>{
      console.log(flist)
      that.Base.setMyData({
        list:flist
      })
    })
  }
  getlabel(type){
    console.log(type,'九分裤煞风景')
    var api = new MemberApi;
    var that = this;
    api.labellist({ type: type},(type)=>{
      console.log(type)
      type = type.sort(that.compare("seq"));
      that.Base.setMyData({
        type
      })
    })
  }
  getseeme(){
    var api = new MemberApi;
    var that = this;
    var type = "A";
    this.getlabel(type);
    api.seemelist({}, (flist) => {
      console.log(flist)
      for (var i = 0; i < flist.length;i++){
        flist[i].putime = that.changtime(flist[i].putime)
      }
      that.Base.setMyData({
        list: flist
      })
    })
  }
  gethistory(){
    var api = new MemberApi;
    var that = this;
    api.historylist({},(list)=>{
      that.Base.setMyData({
        list: list
      })
    })
  }
  getguanzhu(){
    var api = new MemberApi;
    var  that = this;
    var type = "B";
    this.getlabel(type);
   
  }
  switchnav(e){
    var cur = e.target.dataset.current;
    console.log(e);
    this.Base.setMyData({
      seq:cur
    })
    if(cur==2){
      this.getseeme();
    }else if(cur==4){
      this.gethistory();
    } else if (cur == 3) {
      this.getguanzhu();
    } else if (cur == 1) {
      this.getfriendinfo();
    }
  }
  compare(pro){
    return function(a,b){
      return a[pro]-b[pro];
    }
  }
  changtime(date) {
    date = (new Date(date)).getTime();
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var result = ""
    console.log(now)
    var diffValue = now - date;

    if (diffValue < 0) {
      return;
    }
    var minC = diffValue / minute;
    var hourC = diffValue / hour;
    var dayC = diffValue / day;
    var weekC = diffValue / week;
    var monthC = diffValue / month;
    if (monthC >= 1 && monthC <= 3) {
      result = " " + parseInt(monthC) + "月前"
    } else if (weekC >= 1 && weekC <= 3) {
      result = " " + parseInt(weekC) + "周前"
    } else if (dayC >= 1 && dayC <= 6) {
      result = " " + parseInt(dayC) + "天前"
    } else if (hourC >= 1 && hourC <= 23) {
      result = " " + parseInt(hourC) + "小时前"
    } else if (minC >= 1 && minC <= 59) {
      result = " " + parseInt(minC) + "分钟前"
    } else if (diffValue >= 0 && diffValue <= minute) {
      result = "刚刚"
    } else {
      var datetime = new Date();
      datetime.setTime(date);
      var Nyear = datetime.getFullYear();
      var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
      var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
      var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
      result = Nyear + "-" + Nmonth + "-" + Ndate
    }
    return result;

  }
  zhuan(e){
    console.log(e);
    var item = e.currentTarget.dataset.current;
    if (item.share_value=="N"){
      wx.navigateTo({
        url: '/pages/zhuanwenzhan/zhuanwenzhan',
      })
    }
  }
  detail(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/friendwenzhan/friendwenzhan?id='+id,
    })
   
  }
  kandetail(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/shuikanlewo/shuikanlewo?id=' + id,
    })
  }
  guanzhu(){
    
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.switchnav = content.switchnav;
body.getfriendinfo = content.getfriendinfo;
body.getseeme = content.getseeme;
body.changtime = content.changtime;
body.getlabel = content.getlabel;
body.gethistory = content.gethistory;
body.getguanzhu = content.getguanzhu;
body.compare = content.compare;
body.zhuan = content.zhuan;
body.detail = content.detail;
body.kandetail = content.kandetail;
body.guanzhu = content.guanzhu;

Page(body)