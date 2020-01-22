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
  }
  onMyShow() {
    var that = this;
    this.getmybank();
  }
  getmybank(){
    var api = new MemberApi;
    var that =this;
 
    api.mybank({member_id:this.Base.getMyData().memberinfo.id},(mybank)=>{
      console.log(mybank)
      for(var i=0;i<mybank.length;i++){
        mybank[i].lastnum = mybank[i].banknum.substring(mybank[i].banknum.length-4, mybank[i].banknum.length);
        if (i % 2 === 0 ){
          mybank[i].background = 'linear-gradient(314deg, rgba(46, 142, 254, 1) 0%, rgba(27, 174, 241, 1) 100%)';
        } else  {
          mybank[i].background = 'linear-gradient(314deg,rgba(255,144,116,1) 0%,rgba(255,106,106,1) 100%)';
        }
      }
      that.Base.setMyData({
        mybank
      })
    })

  }
  bang(){
    wx.navigateTo({
      url: '/pages/addbank/addbank',
    })
  }
  detail(e){
    console.log(e);
    var id = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '/pages/addbank/addbank?id='+id,
    })
  }
  deletes(e){
    console.log(e);
    var id = e.currentTarget.dataset.current;
    var api=new MemberApi;
    var that = this;
    api.detelebank({
      member_id:this.Base.getMyData().memberinfo.id,
      id: id
    },(ret)=>{
      console.log(ret)
      if(ret.code=='0'){
        that.onMyShow();
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.getmybank = content.getmybank;
body.bang = content.bang;
body.detail = content.detail;
body.deletes = content.deletes;

Page(body)