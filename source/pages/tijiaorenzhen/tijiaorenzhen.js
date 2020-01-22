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

    var api = new MemberApi();
    api.renzheninfo({}, (renzheninfo) => {

      if (renzheninfo[0] != null) {

        this.Base.setMyData({
          name: renzheninfo[0].name,
          idc: renzheninfo[0].idnumber,
          benrenimg: renzheninfo[0].photo,
          zhenmian: renzheninfo[0].zhengmian,
          beimian: renzheninfo[0].fanmian,
          renzheninfo: renzheninfo[0]

        })


      } else {
        this.Base.setMyData({
          name: '',
          idc: '',
          benrenimg: '',
          zhenmian: '',
          beimian: '',

        })

      }


    })

    this.getshenfenzhen();


    this.projecttypelist();
    this.goodtypelist();
    this.getguojia();
    this.workingyearslist();
    this.salesnumlist();

  }
  onMyShow() {
    var that = this;

  }

  name(e) {
    this.Base.setMyData({
      name: e.detail.value
    })
  }
  idc(e) {
    this.Base.setMyData({
      idc: e.detail.value
    })
  }
  getshenfenzhen() {
    var api = new MemberApi();
    api.zhenjianleixin({}, (leixin) => {

      this.Base.setMyData({
        leixin,
        index: 0
      })

    })


  }
  bindsfzChange(e) {
    console.log(e);
    this.Base.setMyData({
      index: e.detail.value
    })

  }
  benrenimg() {
    var that = this;
    this.Base.uploadImage("renzhen", (ret) => {
      console.log(ret);
      that.Base.setMyData({
        benrenimg: ret
      });
    }, undefined);
  }
  zhenmian() {

    var that = this;
    this.Base.uploadImage("renzhen", (ret) => {
      console.log(ret);
      that.Base.setMyData({
        zhenmian: ret
      });
    }, undefined);
  }
  beimian() {
    var that = this;
    this.Base.uploadImage("renzhen", (ret) => {
      console.log(ret);
      that.Base.setMyData({
        beimian: ret
      });
    }, undefined);

  }
  tijiao() {
    var name = this.Base.getMyData().name;

    var idtype_id = this.Base.getMyData().leixin[this.Base.getMyData().index].id;

    var idnumber = this.Base.getMyData().idc;

    var photo = this.Base.getMyData().benrenimg;

    var zhengmian = this.Base.getMyData().zhenmian;

    var fanmian = this.Base.getMyData().beimian;

    var projecttypelist = this.Base.getMyData().projecttypelist;

    var goodtypelist = this.Base.getMyData().goodtypelist;

    var guojialist = this.Base.getMyData().guojialist;
    var workingyearslist = this.Base.getMyData().workingyearslist;
    var salesnumlist = this.Base.getMyData().salesnumlist;

    var saletype = [];
    projecttypelist.map((item) => {
      if (item.xz == 'true') {
        saletype.push(item.id);
      }
    });
    saletype = saletype.join(',');

    var goodtype = [];
    goodtypelist.map((item) => {
      if (item.xz == 'true') {
        goodtype.push(item.id);
      }
    });
    goodtype = goodtype.join(',');

    var country = [];
    guojialist.map((item) => {
      if (item.xz == 'true') {
        country.push(item.id);
      }
    });
    country = country.join(',');






    var workingyears_id = workingyearslist.filter((item) => {

      return item.xz == 'true'

    });
    var salesnum_id = salesnumlist.filter((item) => {

      return item.xz == 'true'

    });
    console.log(workingyears_id);

    if (saletype == '') {

      this.Base.info("请至少选择一个销售类型");
      return
    }

    if (name == '') {
      this.Base.info("请输入真实姓名");
      return
    }

    if (idnumber == '') {
      this.Base.info("请输入身份证号");
      return
    }
    if (photo == '') {
      this.Base.info("请上传本人照片");
      return
    }
    if (zhengmian == '') {
      this.Base.info("请上传身份证正面照片");
      return
    }
    if (fanmian == '') {
      this.Base.info("请上传身份证反面照片");
      return
    }
    var renzheninfo = this.Base.getMyData().renzheninfo;



    var api = new MemberApi();

    console.log(saletype);
    console.log(goodtype);
    console.log(country);

    wx.showModal({
      title: '提示',
      content: "是否提交",
      cancelText:'取消',
      confirmText:'确认',
      success(res) {
        if (!res.cancel) {
          if (renzheninfo == undefined || renzheninfo.shstatus != 'C') {
            api.addrenzhen({
              name: name,
              idtype_id: idtype_id,
              idnumber: idnumber,
              photo: photo,
              zhengmian: zhengmian,
              fanmian: fanmian,
              salesnum_id: salesnum_id.length == 0 ? '-1' : salesnum_id[0].id,
              workingyears_id: workingyears_id.length == 0 ? '-1' : workingyears_id[0].id,
              saletype: saletype,
              goodtype: goodtype,
              country: country


            }, (res) => {


              if (res.code == '0') {
                wx.navigateTo({
                  url: '/pages/renzhentijiao/renzhentijiao',
                })

              }



            })

          } else {
            api.addrenzhen({
              primary_id: renzheninfo.id,
              name: name,
              idtype_id: idtype_id,
              idnumber: idnumber,
              photo: photo,
              zhengmian: zhengmian,
              fanmian: fanmian,
              salesnum_id: salesnum_id.length == 0 ? '-1' : salesnum_id[0].id,
              workingyears_id: workingyears_id.length == 0 ? '-1' : workingyears_id[0].id,
              saletype: saletype,
              goodtype: goodtype,
              country: country
            }, (res) => {


              if (res.code == '0') {
                wx.navigateTo({
                  url: '/pages/renzhentijiao/renzhentijiao',
                })
              }



            })

          }


        }


      }
    })






  }

  projecttypetap(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;

    var projecttypelist = this.Base.getMyData().projecttypelist;
    projecttypelist.map((item) => {

      if (item.id == id) {

        item.xz = item.xz == 'true' ? 'false' : 'true';
      }


    })

    this.Base.setMyData({
      projecttypelist
    })
  }
  goodtypelisttap(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;

    var goodtypelist = this.Base.getMyData().goodtypelist;
    goodtypelist.map((item) => {

      if (item.id == id) {

        item.xz = item.xz == 'true' ? 'false' : 'true';
      }


    })

    this.Base.setMyData({
      goodtypelist
    })
  }
  guojialisttap(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;

    var guojialist = this.Base.getMyData().guojialist;
    guojialist.map((item) => {

      if (item.id == id) {

        item.xz = item.xz == 'true' ? 'false' : 'true';
      }


    })

    this.Base.setMyData({
      guojialist
    })

  }

  workingyearstap(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;

    var workingyearslist = this.Base.getMyData().workingyearslist;
    workingyearslist.map((item) => {

      if (item.id == id) {

        item.xz = 'true';
      } else {
        item.xz = 'false';
      }


    })

    this.Base.setMyData({
      workingyearslist
    })

  }

  salesnumlisttap(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;

    var salesnumlist = this.Base.getMyData().salesnumlist;
    salesnumlist.map((item) => {

      if (item.id == id) {

        item.xz = 'true';
      } else {
        item.xz = 'false';
      }


    })

    this.Base.setMyData({
      salesnumlist
    })

  }
  workingyearslist() {
    var api = new InstApi;
    api.workingyearslist({}, (workingyearslist) => {

      this.Base.setMyData({
        workingyearslist
      });

    })

  }
  projecttypelist() {
    var api = new InstApi;
    api.projecttypelist({}, (projecttypelist) => {

      this.Base.setMyData({
        projecttypelist
      });

    })
  }
  salesnumlist() {
    var api = new InstApi;
    api.salesnumlist({}, (salesnumlist) => {

      this.Base.setMyData({
        salesnumlist
      });

    })
  }

  goodtypelist() {
    var api = new InstApi;
    api.goodtypelist({}, (goodtypelist) => {

      this.Base.setMyData({
        goodtypelist
      });

    })
  }
  getguojia() {
    var api = new InstApi;
    api.getguojia({}, (guojialist) => {

      this.Base.setMyData({
        guojialist
      });

    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getshenfenzhen = content.getshenfenzhen;
body.bindsfzChange = content.bindsfzChange;
body.name = content.name;
body.idc = content.idc;
body.benrenimg = content.benrenimg;
body.beimian = content.beimian;
body.zhenmian = content.zhenmian;
body.tijiao = content.tijiao;
body.getguojia = content.getguojia;
body.projecttypelist = content.projecttypelist;
body.projecttypetap = content.projecttypetap;
body.goodtypelist = content.goodtypelist;
body.goodtypelisttap = content.goodtypelisttap;
body.guojialisttap = content.guojialisttap;
body.workingyearslist = content.workingyearslist;
body.workingyearstap = content.workingyearstap;
body.salesnumlist = content.salesnumlist;
body.salesnumlisttap = content.salesnumlisttap;
Page(body)