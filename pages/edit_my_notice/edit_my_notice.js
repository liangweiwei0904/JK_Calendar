// pages/edit_my_notice/edit_my_notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    textVal:"",
    storeName:"",
    goodsName:"",
    sellTime: '2021-04-21',
    year: "",
    month: "",
    day: "",
    date: '2021-04-09',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      list: JSON.parse(options.list)
    })
    // console.log(this.data.list);

  },
   //文本域的输入事件
   handleTextInput(e) {
    this.setData({
      //获取文本域的值
      textVal: e.detail.value
    })
  },
  handleStoreName(e) {
    this.setData({
      storeName: e.detail.value
    })
  },
  handleGoodsName(e) {
    this.setData({
      goodsName: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      sellTime: e.detail.value,
      month: e.detail.value.substring(5, 7),
      day: e.detail.value.substring(8, 10)
    });
    console.log("分割之后的字符串：", this.data.month, "月", this.data.day, "日");
  },
  //提交按钮的点击事件
  handleFormSubmit(e) {
    wx.cloud.database().collection("Goods").doc(this.data.list._id).update({
      data: {
        goods_content: this.data.textVal,
       // goods_img: this.data.arr,
        store_name: this.data.storeName,
        goods_name: this.data.goodsName,
        sell_time: this.data.sellTime,
        sell_year: this.data.year,
        sell_month: this.data.month,
        sell_day: this.data.day,
        creater: "梁维维"
      }
    })
      .then(res1 => {
        console.log("test");
        console.log(JSON.stringify(this.data.arr));
      })
      .catch(res1 => {
        console.log("调用云函数失败", res1);
      })

    // if (this.data.chooseImgs.length != 0) {
    //   this.data.chooseImgs.forEach((v, i) => {
    //     wx.cloud.uploadFile({
    //       cloudPath: 'MessageImg/' + new Date().getTime() + '.png',
    //       filePath: v,
    //       success: res => {
    //         //将云存储中的图片路径先赋值给本地数组，再和其他数据一起传给数据库
    //         that.setData({
    //           ['arr[' + i + ']']: res.fileID
    //         })
    //         console.log("i的值" + i);
    //         counter++;
    //         console.log("counter" + counter);
    //         if (counter == this.data.chooseImgs.length) {
    //           console.log("异步执行完了");
    //           //上传至数据库
    //           wx.cloud.database().collection("Goods").add({
    //             data: {
    //               goods_content: this.data.textVal,
    //               goods_img: this.data.arr,
    //               store_name: this.data.storeName,
    //               goods_name: this.data.goodsName,
    //               sell_time: this.data.sellTime,
    //               sell_year: this.data.year,
    //               sell_month: this.data.month,
    //               sell_day: this.data.day,
    //               creater: "梁维维"
    //             }
    //           })
    //             .then(res1 => {
    //               console.log("test");
    //               console.log(JSON.stringify(this.data.arr));
    //             })
    //             .catch(res1 => {
    //               console.log("调用云函数失败", res1);
    //             })
    //         }
    //       },
    //     })
    //   })
    // }
  }
})