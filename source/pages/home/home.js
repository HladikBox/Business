// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ProjectApi } from "../../apis/project.api.js";
import { ZixunApi } from "../../apis/zixun.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ tab: 1 })
  }
  onMyShow() {
    var that = this;
    var api = new InstApi;
    api.indexbanner({
      orderby: 'r_main.seq'
    }, (indexbanner) => {
      this.Base.setMyData({
        indexbanner: indexbanner
      });
    });
    
    this.tuijianfnachan();
    this.tuijianyimin();
    this.tuijianbaoxian();
    this.getzixun();
  }
  tuijianyimin(){
    var api=new ProjectApi();
    api.tuijianlist({ projecttype: "C"},(yiminlist)=>{

      this.Base.setMyData({ yiminlist})
    })



  }
  tuijianfnachan(){
  var api=new ProjectApi();
    api.tuijianlist({ projecttype: "A"},(tuijianlist)=>{

      this.Base.setMyData({ tuijianlist})
    })

  }
  tuijianbaoxian(){

    var api=new ProjectApi();
    api.tuijianlist({projecttype:"B"},(baoxianlist)=>{

      this.Base.setMyData({ baoxianlist})
    })

  }
  tabselect(e) {
    console.log(e);

    this.Base.setMyData({ tab: e.currentTarget.id })

  }

  gonzuotai() {
    wx.navigateTo({
      url: '/pages/gonzuotai/gonzuotai',
    })

  }
  kecheng(e) {
    console.log(e.currentTarget.dataset.kc)

    wx.switchTab({
      url: '/pages/activity/activity'
    })
    wx.setStorage({
      key: 'types',
      data: e.currentTarget.dataset.kc
    })
  }
  zixun() {
    wx.navigateTo({
      url: '/pages/zixun/zixun',
    })
  }

  fuwu() {
    this.Base.info("暂未开发")
  }

  search() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
  pengyou() {
    wx.navigateTo({
      url: '/pages/pengyouquan/pengyouquan',
    })
  }
  productinfo(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/productinfo/productinfo?id=' + e.currentTarget.dataset.id,
    })
  }
  getzixun() {
    var api = new ZixunApi;
    var zixun = [];
    api.zixunlist({},(zixunlist)=>{
      console.log(zixunlist);
      for(var i=0;i<zixunlist.length;i++){
        if (zixunlist[i].toutiao == '是'){
          zixun.push(zixunlist[i]);
        }
      }
     
      this.Base.setMyData({
        zixunlist: zixun
      })
    })
  }
  zixundetail(e){
    var id = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '/pages/zixundetail/zixundetail?id=' + id,
    })
  }
  peixun(e){
    wx.switchTab({
      url: '/pages/activity/activity'
    })
    wx.setStorage({
      key: 'types',
      data: e.currentTarget.dataset.px
    })
  }
  zhanhui(e){
    wx.switchTab({
      url: '/pages/activity/activity'
    })
    wx.setStorage({
      key: 'types',
      data: e.currentTarget.dataset.zh
    })
  }
  yimininfo(e) {
    wx.navigateTo({
      url: '/pages/yimininfo/yimininfo?id=' + e.currentTarget.dataset.id,
    })
  }
  baoxianinfo(e) {
    console.log(e);

    wx.navigateTo({
      url: '/pages/baoxianinfo/baoxianinfo?id=' + e.currentTarget.dataset.id,
    })


  }
  youhui(e){
    console.log(e)
    var cur = e.currentTarget.dataset.yh;
    if(cur=='yh'){
      wx.navigateTo({
        url: '/pages/changpinyouhui/changpinyouhui',
      })
    }else if(cur=='yj'){
      wx.navigateTo({
        url: '/pages/yongjinjiangli/yongjinjiangli',
      })
    }
  }
  fanchanchanpin(e)
  {
  var id=e.currentTarget.dataset.id;
  var name=e.currentTarget.dataset.name;
  var json={country_id:id,name:name};
  console.log(json);
  
  wx.setStorageSync('productstore', json)
  wx.switchTab({
    url: '/pages/product/product'
  })
 

  }
  yiminchanpin(e)
  {
    var id=e.currentTarget.dataset.id;
    var name=e.currentTarget.dataset.name;
    var json={country_id:id,name:name};
    console.log(json);
    wx.setStorageSync('yimin', json)
    wx.switchTab({
      url: '/pages/product/product'
    })
  }
  baoxianchanpin(e)
  {
    var id=e.currentTarget.dataset.id;
    var name=e.currentTarget.dataset.name;
    var json={baoxianguojia_id:id,name:name};
    console.log(json);
    wx.setStorageSync('baoxian', json)
    wx.switchTab({
      url: '/pages/product/product'
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tabselect = content.tabselect;
body.gonzuotai = content.gonzuotai;
body.kecheng = content.kecheng;
body.zixun = content.zixun;
body.productinfo = content.productinfo;
body.fuwu = content.fuwu;
body.search = content.search;
body.pengyou = content.pengyou;
body.tuijianfnachan = content.tuijianfnachan;
body.tuijianyimin=content.tuijianyimin;
body.getzixun = content.getzixun;
body.zixundetail = content.zixundetail;
body.peixun = content.peixun;
body.zhanhui = content.zhanhui;
body.yimininfo=content.yimininfo;
body.tuijianbaoxian=content.tuijianbaoxian;
body.baoxianinfo = content.baoxianinfo;
body.fanchanchanpin=content.fanchanchanpin;
body.youhui = content.youhui;
body.yiminchanpin=content.yiminchanpin;
body.baoxianchanpin=content.baoxianchanpin;
Page(body)