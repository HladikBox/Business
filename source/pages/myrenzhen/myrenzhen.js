// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";
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

    var api = new MemberApi();
    api.renzheninfo({}, (renzheninfo) => {
      console.log(renzheninfo);
      this.Base.setMyData({ renzheninfo: renzheninfo[0] })

    })
  }
  lijirenzhen() {

    wx.navigateTo({
      url: '/pages/tijiaorenzhen/tijiaorenzhen',
    })

  }
  fanhui() {

    console.log(123123);

    wx.navigateBack({

    })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.lijirenzhen = content.lijirenzhen;
body.tijiao = content.tijiao;
body.fanhui = content.fanhui;
Page(body)