let DATE = new Date();
var app = getApp();
Page({
  data: {
    getDay: "", //周几
    points: 0,  //积分
    weekSign: [],   //周签到数组  
    isSigned: false,  //今天按钮签到状态
  },

  //点击签到
  bindSignFn(e) {
    var that = this,
      today = that.data.getDay;
    const arr = [],
      weekSign = [...arr, ...that.data.weekSign];
    today = today - 1 >= 0 ? today - 1 : 6;

    weekSign[today].isSigned = true

    //当前积分
    var curFen = that.data.newSignIntegral + 1;

    that.setData({
      isSigned: true,
      newSignIntegral: curFen,
      weekSign: weekSign,
    });
    wx.cloud.database().collection("User").where({
      _openid: app.openid
    })
      .update({
        data: {
          points: this.data.points + 1,
          weekSign: this.data.weekSign
        }
      })
      .then(res => {
        // let p = getCurrentPages().pop().options
        this.onLoad();
      })

  },

  onLoad: function (options) {
    this.setData({
      getDay: DATE.getDay()    //今天是周几？
    })

    //从服务器请求已签到数据和积分
    wx.cloud.database().collection("User").where({
      _openid: app.openid
    }).get()
      .then(res => {
        this.setData({
          points: res.data[0].points,
          weekSign: res.data[0].weekSign
        })
        console.log("res.data[0].weekSign[this.data.getDay-1]", res.data[0].weekSign[this.data.getDay - 1]);
        if (res.data[0].weekSign[this.data.getDay - 1].isSigned == true) {
          this.setData({
            isSigned: true
          })
          console.log("???????");
        }
      })
  },
})