let DATE = new Date();
var app = new getApp();
Page({
  data: {
    chooseImgs: [],    //本地图片路径数组
    goodDescribe: "",  //商品描述
    storeName: "",   //店铺名称
    goodName: "",   //商品名称
    sellMonth: "",   //上架日期:月
    sellDay: "",    //上架日期:日
    sellDate: "",    //上架日期（日期选择器的值）:xx-xx 
    sellTime: "",   //时间(时间选择器的值):xx:xx
    sellDetailTime: "",   //上架具体时间:xxxx-xx-xx xx:xx
    sellNumber: 0,    //上架数量
    sellPrice: 0,    //金额
    goodKey: "",   //淘口令
    goodImgs: [],   //
    arr: [],     //
    flag: "",   //通过商品名称和店铺判断是否已被爆料
  },
  //页面加载时获取当前日期与时间（方便显示在时间选择器与日期选择器上）
  onLoad() {
    let mon = DATE.getMonth() + 1;
    let min = DATE.getMinutes();
    let day = DATE.getDate();
    let hour = DATE.getHours();
    if (mon < 10) { mon = "0" + mon; }
    if (min < 10) { min = "0" + min }
    if (day < 10) { day = "0" + day }
    if (hour < 10) { hour = "0" + hour }
    //初次获取时间,当picker值没发生改变时传递给数据库的值不能是空的
    this.setData({
      sellDate: DATE.getFullYear() + "-" + mon + "-" + day,
      sellTime: hour + ":" + min,
      sellMonth: mon,
      sellDay: day,
    });
    //赋值有先后顺序
    this.setData({
      sellDetailTime: this.data.sellDate + " " + this.data.sellTime
    })

  },

  //点击选择上传本地图片
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
          goodName: e.detail.value
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
          goodKey: e.detail.value
        })
        break;
      case 4:      //获取文本域的值
        this.setData({
          goodDescribe: e.detail.value
        })
        break;
      case 5:    //获取价格
      this.setData({sellPrice:e.detail.value})
    }

  },

  //日期选择器
  bindDateChange: function (e) {
    this.setData({
      sellDate: e.detail.value,
      sellMonth: e.detail.value.substring(5, 7),
      sellDay: e.detail.value.substring(8, 10),
    });
    this.setData({ sellDetailTime: this.data.sellDate + " " + this.data.sellTime })
  },
  //时间选择器
  bindTimeChange: function (e) {
    this.setData({ sellTime: e.detail.value })
    this.setData({ sellDetailTime: this.data.sellDate + " " + this.data.sellTime })
  },


  //上传图片事件
  uploadImgs() {
    if (this.data.chooseImgs.length != 0) {
      this.data.chooseImgs.forEach((v, i) => {
        wx.cloud.uploadFile({
          cloudPath: 'noticeImgs/' + new Date().getTime() + '.png',
          filePath: v,
        }).then(res => {
          this.setData({
            ['goodImgs[' + i + ']']: res.fileID
          })
        })
      })
      /*for循环会导致只有最后一个本地图片数组中的元素上传至云存储
      for (var i = 0; i < this.data.chooseImgs.length-1; i++) {
        wx.cloud.uploadFile({
          cloudPath: 'noticeImgs/' + new Date().getTime() + '.png',
          filePath: this.data.chooseImgs[i]
        })
          .then(res => {
            this.setData({
              ['goodImgs[' + i + ']']: res.fileID
            })
          })
      }*/
    }
  },
  //向数据库增加公告数据事件
  addNotice() {
    //请求解析淘口令 
    // wx.request({ 
    //   url: 'https://api.taokouling.com/tkl/viptkljm?apikey=gwPgxAhHwa&tkl=￥Fsf5X2aY3MM￥', 
    //   success (res) { 
    //     console.log(res.data) 
    //   } 
    // })
    //判断是否选择了图片
    if (this.data.chooseImgs.length == 0) {
      wx.showToast({
        title: '至少上传一张图片',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
      });
    }
    else {
      if (this.data.storeName == "" || this.data.goodName == "") {
        wx.showToast({
          title: '店铺名称、商品名称为必填项',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {

          },
          fail: () => { },
          complete: () => { }
        });
      }
      else {
        //先判断这个公告里的商品是不是已经有人爆料
        wx.cloud.database().collection("Goods").where({
          storeName: this.data.storeName,
          goodName: this.data.goodName,
        }).get().then(res => {
          if (res.data.length > 0) {
            console.log("查询相同商品的res", res);
            this.setData({
              flag: "似乎此商品已经被爆料了呢"
            });
          }
          else if (res.data.length <= 0) {
            this.setData({
              flag: "这是新品哦"
            });
            //可以上传至数据库了
            wx.cloud.database().collection("Goods").add({
              data: {
                goodDescribe: this.data.goodDescribe,
                goodImgs: this.data.goodImgs,    //图片数组
                storeName: this.data.storeName,    //店铺名称
                goodName: this.data.goodName,    //商品名称
                sellMonth: this.data.sellMonth,    //上架具体日期：月
                sellDay: this.data.sellDay,     //上架具体日期：天
                sellNumber: this.data.sellNumber,   //商品上架数量
                sellDate: this.data.sellDate,        //date:05-05格式，便于后期修改
                sellTime: this.data.sellTime,     //time:20:00格式，便于后期修改
                sellDetailTime: this.data.sellDetailTime,   //商品的具体上架时间
                creater: app.userInfo.nickName,       //爆料人
                avatarUrl: app.userInfo.avatarUrl,   //爆料人的头像
                postDetailTime: app.getDetailTime(),   //爆料时间
                goodKey: this.data.goodKey,    //淘口令
                sellPrice:this.data.sellPrice    //价格
              }
            })
              .then(res1 => {
                console.log("执行完更新数据库了");
                wx.showToast({
                  title: '发布成功',
                  icon: 'none',
                  duration: 1500,
                  mask: false,
                  success: (result) => {
                    // wx.navigateBack({
                    //   delta: 1
                    // });
                  },
                });
              })
              .catch(res1 => {
                console.log("发布公告失败", res1);
              })
          }
        });
      }

    }

  },

  //提交按钮的点击事件
  submit(e) {
    this.uploadImgs();
    wx.showLoading({
      title: "发布中",
      mask: true,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    let that = this;
    setTimeout(function () { that.addNotice() }, 2000);
  }
})