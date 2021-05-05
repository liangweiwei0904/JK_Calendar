// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"lwwldx-5g8powrn59ec579e"
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("Goods").get()
 .then(res=>{
   console.log("获取100条公告成功",res);
   return res
    
   

 })
 .catch(res=>{
   console.log("获取100条公告成功",res);
   return res
 })
}
