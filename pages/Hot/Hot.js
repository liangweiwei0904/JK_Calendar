var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Message: [],
    flag_post:1,  //该页面内数据默认按热度排序：1，按时间排序：2
    scrollTop:0,   //监听页面滚动
    scrolltemp:0,  
    isScrollDown:1  //0代表向上，1代表向下
    
  },
 


  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
    this.sortByHot();
    
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //跳转到搜索页
  search: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  
  //点击帖子,跳转到帖子详情页
  to_message_detail(e){
    console.log(e.currentTarget.id);
    let mess_id=e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/message_detail/message_detail?mess_id='+mess_id,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  //按热度进行排序，重新访问数据库，按热度进行排序
  sortByHot(){
    this.goTop();
    this.setData({
      flag_post:0,
      scrollTop:0
    })
    wx.cloud.callFunction({
      name: "getMessage",
      data:{
        flag:1
      }
    })
    .then(res=>{
      console.log(res);
      this.setData({
        Message:res.result.data
      })
    })
  },
  //按时间排序，默认选项
  sortByTime(){
    this.goTop();
    this.setData({
      flag_post:1,
    })
    wx.cloud.callFunction({
      name: "getMessage",
      data:{
        flag:0
      }
    })
    .then(res=>{
      console.log(res);
      this.setData({
        Message:res.result.data
      })
    })

  },
  //滚动固定事件
  onPageScroll: function (e) {//监听页面滚动
    this.setData({
      scrollTop: e.scrollTop,   //页面顶部滚动的距离
    });
    if(this.data.scrollTop>this.data.scrolltemp){
      // console.log("向下滚动");
      this.setData({
        scrolltemp:e.scrollTop,
        isScrollDown:1
      })
    }
    else{
      // console.log("向上滚动");
      this.setData({
        scrolltemp:e.scrollTop,
        isScrollDown:0
      })
    }
    // console.log("滚动y轴",e);
  },
  //回到顶部功能
  goTop: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  //点击跳转到用户发布界面
  PostorFresh(e){
    console.log("新建/刷新",e);
    if(e.currentTarget.dataset.flag==1){
      //新建
      if(!app.userInfo){
        wx.showToast({
          title: '请先登录再发帖',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result)=>{
            
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }
      else{
        wx.navigateTo({
          url: '/pages/PostByUser/PostByUser',
          success: (result)=>{
            
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }
      
    }
    else{
      //刷新
      console.log("我刷新啦");
      //重新从数据库中读取数据
      //根据热榜/时间请求数据
      this.goTop();
      if(this.flag_post==1){
        this.sortByHot();
      }
      else{
        this.sortByTime();
      }
    }
    
  }
})