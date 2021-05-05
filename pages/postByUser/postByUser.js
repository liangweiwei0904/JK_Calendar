let DATE = new Date();
var app=getApp();
Page({
  data: {
    chooseImgs: [],
    UpLoadImgs: [],
    mess_content: "",
    post_detail_time: "",   //2021/04/25 21:25:13   发布帖子的具体时间
    localImgs: []    //选择的图片数组临时存在本地，再上传至数据库
  },

  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      },
    });
  },
  //点击X删除图片
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
  //帖子的文字部分
  handleTextInput(e) {
    this.setData({
      mess_content: e.detail.value
    });

  },

  //提交按钮的点击事件
  handleFormSubmit(e) {
    /*小记：使用云函数创建的记录没有openid属性，在小程序端访问数据库创建的记录有openid属性*/
    let that = this;
    let count = 0;
    //判断用户是否选择了图片，如果上传了就将选择的图片上传值云存储，并将这些图保存到一个数组里
    if (this.data.chooseImgs.length != 0) {
      console.log("this.data.chooseImgs.length",this.data.chooseImgs.length);
      this.data.chooseImgs.forEach((v, i) => {
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'MessageImg/' + new Date().getTime() + '.png',//小程序官方问题，路径写死了之后上传新图片不会更换
          // 指定要上传的文件的小程序临时文件路径
          filePath: v,
          success: res => {
            //将云存储中的图片路径先赋值给本地数组，再和其他数据一起传给数据库
            that.setData({
              ['localImgs[' + i + ']']: res.fileID
            });
            count++;
            console.log("count",count);
            if (count == that.data.chooseImgs.length) {
              console.log("相等了，开始执行啊！");
              wx.cloud.database().collection("Message").add({
                data: {
                  test:1,
                  mess_content: that.data.mess_content,
                  mess_img: that.data.localImgs,
                  comments:[],
                  date: that.data.date,
                  time: that.data.time,
                  subhour: 0,
                  name: app.userInfo.nickName,
                  avatarUrl: app.userInfo.avatarUrl,
                  // post_detail_time: that.data.post_detail_time,
                  post_detail_time:app.getDetailTime(),
                  hotNum:0,
                  visit:0
                }
              })
              .then(res=>{
                console.log("帖子上传成功");
                wx.switchTab({
                  url: '/pages/hot/hot',
                  success: (result)=>{
                    
                  },
                  fail: ()=>{},
                  complete: ()=>{}
                });
              })
              .catch(res=>{
                console.log("帖子上传失败",res);
              })
            }
            else{
              console.log("不相等",count);
            }
          },
        })
      })
    }
  },
})