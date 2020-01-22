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
  SearchApi
} from "../../apis/search.api.js";
import {
  ActivityApi
} from "../../apis/activity.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";
import {
  ZixunApi
} from "../../apis/zixun.api.js";
import {
  ProjectApi
} from "../../apis/project.api.js";
import {
  OrderApi
} from "../../apis/order.api.js";

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
    this.gettype();
    var text = this.Base.options.text;
    // var text = '1';
    this.Base.setMyData({
      text,
      txt: false
    });
    this.searchinfo(text);
    this.wenzhan(text);
    this.zixun(text);
    this.getcp(text);
    this.getkehu(text);
    this.getdd(text);
  }


  getdd(text) {
    var that = this;
    var arr = [];
    var api = new OrderApi();
    api.getmyorder({}, (orderlist) => {
      if (orderlist.length>0){
        for (var i = 0; i < orderlist.length; i++) {
          if (orderlist[i].immigrantproject_id_name.indexOf(text) >= 0) {
            var index = orderlist[i].immigrantproject_id_name.indexOf(text);
            orderlist[i].ftext = orderlist[i].immigrantproject_id_name.slice(0, index);
            orderlist[i].texts = text;
            orderlist[i].ltext = orderlist[i].immigrantproject_id_name.slice(index + text.length, orderlist[i].immigrantproject_id_name.length);
            console.log(index, 'index')
            console.log("找到了")
            arr.push(orderlist[i]);
          }
          if (orderlist[i].houseproject_id_name.indexOf(text) >= 0) {
            var index = orderlist[i].houseproject_id_name.indexOf(text);
            orderlist[i].ftext = orderlist[i].houseproject_id_name.slice(0, index);
            orderlist[i].texts = text;
            orderlist[i].ltext = orderlist[i].houseproject_id_name.slice(index + text.length, orderlist[i].houseproject_id_name.length);
            console.log(index, 'index')
            console.log("找到了")
            arr.push(orderlist[i]);
          }
        }
        if (arr.length > 2) {
          var arr2 = arr.slice(0, 2);
          that.Base.setMyData({
            ddlist: arr2,
            tempdd: arr
          })
        } else {
          that.Base.setMyData({
            ddlist: arr,
            tempdd: arr
          })
        }
      }
    })
  }


  getkehu(text) {
    var api = new MemberApi();
    var that = this;
    var arr = [];
    api.mykehu({}, (mykehu) => {
      if (mykehu.length > 0) {
        for (var i = 0; i < mykehu.length; i++) {
          mykehu[i].leixin_name = mykehu[i].leixin_name.slice(0,2);
          if (mykehu[i].name.indexOf(text) >= 0) {
            var index = mykehu[i].name.indexOf(text);
            mykehu[i].ftext = mykehu[i].name.slice(0, index);
            mykehu[i].texts = text;
            mykehu[i].ltext = mykehu[i].name.slice(index + text.length, mykehu[i].name.length);
            console.log(index, 'index')
            console.log("找到了")
            arr.push(mykehu[i]);
          }
        }
        if (arr.length > 2) {
          var arr2 = arr.slice(0, 2);
          that.Base.setMyData({
            khlist: arr2,
            tempkh: arr
          })
        } else {
          that.Base.setMyData({
            khlist: arr,
            tempkh: arr
          })
        }
      }
    })
  }

  getcp(text) {
    var that = this;
    var arr = [];
    var api = new ProjectApi;
    api.gethouselist({}, (cptlist) => {
      console.log(cptlist);
      if (cptlist.length > 0) {
        for (var i = 0; i < cptlist.length; i++) {
          if (cptlist[i].name.indexOf(text) >= 0) {
            var index = cptlist[i].name.indexOf(text);
            cptlist[i].ftext = cptlist[i].name.slice(0, index);
            cptlist[i].texts = text;
            cptlist[i].ltext = cptlist[i].name.slice(index + text.length, cptlist[i].name.length);
            cptlist[i].pp = 'fc';
            console.log(index, 'index')
            console.log("找到了")
            arr.push(cptlist[i]);
          }
        }
        if (arr.length > 2) {
          var arr2 = arr.slice(0, 2);
          that.Base.setMyData({
            cplist: arr2,
            tempcp: arr
          })
        } else {
          that.Base.setMyData({
            cplist: arr,
            tempcp: arr
          })
        }
        this.getyimin(text);
        this.getbx(text);
        console.log(arr, 'arr')
      }
    })

  }

  getyimin(text) {
    var api = new ProjectApi;
    var that = this;
    var cplist = this.Base.getMyData().cplist;
    var tempcp = this.Base.getMyData().tempcp;
    // var arr = [];
    api.getyimin({}, (yiminlist) => {
      if (yiminlist.length > 0) {
        for (var i = 0; i < yiminlist.length; i++) {
          if (yiminlist[i].name.indexOf(text) >= 0) {
            var index = yiminlist[i].name.indexOf(text);
            yiminlist[i].ftext = yiminlist[i].name.slice(0, index);
            yiminlist[i].texts = text;
            yiminlist[i].ltext = yiminlist[i].name.slice(index + text.length, yiminlist[i].name.length);
            yiminlist[i].pp = 'ym';
            console.log(index, 'index')
            console.log("找到了")
            cplist.push(yiminlist[i]);
          }
        }
        if (cplist.length > 2) {
          var arr2 = cplist.slice(0, 2);
          that.Base.setMyData({
            cplist: arr2,
            tempcp: cplist
          })
        } else {
          that.Base.setMyData({
            cplist: cplist,
            tempcp: cplist
          })
        }
      }
    })
  }

  getbx(text) {
    var that = this;
    var api = new ProjectApi;
    var cplist = this.Base.getMyData().cplist;
    var tempcp = this.Base.getMyData().tempcp;
    api.getbaoxian({}, (baoxianlist) => {
      if (baoxianlist.length > 0) {
        for (var i = 0; i < baoxianlist.length; i++) {
          if (baoxianlist[i].name.indexOf(text) >= 0) {
            var index = baoxianlist[i].name.indexOf(text);
            baoxianlist[i].ftext = baoxianlist[i].name.slice(0, index);
            baoxianlist[i].texts = text;
            baoxianlist[i].ltext = baoxianlist[i].name.slice(index + text.length, baoxianlist[i].name.length);
            baoxianlist[i].pp = 'bx';
            console.log(index, 'index')
            console.log("找到了")
            cplist.push(baoxianlist[i]);
          }
        }
        if (cplist.length > 2) {
          var arr2 = cplist.slice(0, 2);
          that.Base.setMyData({
            cplist: arr2,
            tempcp: cplist
          })
        } else {
          that.Base.setMyData({
            cplist: cplist,
            tempcp: cplist
          })
        }
      }
    })
  }

  searchinfo(text) {
    // var text = this.Base.getMyData().text;
    var that = this;
    var activityapi = new ActivityApi;
    var arr = [];
    activityapi.activitylist({}, (actlist) => {
      console.log(actlist);
      if (actlist.length > 0) {
        for (var i = 0; i < actlist.length; i++) {
          if (actlist[i].name.indexOf(text) >= 0) {
            var index = actlist[i].name.indexOf(text);
            actlist[i].ftext = actlist[i].name.slice(0, index);
            actlist[i].texts = text;
            actlist[i].ltext = actlist[i].name.slice(index + text.length, actlist[i].name.length);
            console.log(index, 'index')
            console.log("找到了")
            arr.push(actlist[i]);
          }
        }
        if (arr.length > 2) {
          var arr2 = arr.slice(0, 2);
          that.Base.setMyData({
            aclist: arr2,
            tempac: arr
          })
        } else {
          that.Base.setMyData({
            aclist: arr,
            tempac: arr
          })
        }

        console.log(arr, 'arr')
      }
    })


  }

  wenzhan(text) {
    // var text = this.Base.getMyData().text;
    var that = this;
    var memberapi = new MemberApi;
    var arr = [];
    memberapi.friendlist({}, (wzlist) => {
      console.log(wzlist);
      if (wzlist.length > 0) {
        for (var i = 0; i < wzlist.length; i++) {
          if (wzlist[i].title.indexOf(text) >= 0) {
            var index = wzlist[i].title.indexOf(text);
            wzlist[i].ftext = wzlist[i].title.slice(0, index);
            wzlist[i].texts = text;
            wzlist[i].ltext = wzlist[i].title.slice(index + text.length, wzlist[i].title.length);
            console.log(index, 'index')
            console.log("找到了")
            arr.push(wzlist[i]);
          }
        }
        if (arr.length > 2) {
          var arr2 = arr.slice(0, 2);
          that.Base.setMyData({
            wzlist: arr2,
            tempwz: arr
          })
        } else {
          that.Base.setMyData({
            wzlist: arr,
            tempwz: arr
          })
        }

        console.log(arr, 'arr')
      }
    })


  }

  zixun(text) {
    var that = this;
    var zixunapi = new ZixunApi;
    var arr = [];
    zixunapi.zixunlist({}, (zxlist) => {
      console.log(zxlist);
      if (zxlist.length > 0) {
        for (var i = 0; i < zxlist.length; i++) {

          if (zxlist[i].title.indexOf(text) >= 0) {
            if (zxlist[i].photolist.length > 0) {
              // for (var j = 0; j < zxlist[i].photolist.length; j++) {
              zxlist[i].photo = zxlist[i].photolist[0].photo;
              // }
            }
            var index = zxlist[i].title.indexOf(text);
            zxlist[i].ftext = zxlist[i].title.slice(0, index);
            zxlist[i].texts = text;
            zxlist[i].ltext = zxlist[i].title.slice(index + text.length, zxlist[i].title.length);
            console.log(index, 'index')
            console.log("找到了")
            arr.push(zxlist[i]);
          }
        }
        if (arr.length > 2) {
          var arr2 = arr.slice(0, 2);
          that.Base.setMyData({
            zxlist: arr2,
            tempzx: arr
          })
        } else {
          that.Base.setMyData({
            zxlist: arr,
            tempzx: arr
          })
        }

        console.log(arr, 'arr')
      }
    })
  }

  gettype() {
    var api = new SearchApi;
    var that = this;
    api.searchtype({}, (type) => {
      type.unshift({
        seq: 0,
        id: 0,
        name: "全部"
      })
      type = type.sort(that.compare("seq"));
      this.Base.setMyData({
        type,
        seq: 0
      })
    })
  }
  compare(pro) {
    return function(a, b) {
      return a[pro] - b[pro]
    }
  }
  deletetext() {
    var text = this.Base.getMyData().text;
    console.log(text, 'text')
    text = "";
    this.Base.setMyData({
      text: text
    })
  }
  switchnav(e) {
    console.log(e);
    var cur = e.currentTarget.dataset.current;
    var zx = this.Base.getMyData().tempzx;
    var ac = this.Base.getMyData().tempac;
    var wz = this.Base.getMyData().tempwz;
    var cp = this.Base.getMyData().tempcp;
    var kh = this.Base.getMyData().tempkh;
    var dd = this.Base.getMyData().tempdd;
    this.Base.setMyData({
      seq: cur
    })
    if (cur == 0) {
      this.Base.setMyData({
        wzlist: wz,
        zxlist: zx,
        aclist: ac,
        cplist: cp,
        khlist: kh,
        ddlist: dd,
      })
    } else if (cur == 1) {
      this.Base.setMyData({
        wzlist: [],
        zxlist: [],
        aclist: [],
        cplist: cp,
        ddlist: [],
        khlist: [],
      })
    } else if (cur == 2) {
      this.Base.setMyData({
        wzlist: wz,
        zxlist: [],
        aclist: [],
        cplist: [],
        ddlist: [],
        khlist: [],
      })
    } else if (cur == 3) {
      this.Base.setMyData({
        wzlist: [],
        zxlist: zx,
        aclist: [],
        cplist: [],
        ddlist: [],
        khlist: [],
      })
    } else if (cur == 4) {
      this.Base.setMyData({
        wzlist: [],
        zxlist: [],
        aclist: ac,
        cplist: [],
        ddlist: [],
        khlist: [],
      })
    } else if (cur == 5) {
      this.Base.setMyData({
        wzlist: [],
        zxlist: [],
        aclist: [],
        cplist: [],
        ddlist: dd,
        khlist:[]
      })
    } else if (cur == 6) {
      this.Base.setMyData({
        wzlist: [],
        zxlist: [],
        aclist: [],
        cplist: [],
        ddlist: [],
        khlist: kh,
      })
    }



  }
  zxdetail(e) {
    console.log(e);
    var id = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '/pages/zixundetail/zixundetail?id=' + id,
    })
  }
  acdetail(e) {
    console.log(e);
    var id = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '/pages/activitydetail/activitydetail?id=' + id,
    })
  }
  tijiao() {
    var text = this.Base.getMyData().text;
    
    this.searchinfo(text);
    this.wenzhan(text);
    this.zixun(text);
    this.getcp(text);
    this.getkehu(text);
    this.getdd(text);
    
    this.Base.setMyData({
      txt: false
    })
  }
  searchtext(e) {
    this.Base.setMyData({
      text: e.detail.value,
      txt: true
    })
  }

  shouqi(e){
    console.log(e)
    var aa = e.currentTarget.dataset.wen;
    var zx = this.Base.getMyData().tempzx;
    var ac = this.Base.getMyData().tempac;
    var wz = this.Base.getMyData().tempwz;
    var cp = this.Base.getMyData().tempcp;
    var kh = this.Base.getMyData().tempkh;
    var dd = this.Base.getMyData().tempdd;

    if (aa == 'wz') {
      if(wz.length>2){
        wz = wz.slice(0, 2);
      }
      this.Base.setMyData({
        wzlist: wz
      })
    }
    if (aa == 'zx') {
      if (zx.length > 2) {
        zx = zx.slice(0, 2);
      }
      this.Base.setMyData({
        zxlist: zx
      })
    }
    if (aa == 'ac') {
      if (ac.length > 2) {
        ac = ac.slice(0, 2);
      }
      this.Base.setMyData({
        aclist: ac
      })
    }
    if (aa == 'cp') {
      if (cp.length > 2) {
        cp = cp.slice(0, 2);
      }
      this.Base.setMyData({
        cplist: cp
      })
    }
    if (aa == 'kh') {
      if (kh.length > 2) {
        kh = kh.slice(0, 2);
      }
      this.Base.setMyData({
        khlist: kh
      })
    }
    if (aa == 'dd') {
      if (dd.length > 2) {
        dd = dd.slice(0, 2);
      }
      this.Base.setMyData({
        ddlist: dd
      })
    }
  }

  zhuankai(e) {
    console.log(e)
    var aa = e.currentTarget.dataset.wen;
    var zx = this.Base.getMyData().tempzx;
    var ac = this.Base.getMyData().tempac;
    var wz = this.Base.getMyData().tempwz;
    var cp = this.Base.getMyData().tempcp;
    var kh = this.Base.getMyData().tempkh;
    var dd = this.Base.getMyData().tempdd;

    if (aa == 'wz') {
      this.Base.setMyData({
        wzlist: wz
      })
    }
    if (aa == 'zx') {
      this.Base.setMyData({
        zxlist: zx
      })
    }
    if (aa == 'ac') {
      this.Base.setMyData({
        aclist: ac
      })
    }
    if (aa == 'cp') {
      this.Base.setMyData({
        cplist: cp
      })
    }
    if (aa == 'kh') {
      this.Base.setMyData({
        khlist: kh
      })
    }
    if (aa == 'dd') {
      this.Base.setMyData({
        ddlist: dd
      })
    }
  }
  khdetail(e){
    var id = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '/pages/kehuziliao/kehuziliao?id=' + id,
    })
  }
  dddetail(e){
    var id = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '/pages/orderinfo/orderinfo?id=' + id,
    })
  }
  cpdetail(e){
    console.log(e);
    var item = e.currentTarget.dataset.current;
    if(item.pp=='fc'){
      wx.navigateTo({
        url: '/pages/productinfo/productinfo?id=' + item.id,
      })
    }
    if(item.pp=='ym'){
      wx.navigateTo({
        url: '/pages/yimininfo/yimininfo?id=' + item.id,
      })
    }

    if (item.pp == 'bx') {
      wx.navigateTo({
        url: '/pages/baoxianinfo/baoxianinfo?id=' + item.id,
      })
    }
  }
  fanhui(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.gettype = content.gettype;
body.deletetext = content.deletetext;
body.compare = content.compare;
body.searchinfo = content.searchinfo;
body.wenzhan = content.wenzhan;
body.zixun = content.zixun;
body.zxdetail = content.zxdetail;
body.acdetail = content.acdetail;
body.switchnav = content.switchnav;
body.searchtext = content.searchtext;
body.tijiao = content.tijiao;
body.zhuankai = content.zhuankai;
body.getcp = content.getcp;
body.getyimin = content.getyimin;
body.getbx = content.getbx;
body.getkehu = content.getkehu;
body.getdd = content.getdd;
body.khdetail = content.khdetail;
body.dddetail = content.dddetail;
body.cpdetail = content.cpdetail;
body.shouqi = content.shouqi;
body.fanhui = content.fanhui;

Page(body)