// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { SearchApi } from "../../apis/search.api.js";

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
      indexcurrent: 0
    })
  }
  onMyShow() {
    var that = this;
    this.getold();
    this.gethot();
  }

  getold(){
    var api = new SearchApi;
    var that = this;
    api.searchlist({
      member_id: that.Base.getMyData().memberinfo.id
    },(list)=>{
      console.log(list,'list');
      that.Base.setMyData({
        list
      })
    })
  }

  gethot() {
    var api = new SearchApi;
    var that = this;
    api.hotsearch({
     
    }, (hotlist) => {
      console.log(hotlist, 'list');
      that.Base.setMyData({
        hotlist
      })
    })
  }

  searchtext(e){
    console.log(e);
    this.Base.setMyData({
      search: e.detail.value
    })
  }
  tijiao(){
    var text = this.Base.getMyData().search;
    console.log(text);
    var api = new SearchApi;
    var that = this;
    var list = this.Base.getMyData().list;
    console.log(list,'list');
    if(text==undefined ||text==''){
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
      return 
    }
    for(var i=0;i<list.length;i++){
      if (list[i].content==text){
        
        wx.navigateTo({
          url: '/pages/search2/search2?text=' + text,
        })
        text = "";
      }else {
        
      }
    }
    console.log(text,'text')
    setTimeout(()=>{
      if (text != "") {
        api.addsearch({
          member_id: that.Base.getMyData().memberinfo.id,
          content: text
        }, (ret) => {
          console.log(ret)
          if (ret.code == "0") {
            wx.navigateTo({
              url: '/pages/search2/search2?text=' + text,
            })
          }
        })
      }
    },list.length*300)
   
  
  }
  search(e){
    console.log(e)
    var text = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '/pages/search2/search2?text=' + text,
    })
  }
  search2(e){
    var text = e.currentTarget.dataset.current;
    var api = new SearchApi;
    var that = this;
    api.addsearch({
      member_id: that.Base.getMyData().memberinfo.id,
      content: text
    }, (ret) => {
      console.log(ret)
      if (ret.code == "0") {
        wx.navigateTo({
          url: '/pages/search2/search2?text=' + text,
        })
      }
    })
  }
  deleteold(){
    var list = this.Base.getMyData().list;
    console.log(list);
    var api = new SearchApi;
    var that = this;
    var len = 0;
    for(var i=0;i<list.length;i++){
      api.deletesearch({
        id:list[i].id
      },(ret)=>{
        console.log(ret);
      })
    }
      that.Base.setMyData({
        list:[]
      })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.searchtext = content.searchtext;
body.tijiao = content.tijiao;
body.getold = content.getold;
body.search = content.search;
body.deleteold = content.deleteold;
body.gethot = content.gethot;
body.search2 = content.search2;


Page(body)