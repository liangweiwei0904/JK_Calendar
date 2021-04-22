Page({
  data: {
    //轮播图数组
    swiperList:[
        {
            swiperImgId:0,
            swiperImgUrl:"http://img.alicdn.com/imgextra/i4/2206686532409/O1CN01zF41JB1TfMmvxS3AS_!!2206686532409-0-lubanimage.jpg"
        },
        {
            swiperImgId:1,
            swiperImgUrl:"http://img.alicdn.com/imgextra/i4/2206686532409/O1CN01JCGREK1TfMmyZvPAA_!!2206686532409-0-lubanimage.jpg"
        }
    ],
    //导航数组
    catesList:[
        {
            listId:0,
            image_src:"https://gw.alicdn.com/tfs/TB1nBktVxTpK1RjSZR0XXbEwXXa-183-144.png"
        },
        {
            listId:1,
            image_src:"https://gw.alicdn.com/tfs/TB1nBktVxTpK1RjSZR0XXbEwXXa-183-144.png"
        },
        {
            listId:2,
            image_src:"https://gw.alicdn.com/tfs/TB1nBktVxTpK1RjSZR0XXbEwXXa-183-144.png"
        },
        {
            listId:3,
            image_src:"https://gw.alicdn.com/tfs/TB1nBktVxTpK1RjSZR0XXbEwXXa-183-144.png"
        },

    ],
    //推荐商品的属性
    goods_img:"",
    goods_title:""


  },
  //页面加载的时候就会触发
  onLoad: function(options){
  },
  //商品推荐：1.根据用户浏览数据   2.根据特权用户推荐   进行展示
  //1.用户浏览过的信息主要记录其：经常访问的店铺名称，商品关键词（非商品名称），
  //详细信息里介绍商品的颜色，风格等
  

  onShow(){
    //console.log("触发器获取时间",res);
    // postdatetime=res.data.post_detail_time;
    // console.log("postdatetime",postdatetime);
    //var currenttime=new Date();
    var posttime="2021/04/19 12:30:30";
    var mms_posttime = (new Date(posttime)).getTime(); //获取时间戳  
    var mms_currenttime=new Date().getTime();
    //计算相减之后的毫秒数，从而得出小时差
    var sub=mms_currenttime-mms_posttime;
    console.log("发布时间",mms_posttime,"当前时间",mms_currenttime,"毫秒差",sub);
    //转化为小时差
    var sub_hour=sub/3600000;
    console.log("小时差",sub_hour);
    sub_hour=parseInt(sub_hour);
    console.log("小时差",sub_hour);

    //请求解析淘口令
    // wx.request({
    //   url: 'https://api.taokouling.com/tkl/viptkljm?apikey=gwPgxAhHwa&tkl=￥Fsf5X2aY3MM￥',
    //   success (res) {
    //     console.log(res.data)
    //   }
    // })
  }
});