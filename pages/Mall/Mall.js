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
    //楼层数据
    floorList:[]
  },
  //页面加载的时候就会触发
  onLoad: function(options){
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();


  },
  //获取轮播图数据
  getSwiperList(){
    
  },
  //获取分类导航数据
  getCateList(){
    
  },
  //获取楼层数据
  getFloorList(){
    
  }
});