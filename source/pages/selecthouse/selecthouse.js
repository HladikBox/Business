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
    //options.id=1;
    super.onLoad(options);
    this.Base.setMyData({
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom,
      indexcurrent: 0,
      fanchan:[]
    })
  }
  onMyShow() {
    var that = this;
    this.gethouseinfo();
    
  }
  gethouseinfo() {
    var that = this;
    var api = new ProjectApi;
    api.gethouseinfo({ id: that.Base.options.id }, (houseinfo) => {
      this.Base.setMyData({ houseinfo: houseinfo })

    })
    api.getloudon({ houseproject_id: that.Base.options.id },(loudon)=>{

      this.Base.setMyData({ loudon})

    })
    api.getloucen({ houseproject_id: that.Base.options.id }, (loucen) => {

      this.Base.setMyData({ loucen })

    })
    api.gethuxin({ houseproject_id: that.Base.options.id }, (huxin) => {

      this.Base.setMyData({ huxin })

    })  

   


  }
  qiehuanlunbo(e) {

    this.Base.setMyData({ indexcurrent: e.detail.current })

  }
  chanpinrengou(){

    var id = this.Base.getMyData().xzid;
    if(id==undefined)
    {
      this.Base.info("请选择房产");
      return
    }

   wx.navigateTo({
     url: '/pages/chanpinrengou/chanpinrengou?id='+id,
   })

  }
  bindloudon(e)
  {
    console.log(e);
    this.Base.setMyData({ loudonindex: e.detail.value,
      loudonid: this.Base.getMyData().loudon[e.detail.value].id,
      loudon_name: this.Base.getMyData().loudon[e.detail.value].name})

     this.xuanlou();


  }
  bindloucen(e) {
    console.log(e);
    this.Base.setMyData({ loucenindex: e.detail.value ,
      loucenid: this.Base.getMyData().loucen[e.detail.value].id,
      loucen_name: this.Base.getMyData().loucen[e.detail.value].name  })
    this.xuanlou();
  }
  bindhuxin(e) {
    console.log(e);
    this.Base.setMyData({ 
      huxinindex: e.detail.value ,
     huxinid: this.Base.getMyData().huxin[e.detail.value].id, 
      huxin_name: this.Base.getMyData().huxin[e.detail.value].name })
    this.xuanlou();
  }
  xuanlou()
  {  
    var that=this;
    var huxin_name = this.Base.getMyData().huxin_name;
    var loudon_name = this.Base.getMyData().loudon_name;
    var loucen_name = this.Base.getMyData().loucen_name;

    var fanchan=this.Base.getMyData().fanchan;
        
        var api=new ProjectApi();
  
    api.getfanchan({ houseproject_id: that.Base.options.id, huxin_name,
      loudon_name, loucen_name}, (fanchan) => {
                        
                if(fanchan.length==0)
                {
                  this.Base.setMyData({ fanchan, fanchaninfo: fanchan[0], xzid: undefined })
                }
                else{

        this.Base.setMyData({ fanchan, fanchaninfo: fanchan[0], xzid: fanchan[0].id})
                }
    })


    
  

  }
  qiehuanfanchan(e)
  {
    var id = e.currentTarget.id;
      
    var fanchan=this.Base.getMyData().fanchan;
    var fanchaninfo = fanchan.find(item => item.id == id);
    console.log(  );
    this.Base.setMyData({ fanchaninfo: fanchaninfo, xzid: fanchaninfo.id })
  


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.gethouseinfo = content.gethouseinfo;
body.qiehuanlunbo = content.qiehuanlunbo;
body.chanpinrengou = content.chanpinrengou;
body.bindloudon = content.bindloudon;
body.bindloucen = content.bindloucen;
body.bindhuxin = content.bindhuxin;
body.xuanlou = content.xuanlou;
body.qiehuanfanchan = content.qiehuanfanchan;
Page(body)