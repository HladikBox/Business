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
  }
  onMyShow() {
    var that = this;
    var api=new MemberApi();
    api.myyuyue({}, (myyuyue)=>{
      this.Base.setMyData({ myyuyue})
      })
  }
  yuyuexianqin(e){

   wx.navigateTo({
     url: '/pages/yuyuexianqin/yuyuexianqin?id=' + e.currentTarget.id,
   })


  }
  quxiao(e)
  {
    var id = e.currentTarget.id;
 
    var that = this;
    var api = new MemberApi();

    wx.showModal({
      title: '提示',
      content: '确认是否取消',
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          api.quxiaoyuyue({ id: id }, () => {

           that.onMyShow();


          })
        } else {

        }
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.yuyuexianqin = content.yuyuexianqin;
body.quxiao = content.quxiao;
Page(body)