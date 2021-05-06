let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myNotices: [],   //该用户爆料的所有公告
    noticeId: "",  //他点击“编辑”或“删除”后将_id赋值给noticeId，便于后续操作
    theNotice: [],  //要进行编辑或删除的某一条帖子
    userInfo: []

  },
  onShow() {
    wx.cloud.database().collection("Goods").where({
      _openid: app.openid
    }).get()
      .then(res => {
        console.log("获取该用户所有帖子成功", res);
        this.setData({
          myNotices: res.data.reverse()
        })
      })
      .catch(res => {
        console.log("获取该用户所有帖子失败", res);
      })
  },
  //跳转至公告详情页
  toNoticeDetail(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/noticeDetail/noticeDetail?noticeId='+e.currentTarget.dataset.id,
      success: (result)=>{
        console.log("跳转成功");
      },
      fail: (res)=>{console.log("跳转失败",res);},
      complete: ()=>{}
    });
  },
  //编辑公告
  editNotice(e) {
    //页面内传递数据，因为已经得到有关的所有帖子，无需重复从数据库中请求
    this.setData({
      noticeId: e.currentTarget.dataset.id,
    });
    this.setData({
      theNotice: this.data.myNotices[e.currentTarget.dataset.index]
    });
    let theNoticeList = JSON.stringify(this.data.theNotice);
    //从notice数组获取这条数据并编辑
    wx.navigateTo({
      url: '/pages/editMyNotices/editMyNotices?theNoticeList=' + theNoticeList,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });



  },
  //删除此条公告
  delNotice(e) {
    console.log(e);
    this.setData({
      noticeId: e.currentTarget.dataset.id,
    });
    wx.showModal({
      title: '确定删除这条公告？',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.cloud.database().collection("Goods").doc(this.data.noticeId).remove()
            .then(res => {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1500,
                mask: false,
                success: (result)=>{
                  this.onShow();
                },
                fail: ()=>{},
                complete: ()=>{}
              });
            })
            .catch(res => {
              wx.showToast({
                title: '删除失败',
                icon: 'success',
                duration: 1500,
                mask: false,
              });
            })
        }
      },
      fail: () => { },
      complete: () => { }
    });

  }
})