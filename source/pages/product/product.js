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
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      index: 1,
      quanqiu: null,
      zonjia: null,
      leixin: null,
      paixu: null,
      quanqiu1: null,
      suohuoshenfen: null,
      yiminleibie: null,
      paixu1: null,
      yimincanshu: [],
      baoxiancanshu: [],
      quanqiu2: null,
      baoxiangonsi: null,
      baoxianleixin: null,
      baoxianpaixu: null
    });
    this.getbaoxiande();

  }
  search() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
  onMyShow() {

    var canshu2 = wx.getStorageSync('fanchan')
    if (canshu2 != '') {
      this.Base.setMyData({
        index: 1,
      })
    }

    var canshu = wx.getStorageSync('yimin')
    if (canshu != '') {
      this.Base.setMyData({
        index: 2,
      })
    }
    var canshu1 = wx.getStorageSync('baoxian')
    if (canshu1 != '') {
      this.Base.setMyData({
        index: 3,
      })
    }
    var that = this;
    this.Base.setMyData({
      quanqiu: null,
      quanqiu1: null,
      quanqiu2: null,
    })
    this.getguojia();
    this.getkaifashan();
    this.getfanchan();
    this.getyimin();
    this.getbaoxian();
    this.getfanxin();

  }
  //查询移民列表的接口
  getyimin() {
    var canshu = wx.getStorageSync('yimin')
    console.log(canshu);
    console.log("牛逼plua");
    var api = new ProjectApi;
    var json = {};
    
    api.list({ projecttype: "B" }, (yiminlist) => {
      //拼接房型字符串
      
      this.Base.setMyData({

        yiminlist: yiminlist
      })

    })
  }
  //查询海外保险的接口
  getbaoxian() {
    var api = new ProjectApi;


    var api = new ProjectApi;
    api.list({projecttype:"C"}, (baoxianlist) => {
      //拼接房型字符串
      this.Base.setMyData({
        baoxianlist: baoxianlist
      })

    })
  }
  //查询海外房产的接口
  getbaoxiande() {
    var api = new ProjectApi;
    api.baoxianguojialist({}, (baoxianguojialist) => {

      this.Base.setMyData({
        baoxianguojialist
      })

    })
    api.baoxianleixinlist({}, (baoxianleixinlist) => {

      this.Base.setMyData({
        baoxianleixinlist
      })

    })
    api.baoxiangonsilist({}, (baoxiangonsilist) => {

      this.Base.setMyData({
        baoxiangonsilist
      })

    })

  }
  getfanchan() {


    var api = new ProjectApi;
    api.list({projecttype:"A"}, (houselist) => {
      //拼接房型字符串
      

      this.Base.setMyData({

        houselist: houselist
      })

    })


  }


  //查询国家的接口
  getguojia() {
    var api = new InstApi;
    api.getguojia({}, (swiperList) => {

      this.Base.setMyData({
        swiperList: swiperList
      });
      this.towerSwiper('swiperList');
    })

  }
  //查询开发商
  getkaifashan() {
    var api = new InstApi;
    api.getkaifashan({}, (item) => {

      this.Base.setMyData({
        kaifashanlist: item
      });

    })

  }
  towerEnd(e) {


    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  }
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  }
  towerSwiper(name) {
    let list = this.data[name];
    console.log(list);
    console.log("牛逼");
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  }
  switchindex(e) {
    console.log(e);
    this.Base.setMyData({
      index: e.currentTarget.id
    })
  }
  towerclick(e) {

    wx.navigateTo({
      url: '/pages/zhuanti/zhuanti?id=' + e.currentTarget.dataset.id,
    })
  }
  //海外房产详情
  productinfo(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/productinfo/productinfo?id=' + e.currentTarget.dataset.id,
    })
  }
  yimininfo(e) {
    wx.navigateTo({
      url: '/pages/yimininfo/yimininfo?id=' + e.currentTarget.dataset.id,
    })
  }
  kaifashaninfo(e) {

    wx.navigateTo({
      url: '/pages/kaifashaninfo/kaifashaninfo?id=' + e.currentTarget.id,
    })


  }
  projectinfo(e) {
    console.log(e);

    wx.navigateTo({
      url: '/pages/projectinfo/projectinfo?id=' + e.currentTarget.dataset.id,
    })


  }
  xzguojia(e) {

    this.Base.setMyData({
      xzguojia: e.currentTarget.dataset.id
    })

    this.xzshi(e.currentTarget.dataset.id);

  }
  xzguojia1(e) {

    var swiperList = this.Base.getMyData().swiperList;
    var xzguojialist = swiperList.filter((item) => {


      return item.id == e.currentTarget.dataset.id

    })
    this.Base.setMyData({
      xzymgj: e.currentTarget.dataset.id,
      xzguojialist
    })
  }
  xzqj(e) {
    var jiagelist = this.Base.getMyData().jiagequjianlist;
    var xzjiage = jiagelist.filter((item) => {


      return item.id == e.currentTarget.dataset.id

    })
    this.Base.setMyData({
      xzqj: e.currentTarget.dataset.id,
      xzjiage
    })
  }
  xzfx(e) {
    var fanxinlist = this.Base.getMyData().fanxin;
    console.log(fanxinlist);
    var xzfanxin = fanxinlist.filter((item) => {


      return item.id == e.currentTarget.dataset.id

    })
    this.Base.setMyData({
      xzfx: e.currentTarget.dataset.id,
      xzfanxin
    })
  }

  xzbxgj(e) {
    var baoxianguojialist = this.Base.getMyData().baoxianguojialist;

    var xzbxgjlist = baoxianguojialist.filter((item) => {


      return item.id == e.currentTarget.dataset.id

    })
    this.Base.setMyData({
      xzbxgj: e.currentTarget.dataset.id,
      xzbxgjlist
    })
  }

  xzbxgs(e) {
    var baoxiangonsilist = this.Base.getMyData().baoxiangonsilist;

    var xzbxgslist = baoxiangonsilist.filter((item) => {


      return item.id == e.currentTarget.dataset.id

    })
    this.Base.setMyData({
      xzbxgs: e.currentTarget.dataset.id,
      xzbxgslist
    })
  }

  xzbxlx(e) {
    var baoxianleixinlist = this.Base.getMyData().baoxianleixinlist;

    var xzbxlxlist = baoxianleixinlist.filter((item) => {


      return item.id == e.currentTarget.dataset.id

    })
    this.Base.setMyData({
      xzbxlx: e.currentTarget.dataset.id,
      xzbxlxlist
    })
  }


  xzshi(id) {
    var api = new InstApi();
    api.getchenshi({
      country_id: id
    }, (chenshilist) => {
      this.Base.setMyData({
        chenshilist
      })

    })

  }
  xzchenshi(e) {



    if (e.currentTarget.dataset.id == 0) {
      var guojialist = this.Base.getMyData().swiperList;
      var country_id = this.Base.getMyData().xzguojia;

      var xzgj = guojialist.filter((item) => {


        return item.id == country_id

      })

      xzgj = xzgj[0];
      var josn = {
        country_id: xzgj.id,
        city_id: 0,
        name: xzgj.name
      };

      this.Base.setMyData({

        quanqiu: josn

      })
      this.getfanchan();
      this.guanbi();
      return
    }

    var chenshilist = this.Base.getMyData().chenshilist;


    var xzcs = chenshilist.filter((item) => {


      return item.id == e.currentTarget.dataset.id

    })
    console.log(xzcs);
    var name = xzcs[0].country_name + '·' + xzcs[0].name;
    console.log(name);

    xzcs = xzcs[0];
    var josn = {
      country_id: xzcs.country_id,
      city_id: xzcs.id,
      name: name
    };

    this.Base.setMyData({

      quanqiu: josn

    })


    this.Base.setMyData({
      xzchenshi: e.currentTarget.dataset.id,

    })
    this.getfanchan();
    this.guanbi();
  }
  // xzchenshi1(e) {



  //   if (e.currentTarget.dataset.id == 0) {
  //     var guojialist = this.Base.getMyData().swiperList;
  //     var country_id = this.Base.getMyData().xzguojia1;

  //     var xzgj = guojialist.filter((item) => {


  //       return item.id == country_id

  //     })

  //     xzgj = xzgj[0];
  //     var josn = {
  //       country_id: xzgj.id,
  //       city_id: 0,
  //       name: xzgj.name
  //     };

  //     this.Base.setMyData({

  //       quanqiu1: josn

  //     })
  //     this.getyimin();
  //     this.guanbi1();
  //     return
  //   }

  //   var chenshilist = this.Base.getMyData().chenshilist;


  //   var xzcs = chenshilist.filter((item) => {


  //     return item.id == e.currentTarget.dataset.id

  //   })
  //   console.log(xzcs);
  //   var name = xzcs[0].country_name + '·' + xzcs[0].name;
  //   console.log(name);

  //   xzcs = xzcs[0];
  //   var josn = {
  //     country_id: xzcs.country_id,
  //     city_id: xzcs.id,
  //     name: name
  //   };

  //   this.Base.setMyData({

  //     quanqiu1: josn

  //   })


  //   this.Base.setMyData({
  //     xzchenshi1: e.currentTarget.dataset.id,

  //   })
  //   this.getyimin();
  //   this.guanbi1();
  // }
  xzchenshi1(e)
  {

    var id = e.currentTarget.dataset.id;
    if (id == 0) {
      this.Base.setMyData({

        quanqiu1: {
          name: '不限类型',
          country_id: 0
        }

      })
      this.getyimin();
      this.guanbi1();
      return
    }

    var xzguojialist = this.Base.getMyData().xzguojialist[0];




    this.Base.setMyData({

      quanqiu1: {
        name: xzguojialist.name,
        country_id: xzguojialist.id
      }

    })
    this.getyimin();
    this.guanbi1();
  }
  qqxz() {
    if (this.Base.getMyData().shaixuan == true) {
      this.guanbi();
      return
    }
    if (this.Base.getMyData().qqxz == true) {
      this.Base.setMyData({
        qqxz: false,
        shaixuan: false
      });

    } else {

      this.Base.setMyData({
        qqxz: true,
        shaixuan: true
      });
    }
  }
  qqxz1() {
    if (this.Base.getMyData().shaixuan1 == true) {
      this.guanbi1();
      return
    }
    if (this.Base.getMyData().qqxz1 == true) {
      this.Base.setMyData({
        qqxz1: false,
        shaixuan1: false
      });

    } else {

      this.Base.setMyData({
        qqxz1: true,
        shaixuan1: true
      });
    }
  }
  fxxz() {

    if (this.Base.getMyData().shaixuan == true) {
      this.guanbi();
      return
    }



    if (this.Base.getMyData().fxxz == true) {
      this.Base.setMyData({
        fxxz: false,
        shaixuan: false
      });

    } else {

      this.Base.setMyData({
        fxxz: true,
        shaixuan: true
      });
    }
  }


  qqxz2() {

    if (this.Base.getMyData().shaixuan2 == true) {
      this.guanbi2();
      return
    }



    if (this.Base.getMyData().qqxz2 == true) {
      this.Base.setMyData({
        qqxz2: false,
        shaixuan2: false
      });

    } else {

      this.Base.setMyData({
        qqxz2: true,
        shaixuan2: true
      });
    }
  }

  bxgs() {

    if (this.Base.getMyData().shaixuan2 == true) {
      this.guanbi2();
      return
    }



    if (this.Base.getMyData().bxgs == true) {
      this.Base.setMyData({
        bxgs: false,
        shaixuan2: false
      });

    } else {

      this.Base.setMyData({
        bxgs: true,
        shaixuan2: true
      });
    }
  }

  bxlx() {

    if (this.Base.getMyData().shaixuan2 == true) {
      this.guanbi2();
      return
    }



    if (this.Base.getMyData().bxlx == true) {
      this.Base.setMyData({
        bxlx: false,
        shaixuan2: false
      });

    } else {

      this.Base.setMyData({
        bxlx: true,
        shaixuan2: true
      });
    }
  }


  bxpx() {

    if (this.Base.getMyData().shaixuan2 == true) {
      this.guanbi2();
      return
    }



    if (this.Base.getMyData().bxpx == true) {
      this.Base.setMyData({
        bxpx: false,
        shaixuan2: false
      });

    } else {

      this.Base.setMyData({
        bxpx: true,
        shaixuan2: true
      });
    }
  }



  shsf() {
    if (this.Base.getMyData().shaixuan1 == true) {
      this.guanbi1();
      return
    }
    if (this.Base.getMyData().shsf == true) {
      this.Base.setMyData({
        shsf: false,
        shaixuan1: false
      });

    } else {

      this.Base.setMyData({
        shsf: true,
        shaixuan1: true
      });
    }
  }
  ymlb() {
    if (this.Base.getMyData().shaixuan1 == true) {
      this.guanbi1();
      return
    }
    if (this.Base.getMyData().ymlb == true) {
      this.Base.setMyData({
        ymlb: false,
        shaixuan1: false
      });

    } else {

      this.Base.setMyData({
        ymlb: true,
        shaixuan1: true
      });
    }

  }
  zjxz() {
    if (this.Base.getMyData().shaixuan == true) {
      this.guanbi();
      return
    }
    if (this.Base.getMyData().zjxz == true) {
      this.Base.setMyData({
        zjxz: false,
        shaixuan: false
      });

    } else {

      this.Base.setMyData({
        zjxz: true,
        shaixuan: true
      });
    }
  }
  fcpx() {
    if (this.Base.getMyData().shaixuan == true) {
      this.guanbi();
      return
    }
    if (this.Base.getMyData().fcpx == true) {
      this.Base.setMyData({
        fcpx: false,
        shaixuan: false
      });

    } else {

      this.Base.setMyData({
        fcpx: true,
        shaixuan: true
      });
    }

  }
  guanbi() {
    this.Base.setMyData({
      qqxz: false,
      zjxz: false,
      shaixuan: false,
      fxxz: false,
      fcpx: false
    })
  }
  guanbi1() {
    this.Base.setMyData({
      qqxz1: false,
      shsf: false,
      shaixuan1: false,
      ymlb: false,
      ympx: false
    })
  }
  guanbi2() {
    this.Base.setMyData({
      shaixuan2: false,
      qqxz2: false,
      bxgs: false,
      bxlx: false,
      bxpx: false,

    })

  }
  jiagequedin() {

    var xzjiage = this.Base.getMyData().xzjiage[0];


    this.Base.setMyData({

      zonjia: {
        name: xzjiage.name,
        pricesection_id: xzjiage.id
      }

    })
    this.getfanchan();
    this.guanbi();

  }
  fanxinquedin(e) {

    var id = e.currentTarget.dataset.id;
    if (id == 0) {
      this.Base.setMyData({

        leixin: {
          name: '不限类型',
          housetype: 0
        }

      })
      this.getfanchan();
      this.guanbi();
      return
    }

    var xzfanxin = this.Base.getMyData().xzfanxin[0];




    this.Base.setMyData({

      leixin: {
        name: xzfanxin.name,
        housetype: xzfanxin.id
      }

    })
    this.getfanchan();
    this.guanbi();

  }

  baoxianguojiaquedin(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 0) {
      this.Base.setMyData({

        quanqiu2: {
          name: '不限类型',
          baoxianguojia_id: 0
        }

      })
      this.getbaoxian();
      this.guanbi2();
      return
    }

    var xzbxgjlist = this.Base.getMyData().xzbxgjlist[0];




    this.Base.setMyData({

      quanqiu2: {
        name: xzbxgjlist.name,
        baoxianguojia_id: xzbxgjlist.id
      }

    })
    this.getbaoxian();
    this.guanbi2();
  }

  baoxiangonsiquedin(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 0) {
      this.Base.setMyData({

        baoxiangonsi: {
          name: '不限类型',
          baoxiangonsi_id: 0
        }

      })
      this.getbaoxian();
      this.guanbi2();
      return
    }

    var xzbxgslist = this.Base.getMyData().xzbxgslist[0];




    this.Base.setMyData({

      baoxiangonsi: {
        name: xzbxgslist.name,
        baoxiangonsi_id: xzbxgslist.id
      }

    })
    this.getbaoxian();
    this.guanbi2();
  }

  baoxianleixinquedin(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 0) {
      this.Base.setMyData({

        baoxianleixin: {
          name: '不限类型',
          baoxianleixin_id: 0
        }

      })
      this.getbaoxian();
      this.guanbi2();
      return
    }

    var xzbxlxlist = this.Base.getMyData().xzbxlxlist[0];




    this.Base.setMyData({

      baoxianleixin: {
        name: xzbxlxlist.name,
        baoxianleixin_id: xzbxlxlist.id
      }

    })
    this.getbaoxian();
    this.guanbi2();
  }
  shenfenquedin(e) {

    var id = e.currentTarget.dataset.id;
    if (id == 0) {
      this.Base.setMyData({

        suohuoshenfen: {
          name: '不限类型',
          shenfenleixin: ''
        }

      })
      this.getyimin();
      this.guanbi1();
      return
    }

    var xzshenfen = this.Base.getMyData().xzshenfen;




    this.Base.setMyData({

      suohuoshenfen: {
        name: xzshenfen,
        shenfenleixin: xzshenfen
      }

    })
    this.getyimin();
    this.guanbi1();

  }
  yiminquedin(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 0) {
      this.Base.setMyData({

        yiminleibie: {
          name: '不限类型',
          yiminleixin: ''
        }

      })
      this.getyimin();
      this.guanbi1();
      return
    }

    var xzyimin = this.Base.getMyData().xzyimin;




    this.Base.setMyData({

      yiminleibie: {
        name: xzyimin,
        yiminleixin: xzyimin
      }

    })
    this.getyimin();
    this.guanbi1();

  }
  fanchanshanchu(e) {
    var id = e.currentTarget.dataset.id;

    if (id == 1) {
      this.Base.setMyData({
        quanqiu: null
      })
    }
    if (id == 2) {
      this.Base.setMyData({
        zonjia: null
      })
    }
    if (id == 3) {
      this.Base.setMyData({
        leixin: null
      })
    }
    if (id == 4) {
      this.Base.setMyData({
        paixu: null
      })
    }
    this.getfanchan();


  }
  baoxianshanchu(e) {
    var id = e.currentTarget.dataset.id;

    if (id == 1) {
      this.Base.setMyData({
        quanqiu2: null
      })
    }
    if (id == 2) {
      this.Base.setMyData({
        baoxiangonsi: null
      })
    }
    if (id == 3) {
      this.Base.setMyData({
        baoxianleixin: null
      })
    }
    if (id == 4) {
      this.Base.setMyData({
        baoxianpaixu: null
      })
    }
    this.getbaoxian();

  }
  yiminshanchu(e) {
    var id = e.currentTarget.dataset.id;

    if (id == 1) {
      this.Base.setMyData({
        quanqiu1: null
      })
    }
    if (id == 2) {
      this.Base.setMyData({
        suohuoshenfen: null
      })
    }
    if (id == 3) {
      this.Base.setMyData({
        yiminleibie: null
      })
    }
    if (id == 4) {
      this.Base.setMyData({
        paixu1: null
      })
    }
    this.getyimin();


  }
  yiminpaixu(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 0) {
      this.Base.setMyData({
        paixu1: {
          name: '佣金低到高',
          orderby: 'commissionrate'
        }
      })
    }
    if (id == 1) {
      this.Base.setMyData({
        paixu1: {
          name: '佣金高到低',
          orderby: 'commissionrate desc'
        }
      })
    }
    this.guanbi1();
    this.getyimin();
  }
  baoxianpaixu(e)
  {
    var id = e.currentTarget.dataset.id;
    if (id == 0) {
      this.Base.setMyData({
        baoxianpaixu: {
          name: '佣金低到高',
          orderby: 'commissionrate'
        }
      })
    }
    if (id == 1) {
      this.Base.setMyData({
        baoxianpaixu: {
          name: '佣金高到低',
          orderby: 'commissionrate desc'
        }
      })
    }
    this.guanbi2();
    this.getbaoxian();

  }
  fanchanpaixu(e) {

    var id = e.currentTarget.dataset.id;
    console.log(id);
    if (id == 0) {
      this.Base.setMyData({
        paixu: {
          name: '默认',
          orderby: ''
        }
      })
    }
    if (id == 1) {
      this.Base.setMyData({
        paixu: {
          name: '最新',
          orderby: 'created_date desc'
        }
      })
    }
    if (id == 2) {
      this.Base.setMyData({
        paixu: {
          name: '总价最低',
          orderby: 'displayprice '
        }
      })
    }
    if (id == 3) {
      this.Base.setMyData({
        paixu: {
          name: '总价最高',
          orderby: 'displayprice desc'
        }
      })
    }
    if (id == 4) {
      this.Base.setMyData({
        paixu: {
          name: '单价最高',
          orderby: 'unitprice  desc'
        }
      })
    }
    if (id == 5) {
      this.Base.setMyData({
        paixu: {
          name: '单价最低',
          orderby: 'unitprice'
        }
      })
    }

    this.guanbi();
    this.getfanchan();
  }
  xzsf(e) {

    var id = e.currentTarget.dataset.id;
    this.Base.setMyData({
      xzsf: id
    });
    if (id == 1) {
      this.Base.setMyData({
        xzshenfen: '永久居民'
      })
    }
    if (id == 2) {
      this.Base.setMyData({
        xzshenfen: '居留签证'
      })
    }
    if (id == 3) {
      this.Base.setMyData({
        xzshenfen: '工作签证'
      })
    }
    if (id == 4) {
      this.Base.setMyData({
        xzshenfen: '入籍政策'
      })
    }

  }
  xzym(e) {
    var id = e.currentTarget.dataset.id;
    this.Base.setMyData({
      xzym: id
    });
    if (id == 1) {
      this.Base.setMyData({
        xzyimin: '投资移民'
      })
    }
    if (id == 2) {
      this.Base.setMyData({
        xzyimin: '商业移民'
      })
    }
    if (id == 3) {
      this.Base.setMyData({
        xzyimin: '技术移民'
      })
    }
    if (id == 4) {
      this.Base.setMyData({
        xzyimin: '签证'
      })
    }
  }
  ympx() {
    if (this.Base.getMyData().shaixuan1 == true) {
      this.guanbi1();
      return
    }
    if (this.Base.getMyData().ympx == true) {
      this.Base.setMyData({
        ympx: false,
        shaixuan1: false
      });

    } else {

      this.Base.setMyData({
        ympx: true,
        shaixuan1: true
      });
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getguojia = content.getguojia;
body.towerEnd = content.towerEnd;
body.xzguojia = content.xzguojia;
body.xzguojia1 = content.xzguojia1;
body.towerMove = content.towerMove;
body.towerStart = content.towerStart;
body.towerSwiper = content.towerSwiper;
body.getkaifashan = content.getkaifashan;
body.switchindex = content.switchindex;
body.fanchanpaixu = content.fanchanpaixu;
body.yiminpaixu = content.yiminpaixu;
body.productinfo = content.productinfo;
body.towerclick = content.towerclick;
body.getfanchan = content.getfanchan;
body.kaifashaninfo = content.kaifashaninfo;
body.getyimin = content.getyimin;
body.getbaoxian = content.getbaoxian;
body.yimininfo = content.yimininfo;
body.baoxianinfo = content.baoxianinfo;
body.xzshi = content.xzshi;
body.xzqj = content.xzqj;
body.guanbi2 = content.guanbi2;
body.qqxz = content.qqxz;
body.qqxz1 = content.qqxz1;
body.zjxz = content.zjxz;
body.fxxz = content.fxxz;
body.guanbi = content.guanbi;
body.guanbi1 = content.guanbi1;
body.getjiagequjian = content.getjiagequjian;
body.getfanxin = content.getfanxin;
body.xzfx = content.xzfx;
body.fcpx = content.fcpx;
body.fanxinquedin = content.fanxinquedin;
body.shanchu = content.shanchu;
body.jiagequedin = content.jiagequedin;
body.xzchenshi = content.xzchenshi;
body.xzchenshi1 = content.xzchenshi1;
body.search = content.search;
body.fanchanshanchu = content.fanchanshanchu;
body.yiminshanchu = content.yiminshanchu;
body.shsf = content.shsf;
body.xzym = content.xzym;
body.ymlb = content.ymlb;
body.yiminquedin = content.yiminquedin;
body.xzsf = content.xzsf;
body.shenfenquedin = content.shenfenquedin;
body.ympx = content.ympx;
body.getbaoxiande = content.getbaoxiande;
body.qqxz2 = content.qqxz2;
body.bxgs = content.bxgs;
body.bxlx = content.bxlx;
body.bxpx = content.bxpx;
body.xzbxgj = content.xzbxgj;
body.xzbxgs=content.xzbxgs;
body.xzbxlx=content.xzbxlx;
body.baoxianshanchu = content.baoxianshanchu;
body.baoxianguojiaquedin = content.baoxianguojiaquedin;
body.baoxiangonsiquedin=content.baoxiangonsiquedin;
body.baoxianleixinquedin = content.baoxianleixinquedin; 
body.baoxianpaixu = content.baoxianpaixu;
body.projectinfo = content.projectinfo;
Page(body)