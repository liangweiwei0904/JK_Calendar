Page({
  data: {

  },
  // 登录到特权用户，这种方法不太可行，非tabbar页面，
  loginWithAdmin(){
    wx.navigateTo({
      url: '/pages/admin/admin',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  //登录到普通用户
  loginWithUser(){
    wx.navigateTo({
      url: '/pages/User/User',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})