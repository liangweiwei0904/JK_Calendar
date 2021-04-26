// pages/notice_detail/notice_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //console.log("公告的notice_id："+options.notice_id);
    this.setData({
      mess_id: options.mess_id
    })
    //console.log("this.data.mess_id:"+this.data.mess_id);
    //从服务器中Message中请求此条数据
    wx.cloud.database().collection('Message')
      .where({
        _id: this.data.mess_id
      })
      .get()
      .then(res => {
        console.log(res);
        this.setData({
          Message: res.data,
          //com_len:res.data.comments.length
          // com_len:this.data.Message[0].comments.length
        })
        //console.log("com_len" + this.data.Message[0].comments.length);
        this.setData({
          com_len: this.data.Message[0].comments.length,
          visit: this.data.Message[0].visit + 1,
          hotNum: this.data.Message[0].hotNum + 1
        })
        console.log("this.data.visit" + this.data.visit);
        //浏览量+1(云函数调用)
        wx.cloud.callFunction({
          name: "addVisit",
          data: {
            mess_id: this.data.mess_id,
            visit: this.data.visit,
            hotNum:this.data.hotNum
          }
        })
      })





  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})