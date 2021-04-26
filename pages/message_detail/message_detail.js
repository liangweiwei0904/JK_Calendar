// pages/message_detail/message_detail.js
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
    hotNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //console.log("帖子的mess_id："+options.mess_id);
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
  //获取输入框的文字
  handleCommentText(e) {
    this.setData({
      textVal: e.detail.value
    })
    console.log(this.data.textVal);
  },
  //发表评论按钮
  /*
  小程序端与云函数之间操作数据遇到的问题：
  小程序端创建的数据会自动生成一条_openid字段的值
  云函数不会生成带有_openid的字段数据
  之前我在为用户编写发布帖子的代码使用到了云函数的方法
  因此我是无法在小程序端更新数据的
  因为写权限会与_openid字段进行比较
  */
  /*
   发布评论不会覆盖前一个人的评论，在调用云函数更新时应用到update
 
 
  */
  handleBtn() {
    this.setData({
      hotNum: this.data.Message[0].hotNum + 10
    })
    wx.cloud.callFunction({
      name: "sendComment",
      data: {
        mess_id: this.data.mess_id,
        username: "匿名用户",
        content: this.data.textVal,
        com_len: this.data.com_len,
        hotNum:this.data.hotNum,
      }
    })
  }

})