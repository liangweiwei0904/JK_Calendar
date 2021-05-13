// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"lwwldx-5g8powrn59ec579e"
})
// 云函数入口函数
exports.main = async (event, context) => {
  //每逢周一，重新刷新数据
  let weekNull=[
    {
      "day": "一",
      "isSigned": false
    },
    {
      "day": "二",
      "isSigned": false
    },
    {
      "day": "三",
      "isSigned": false
    },
    {
      "day": "四",
      "isSigned": false
    },
    {
      "day": "五",
      "isSigned": false
    },
    {
      "day": "六",
      "isSigned": false
    },
    {
      "day": "日",
      "isSigned": false
    }
  ] 
  cloud.database().collection("User").where({
    "_id" : { $exists : true }
  })
  .update({
    data: {
      weekSign: weekNull
    },
   
  })
  .then(res=>{
    console.log("更新成功",res);
  })
  .catch(res=>{
    console.log("更新失败",res);
  })
 
}