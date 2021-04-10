// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"lwwldx-5g8powrn59ec579e"
})
// 云函数入口函数
exports.main = async (event, context) => {
  var mess_id=event.mess_id;
  cloud.database().collection("Message").doc(mess_id).update({
    data:{
      comments:[
        {username:event.username,
        content:event.content}
      ]
    }
  })
}