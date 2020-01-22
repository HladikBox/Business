// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      ks:false
    })
  }
  onMyShow() {
     var a=1;
     var b=2;
     var c=3;
     var d=4;
     var e=5;
    
    var  k=a>b?c:d>e?d:e;
    console.log(k);
    var that = this;
    var api=new MemberApi();
       api.kehuinfo({id:this.Base.options.id},(kehuinfo)=>{
  
          this.Base.setMyData({kehuinfo,type:[]})

       })
  }
  kaishi(e){
    console.log(e)
    var cur = e.currentTarget.id;
    console.log(cur)
    var api = new MemberApi();
    var that = this;
    var type=this.Base.getMyData().type;
    type.push(cur);
    
    if(cur=='ks'){
      this.Base.setMyData({ ks: true, type });
    } else if (cur == 'jsgj'){
      this.Base.setMyData({ jsgj: true, type});
    } else if (cur == 'jscs') {
      this.Base.setMyData({ jscs: true, type});
    } else if (cur == 'jsxm') {
      this.Base.setMyData({ jsxm: true, type });
    } else if (cur == 'jshx') {
      this.Base.setMyData({ jshx: true, type});
    } else if (cur == 'khhq') {
      this.Base.setMyData({ khhq: true, type});
    } else if (cur == 'fxsm') {
      this.Base.setMyData({ fxsm: true, type });
    } else if (cur == 'kf') {
      this.Base.setMyData({ kf: true, type });
    } else if (cur == 'js') {
      this.Base.setMyData({ js: true, type });
    } else if (cur == 'jbxx') {
      this.Base.setMyData({ jbxx: true, type });
    } else if (cur == 'ymgj') {
      this.Base.setMyData({ ymgj: true, type });
    } else if (cur == 'ymxm') {
      this.Base.setMyData({ ymxm: true, type });
    } else if (cur == 'ymtj') {
      this.Base.setMyData({ ymtj: true, type });
    } else if (cur == 'ymkc') {
      this.Base.setMyData({ ymkc: true, type });
    } else if (cur == 'bxcp') {
      this.Base.setMyData({ bxcp: true, type });
    } else if (cur == 'khpg') {
      this.Base.setMyData({ khpg: true, type });
    } else if (cur == 'bxjhs') {
      this.Base.setMyData({ bxjhs: true, type });
    } else if (cur == 'yyqy') {
      this.Base.setMyData({ yyqy: true, type });
    }

    // if(cur=='ks2'){
    //   this.Base.setMyData({ ks2: true, type });
    // } else if (cur == 'xdqdgb') {
    //   this.Base.setMyData({ xdqdgb: true, type });
    // } else if (cur == 'htfsk') {
    //   this.Base.setMyData({ htfsk: true, type });
    // } else if (cur == 'khsfk') {
    //   this.Base.setMyData({ khsfk: true, type });
    // } else if (cur == 'qdght') {
    //   this.Base.setMyData({ qdght: true, type });
    // } else if (cur == 'jhhtz') {
    //   this.Base.setMyData({ jhhtz: true, type });
    // } else if (cur == 'jhht') {
    //   this.Base.setMyData({ jhht: true, type });
    // } else if (cur == 'sfdk') {
    //   this.Base.setMyData({ sfdk: true, type });
    // } else if (cur == 'ddjf') {
    //   this.Base.setMyData({ ddjf: true, type });
    // } else if (cur == 'jfwc') {
    //   this.Base.setMyData({ jfwc: true, type });
    // } else if (cur == 'js2') {
    //   this.Base.setMyData({ js2: true, type });
    // } else if (cur =='xdqydb'){
    //   this.Base.setMyData({ xdqydb: true, type });
    // } else if (cur == 'qdzsht') {
    //   this.Base.setMyData({ qdzsht: true, type });
    // } else if (cur == 'ymsqcl') {
    //   this.Base.setMyData({ ymsqcl: true, type });
    // } else if (cur == 'dlqdsq') {
    //   this.Base.setMyData({ dlqdsq: true, type });
    // } else if (cur == 'sftzl') {
    //   this.Base.setMyData({ sftzl: true, type });
    // } else if (cur == 'hpsw') {
    //   this.Base.setMyData({ hpsw: true, type });
    // } else if (cur == 'ymbj') {
    //   this.Base.setMyData({ ymbj: true, type });
    // } else if (cur == 'sgbx') {
    //   this.Base.setMyData({ sgbx: true, type });
    // } else if (cur == 'sftj') {
    //   this.Base.setMyData({ sftj: true, type });
    // } else if (cur == 'qdbxht') {
    //   this.Base.setMyData({ qdbxht: true, type });
    // } else if (cur == 'khsdbd') {
    //   this.Base.setMyData({ khsdbd: true, type });
    // } else if (cur == 'blwj') {
    //   this.Base.setMyData({ blwj: true, type });
    // } 
  }
  tijiao(){
    var arr = this.Base.getMyData().type;
    for(var i=0;i<arr.length;i++){
        this.xiugai(arr[i],i)
    }
    
  }
  xiugai(cur,i){
    var api = new MemberApi();
    var that = this;
    setTimeout(()=>{
      api.genjinliucheng({
        type: cur,
        id: this.Base.options.id
      }, (genjinliucheng) => {
        console.log(genjinliucheng)
        if (genjinliucheng.code == '0') {
          that.onMyShow();
        }
      })
    },i*300)
   
  }
  shanchu(){
    var api = new MemberApi();
    var that = this;

    wx.showModal({
      title: '提示',
      content: '您是否要删除该用户',
      confirmText: "是",
      cancelText:'否',
      success: function (res) {
        if(res.confirm){
          api.deletekehu({
            id: that.Base.options.id
          }, (deletekehu) => {
            console.log(deletekehu)
            if (deletekehu.code == '0') {
              that.backPage();
            }
          })
        }
      }
    })

    
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.kaishi = content.kaishi;
body.tijiao = content.tijiao;
body.xiugai = content.xiugai;
body.shanchu = content.shanchu;
Page(body)