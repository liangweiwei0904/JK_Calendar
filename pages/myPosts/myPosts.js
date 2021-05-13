let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: [],   //该用户发布的所有帖子
    postId: "",  //他点击“编辑”或“删除”后将_id赋值给message_id，便于后续操作
    thePost: [],  //要进行编辑或删除的某一条帖子
  },
  onShow() {
    //向数据库请求我这个openid发布过的所有帖子
    //小程序端请求最多20条数据，后续优化成云函数端
    wx.cloud.database().collection("posts").where({
      _openid: app.openid
    }).get()
      .then(res => {
        console.log("成功", res);
        this.setData({
            post: res.data.reverse()
        })
      })
      .catch(res => {
        console.log("失败", res);
      })
  },
  //跳转至帖子详情页
  toPostDetail(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/postDetail/postDetail?mess_id='+e.currentTarget.dataset.id,
      success: (result)=>{
        console.log("跳转成功");
      },
      fail: (res)=>{console.log("跳转失败",res);},
      complete: ()=>{}
    });
  },
  // //编辑帖子
  // editPost(e) {
  //   //页面内传递数据，因为已经得到有关的所有帖子，无需重复从数据库中请求
  //   this.setData({
  //     noticeId: e.currentTarget.dataset._id,
  //   });
  //   this.setData({
  //     thePost: this.data.post[e.currentTarget.dataset.index]
  //   });
  //   // console.log("myNotice的数据类型：", typeof this.data.myNotice);
  //   let list = JSON.stringify(this.data.thePost);
  //   //从Notice数组获取这条数据并编辑
  //   wx.navigateTo({
  //     url: '/pages/edit_my_post/edit_my_post?list=' + list,
  //     success: (result) => {

  //     },
  //     fail: () => { },
  //     complete: () => { }
  //   });



  // },
  //删除帖子
  delPost(e) {
    console.log(e);
    this.setData({
      mess_id: e.currentTarget.dataset.id,
    });
    wx.showModal({
      title: '确定删除这条帖子？',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.cloud.database().collection("posts").doc(this.data.mess_id).remove()
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