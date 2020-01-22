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
  ProjectApi
} from "../../apis/project.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";
import {
  ZixunApi
} from "../../apis/zixun.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    this.Base.setMyData({
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom,
      indexcurrent: 0,
      zhankai: false
    })
    this.getyimininfo();
  }
  onMyShow() {
    var that = this;
    this.getshoucaninfo();
  }
  qiehuanlunbo(e) {

    this.Base.setMyData({
      indexcurrent: e.detail.current
    })

  }
  getyimininfo() {
    var that = this;
    var api = new ProjectApi();
    api.getyimininfo({
      id: that.Base.options.id
    }, (yimininfo) => {

      var liuchen = yimininfo.liuchen.filter((item, idx) => {

        return idx < 3


      })

      this.Base.setMyData({
        houseinfo: yimininfo, liuchen
      })
     
      that.canvasRing = that.selectComponent("#canvasRing");
      that.canvasRing.showCanvasRing();
      that.canvasRing = that.selectComponent("#canvasRing1");
      that.canvasRing.showCanvasRing();
      that.canvasRing = that.selectComponent("#canvasRing2");
      that.canvasRing.showCanvasRing();
      this.getfanchan();
      this.getzixun();
    })

  }
  selecthouse() {


    wx.navigateTo({
      url: '/pages/selecthouse/selecthouse?id=' + this.Base.options.id,
    })

  }
  yuyue() {

    wx.navigateTo({
      url: '/pages/yuyue/yuyue?immigrantproject_id=' + this.Base.options.id,
    })

  }
  shoucan() {
    var that = this;
    var api = new MemberApi;

    var shoucan = this.Base.getMyData().shoucan;

    console.log(that.Base.getMyData().memberinfo.id);
    var json = {
      member_id: that.Base.getMyData().memberinfo.id,
      type: "C",
      immigrantproject_id: that.Base.options.id
    };
    if (shoucan) {
      api.deleteshoucan(json, (ret) => {
        console.log(ret);
        shoucan = !shoucan;
        that.Base.setMyData({
          shoucan: shoucan
        })
      })
    } else {

      api.addshoucan(json, (ret) => {
        console.log(ret);
        shoucan = !shoucan;
        that.Base.setMyData({
          shoucan: shoucan
        })
      })
    }

  }
  getshoucaninfo() {
    var api = new MemberApi;
    var that = this;
    api.shoucanlist({
      type: "C",
      member_id: that.Base.getMyData().memberinfo.id,
      immigrantproject_id: that.Base.options.id
    }, (shoucan) => {
      console.log(shoucan)
      if (shoucan.length > 0) {
        that.Base.setMyData({
          shoucan: true
        })
      } else {
        that.Base.setMyData({
          shoucan: false
        })
      }
    })
  }
  getfanchan() {
    var that = this;
    var houseinfo = this.Base.getMyData().houseinfo;
    var country_id = houseinfo.country_id;

    var api = new ProjectApi;
    api.gethouselist({
      country_id: country_id
    }, (houselist) => {



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
  downloadwenjian(e) {
    console.log(e.currentTarget.id);
    var url = e.currentTarget.id;
    wx.downloadFile({
      url: url, //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);

          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success: function (res) {
              console.log(res);
              var savedFilePath = res.savedFilePath;
              console.log('文件已下载到' + savedFilePath);
              // 查看下载的文件列表
              wx.getSavedFileList({
                success: function (res) {
                  console.log(res);
                }
              })
              // 打开文档
              wx.openDocument({
                filePath: savedFilePath,
                success: function (res) {
                  console.log('打开文档成功')
                }
              })
            }
          })





        }
      }
    })


  }
  heton(){

 wx.navigateTo({
   url: '/pages/yiminrengou/yiminrengou?id='+this.Base.options.id,
 })

  }
  zhankai() {
    this.Base.setMyData({ zhankai: true })
  }
  shouqi() {
    this.Base.setMyData({ zhankai: false })
  }
  getzixun(){

    var houseinfo=this.Base.getMyData().houseinfo;
    console.log(12312312);
    console.log(houseinfo);

  var api=new  ZixunApi();
  api.zixunlist({title:houseinfo.country_name},(zixunlist)=>{

 this.Base.setMyData({zixunlist});

  })


}
gotozixun(e){

  var id = e.currentTarget.dataset.id;
  wx.navigateTo({
    url: '/pages/zixundetail/zixundetail?id='+id,
  })


}
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.qiehuanlunbo = content.qiehuanlunbo;
body.getyimininfo = content.getyimininfo;
body.selecthouse = content.selecthouse;
body.yuyue = content.yuyue;
body.getzixun=content.getzixun;
body.gotozixun=content.gotozixun;
body.getshoucaninfo = content.getshoucaninfo;
body.shoucan = content.shoucan;
body.getfanchan = content.getfanchan;
body.downloadwenjian = content.downloadwenjian;
body.zhankai = content.zhankai;
body.shouqi = content.shouqi;
body.heton = content.heton;
Page(body)