// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ActivityApi } from "../../apis/activity.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      seq: 0,type:'A'
    })
  }
  onMyShow() {
    var that = this;
    var aa = [
      { id: 0, name: "已报名" },
      { id: 1, name: "已结束" },
      { id: 2, name: "已取消" },
    ];
    var seq = this.Base.getMyData().seq;
    var type = this.Base.getMyData().type;
    this.Base.setMyData({
      aa: aa, seq: seq,list:[]
    });
    // var type = 'A';
    this.getinfo(type);
  }
  getinfo(type){
    var api = new ActivityApi;
    var that = this;
    var arr = [];
    var len = 0;
    console.log(that.Base.getMyData().memberinfo.id);
    api.baominglist({ member_id: that.Base.getMyData().memberinfo.id, baostatus:type},(list)=>{
      for(var i=0;i<list.length;i++){
        list[i].baotime_dateformat = that.changtime(list[i].baotime_dateformat);
      }
      this.Base.setMyData({
        list
      })
      
    })
  }

  changtime(date){
    date = date.replace(/-/g,'.');
    return date
  }
  switchnav(e){
    console.log(e);
    var cur = e.currentTarget.dataset.current;
    var name = e.currentTarget.dataset.currentname;
    var type = ''
    if(name=='已报名'){
      type = 'A';
      this.getinfo(type);
    } else if (name == '已结束') {
      type = 'C';
      this.getinfo(type);
    } else if (name == '已取消') {
      type = 'B';
      this.getinfo(type);
    }
    this.Base.setMyData({
      seq:cur,type:type
    })
  }
  tiaozhuan(e){
    var item = e.currentTarget.dataset.current;
    console.log(item);
    wx.navigateTo({
      url: '/pages/dingdandetail/dingdandetail?id=' + item.id,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.switchnav = content.switchnav;
body.getinfo = content.getinfo;
body.changtime = content.changtime;
body.tiaozhuan = content.tiaozhuan;

Page(body)