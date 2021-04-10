Page({
  data: {
    chooseImgs: [],
    textVal: "",
    storeName:"",
    goodsName:"",
    sellTime:'2021-04-21',
    year:"",
    month:"",
    day:"",
    date: '2021-04-09'
  },
  UpLoadImgs: [],
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
  //文本域的输入事件
  handleTextInput(e) {
    this.setData({
      //获取文本域的值
      textVal: e.detail.value
    })
  },
  handleStoreName(e){
    this.setData({
      storeName:e.detail.value
    })
  },
  handleGoodsName(e){
    this.setData({
      goodsName:e.detail.value
    })
  },
 




  bindDateChange: function(e) {
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date:e.detail.value,
      sellTime: e.detail.value,
      month:e.detail.value.substring(5,7),
      day:e.detail.value.substring(8,10)
    });
    console.log("分割之后的字符串：",this.data.month,"月",this.data.day,"日");
  },


  //提交按钮的点击事件
  handleFormSubmit(e) {
    let that=this;
    //判断用户是否上传了图片
    if (this.data.chooseImgs.length != 0) {
      this.data.chooseImgs.forEach((v, i) => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'MessageImg/'+new Date().getTime()+'.png',//小程序官方问题，路径写死了之后上传新图片不会更换
          // 指定要上传的文件的小程序临时文件路径
          filePath: v,
          // 成功回调
          success: res => {
            //将云存储中的图片路径传给数据库
            wx.cloud.database().collection("Goods").add({
              data: {
                goods_content: this.data.textVal,
                goods_img: res.fileID,
                store_name:this.data.storeName,
                goods_name:this.data.goodsName,
                sell_time:this.data.sellTime,
                sell_year:this.data.year,
                sell_month:this.data.month,
                sell_day:this.data.day
              }
            })
            .then(res1=>{
              console.log("调用云函数成功",res1);

              //商家可以传递数据给首页了
              //可是他们两个不是同一个页面怎么办
              //发公告之后存储到数据库
              // 首页从数据库显示？日期如何确定？
              //让首页进行判断

              wx.switchTab({
                url: '/pages/Hot/Hot',
                success: (result)=>{
                  console.log(result,"跳转回热榜页成功");
                },
                fail: (result)=>{console.log(result,"跳转回热榜页失败");},
                complete: ()=>{}
              });
            })
            .catch(res1=>{
              console.log("调用云函数失败",res1);
            })
          },
        })
      })
    }
    else{

    }
  }  
})