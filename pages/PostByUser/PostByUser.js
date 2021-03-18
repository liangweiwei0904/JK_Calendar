Page({
  data: {
    chooseImgs: [],
    textVal: "",
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
            console.log('上传成功', res);
            // that.setData({
            //   UpLoadImgs: res.fileID
            // }),
            //UpLoadImgs=res.fileID;
            console.log("UpLoadImgs",res.fileID);
            //将云存储中的图片路径传给数据库
            wx.cloud.callFunction({
              name: "sendMessage",
              data: {
                content: this.data.textVal,
                messageSrc: res.fileID
              }
            })
            .then(res1=>{
              console.log("调用云函数成功",res1);
            })
            .catch(res1=>{
              console.log("调用云函数失败",res1);
            })
          },
        })
      })
    }
  }  
})