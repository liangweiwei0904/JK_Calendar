// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"lwwldx-5g8powrn59ec579e"
})
// 云函数入口函数
exports.main = async (event, context) => {
  //console.log("我进入云函数了");
  var postId=event.postId;
  var comments=[];
  //var comLen=Number(0);
  //console.log(typeof com_len);  //number
  // cloud.database().collection("posts").doc(mess_id).get({
    
  // }).then(res=>{
  //   console.log("comments的个数",res.data.comments.length);
  //   console.log(res.data.comments[0].username);
  //   com_len=res.data.comments.length;
  //   console.log(typeof com_len);
  // })

  cloud.database().collection("posts").doc(postId).update({
    data:{
      hotNum:event.hotNum,
      // 'comments.[com_len].content':event.content,
      // 'comments.[com_len].username':event.username,
      ["comments." + [event.comLen] + '.comName' ]: event.comName,
      ["comments." + [event.comLen] + '.comContent' ]: event.comContent,
      ["comments."+[event.comLen]+'.comAvatar']:event.comAvatar,
      ["comments."+[event.comLen]+".comTime"]:event.comTime,
      //'comments.1.content':event.content,
      // ['comments.'+com_len+'.content']:event.content,
      // ['comments.'+com_len+'.username']:event.username
        
      
    },
  })
  .then(res=>{
    //console.log("log"+res);
    cloud.database().collection("reply").add({
      data:{
        postOpenid:event.postOpenid,
        postId:event.postId,
        comContent:event.comContent,
        comTime:event.comTime,
        comName:event.comName,
        comAvatar:event.comAvatar,

      }
    })
  })
}