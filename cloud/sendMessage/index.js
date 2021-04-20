// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"lwwldx-5g8powrn59ec579e"
})
// 云函数入口函数
exports.main = async (event, context) => {
  cloud.database().collection("Message").add({
    data:{
      mess_content:event.content,
      mess_img:event.messageSrc,
      name:"梁维维",
     // mess_id:3,
      date:event.date,
      time:event.time,
      subhour:event.subhour,
      temp:1,
      comments:[],
      visit:0,
      hotNum:0,
    },
    
  })
  .then(res=>{
      console.log("数据插入成功",res);
  })
  .catch(res=>{
    console.log("数据插入失败",res);
  })
}