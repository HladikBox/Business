// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
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
    this.Base.setMyData({
      tab: 0
    })
  }
  onMyShow() {
    var that = this;
    this.getkehu();
  }
  getkehu() {
    var api = new MemberApi();
    api.mykehu({}, (mykehu) => {

      var ziyoukehu = mykehu.filter((item) => {
        return item.kehuleixin == '0';
      })
      var pintaikehu = mykehu.filter((item) => {
        return item.kehuleixin == '1';
      })


      this.Base.setMyData({
        mykehu,
        ziyoukehu,
        pintaikehu
      })
    })


  }
  switchtab(e) {
    console.log(e);
    this.Base.setMyData({
      tab: e.currentTarget.id
    })
  }
  addkehu() {
    wx.navigateTo({
      url: '/pages/lurukehu/lurukehu?id=0',
    })

  }
  kehuziliao(e) {

    wx.navigateTo({
      url: '/pages/kehuziliao/kehuziliao?id=' + e.currentTarget.dataset.id,

    })
  }
  select(e) {
    console.log(e);
    var kehu_id = e.currentTarget.dataset.kehu_id;
    let pages = getCurrentPages(); //定义上页面

    let currPage = null; //当前页面

    let prevPage = null; //上一个页面

    if (pages.length >= 2) {
      currPage = pages[pages.length - 1]; //当前页面
      prevPage = pages[pages.length - 2]; //上一个页面

      if (prevPage) {
        //上一页存在则给上一个data赋值。则把title传过去
        prevPage.setData({
          kehu_id
        });
        wx.navigateBack({

          delta: 1

        })
      }
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getkehu = content.getkehu;
body.switchtab = content.switchtab;
body.addkehu = content.addkehu;
body.kehuziliao = content.kehuziliao;
body.select = content.select;
Page(body)