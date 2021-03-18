// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"lwwldx-5g8powrn59ec579e"
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("Message").get()
}