// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  ProjectApi
} from "../../apis/project.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ tab: 0,list1:[],fanchanlist1:[],yiminlist1:[],baoxianlist1:[],asd:''})
 
  }
  onMyShow() {
    var that = this;

    this.getyimin();
  
  }
  switchtab(e) {
    console.log(e);
    this.Base.setMyData({ tab: e.currentTarget.id })
  }

  //查询移民列表的接口
  getyimin() {
    var api = new ProjectApi;
    api.getyimin({}, (yiminlist) => {
      //拼接房型字符串
      yiminlist.map((item) => {
        var fanxintext = '';
        item.biaoqian.map((item1, idx) => {
          fanxintext += item1.name;
          if (idx + 1 != item.biaoqian.length) {
            fanxintext += '/';
          }
        })
        item.fanxintext = fanxintext;
      })
      this.Base.setMyData({

        yiminlist: yiminlist
      })
      this.getbaoxian();
    })
  }
  //查询海外保险的接口
  getbaoxian() {
    var api = new ProjectApi;
    api.getbaoxian({}, (baoxianlist) => {
      //拼接房型字符串
      baoxianlist.map((item) => {
        var fanxintext = '';
        item.biaoqian.map((item1, idx) => {
          fanxintext += item1.name;
          if (idx + 1 != item.biaoqian.length) {
            fanxintext += '/';
          }
        })
        item.fanxintext = fanxintext;
      })
      this.Base.setMyData({

        baoxianlist: baoxianlist
      })
  this.getfanchan()
    })
  }
  //查询海外房产的接口
  getfanchan() {

    var api = new ProjectApi;
    api.gethouselist({}, (houselist) => {
      //拼接房型字符串
      houselist.map((item) => {
        var fanxintext = '';
        item.fanxin.map((item1, idx) => {
          fanxintext += item1.name;
          if (idx + 1 != item.fanxin.length) {
            fanxintext += '/';
          }
        })
        item.fanxintext = fanxintext;
      })

      this.Base.setMyData({

        houselist: houselist
      })
  this.zhenhe();
    })


  }
  zhenhe(){
    var fanchanlist = this.Base.getMyData().houselist;
    var yiminlist = this.Base.getMyData().yiminlist;
    var baoxianlist = this.Base.getMyData().baoxianlist;
    
      var list=[];
      fanchanlist.map((item)=>{
        list.push(item);
      })
    yiminlist.map((item) => {
      list.push(item);
    })
    baoxianlist.map((item) => {
      list.push(item);
    })
   
    
    list.sort((a, b)=>{
      return b.pintaikehu - a.pintaikehu
    });
    this.Base.setMyData({ list})

   
  }
  fanchanxianqin(e){
    var id = e.currentTarget.dataset.id;
  wx.navigateTo({
    url: '/pages/productinfo/productinfo?id='+id,
  })
  }
  yiminxianqin(e) {

    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/yimininfo/yimininfo?id=' + id,
    })
  }
  baoxianxianqin(e){
   
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/baoxianinfo/baoxianinfo?id=' + id,
    })

  }
  yonjinxianqin(e) {
    var list = this.Base.getMyData().list;
   var id = e.currentTarget.dataset.id; 
      
       var item=list[id];
       console.log(item);

    if (item.baozhannianxian == undefined && item.developers_id == undefined)
    {
      wx.navigateTo({
        url: '/pages/yimininfo/yimininfo?id=' + item.id,
      })

    }
    if (item.baozhannianxian != undefined){
      wx.navigateTo({
        url: '/pages/baoxianinfo/baoxianinfo?id=' + item.id,
      })
    }
    if (item.developers_id != undefined)
    {
      wx.navigateTo({
        url: '/pages/productinfo/productinfo?id=' + item.id,
      })
    }


  }
  searchtext(e){
      var list=this.Base.getMyData().list;
      var fanchanlist = this.Base.getMyData().houselist;
      var yiminlist = this.Base.getMyData().yiminlist;
      var baoxianlist = this.Base.getMyData().baoxianlist; 
        var list1=[];
        var fanchanlist1=[];
        var yiminlist1=[];
        var baoxianlist1=[];
      list.map((item)=>{
        console.log(item.name.search(e.detail.value));
        if(item.name.search(e.detail.value)>=0)
        {
          console.log(123);
          list1.push(item);
        }

   

      })
      yiminlist.map((item)=>{
      
        if(item.name.search(e.detail.value)>=0)
        {
          console.log(123);
          yiminlist1.push(item);
        }

   

      })
      fanchanlist.map((item)=>{
        
        if(item.name.search(e.detail.value)>=0)
        {
          console.log(123);
          fanchanlist1.push(item);
        }

   

      })
      baoxianlist.map((item)=>{
      
        if(item.name.search(e.detail.value)>=0)
        {
          console.log(123);
          baoxianlist1.push(item);
        }

   

      })
        
   this.Base.setMyData({list1,baoxianlist1,fanchanlist1,yiminlist1,asd:e.detail.value})
       
   
     

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.switchtab = content.switchtab;
body.yonjinxianqin=content.yonjinxianqin;
body.getyimin = content.getyimin;
body.getbaoxian = content.getbaoxian;
body.getfanchan = content.getfanchan;
body.zhenhe = content.zhenhe;
body.fanchanxianqin = content.fanchanxianqin;
body.yiminxianqin = content.yiminxianqin;
body.baoxianxianqin = content.baoxianxianqin;
body.searchtext=content.searchtext;
Page(body)