// var app = new getApp();
// Page({
//   data: {
//     list: [],
//   },
//   onLoad(options) {
//     this.setData({
//       list: JSON.parse(options.list)
//     })
//   },

//   //多个文本域(文本框)的输入事件
//   handleInput(e) {
//     switch (+e.target.dataset.index) {
//       case 0:    //获取商品名称
//         this.setData({
//           'list.goods_name': e.detail.value
//         })
//         break;
//       case 1:    //获取店铺名称
//         this.setData({
//           'list.store_name': e.detail.value
//         })
//         break;
//       case 2:   //上架件数
//         this.setData({
//           "list.sell_number": e.detail.value
//         })
//         break;
//       case 3:   //淘口令
//         this.setData({
//           "list.goodkey": e.detail.value
//         })
//         break;
//       case 4:      //获取内容
//         this.setData({
//           "list.goods_content": e.detail.value
//         })
//         break;
//     }

//   },

//   //日期选择器
//   bindDateChange: function (e) {
//     this.setData({
//       "list.sell_time": e.detail.value,
//       "list.sell_month": e.detail.value.substring(5, 7),
//       "list.sell_day": e.detail.value.substring(8, 10),

//     });
//     this.setData({ "list.post_detail_time": this.data.list.sell_time+ " " + this.data.list.detail_time })
//   },
//   //时间选择器
//   bindTimeChange: function (e) {
//     this.setData({ "list.detail_time": e.detail.value });
//     this.setData({ "list.post_detail_time": this.data.list.sell_time+ " " + this.data.list.detail_time })
//   },



//   //提交按钮的点击事件
//   submit() {
//     //更新操作
//     wx.cloud.database().collection("Goods").doc(this.data.list._id).update({
//       data: {
//         goods_content: this.data.list.goods_content,
//         store_name: this.data.list.store_name,
//         goods_name: this.data.list.goods_name,
//         sell_time: this.data.list.sell_time,
//         sell_year: this.data.list.sell_year,
//         sell_month: this.data.list.sell_month,
//         sell_day: this.data.list.sell_day,
//         sell_number: this.data.list.sell_number,
//         detail_time: this.data.list.detail_time,
//         post_detail_time: this.data.list.post_detail_time,
//         goodkey:this.data.list.goodkey
//       }
//     })
//     .then(res=>{
//       wx.showToast({
//         title: '更新成功',
//         icon: 'success',
//         image: '',
//         duration: 1500,
//         mask: false,
//         success: (result)=>{
//           wx.navigateBack({
//             delta: 1
//           });
//         },
//         fail: ()=>{},
//         complete: ()=>{}
//       });
//     })
//   }
// })