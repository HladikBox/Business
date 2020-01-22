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
  ZixunApi
} from "../../apis/zixun.api.js";
import {
  MemberApi
} from "../../apis/member.api.js"; 
import {
  ApiUtil
} from "../../apis/apiutil.js";

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

    this.getdian();

  }

  select(zixun_id) {
    var list = this.Base.getMyData().templist;
    var that = this;
    var arr = [];
    for (var i = 0; i < list.length; i++) {
      if (zixun_id == list[i].id) {
        arr.push(list[i]);
      }
    }
    that.Base.setMyData({
      list: arr
    })
  }

  getdian() {

    var api = new MemberApi;
    var that = this;
    console.log(that.Base.getMyData().memberinfo.id)
    api.dianzanlist({
      member_id: that.Base.getMyData().memberinfo.id
    }, (dianlist) => {
      console.log(dianlist, 'dian');
      if (dianlist.length > 0) {
        that.Base.setMyData({
          dianlist: dianlist
        })
      }

      this.gettype();

    })
  }

  gettype() {
    var api = new ZixunApi;
    api.zixuntype({}, (type) => {
      type.unshift({
        id: 0,
        name: "全部"
      })
      var seq = 0
      this.Base.setMyData({
        type: type,
        seq: seq
      })
      this.getinfo(0);
    })
  }

  getinfo(type_id) {
    var api = new ZixunApi;
    var that = this;
    var dianlist = this.Base.getMyData().dianlist;
    console.log(dianlist, 'dianlist')
    api.zixunlist({
      consultationtype_id: type_id
    }, (list) => {
      console.log(list)
      for (var i = 0; i < list.length; i++) {
        list[i].publictime = ApiUtil.TimeAgo(list[i].publictime_timespan);
        
        if (that.checkdian(list[i], dianlist)) {
          list[i].dian = true
        } else {
          list[i].dian = false
        }

      }
      this.Base.setMyData({
        list: list,
        templist: list
      })
      var zixun_id = that.Base.options.id;
      if (zixun_id != undefined) {
        console.log(zixun_id, 'zizi')
        that.select(zixun_id);
      }
    })
  }

  checkdian(item, arr) {
    console.log(arr, 'lll');
    if (arr != undefined) {
      for (var i = 0; i < arr.length; i++) {
        if (item.id == arr[i].pinglun_id) {
          return true;
        }
      }
    }

    return false;
  }

  dianzhan(e) {
    console.log(e)
    var cur = e.currentTarget.dataset.currentid.id;
    var dian = e.currentTarget.dataset.currentid.dian;
    var list = this.Base.getMyData().list;
    var api = new MemberApi;
    var that = this;

    if (dian == false) {
      api.dianzhan({
        pinglun_id: cur,
        member_id: that.Base.getMyData().memberinfo.id
      }, (ret) => {
        console.log(ret)
        if (ret) {
          for (let i = 0; i < list.length; i++) {
            if (cur == list[i].id) {
              list[i].dian = true;
              list[i].dianzhan = Number(list[i].dianzhan)  +1;
            }
          }
          that.jiadian(cur);
          this.Base.setMyData({
            list: list
          })
        }
      })
    } else {
      api.deletedianzhan({
        pinglun_id: cur,
        member_id: that.Base.getMyData().memberinfo.id
      }, (ret) => {
        console.log(ret)
        if (ret) {
          for (let i = 0; i < list.length; i++) {
            if (cur == list[i].id) {
              list[i].dian = false;
              list[i].dianzhan = Number(list[i].dianzhan) - 1;
            }
          }
          that.jiandian(cur);
          this.Base.setMyData({
            list: list
          })
        }
      })
    }


  }

  jiadian(id) {
    var list = this.Base.getMyData().list;
    var api = new ZixunApi;
    api.dianzhan({
      id: id
    }, (ret) => {
      console.log(ret);
      if(ret.code=='0'){
       
      }
    })
  }

  jiandian(id) {
    var list = this.Base.getMyData().list;
    var api = new ZixunApi;
    api.jiandian({
      id: id
    }, (ret) => {
      console.log(ret);
      if (ret.code == '0') {
        
      }
    })
  }

  switchnav(e) {
    console.log(e)

    var cur = e.target.dataset.current;
    var curID = e.target.dataset.currentid;

    this.setData({
      seq: cur
    })

    var list = this.Base.getMyData().templist;
    var arr = [];
    if (curID != '0') {
      for (var i = 0; i < list.length; i++) {
        if (curID == list[i].consultationtype_id) {
          arr.push(list[i]);
        }
      }

    } else {
      var arr = list;
    }

    this.Base.setMyData({
      list: arr
    })

  }

  onShareAppMessage(ops) {
    var that = this;
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    var api = new ZixunApi;
    api.zhuanfa({ id: that.Base.options.id }, (ret) => {
      console.log(ret)
    })
    return {
      title: '邦拓小程序',
      path: 'pages/zixun/zixun?id=' + ops.target.dataset.currentid, // 路径，传递参数到指定页面。
      // imageUrl: '../../imgs/xx.png', // 分享的封面图
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));

      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  }

  detail(e){
    console.log(e);
    var detail = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '/pages/zixundetail/zixundetail?id='+detail.id,
    })
  }
  detail2(e){
    var detail = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '/pages/zixundetail/zixundetail?id=' + detail.id + "&bb=1",
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.gettype = content.gettype;
body.switchnav = content.switchnav;
body.getinfo = content.getinfo;
body.dianzhan = content.dianzhan;
body.getdian = content.getdian;
body.jiadian = content.jiadian;
body.jiandian = content.jiandian;
body.checkdian = content.checkdian;
body.select = content.select;
body.onShareAppMessage = content.onShareAppMessage;
body.detail = content.detail;
body.detail2 = content.detail2;

Page(body)