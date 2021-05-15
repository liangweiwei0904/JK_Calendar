// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "lwwldx-5g8powrn59ec579e"
})
// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const _ = db.command;
  //更新发布时间距离现在的差
  db.collection('posts').where({ "_id": { $exists: true } })
    .update({ data: { subHour: _.inc(0.166), } })//更新所有帖子发布时间距离现在的小时差
    .then(res => {
      var v = [];
      db.collection('posts').where({ "_id": { $exists: true } }).get()
        .then(res => {
          for (var i = 0; i < res.data.length; i++) {
            db.collection("posts").doc(res.data[i]._id).update({ 
              data: { 
                hotNum: Math.ceil(((res.data[i].visit) * 30 + (res.data[i].comments.length) * 70) / (Math.pow((res.data[i].subHour + 2), 1.2)))
              } 
            })
          }
        })
    })
}
  // cloud.database().collection("posts").doc("28ee4e3e6056f2f80bc8c4cc67367e22").get()
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



//}
