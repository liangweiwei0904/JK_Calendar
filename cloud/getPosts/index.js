// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"lwwldx-5g8powrn59ec579e"
})

// 云函数入口函数
exports.main = async (event, context) => {
  //deac从高到低排序
  if(event.flag==1){
    return cloud.database().collection("posts").orderBy('hotNum', 'desc').get()
  }
  //按发布时间排序，最新发布在前
  if(event.flag==0){
    return cloud.database().collection("posts").orderBy('postDetailTime', 'desc').get()
  }
  // return cloud.database().collection("posts").orderBy('hotNum', 'asc')
  // .get()
  // .then(console.log)
  // .catch(console.error)

}