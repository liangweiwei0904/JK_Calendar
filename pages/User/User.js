var app = getApp();
// let isAdmin=0;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    isAdmin: 0

  },
  //点击登录按钮
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.showToast({
          title: '登录成功!',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {

          },
          fail: () => { },
          complete: () => { }
        });

        //用户信息存在页面中
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        //将用户信息存储在全局变量中
        app.userInfo = this.data.userInfo;
        wx.cloud.database().collection("admin").where({
          openid: app.openid
        }).get().then(res => {
          console.log("有这个特权用户吗?", res.data.length);
          if (res.data.length > 0) {
            //是特权用户
            this.setData({
              isAdmin: 1,
            })
          }
        })

        //登录完成后向服务器新增用户信息
        //先查询,没有这个用户就增加. 有就不增加
        wx.cloud.database().collection("User").where({
          openid: app.openid
        }).get().then(res => {
          console.log("有这个普通用户吗?", res.data.length);
          if (res.data.length == 0) {
            //没有
            wx.cloud.database().collection("User").add({
              data: {
                openid: app.openid,
                userInfo: app.userInfo
              }
            }).then(res => { console.log("增加成功"); })
              .catch(res => { console.log("增加失败"); })
          }
        })
      }
    })
  },




  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起
    //getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  onLoad: function (options) {
    //获取该用户的openid
    this.wxLogin();
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    };

  },
  //不通过云函数获取用户的openid,并存储到全局变量中,以便判断是否位特权用户
  wxLogin() {
    wx.login({
      success: (res) => {
        //用户的code
        let userCode = res.code
        // 该流程放到后端处理===
        // https://api.weixin.qq.com 不是合法域名，正式环境无法访问 =============
        wx.request({
          // 自行补上自己的 APPID 和 SECRET
          url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxdfa56e22c7cd26f9&secret=9faab16ea91695ff5113a54bbfae4e64&js_code=${userCode}&grant_type=authorization_code`,
          success: res => {
            app.openid = res.data.openid;
            console.log("全局openid", app.openid);
          }
        });
      }
    })
  },



  //以下是跳转页面的小功能,后期可以优化成一个函数即可
  //发布公告
  postNotice() {
    wx.navigateTo({
      url: '/pages/PostBySeller/PostBySeller'
    });
  },
  //编辑公告
  editNotice() {
    wx.navigateTo({
      url: '/pages/my_notice/my_notice'
    });
  },
  //我发布的（帖子）
  toMyPost() {
    wx.navigateTo({
      url: '/pages/my_post/my_post'
    });
  },
  //回复我的
  toMyReply() {
    wx.navigateTo({
      url: '/pages/applyToMe/applyToMe'
    });
  },
  //积分查询
  toPointsSearch() {
    wx.navigateTo({
      url: '/pages/points_search/points_search'
    });
  },
  //使用帮助
  toHelp() {
    wx.navigateTo({
      url: '/pages/help/help'
    });
  },
  //关于
  toAbout() {
    wx.navigateTo({
      url: '/pages/aboutMe/aboutMe'
    });
  }
})