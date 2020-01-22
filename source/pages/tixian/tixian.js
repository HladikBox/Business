// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { SalesorderApi } from "../../apis/salesorder.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({amount:'',beizhu:''});
  }
  onMyShow() {
    var that = this;
    var api=new MemberApi();
    api.mybank({},(mybank)=>{
   this.Base.setMyData({mybank})

    })

    var api=new SalesorderApi();

    

    api.summary({ }, (yonjin) => {

      var api = new MemberApi();
      api.tixianjilu({}, (tixianjilu) => {
        var jiner=0;
        tixianjilu.map((item)=>{
  
          jiner+=Number(item.amount);
  
        })
    
        this.Base.setMyData({ yonjin,ketixian:yonjin.ketixian-jiner });
     
  
      })
   

    })
  }
  bindleixin(e) {

    console.log(e);
    this.Base.setMyData({
      index: e.detail.value
    })


  }
  amount(e)
  {
 
     this.Base.setMyData({
      amount:e.detail.value
     })

  }
  beizhu(e)
  {
    this.Base.setMyData({
      beizhu:e.detail.value
     })

  }
  tijiao(){

   var amount=Number(this.Base.getMyData().amount); 
    var ketixian=Number(this.Base.getMyData().ketixian);
   var index=this.Base.getMyData().index;
     var  yinhan=this.Base.getMyData().mybank[index];
     var beizhu=this.Base.getMyData().beizhu;

      if(amount=='')
      {
        this.Base.toast("提现金额不能为空");
        return
      }
      if(index==undefined)
      {
        this.Base.toast("请选择提现银行");
        return
      }
    
    if(amount>ketixian)
    {
      this.Base.toast("提现金额超出余额");
      return
    }
   
    wx.showModal({
      title: '提示',
      content: "是否提交提现",
      cancelText:'取消',
      confirmText:'确认',
      success(res) {
        if (!res.cancel) {
     
          var api=new MemberApi();
          api.shenqintixian({yinhanzhanhao:yinhan.banknum,kaihuhan:yinhan.banktype,amount:amount,beizhu:beizhu},(res)=>{

 wx.navigateBack({
  
 })

          })
         

        }


      }
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindleixin=content.bindleixin;
body.amount=content.amount;
body.beizhu=content.beizhu;
body.tijiao=content.tijiao;
Page(body)