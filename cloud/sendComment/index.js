// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"lwwldx-5g8powrn59ec579e"
})
// 云函数入口函数
exports.main = async (event, context) => {
  //console.log("我进入云函数了");
  var mess_id=event.mess_id;
  var comments=[];
  var com_len=0;
  cloud.database().collection("Message").doc(mess_id).get({
    
  }).then(res=>{
    console.log("comments的个数",res.data.comments.length);
    console.log(res.data.comments[0].username);
    com_len=res.data.comments[0].username;
    console.log(res.data.comments.length);
  })

  cloud.database().collection("Message").doc(mess_id).update({
    data:{
      'comments.2.content':event.content,
      'comments.2.username':event.username,
      //'comments.1.content':event.content,
        
      
    },
  })
  .then(res=>{
    //console.log("log"+res);
  })
}