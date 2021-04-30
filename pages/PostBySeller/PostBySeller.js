let DATE = new Date();
var app = new getApp();
Page({

  data: {
    chooseImgs: [],
    textVal: "",  //商品描述
    storeName: "",   //店铺名称
    goodsName: "",   //商品名称
    year: "",    //上架日期:年
    month: "",   //上架日期:月
    day: "",    //上架日期:日
    date: "",   //上架日期:xxxx-xx-xx
    time: "",   //上架时间:xx:xx
    post_detail_time: "",   //上架具体时间:xxxx-xx-xx xx:xx
    goodkey: "",   //淘口令
    goods_img: [],
    arr: [],
    flag: "",   //通过商品名称和店铺判断是否已被爆料
    currentTime: ""//当前时间,也就姑且认为是爆料时间吧(因为我用到的时间数据真的是太多了,晕了)

  },
  UpLoadImgs: [],
  //页面加载时获取当前日期与时间
  onLoad() {
    let mon = DATE.getMonth() + 1;
    let min = DATE.getMinutes();
    if (mon < 10) { mon = "0" + mon; }
    if (min < 10) { min = "0" + min }
    //初次获取时间,当picker值没发生改变时传递给数据库的值不能是空的
    this.setData({
      date: DATE.getFullYear() + "-" + mon + "-" + DATE.getDate(),
      time: DATE.getHours() + ":" + min,
      year: DATE.getFullYear(),
      month: mon,
      day: DATE.getDate(),
    });
    this.setData({
      currentTime: this.data.date + " " + this.data.time,
      post_detail_time: this.data.date + " " + this.data.time
    })

  },

  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result);
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
        console.log(this.data.chooseImgs);
      },
    });
  },
  //点击自定义图片组件
  handleRemoveImg(e) {
    //获取被点击的图片索引
    const { index } = e.currentTarget.dataset;
    //console.log(index);
    //获取data中的图片数组
    let { chooseImgs } = this.data;
    //删除元素
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  //多个文本域(文本框)的输入事件
  handleInput(e) {
    switch (+e.target.dataset.index) {
      case 0:    //获取商品名称
        this.setData({
          goodsName: e.detail.value
        })
        break;
      case 1:    //获取店铺名称
        this.setData({
          storeName: e.detail.value
        })
        break;
      case 2:   //上架件数
        this.setData({
          sellNumber: e.detail.value
        })
        break;
      case 3:   //淘口令
        this.setData({
          goodkey: e.detail.value
        })
        break;
      case 4:      //获取文本域的值
        this.setData({
          textVal: e.detail.value
        })
        break;
    }

  },

  //日期选择器
  bindDateChange: function (e) {
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      sellTime: e.detail.value,
      month: e.detail.value.substring(5, 7),
      day: e.detail.value.substring(8, 10),

    });
    this.setData({ post_detail_time: this.data.date + " " + this.data.time })
    console.log("分割之后的字符串：", this.data.month, "月", this.data.day, "日");
  },
  //时间选择器
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value,

    })
    this.setData({ post_detail_time: this.data.date + " " + this.data.time })

  },



  //提交按钮的点击事件
  submit(e) {
    let that = this;
    var counter = 0;
    console.log("this.data.chooseImgs.length" + this.data.chooseImgs.length);
    //判断用户是否上传了图片
    if (this.data.chooseImgs.length != 0) {
      this.data.chooseImgs.forEach((v, i) => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'MessageImg/' + new Date().getTime() + '.png',//小程序官方问题，路径写死了之后上传新图片不会更换
          // 指定要上传的文件的小程序临时文件路径
          filePath: v,
          // 成功回调

          success: res => {
            //将云存储中的图片路径先赋值给本地数组，再和其他数据一起传给数据库
            that.setData({
              ['arr[' + i + ']']: res.fileID
            })
            console.log("i的值" + i);
            counter++;
            console.log("counter" + counter);
            if (counter == this.data.chooseImgs.length) {
              console.log("异步执行完了");
              //上传至数据库，先判断这个公告里的商品是不是已经有人爆料
              wx.cloud.database().collection("Goods").where({
                store_name: this.data.storeName,
                goods_name: this.data.goodsName,
              }).get().then(res => {
                if (res.data.length > 0) {
                  console.log("查询相同商品的res", res);

                  this.setData({
                    flag: "似乎此商品已经被爆料了呢"
                  });
                  console.log("flag", this.data.flag);

                }
                else if (res.data.length <= 0) {
                  this.setData({
                    flag: "这是新品哦"
                  });
                  console.log("flag", this.data.flag);
                  //可以上传至数据库了
                  wx.cloud.database().collection("Goods").add({
                    data: {
                      goods_content: this.data.textVal,
                      goods_img: this.data.arr,
                      store_name: this.data.storeName,
                      goods_name: this.data.goodsName,
                      sell_time: this.data.date,
                      sell_year: this.data.year,
                      sell_month: this.data.month,
                      sell_day: this.data.day,
                      sell_number: this.data.sellNumber,
                      detail_time: this.data.time,
                      post_detail_time: this.data.post_detail_time,
                      creater: app.userInfo.nickName,
                      avatarUrl: app.userInfo.avatarUrl,
                      currentTime: this.data.currentTime
                    }
                  })
                    .then(res1 => {
                      // console.log(JSON.stringify(this.data.arr));//测试图片数组是否上传成功
                      wx.showToast({
                        title: '发布成功',
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
                    .catch(res1 => {
                      console.log("调用云函数失败", res1);
                    })
                }
              });
            }
          },
        })
      })
    }
  }
})