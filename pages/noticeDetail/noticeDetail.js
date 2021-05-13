Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeId: "",
    notice: [],
  },
  onLoad: function (options) {
    console.log(options);
    let that = this;
    //console.log("公告的noticeId："+options.noticeId);
    this.setData({
      noticeId: options.noticeId
    })
    //console.log("this.data.mess_id:"+this.data.mess_id);
    //从服务器中posts集合中请求此条数据
    wx.cloud.database().collection('Goods')
      .where({
        _id: this.data.noticeId
      })
      .get()
      .then(res => {
        console.log(res);
        this.setData({
          notice: res.data,
        })

      })
  },
  //复制到剪切板
  copyGoodKey(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.key,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
})