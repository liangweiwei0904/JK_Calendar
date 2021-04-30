// pages/Notice/Notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Notice: [],
    notice_id: "",
    myNotice: [],
    userInfo:[]

  },
  onLoad() {
    const openid=wx.getStorageSync("openid");
    wx.cloud.database().collection("Goods").where({
      _openid: openid
    }).get()
      .then(res => {
        console.log("成功", res);
        this.setData({
          Notice: res.data
        })
        console.log(this.data.Notice);
      })
      .catch(res => {
        console.log("失败", res);
      })
  },
  editNotice(e) {
    console.log(e);
    console.log(e.currentTarget.dataset.id);
    this.setData({
      notice_id: e.currentTarget.dataset.id,

    });
    this.setData({
      myNotice: this.data.Notice[e.currentTarget.dataset.index]
    });
    console.log("this.data.myNotice:" + this.data.myNotice);
    console.log("myNotice的数据类型：", typeof this.data.myNotice);
    let list = JSON.stringify(this.data.myNotice);
    //从Notice数组获取这条数据并编辑
    wx.navigateTo({
      url: '/pages/edit_my_notice/edit_my_notice?list=' + list,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });



  }
})