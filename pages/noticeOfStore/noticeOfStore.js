Page({

  /**
   * 页面的初始数据
   */
  data: {
    itsNotices:[],
    storeName:""
    

  },
  //获取店铺名称
  onLoad(options){
    console.log(options);
    this.setData({
      storeName:options.store,
    })
  },
  onShow(){
    wx.cloud.database().collection("Goods").where({
      storeName:this.data.storeName,
    }).get()
    .then(res=>{
      console.log("成功",res);
      this.setData({
        itsNotices:res.data.reverse()
      })
      console.log(this.data.itsNotices);
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
  },
  
})