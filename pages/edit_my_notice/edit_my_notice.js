// pages/edit_my_notice/edit_my_notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      list:JSON.parse(options.list)
    })
    // console.log(this.data.list);

  },

  bindDateChange: function(e) {
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date:e.detail.value,
      sellTime: e.detail.value,
      month:e.detail.value.substring(5,7),
      day:e.detail.value.substring(8,10)
    });
    console.log("分割之后的字符串：",this.data.month,"月",this.data.day,"日");
  }
})