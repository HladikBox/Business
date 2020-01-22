// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { ProjectApi } from "../../apis/project.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      seq:0,ftype:'B'
    })
  }
  onMyShow() {
    var that = this;
    
    
    
    var type=[
      { seq: 0, name: "海外房产" },
      { seq: 1, name: "海外移民" },
      { seq: 2, name: "海外保险" },
      { seq: 3, name: "活   动"},
     ];

     var sua = [
       { id: 0, name: "全球" },
       { id: 1, name: "总价" },
       { id: 2, name: "房型" },
       { id: 3, name: "排序" }
     ];
     var seq = this.Base.getMyData().seq;
    var ftype = this.Base.getMyData().ftype;
    console.log(ftype,'ftype')
    this.Base.setMyData({
      type: type, seq: seq,sua:sua
    })

    this.getinfo(ftype);

  }
  getinfo(type){
    var api = new MemberApi;
    var api2 = new ProjectApi;
    var that = this;
    console.log(this.Base.getMyData().memberinfo.id, ';;;;')
    api.shoucanlist({ member_id: that.Base.getMyData().memberinfo.id,type:type},(list)=>{
      console.log(list);
      that.Base.setMyData({
        list:list
      })
      
    })
  }
  switchnav(e){
    console.log(e);
    var cur = e.target.dataset.current;
   
    if(cur==0){
      var type = 'B';
      this.getinfo(type);
    }else if(cur==1){
      var type = 'C';
      this.getinfo(type);
    } else if (cur == 2) {
      var type = 'D';
      this.getinfo(type);
    } else if (cur == 3) {
      var type = 'A';
      this.getinfo(type);
    }
    this.Base.setMyData({
      ftype: type, seq: cur
    })
  }
  acdetail(e){
    console.log(e);
    // var id = e.target.dataset.current;
    wx.navigateTo({
      url: '/pages/activitydetail/activitydetail?id=' + e.currentTarget.dataset.current,
    })
  }
  fcdetail(e){
    wx.navigateTo({
      url: '/pages/productinfo/productinfo?id=' + e.currentTarget.dataset.current,
    })
  }
  ymdetail(e){
    wx.navigateTo({
      url: '/pages/yimininfo/yimininfo?id=' + e.currentTarget.dataset.current,
    })
  }
  bxdetail(e){
    wx.navigateTo({
      url: '/pages/baoxianinfo/baoxianinfo?id=' + e.currentTarget.dataset.current,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.getinfo = content.getinfo;
body.switchnav = content.switchnav;
body.acdetail = content.acdetail;
body.fcdetail = content.fcdetail;
body.ymdetail = content.ymdetail;
body.bxdetail = content.bxdetail;

Page(body)