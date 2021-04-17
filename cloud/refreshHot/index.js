// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"lwwldx-5g8powrn59ec579e"
})
// 云函数入口函数
exports.main = async (event, context) => {
  console.log("触发器");
  var DATE=new Date();
  console.log(DATE);
  var endDate = (new Date("2021/04/17 00:00:00")).getTime(); //得到毫秒数  
  console.log("endDate",endDate);
var newDate = new Date(endDate ); //得到普通的时间了 
console.log("newDate",newDate);
  
}
