// pages/notice_detail/notice_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice_id: "",
    notice: [],
    // indicatorDots: true, //是否显示面板指示点
    // autoplay: true,  //是否自动切换
    // interval: 3000, //自动切换时间间隔
    // circular: true,   //是否采用衔接滑动
    // duration: 500, //滑动动画时长
    // Height: "",    //这是swiper要动态设置的高度属性
  },
  // //设置图片轮显高度
  //  <image src="{{item}}" class="slide-image"  bindload='imgHeight' />
  // imgHeight (e) {
  //   var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
  //   var imgh = e.detail.height; //图片高度
  //   var imgw = e.detail.width; //图片宽度
  //   var h = 25;
  //   //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
  //   var swiperHeight = (winWid * imgh / imgw) + "px";
  //   this.setData({
  //     Height: swiperHeight //设置高度
  //   }),
  //   console.log("hhh");
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let that = this;
    //console.log("公告的notice_id："+options.notice_id);
    this.setData({
      notice_id: options.notice_id
    })
    //console.log("this.data.mess_id:"+this.data.mess_id);
    //从服务器中Message中请求此条数据
    wx.cloud.database().collection('Goods')
      .where({
        _id: this.data.notice_id
      })
      .get()
      .then(res => {
        console.log(res);
        this.setData({
          notice: res.data,
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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