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
      postOpenid:app.openid
    })
    .get()
    .then(res=>{
      console.log("请求回复的res",res);
      this.setData({
        replyInfo:res.data.reverse()
      })
    })
  },
  //查看帖子详情
  toPostDetail(e){
    console.log(e);
    let postId=e.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '/pages/postDetail/postDetail?postId='+postId,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
  
})