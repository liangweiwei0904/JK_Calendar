// pages/User/User.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Message: [],
    flag_post:1,  //该页面内数据默认按热度排序
    scrollTop:0   //监听页面滚动
    
  },
 


  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
    this.sortByHot();
    
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
  },
  //按热度进行排序，重新访问数据库，按热度进行排序
  sortByHot(e){
    console.log(e);
    this.setData({
      flag_post:0
    })
    wx.cloud.callFunction({
      name: "getMessage",
      data:{
        flag:1
      }
    })
    .then(res=>{
      console.log(res);
      this.setData({
        Message:res.result.data
      })
    })
  },
  //按时间排序，默认选项
  sortByTime(e){
    console.log(e);
    this.setData({
      flag_post:1
    })
    wx.cloud.callFunction({
      name: "getMessage",
      data:{
        flag:0
      }
    })
    .then(res=>{
      console.log(res);
      this.setData({
        Message:res.result.data
      })
    })

  },
  //滚动固定事件
  onPageScroll: function (e) {//监听页面滚动
    this.setData({
      scrollTop: e.scrollTop
    })
  },
})