let DATE = new Date();
var app = new getApp();
Page({
  data: {
    theNotice: [],
  },
  onLoad(options) {
    this.setData({
      theNotice: JSON.parse(options.theNoticeList)
    })
    // let mon = DATE.getMonth() + 1;
    // let min = DATE.getMinutes();
    // let day = DATE.getDate();
    // let hour = DATE.getHours();
    // if (mon < 10) { mon = "0" + mon; }
    // if (min < 10) { min = "0" + min }
    // if (day < 10) { day = "0" + day }
    // if (hour < 10) { hour = "0" + hour }
    // //初次获取时间,当picker值没发生改变时传递给数据库的值不能是空的
    // this.setData({
    //   date: this.data.list.sell_time,
    //   time: this.data.list.detail_time,
    //   year: DATE.getFullYear(),
    //   month: mon,
    //   day: day,
    // });
    // this.setData({
    //   post_detail_time: this.data.date + " " + this.data.time
    // })

  },

  //多个文本域(文本框)的输入事件
  handleInput(e) {
    switch (+e.target.dataset.index) {
      case 0:    //获取商品名称
        this.setData({
          'theNotice.goodName': e.detail.value
        })
        break;
      case 1:    //获取店铺名称
        this.setData({
          'theNotice.storeName': e.detail.value
        })
        break;
      case 2:   //上架件数
        this.setData({
          "theNotice.sellNumber": e.detail.value
        })
        break;
      case 3:   //淘口令
        this.setData({
          "theNotice.goodKey": e.detail.value
        })
        break;
      case 4:      //获取内容
        this.setData({
          "theNotice.goodDescribe": e.detail.value
        })
        break;
    }

  },

  //日期选择器
  bindDateChange: function (e) {
    this.setData({
      "theNotice.sellDate": e.detail.value,
      "theNotice.sellMonth": e.detail.value.substring(5, 7),
      "theNotice.sellDay": e.detail.value.substring(8, 10),

    });
    this.setData({ "theNotice.sellDetailTime": this.data.theNotice.sellDate+ " " + this.data.theNotice.sellTime })
  },
  //时间选择器
  bindTimeChange: function (e) {
    this.setData({ "theNotice.sellTime": e.detail.value });
    this.setData({ "theNotice.sellDetailTime": this.data.theNotice.sellDate+ " " + this.data.theNotice.sellTime })
  },



  //提交按钮的点击事件
  submit() {
    //更新操作
    wx.cloud.database().collection("Goods").doc(this.data.theNotice._id).update({
      data: {
        goodDescribe: this.data.theNotice.goodDescribe,
        storeName: this.data.theNotice.storeName,
        goodName: this.data.theNotice.goodName,
        sellDate: this.data.theNotice.sellDate,
        sellMonth: this.data.theNotice.sellMonth,
        sellDay: this.data.theNotice.sellDay,
        sellNumber: this.data.theNotice.sellNumber,
        sellTime: this.data.theNotice.sellTime,
        sellDetailTime: this.data.theNotice.sellDetailTime,
        goodKey:this.data.theNotice.goodKey
      }
    })
    .then(res=>{
      wx.showToast({
        title: '更新成功',
        icon: 'success',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{
          wx.navigateBack({
            delta: 1
          });
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    })
  }
})