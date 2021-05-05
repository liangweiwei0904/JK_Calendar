// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.cloud.init({
      env: "lwwldx-5g8powrn59ec579e"
    })
  },
  globalData: {
    userInfo: {},
    openid: ""
  },
  getDetailTime() {
    let DATE = new Date();
    let year = DATE.getFullYear();
    let month = DATE.getMonth() + 1;
    let day = DATE.getDate();
    let hour = DATE.getHours();
    let minute = DATE.getMinutes();
    let second = DATE.getSeconds();
    if (month < 10) { month = "0" + month }
    if (day < 10) { day = "0" + day }
    if (hour < 10) { hour = "0" + hour }
    if (minute < 10) { minute = "0" + minute }
    if (second < 10) { second = "0" + second }
    let detailTime = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second
    console.log("detailTime", detailTime);
    return detailTime;
  }
})
