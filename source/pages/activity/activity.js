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
    // this.Base.setMyData({
    //   tabs:4
    // });

    this.Base.setMyData({
      aa: 5, cc: 0,seq:0
    });

  }
  onMyShow() {
    var that = this;
    console.log("12313");
  
    var aa = this.Base.getMyData().aa;
    var cc = this.Base.getMyData().cc;
    console.log(aa,cc,'lll')
    this.Base.setMyData({
      aa: aa,  cc:cc
    });
    this.gettype();
    this.getpaixun();
  }
  getpaixun(){
    var api = new ActivityApi;
    var that = this
    api.selectlist({},(bb)=>{
      bb.unshift({
        id: 0,
        seq: 0,
        name: '全部',
      })
      bb = bb.sort(that.compare("seq"));
      this.Base.setMyData({
        bb:bb
      })
    })  
  }
  compare(pro){
    return function(a,b){
      return a[pro]-b[pro]
    }
  }
  gettype(){
    var api = new ActivityApi;
    var that = this


    wx.getStorage({
      key: 'types',
      success: function (res) {
        that.setData({
          types: res.data
        })
      },
      fail: function (res) {
        that.setData({
          // number: res.data
        })
      }

    })

    api.activitytype({},(type) => {
      console.log(type);
      type.unshift({
        id:0,
        name:"全部"
      })
      var seq = this.Base.getMyData().seq;
      var name = that.Base.getMyData().types;
      console.log(name)
      if (name){
        for(var i=0;i<type.length;i++){
          if (type[i].name == name){
            seq = i
            this.getcont(type[i].id);
          }
        }
      }else {
        for (var i = 0; i < type.length; i++) {
          if (i== seq) {
            seq = i
            this.getcont(type[i].id);
          }
        }
        // this.getcont(0);
      }
      this.Base.setMyData({
        activitytype: type, seq:seq
      })
    })

   

  }


  deletes(){
    var that = this;
    wx.removeStorage({
      key: 'types',
      success: function (res) {
        that.setData({
          types: ""
        })
      },
    })
  }

  getcont(atype){
    var api = new ActivityApi;

    api.activitylist({ activitytype_id:atype}, (list) => {
      console.log(list)
      for(var i=0;i<list.length;i++){
        list[i].timespan = new Date(list[i].activitytime).getTime();
      }
      list = list.sort(this.compare('activitytime_timespan'));
      this.Base.setMyData({
        list: list,temp:list
      })
    })
  }
  compare2(pro){
    return function(a,b){
      return b[pro]-a[pro]
    }
  }
  switchnav(e){
    console.log(e)
    if(this.Base.getMyData().types!=undefined){
      this.deletes();
    }
    var cur = e.target.dataset.current;
    var curID = e.target.dataset.currentid;

    this.setData({
      seq: cur,cc:0
    })

    this.getcont(curID)

  }
  
  xuanzhong(e){
    console.log(e);
    var days = e.currentTarget.dataset.current;
    var ids = e.currentTarget.dataset.currentid;
    
    console.log(days,ids);
    this.Base.setMyData({
      cc:ids,aa:5
    })

    if(ids==0){
      var list = this.Base.getMyData().temp;
     
      this.Base.setMyData({
        list: list
      })
    }else {
 
    var date1 = new Date();
   
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + Number(days));

    var time2 = date2.getFullYear() + "/" + (date2.getMonth() + 1) + "/" + date2.getDate() + " ";
 
    var time1 = new Date(time2).getTime();
    var today = date1.getTime();

      var list = this.Base.getMyData().temp;
      var arr = [];
      
      for (var i = 0; i < list.length; i++) {
        if (list[i].timespan <= time1 && list[i].timespan >= today) {
          arr.push(list[i]);
        }
      }
      this.Base.setMyData({
        list: arr
      })
    }

  }


  gettypeinfo(cur){
    var api = new ActivityApi;
    api.activitylist({ activitytype_id: cur }, (list) => {
      console.log(list)
      this.Base.setMyData({
        list: list
      })
    })
  }
  
  detail(e){
    console.log(e);
    // var id = e.target.dataset.current;
    wx.navigateTo({
      url: '/pages/activitydetail/activitydetail?id=' + e.currentTarget.dataset.current,
    })
  }

  search(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.gettype = content.gettype;
body.switchnav = content.switchnav;
body.getcont = content.getcont;
body.gettypeinfo = content.gettypeinfo;
body.detail = content.detail;
body.search = content.search;
body.deletes = content.deletes;
body.xuanzhong = content.xuanzhong;
body.compare = content.compare;
body.compare2 = content.compare2;
body.getpaixun = content.getpaixun;
body.fun_date = content.fun_date;
body.getjj = content.getjj;

Page(body)