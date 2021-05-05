Page({

  /**
   * 页面的初始数据
   */
  data: {
    allNotices:[],
  },
  onShow(){
    //云函数请求一次最多100条
    let notice=[];
    wx.cloud.callFunction({
      name:"getAllNotices"
    })
    .then(res=>{
      this.setData({
        allNotices:res.result.data.reverse()
      })
    })    
  },

  //点击店铺名称，看这家店的其他新品上新时间，并按照上新时间顺序排序
  searchByStore(e){
    /*请求数据库的顺序
    1.在公告页面根据店铺名称查询数据，得到的结果放在公告页并传递给noticeOfStore页
    2.将店铺名称的数据传递给noticeOfStore页，在noticeOfStore页根据店铺名称做出查询请求
    */
   wx.navigateTo({
     url: '/pages/noticeOfStore/noticeOfStore?store='+e.currentTarget.dataset.store,
     success: (result)=>{
       
     },
     fail: ()=>{},
     complete: ()=>{}
   });
  },
  //点击首图跳转至公告详情页
  toNoticeDetail(e){
    console.log("id",e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/noticeDetail/noticeDetail?noticeId='+e.currentTarget.dataset.id,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
  
})