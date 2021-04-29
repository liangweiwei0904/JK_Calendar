let openid = "1"
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    isAdmin: false

  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        //用户信息存在页面中
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        //用户信息存在缓存中（便于在全局中读取数据）
        wx.setStorageSync("userInfo", this.data.userInfo);
        //用户信息向服务器更新
        wx.cloud.database().collection("User").where({
          openid: openid
        }).update({
          data: {
            nickName: this.data.userInfo.nickName,
            avatarUrl: this.data.userInfo.avatarUrl
          }

        })
          .then(res => {
            console.log("更新用户基本信息成功", res);
          })
          .catch(res => {
            console.log("更新失败", res);
          })
        //区分不同用户的openid：微信小号的openid:odyot46hf2jJy-CoPKwzJ1Cx3kuc
        //odyot48iBCgRCdeo0K3p5XBVWeYo刘东旭
        //odyot48Wq49z_s4zObtpQ7rpoft8梁维维
        if (openid == "odyot48Wq49z_s4zObtpQ7rpoft8") {
          this.setData({
            isAdmin: true
          })
          console.log("openid是特权用户刘东旭的，即将进行跳转");
          // wx.navigateTo({
          //   url: '/pages/changeRole/changeRole',
          //   success: (result) => {

          //   },
          //   fail: () => { },
          //   complete: () => { }
          // });
        }
        else {
          console.log("openid是普通用户");
        }
      }
    })


  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  onShow() {
    // const userinfo=wx.getStorageSync("userinfo");
    // this.setData({
    //   userinfo,
    // })
  },

  // handleGetUserInfo(e){
  //   console.log(e);
  //   const {userInfo}=e.detail;
  //   wx.setStorageSync("userinfo", userInfo);
  //   //this.onShow();
  // },



  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    };
    this.wxLogin()
  },
  wxLogin() {
    wx.login({
      success: (res) => {
        //用户的code
        let userCode = res.code
        console.log('wx.login==>', res)
        // 该流程放到后端处理===
        // https://api.weixin.qq.com 不是合法域名，正式环境无法访问 =============
        wx.request({
          // 自行补上自己的 APPID 和 SECRET
          url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxdfa56e22c7cd26f9&secret=9faab16ea91695ff5113a54bbfae4e64&js_code=${userCode}&grant_type=authorization_code`,
          success: res => {
            // 获取到用户的 openid
            console.log("用户的openid:" + res.data.openid);
            openid = res.data.openid;

          }
        });
      }
    })
  },
  //发布公告
  postNotice(){
    wx.navigateTo({
      url: '/pages/PostBySeller/PostBySeller'
    });
  },
  //编辑公告
  editNotice(){
    wx.navigateTo({
      url: '/pages/my_notice/my_notice'
    });
  },
  //我发布的（帖子）
  toMyPost(){
    wx.navigateTo({
      url: '/pages/my_post/my_post'
    });
  },
  //回复我的
  toMyReply(){
    wx.navigateTo({
      url: '/pages/applyToMe/applyToMe'
    });
  },
  //积分查询
  toPointsSearch(){
    wx.navigateTo({
      url: '/pages/points_search/points_search'
    });
  },
  //使用帮助
  toHelp(){
    wx.navigateTo({
      url: '/pages/help/help'
    });
  },
  //关于
  toAbout(){
    wx.navigateTo({
      url: '/pages/aboutMe/aboutMe'
    });
  }


})