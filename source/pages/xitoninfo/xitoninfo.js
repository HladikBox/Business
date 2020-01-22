// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { 	MyxiaoxiApi } from "../../apis/myxiaoxi.api.js";
import { MemberApi } from "../../apis/member.api";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var api=new MemberApi();
    api.myxiaoxi({type:this.Base.options.id},(xiaoxilist)=>{

this.Base.setMyData({xiaoxilist});
    })
  }
  xianqin(e){

var order_id= e.currentTarget.dataset.order_id;
var activity_id= e.currentTarget.dataset.activity_id;
var id=e.currentTarget.dataset.id
var api=new MyxiaoxiApi();
api.xiaoxiinfo({id:e.currentTarget.dataset.id},(res)=>{
  if(this.Base.options.id=='B'){


    wx.navigateTo({
      url: '/pages/orderinfo/orderinfo?id='+order_id,
    })
    
    
    }
    if(this.Base.options.id=='A'){
      console.log("哈哈哈");
      
      wx.navigateTo({
        url: '/pages/xitonxiaoxiinfo/xitonxiaoxiinfo?id='+id,
      })
     
    
      
    
    }
    if(this.Base.options.id=='C'){
    
      wx.navigateTo({
        url: '/pages/dingdandetail/dingdandetail?id='+activity_id
      })
      
    
    }
    if(this.Base.options.id=='D'){
        var xiaoxilist=this.Base.getMyData().xiaoxilist;

     var xiaoxiinfo=xiaoxilist.filter((item)=>{
        
           return item.id==id
 
        })
        xiaoxiinfo=xiaoxiinfo[0];
  
    
         if(xiaoxiinfo.houseproject_id!='')
         {
           wx.navigateTo({
             url: '/pages/productinfo/productinfo?id='+xiaoxiinfo.houseproject_id,
           })

         }
         if(xiaoxiinfo.immigrantproject_id!='')
         {
      
          wx.navigateTo({
            url: '/pages/yimininfo/yimininfo?id='+xiaoxiinfo.immigrantproject_id,
          })
         }
         if(xiaoxiinfo.insuranceproject_id!='')
         {
          wx.navigateTo({
            url: '/pages/baoxianinfo/baoxianinfo?id='+xiaoxiinfo.insuranceproject_id,
          })
         
         }
      
    
    }
    if(this.Base.options.id=='E'){
    
      wx.navigateTo({
        url: '/pages/myqudao/myqudao'
      })
      
    
    }
    if(this.Base.options.id=='F'){
    
      wx.navigateTo({
        url: '/pages/myyonjin/myyonjin'
      })
      
    
    }

})


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.xianqin=content.xianqin;
Page(body)