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
  }
  onMyShow() {
    var that = this;
    var id=this.Base.options.id;
     var api=new InstApi();
    api.kaifashaninfo({id:id},(info)=>{
 
      this.Base.setMyData({kaifashaninfo:info});
      
    })
    this.getfanchan(id);
  }

  getfanchan(id) {

    var api = new ProjectApi;
    api.gethouselist({ developers_id:id}, (houselist) => {
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

    })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getfanchan = content.getfanchan;
Page(body)