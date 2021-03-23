// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    //被收藏的商品数量
    collectNums:0,
    tabs:[
      {
        id:0,
        value:"关注商品",
        isActive:true
      },
      {
        id:1,
        value:"关注店铺",
        isActive:false
      },
      {
        id:2,
        value:"我的动态",
        isActive:false
      }
    ],
  },

   //标题的点击事件  从子组件传递过来
   handleTabsItemChange(e){
    //1获取被点击的标题索引
    const {index}=e.detail;
    //2修改源数组
    let {tabs}=this.data;
    tabs.forEach((v,i) =>i===index?v.isActive=true:v.isActive=false );
    //3赋值到data中
    this.setData({
      tabs
    });
    //向后台请求数据(关注商品、店铺动态、我的动态)
    

  },


  onShow(){
    const userinfo=wx.getStorageSync("userinfo");
    const collect=wx.getStorageSync("collect")||[];
    this.setData({
      userinfo,
      collectNums:collect.length
    })
  },
  
  handleGetUserInfo(e){
    const {userInfo}=e.detail;
    wx.setStorageSync("userinfo", userInfo);
    this.onShow();
  },
})