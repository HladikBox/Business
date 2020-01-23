// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";
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
    var api=new OrderApi();
    api.getmyorder({},(orderlist)=>{
         
         orderlist=orderlist.filter((item)=>{
      
        return  item.orderstatus!='C';

         })
      
      this.Base.setMyData({ orderlist});
    })
  }
  cancel(e){
    var that=this;
    var id = e.currentTarget.id;
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
  goProject(e)
  {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/projectinfo/projectinfo?id='+id,
    })
  }
  goKehu(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/kehuziliao/kehuziliao?id=' + id,
    })
  }
  orderinfo(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/orderinfo/orderinfo?id=' + id,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.cancel = content.cancel; 
body.orderinfo = content.orderinfo;
body.goProject = content.goProject;
body.goKehu = content.goKehu;
Page(body)