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
  var com_len=Number(0);
  console.log(typeof com_len);  //number
  // cloud.database().collection("Message").doc(mess_id).get({
    
  // }).then(res=>{
  //   console.log("comments的个数",res.data.comments.length);
  //   console.log(res.data.comments[0].username);
  //   com_len=res.data.comments.length;
  //   console.log(typeof com_len);
  // })

  cloud.database().collection("Message").doc(mess_id).update({
    data:{
      hotNum:event.hotNum,
      // 'comments.[com_len].content':event.content,
      // 'comments.[com_len].username':event.username,
      ["comments." + [event.com_len] + '.username' ]: event.username,
      ["comments." + [event.com_len] + '.content' ]: event.content
      //'comments.1.content':event.content,
      // ['comments.'+com_len+'.content']:event.content,
      // ['comments.'+com_len+'.username']:event.username
        
      
    },
  })
  .then(res=>{
    console.log("com_len"+com_len);
    console.log("event.com_len"+event.com_len);
    //console.log("log"+res);
  })
}