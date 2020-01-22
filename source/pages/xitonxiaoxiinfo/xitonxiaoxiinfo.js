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
    var api=new MyxiaoxiApi();
    api.xiaoxiinfo({id:this.Base.options.id},(xiaoxiinfo)=>{

this.Base.setMyData({xiaoxiinfo});
    })
  }
 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.xianqin=content.xianqin;
Page(body)