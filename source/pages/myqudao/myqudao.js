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
    this.Base.setMyData({ tab: 0 ,chenjiaodanshu:false})
  }
  onMyShow() {
    var that = this;
    var api=new MemberApi();
    api.myyaoqin({},(myyaoqin)=>{
  
       this.Base.setMyData({myyaoqin,myyaoqin1:myyaoqin})

    })

    var api=new MemberApi();
    api.yaoqinxianqin({id:this.Base.getMyData().memberinfo.id,asd:'1'},(qudaoxianqin)=>{

        this.Base.setMyData({qudaoxianqin});

    })

  }
  switchtab(e) {
    console.log(e);
    this.Base.setMyData({ tab: e.currentTarget.id })
  }
  qudaoinfo(e){

    wx.navigateTo({
      url: '/pages/qudaoinfo/qudaoinfo?id='+e.currentTarget.dataset.id,
    })

  }
  renzhenzhuantai(){
    this.Base.setMyData({renzhenzhuantai:true})
  }
  chenjiaodanshu(){

    this.Base.setMyData({chenjiaodanshu:true})
  }
  kehushulian(){
    this.Base.setMyData({kehushulian:true})
  }
  xiaoshouleixin(){
    this.Base.setMyData({xiaoshouleixin:true})

  }
  danshupaixu(e)
  {
var id=e.currentTarget.dataset.id;
     var myyaoqin=this.Base.getMyData().myyaoqin;
if(id==0)
{
     myyaoqin.sort((a,b)=>{
      var a=a.gerendindan;
      var b=b.gerendindan;
      if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }   

     })
    }
    else{
      myyaoqin.sort((b,a)=>{
        var a=a.gerendindan;
        var b=b.gerendindan;
        if (a < b) {
          return -1;
      } else if (a > b) {
          return 1;
      } else {
          return 0;
      }   
  
       })

    }
  this.Base.setMyData({myyaoqin})
  this.guanbi();

  }

  kehupaixu(e)
  {
var id=e.currentTarget.dataset.id;
     var myyaoqin=this.Base.getMyData().myyaoqin;
if(id==0)
{
     myyaoqin.sort((a,b)=>{
      var a=a.gerenkehu;
      var b=b.gerenkehu;
      if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }   

     })
    }
    else{
      myyaoqin.sort((b,a)=>{
        var a=a.gerenkehu;
        var b=b.gerenkehu;
        if (a < b) {
          return -1;
      } else if (a > b) {
          return 1;
      } else {
          return 0;
      }   
  
       })

    }
  this.Base.setMyData({myyaoqin})
  this.guanbi();

  }
  guanbi(){

    this.Base.setMyData({

      chenjiaodanshu:false,
      kehushulian:false,
      renzhenzhuantai:false,
      xiaoshouleixin:false
    })

  }
  zhuantaishaixuan(e)
  {
    var id=e.currentTarget.dataset.id;
     var api=new MemberApi();
    api.myyaoqin({renzhenzhuantai:id},(myyaoqin)=>{
  
      this.Base.setMyData({myyaoqin})

   })
   this.guanbi();

  }
  leixinshaixuan(e)
  {
    var api=new MemberApi();
    api.myyaoqin({xiaoshouleixin:e.currentTarget.dataset.name},(myyaoqin)=>{
  
      this.Base.setMyData({myyaoqin})

   })
   this.guanbi();

  }

  searchtext(e){
    var list=this.Base.getMyData().myyaoqin1;
 
      var list1=[];
      var fanchanlist1=[];
      var yiminlist1=[];
      var baoxianlist1=[];
      console.log(list);
    list.map((item)=>{
      console.log(item.p_member_id_nickName.search(e.detail.value));
      if(item.p_member_id_nickName.search(e.detail.value)>=0)
      {
        
        list1.push(item);
      }

 

    })
    if(e.detail.value=='')
    {
      list1=list;
    }
   
      
 this.Base.setMyData({myyaoqin:list1})
     
 
   

}
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.switchtab = content.switchtab;
body.qudaoinfo=content.qudaoinfo;
body.chenjiaodanshu=content.chenjiaodanshu;
body.danshupaixu=content.danshupaixu;
body.guanbi=content.guanbi;
body.kehushulian=content.kehushulian;
body.kehupaixu=content.kehupaixu;
body.renzhenzhuantai=content.renzhenzhuantai;
body.zhuantaishaixuan=content.zhuantaishaixuan;
body.leixinshaixuan=content.leixinshaixuan;
body.xiaoshouleixin=content.xiaoshouleixin;
body.searchtext=content.searchtext;
Page(body)