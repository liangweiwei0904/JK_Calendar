// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"lwwldx-5g8powrn59ec579e"
})
// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const _ = db.command;
  //更新发布时间距离现在的差
  db.collection('Message').where({
    temp:1
  })
  .update({
    data: {
    //json文件设置触发器，每过两小时便执行此云函数
    //将每条帖子的发布时间+2
    subhour: _.inc(2),
    
    }
  })
  .then(res=>{
    console.log("成功",res);
  })
  .catch(res=>{
    console.log("失败",res);
  })

  //更新热度值
  var v=[];
  db.collection('Message').where({
    temp:1
  })
  .get()
  .then(res=>{
    reslen=res.data.length;
    for(var i=0;i<reslen;i++){
      v.push(((res.data[i].visit)*3+(res.data[i].comments.length)*7)/(res.data[i].subhour+2)*(res.data[i].subhour+2));
      //获取到id
      var id=res.data[i]._id;
      //把这个值插回数据库
      db.collection("Message").doc(id).update({
        data:{
          hotNum:v[i]
        }
      })
      .then(res1=>{
        console.log("res1成功",res1);
      })
      .catch(res1=>{
        console.log("res2失败",res1);
      })
    }
    
    // t=res.data[0].subhour;
    // console.log("t",t);
    console.log("v",v);
  })




  // cloud.database().collection("Message").doc("28ee4e3e6056f2f80bc8c4cc67367e22").get()
  // .then(res=>{
    // //console.log("触发器获取时间",res);
    // postdatetime=res.data.post_detail_time;
    // console.log("postdatetime",postdatetime);
    // //var currenttime=new Date();
    // var posttime="2021/04/18 16:50:10";
    // var mms_posttime = (new Date(postdatetime)).getTime()-28800000; //获取时间戳  
    // var mms_currenttime=new Date().getTime();
    // //打印服务器时间
    // var servertime=new Date(mms_currenttime);
    // console.log("servertime",servertime);
    // //计算相减之后的毫秒数，从而得出小时差
    // var sub=mms_currenttime-mms_posttime;
    // console.log("发布时间",mms_posttime,"当前时间",mms_currenttime,"毫秒差",sub);
    // //转化为小时差
    // var sub_hour=sub/3600000;
    // console.log("小时差",sub_hour);
    // sub_hour=parseInt(sub_hour);
    // console.log("小时差",sub_hour);
  // })

    
  
}
