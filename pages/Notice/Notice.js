// pages/Notice/Notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Notice:[],
    

  },
  onShow(){
    wx.cloud.database().collection("Goods").get()
    .then(res=>{
      console.log("成功",res);
      this.setData({
        Notice:res.data
      })
      console.log(this.data.Notice);
    })
    .catch(res=>{
      console.log("失败",res);
    })
  },
  //复制到剪切板
  copyGoodKey(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.key,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  }
  
})