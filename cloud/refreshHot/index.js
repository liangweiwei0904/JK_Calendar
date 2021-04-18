// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"lwwldx-5g8powrn59ec579e"
})
// 云函数入口函数
exports.main = async (event, context) => {
  var postdatetime="";
  cloud.database().collection("Message").doc("28ee4e3e6056f2f80bc8c4cc67367e22").get()
  .then(res=>{
    //console.log("触发器获取时间",res);
    postdatetime=res.data.post_detail_time;
    console.log("postdatetime",postdatetime);
  })
  console.log("触发器");
  var DATE=new Date();
  console.log(DATE);
  var endDate = (new Date("2021/04/17 00:00:00")).getTime(); //得到毫秒数  
  console.log("endDate",endDate);
  var newDate = new Date(endDate ); //得到普通的时间了 
  console.log("newDate",newDate);
  
}
