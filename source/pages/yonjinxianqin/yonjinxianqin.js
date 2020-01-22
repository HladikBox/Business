// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { SalesorderApi } from "../../apis/salesorder.api.js";
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
    var api=new SalesorderApi();
    api.commissiondetail({id:this.Base.options.id}, (yonjinxianqin)=>{
          
      yonjinxianqin.releasedetail[0].releaseamount = parseInt(yonjinxianqin.releasedetail[0].releaseamount);
      yonjinxianqin.releasedetail[1].releaseamount = parseInt(yonjinxianqin.releasedetail[1].releaseamount);
      yonjinxianqin.releasedetail[2].releaseamount = parseInt(yonjinxianqin.releasedetail[2].releaseamount);
      yonjinxianqin.releasedetail[3].releaseamount = parseInt(yonjinxianqin.releasedetail[3].releaseamount);
      this.Base.setMyData({ yonjinxianqin});

    })
      
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
Page(body)