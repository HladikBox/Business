// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";
import { ProjectApi } from "../../apis/project.api.js";
import {
  WechatApi
} from "../../apis/wechat.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=3;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var api=new OrderApi();
     api.orderinfo({id:this.Base.options.id},(orderinfo)=>{

       if(orderinfo.ordertype=='A')
       {
        var api1= new ProjectApi();
        api1.fanchaninfo({id:orderinfo.fanchan_id},(fanchaninfo)=>{

        that.Base.setMyData({fanchaninfo})
       
        })


       }

       if(orderinfo.ordertype=='B')
       {
        var api1= new ProjectApi();
        api1.getyimininfo({id:orderinfo.immigrantproject_id},(yimininfo)=>{

        that.Base.setMyData({yimininfo})
       
        })


       }
       this.Base.setMyData({orderinfo});
 

     })
  }
  quxiaodindan(e){
    var that=this;
    var id = this.Base.options.id;
       var api=new OrderApi(); 
    wx.showModal({
      title: '提示',
      content: '确定取消订单吗',
      success(res){
        if (!res.cancel)
      {
        api.cancelorder({ id: id }, (res) => {

          that.onMyShow();


        })

      }
 
      }
    })
  

 console.log(e);

  }
  zhifudinjin(){
    var id=this.Base.options.id;
    var api = new WechatApi();
           
    api.prepay1({id:id,openid:AppBase.UserInfo.openid},(payret)=>{

     payret.complete = function (e) {


       if (e.errMsg == "requestPayment:ok") {


       wx.navigateTo({
      url: '/pages/successfulpayment/successfulpayment?id=' + id,
          })

       }
       else {
             
        
       }

     }
     console.log(payret);
     wx.requestPayment(payret)

    })

  }
  goProject(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/projectinfo/projectinfo?id=' + id,
    })
  }
  goKehu(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/kehuziliao/kehuziliao?id=' + id,
    })
  }
  lookfile(e){
    console.log(e);
    var uploadpath=this.Base.getMyData().uploadpath;
    var file=e.currentTarget.dataset.file;
    var url=uploadpath+"project/"+file;
    this.Base.download(url, ()=>{}, true);
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.quxiaodindan = content.quxiaodindan; 
body.zhifudinjin = content.zhifudinjin;
body.goProject = content.goProject;
body.goKehu = content.goKehu;
body.lookfile = content.lookfile;
Page(body)