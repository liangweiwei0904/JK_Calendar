var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    replyInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection("reply").where({
      mess_openid:app.openid
    })
    .get()
    .then(res=>{
      console.log("请求回复的res",res);
      this.setData({
        replyInfo:res.data
      })
    })
  },
  //查看帖子详情
  toMessageDetail(e){
    let mess_id=e.currentTarget.dataset.messid;
    wx.navigateTo({
      url: '/pages/message_detail/message_detail?mess_id='+mess_id,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
  
})