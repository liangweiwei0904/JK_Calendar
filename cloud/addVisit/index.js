// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"lwwldx-5g8powrn59ec579e"
})

// 云函数入口函数
exports.main = async (event, context) => {
 cloud.database().collection("posts").doc(event.postId).update({
   data:{
     visit:event.visit,
     hotNum:event.hotNum
   }
 })
 .then(res=>{
   console.log("成功"+res);
 })
 .catch(res=>{
  console.log("失败"+res);
})
}