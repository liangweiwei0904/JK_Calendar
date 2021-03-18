/* 
1点击"+" 触发tap点击事件
  1调用小程序内置的选择图片的api
  2获取到图片的路径 数组格式
  3把图片路径 存到data的变量中
  4页面就可以根据图片数组进行循环显示自定义组件
2点击自定义图片组件
  1获取被点击元素的索引
  2获取data中的图片数组
  3根据索引 从数组中删除对应的元素
  4把数组重新设置到data中
3当用户点击提交按钮之后
  1获取文本域的内容 类似输入框的获取
    1data中定义变量表示输入框内容
    2文本域绑定输入事件 事件触发的时候，把输入框的值 存入到变量中
  2对这些内容做合法性验证
  3验证通过 把用户选择的图片上上传到专门的服务器中 返回图片外网的链接
    1遍历图片数组
    2挨个上传
    3自己再维护图片数组 存放图片上传后的外网链接
  4文本域 和外网的图片路径一起提交到服务器（前端的模拟，并不会发送请求到后台）
  5清空当前页面
  6返回上一页
*/
Page({
  data: {
    //被选中的图片路径数组
    chooseImgs:[],
    //文本域的内容
    textVal:"",

  },
  //不需要在页面中显示的数据
  //外网的图片路径数组
  UpLoadImgs:[],

  //点击“+”选择图片
  handleChooseImg(){
    //2调用小程序内置的选择图片的API
    wx.chooseImage({
      //同时选中的图片数量
      count: 9,
      //图片格式
      sizeType: ['original','compressed'],
      //图片来源
      sourceType: ['album','camera'],
      success: (result)=>{
        console.log(result);
        this.setData({
          //图片数组进行拼接
          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
      },
    });
  },
  //点击自定义图片组件
  handleRemoveImg(e){
    //获取被点击的图片索引
    const {index} =e.currentTarget.dataset;
    //console.log(index);
    //获取data中的图片数组
    let {chooseImgs}=this.data;
    //删除元素
    chooseImgs.splice(index,1);
    this.setData({
      chooseImgs
    })
  },
  //文本域的输入事件
  handleTextInput(e){
    this.setData({
      //获取文本域的值
      textVal:e.detail.value
    })
  },

  //提交按钮的点击事件
  handleFormSubmit(e){
    // //获取文本域的内容
    // const {textVal,chooseImgs}=this.data;
    // //合法性的验证
    // if(!textVal.trim()){
    //   //不合法
    //   wx.showToast({
    //     title: '输入不合法',
    //     mask: false,
    //     icon:'none',
    //   });
    //   return;
    // }
    //3准备上传图片到专门的图片服务器
    //上传文件的api不支持多个文件同时上传  遍历数组挨个上传
    //图片上传中显示正在等待图标
    const {chooseImgs}=this.data;
    wx.showLoading({
      title: "正在上传",
      mask: true,
    });

    //判断有没有需要上传的图片数组
    if(chooseImgs.length!=0){
      chooseImgs.forEach((v,i)=>{
        wx.uploadFile({
          //图片要上传到哪里
          url: 'https://img.coolcr.cn/api/upload',
          //被上传的文件路径
          filePath: v,
          //上传的文件名称  用于后台获取文件 file
          name: "image",
          //顺带的文本信息
          formData: {},
          success: (result)=>{
            console.log(result);
            //json 解析
            let url=JSON.parse(result.data).url;
            this.UpLoadImgs.push(url);
            //console.log(this.UpLoadImgs);
  
            //所有图片都上传完毕才触发的代码
            if(i===chooseImgs.length-1){
              //弹窗关闭
              wx.hideLoading();
              //模拟异步提交
              console.log("把文本内容和外网图片数据提交到后台");
              //提交都成功了
              //重置页面
              this.setData({
                textVal:"",
                chooseImgs:[]
              })
              wx.switchTab({
                url: '/pages/Hot/Hot',
                success: (result)=>{
                  console.log("跳转到讨论页");
                },
                fail: ()=>{},
                complete: ()=>{}
              });
            }
          },
        });
      })
    }
    else{
      wx.hideLoading();
      console.log("仅提交文本");
      wx.switchTab({
        url: '/pages/Hot/Hot',
        success: (result)=>{
          console.log("跳转到讨论页");
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
    
    
  }
})