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
    // options.id=2 ;
    super.onLoad(options);
  }
  onMyShow() {


    var banks = {
      "CDB": "国家开发银行",
      "ICBC": "中国工商银行",
      "ABC": "中国农业银行",
      "BOC": "中国银行",
      "CCB": "中国建设银行",
      "PSBC": "中国邮政储蓄银行",
      "COMM": "交通银行",
      "CMB": "招商银行",
      "SPDB": "上海浦东发展银行",
      "CIB": "兴业银行",
      "HXBANK": "华夏银行",
      "GDB": "广东发展银行",
      "CMBC": "中国民生银行",
      "CITIC": "中信银行",
      "CEB": "中国光大银行",
      "EGBANK": "恒丰银行",
      "CZBANK": "浙商银行",
      "BOHAIB": "渤海银行",
      "SPABANK": "平安银行",
      "SHRCB": "上海农村商业银行",
      "YXCCB": "玉溪市商业银行",
      "YDRCB": "尧都农商行",
      "BJBANK": "北京银行",
      "SHBANK": "上海银行",
      "JSBANK": "江苏银行",
      "HZCB": "杭州银行",
      "NJCB": "南京银行",
      "NBBANK": "宁波银行",
      "HSBANK": "徽商银行",
      "CSCB": "长沙银行",
      "CDCB": "成都银行",
      "CQBANK": "重庆银行",
      "DLB": "大连银行",
      "NCB": "南昌银行",
      "FJHXBC": "福建海峡银行",
      "HKB": "汉口银行",
      "WZCB": "温州银行",
      "QDCCB": "青岛银行",
      "TZCB": "台州银行",
      "JXBANK": "嘉兴银行",
      "CSRCB": "常熟农村商业银行",
      "NHB": "南海农村信用联社",
      "CZRCB": "常州农村信用联社",
      "H3CB": "内蒙古银行",
      "SXCB": "绍兴银行",
      "SDEB": "顺德农商银行",
      "WJRCB": "吴江农商银行",
      "ZBCB": "齐商银行",
      "GYCB": "贵阳市商业银行",
      "ZYCBANK": "遵义市商业银行",
      "HZCCB": "湖州市商业银行",
      "DAQINGB": "龙江银行",
      "JINCHB": "晋城银行JCBANK",
      "ZJTLCB": "浙江泰隆商业银行",
      "GDRCC": "广东省农村信用社联合社",
      "DRCBCL": "东莞农村商业银行",
      "MTBANK": "浙江民泰商业银行",
      "GCB": "广州银行",
      "LYCB": "辽阳市商业银行",
      "JSRCU": "江苏省农村信用联合社",
      "LANGFB": "廊坊银行",
      "CZCB": "浙江稠州商业银行",
      "DYCB": "德阳商业银行",
      "JZBANK": "晋中市商业银行",
      "BOSZ": "苏州银行",
      "GLBANK": "桂林银行",
      "URMQCCB": "乌鲁木齐市商业银行",
      "CDRCB": "成都农商银行",
      "ZRCBANK": "张家港农村商业银行",
      "BOD": "东莞银行",
      "LSBANK": "莱商银行",
      "BJRCB": "北京农村商业银行",
      "TRCB": "天津农商银行",
      "SRBANK": "上饶银行",
      "FDB": "富滇银行",
      "CRCBANK": "重庆农村商业银行",
      "ASCB": "鞍山银行",
      "NXBANK": "宁夏银行",
      "BHB": "河北银行",
      "HRXJB": "华融湘江银行",
      "ZGCCB": "自贡市商业银行",
      "YNRCC": "云南省农村信用社",
      "JLBANK": "吉林银行",
      "DYCCB": "东营市商业银行",
      "KLB": "昆仑银行",
      "ORBANK": "鄂尔多斯银行",
      "XTB": "邢台银行",
      "JSB": "晋商银行",
      "TCCB": "天津银行",
      "BOYK": "营口银行",
      "JLRCU": "吉林农信",
      "SDRCU": "山东农信",
      "XABANK": "西安银行",
      "HBRCU": "河北省农村信用社",
      "NXRCU": "宁夏黄河农村商业银行",
      "GZRCU": "贵州省农村信用社",
      "FXCB": "阜新银行",
      "HBHSBANK": "湖北银行黄石分行",
      "ZJNX": "浙江省农村信用社联合社",
      "XXBANK": "新乡银行",
      "HBYCBANK": "湖北银行宜昌分行",
      "LSCCB": "乐山市商业银行",
      "TCRCB": "江苏太仓农村商业银行",
      "BZMD": "驻马店银行",
      "GZB": "赣州银行",
      "WRCB": "无锡农村商业银行",
      "BGB": "广西北部湾银行",
      "GRCB": "广州农商银行",
      "JRCB": "江苏江阴农村商业银行",
      "BOP": "平顶山银行",
      "TACCB": "泰安市商业银行",
      "CGNB": "南充市商业银行",
      "CCQTGB": "重庆三峡银行",
      "XLBANK": "中山小榄村镇银行",
      "HDBANK": "邯郸银行",
      "KORLABANK": "库尔勒市商业银行",
      "BOJZ": "锦州银行",
      "QLBANK": "齐鲁银行",
      "BOQH": "青海银行",
      "YQCCB": "阳泉银行",
      "SJBANK": "盛京银行",
      "FSCB": "抚顺银行",
      "ZZBANK": "郑州银行",
      "SRCB": "深圳农村商业银行",
    };

    var  cardTypeMap = {
      'DC': "储蓄卡",
      'CC': "信用卡",
      'SCC': "准贷记卡",
      'PC': "预付费卡"
    };

    console.log(banks.CDB,'OOO');
    var that = this;
    this.gettype();
    this.Base.setMyData({
       banks, cardTypeMap
    })
    if (this.Base.options.id != undefined) {
      this.getinfo();
    }
  }
  getinfo() {
    var api = new MemberApi;
    api.bankdetail({
      id: this.Base.options.id
    }, (bankdetail) => {
      console.log(bankdetail)
      this.Base.setMyData({
        usernames: bankdetail.name,
        banknums: bankdetail.banknum,
        name: bankdetail.banktype,
        zhname: bankdetail.banklei,
        bankdetail,
        kaihus: bankdetail.kaihu
      });
    })
  }
  gettype() {
    var api = new MemberApi;
    var that = this;
    api.banktype({}, (banktype) => {
      this.Base.setMyData({
        banktype,
        name: "",
        zhname: ''
      })
    })
  }
  tijiao() {
    var username = this.Base.getMyData().username;
    var name = this.Base.getMyData().name;
    var cardtype = this.Base.getMyData().zhname;
    var kaihu =this.Base.getMyData().kaihu;
    var banknum = this.Base.getMyData().banknum;
    var api = new MemberApi;
    var that = this;
    if (username == undefined || banknum == undefined || name == undefined || cardtype == undefined || username == "" || banknum == "" || name == "" || cardtype == "" || kaihu == undefined || kaihu == '') {
      wx.showToast({
        title: '信息未填完',
        icon: 'none'
      })
      return
    }
    if (banknum.length < 16 || banknum.length > 19) {
      wx.showToast({
        title: '银行卡号长度不对',
        icon: 'none'
      })
      return
    }
    var json = {
      member_id: this.Base.getMyData().memberinfo.id,
      name: username,
      banknum: banknum,
      banktype: name,
      banklei: cardtype,
      kaihu: kaihu
    };
    api.addbank(json, (ret) => {
      console.log(ret);
      if (ret.code == '0') {
        that.backPage();
      }
    })
  }
  bindbanknum(e) {
    var bankdetail = this.Base.getMyData().bankdetail;
    if(bankdetail!=undefined){
      bankdetail.banklei = '';
      bankdetail.banktype = ''
    }
   
    this.Base.setMyData({
      banknum: e.detail.value, name: '', zhname: '', bankdetail
    })
  }
  bindzh(e) {
    this.Base.setMyData({
      zh: e.detail.value
    })
  }
  bindkhh(e) {
    this.Base.setMyData({
      khh: e.detail.value
    })
  }
  bindname(e) {
    this.Base.setMyData({
      username: e.detail.value
    })
  }
  bindkaihu(e) {
    this.Base.setMyData({
      kaihu: e.detail.value
    })
  }
 
  tijiao2() {
    var username = this.Base.getMyData().username;
    var name = this.Base.getMyData().name;
    var cardtype = this.Base.getMyData().zhname;
    var kaihu = this.Base.getMyData().kaihu;
    var banknum = this.Base.getMyData().banknum;
    var detail = this.Base.getMyData().bankdetail;
    var api = new MemberApi;
    var that = this;
    if (username == undefined || username == '') {
      username = detail.name;
    }
    if (banknum == undefined || banknum == '') {
      banknum = detail.banknum;
    }
    if (name == undefined || name == '') {
      name = detail.banklei;
    }
    if (cardtype == undefined || cardtype == '') {
      cardtype = detail.banktype;
    }
    if (kaihu == undefined || kaihu == '') {
      kaihu = detail.banktype;
    }
    api.editbank({
      id: this.Base.options.id,
      name: username,
      banknum: banknum,
      banktype: cardtype,
      banklei: name,
      kaihu: kaihu
    }, (ret) => {
      console.log(ret)
      if (ret.code == '0') {
        wx.showToast({
          title: '修改成功',
          icon: 'none'
        })
        setTimeout(()=>{
          // wx.navigateTo({
          //   url: '/pages/mybank/mybank',
          // })
          that.backPage();
        },2000)
      }
    })
  }

  asdasd() {
    var yhk = this.Base.getMyData().banknum;
    var banks = this.Base.getMyData().banks;
    var cardTypeMap = this.Base.getMyData().cardTypeMap;
    var that = this;
    console.log(banks,'bank')
    wx.request({
      url: 'https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardBinCheck=true&cardNo=' + yhk,

      method: 'POST',
      dataType: 'json',

      success: function(res) {
        console.log(res, 'ppp');
        console.log(res.data.bank,'ppp');
        if (res.data.bank==undefined){
          wx.showToast({
            title: '银行卡输入错误，请重新输入！',
            icon:'none'
          })
          return
        }
        var bank = res.data.bank;
        var type = res.data.cardType;
        console.log(bank,type);
        var name = banks[bank];
        console.log(cardTypeMap[type]);
        that.Base.setMyData({
          name: banks[bank],
          zhname: cardTypeMap[type]
        })
      },

    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.tijiao = content.tijiao;
body.bindbanknum = content.bindbanknum;
body.bindzh = content.bindzh;
body.bindkhh = content.bindkhh;
body.bindname = content.bindname;
body.gettype = content.gettype;
body.pickerchange = content.pickerchange;
body.pickerchange2 = content.pickerchange2;
body.getinfo = content.getinfo;
body.tijiao2 = content.tijiao2;
body.bindkaihu = content.bindkaihu;
body.asdasd = content.asdasd;
Page(body)