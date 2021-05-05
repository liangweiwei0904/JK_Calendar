var app = getApp();
let DATE = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mess_id: "",
    Message: [],
    textVal: "",
    com_len: 0,
    visit: 0,
    hotNum: 0,
    com_time: "",
    comments: []  //评论数组，倒序排列
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
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
        this.setData({
          Message: res.data,
          //com_len:res.data.comments.length
          // com_len:this.data.Message[0].comments.length
        })

        //console.log("com_len" + this.data.Message[0].comments.length);
        this.setData({
          comments: this.data.Message[0].comments.reverse(),
          com_len: this.data.Message[0].comments.length,
          visit: this.data.Message[0].visit + 1,
          hotNum: this.data.Message[0].hotNum + 1
        })
        //浏览量+1(云函数调用)
        wx.cloud.callFunction({
          name: "addVisit",
          data: {
            mess_id: this.data.mess_id,
            visit: this.data.visit,
            hotNum: this.data.hotNum
          }
        })
      })
  },
  //获取输入框的文字
  handleCommentText(e) {
    this.setData({
      textVal: e.detail.value
    })
    console.log(this.data.textVal);
  },
  /*
  小程序端与云函数之间操作数据遇到的问题：
  小程序端创建的数据会自动生成一条_openid字段的值
  云函数不会生成带有_openid的字段数据
  之前我在为用户编写发布帖子的代码使用到了云函数的方法
  因此我是无法在小程序端更新数据的
  因为写权限会与_openid字段进行比较
  */
  //发表评论按钮发布评论不会覆盖前一个人的评论，在调用云函数更新时应用到update
  handleBtn() {
    //获取评论时间

    this.setData({
      hotNum: this.data.Message[0].hotNum + 10,
      com_time: app.getDetailTime()
    })
    wx.cloud.callFunction({
      name: "sendComment",
      data: {
        mess_id: this.data.mess_id,
        com_name: app.userInfo.nickName,
        com_avatar: app.userInfo.avatarUrl,
        com_content: this.data.textVal,
        com_len: this.data.com_len,
        hotNum: this.data.hotNum,
        com_time: this.data.com_time,
        mess_openid: this.data.Message[0]._openid
      }
    })
      .then(res => {
        wx.showToast({
          title: '评论成功',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            // const pages = getCurrentPages()
            // const perpage = pages[pages.length - 1] //当前页面
            // const keyList = Object.keys(perpage.options) //当前页面携带的路由参数
            // if (keyList.length > 0) {
            //   let keys = '?'
            //   keyList.forEach((item, index) => {
            //     index === 0 ?
            //       keys = keys + item + '=' + perpage.options[item] : keys = keys + '&' + item + '=' + perpage.options[item]
            //   })
            //   wx.reLaunch({
            //     url: '/' + perpage.route + keys
            //   })
            // } else {
            //   wx.reLaunch({
            //     url: '/' + perpage.route //当前页面路由地址
            //   })
            // }

          },
          fail: () => { },
          complete: () => { }
        });
      })
  },

})