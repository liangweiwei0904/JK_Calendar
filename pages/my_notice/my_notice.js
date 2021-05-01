let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Notice: [],   //该用户爆料的所有帖子
    notice_id: "",  //他点击“编辑”或“删除”后将_id赋值给notice_id，便于后续操作
    myNotice: [],  //要进行编辑或删除的某一条帖子
    userInfo: []

  },
  onShow() {
    // const openid = wx.getStorageSync("openid");
    wx.cloud.database().collection("Goods").where({
      _openid: app.openid
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
  //跳转至公告详情页
  toNoticeDetail(e){
    console.log(e);
    wx.navigateTo({
      url: 'pages/notice_detail/notice_detai?notice_id='+e.currentTarget.dataset._id,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  //编辑公告
  editNotice(e) {
    //页面内传递数据，因为已经得到有关的所有帖子，无需重复从数据库中请求
    this.setData({
      notice_id: e.currentTarget.dataset._id,
    });
    this.setData({
      myNotice: this.data.Notice[e.currentTarget.dataset.index]
    });
    // console.log("myNotice的数据类型：", typeof this.data.myNotice);
    let list = JSON.stringify(this.data.myNotice);
    //从Notice数组获取这条数据并编辑
    wx.navigateTo({
      url: '/pages/edit_my_notice/edit_my_notice?list=' + list,
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
      notice_id: e.currentTarget.dataset.id,
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
          wx.cloud.database().collection("Goods").doc(this.data.notice_id).remove()
            .then(res => {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1500,
                mask: false,
                success: (result)=>{
                  this.onLoad();
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