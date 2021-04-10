// pages/User/User.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Message: [],
    
  },
  GetMessage(){
    wx.cloud.callFunction({
      name: "getMessage"
    })
    .then(res=>{
      console.log(res);
      this.setData({
        Message:res.result.data
      })
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.GetMessage();
    
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //跳转到搜索页
  search: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  
  //点击帖子,跳转到帖子详情页
  to_message_detail(e){
    console.log(e.currentTarget.id);
    let mess_id=e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/message_detail/message_detail?mess_id='+mess_id,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });

  }
})