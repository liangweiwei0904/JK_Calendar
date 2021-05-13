let DATE = new Date();
let month = DATE.getMonth();
let year = DATE.getFullYear();
let today = DATE.getDate();
//月份天数表，平年和闰年每月天数
let MonthNums = [
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
];
//  判断当前年是不是闰年 是的话返回0，不是返回1，与下面调用有关
var isRunYear = (year) => {
    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
        return 1
    else
        return 0
};
//获取本月有多少天
var getMonthNums = (year, month) => {
    return MonthNums[isRunYear(year)][month];
};
Page({
    data: {
        week: ["日", "一", "二", "三", "四", "五", "六"],
        monthStart: (new Date(year, month, 1)).getDay(),//得到某月1号是周(1,2,3,4,5,6,7)
        day: getMonthNums(year, month),//获取某月有多少天
        date: year + '年' + (month + 1) + '月',//首页选择器里显示的2021年X月
        tipsImageSrc: "../../image/TipsImage.jpg",
        //从数据库请求的数据应该是什么类型的，string型（2021年03月17日）如何判断3月17日有新品
        isSellDay: false, //是否有新品？默认为false
        monthGoods: [],//数据库中某月的所有商品信息返回给monthGoods
        todayGoods: [],//用户点击某一天之后，才会从monthGoods中取得这一天的裙子信息
        today: today,
        clicked:false     //默认用户没有点击某天，展示的即是当月所有裙子，
        //当用户点击之后，clicked值设为true，开始在首页展示当日的裙子
    },
    //选择器"<"和">"的点击事件
    switchMonth(e) {
        this.setData({
            todayGoods: [],
            clicked:false
        })
        switch (+e.target.dataset.type) {
            case 0:    //"<"左切
                if (month == 0) {
                    year--;
                    month = 11;
                } else {
                    month--;
                }
                break;
            case 1:    //">"右切
                if (month == 11) {
                    year++;
                    month = 0;
                } else {
                    month++;
                }
                break;
        }
        this.switchDate(year, month + 1);
        var strmonth = "";//月份的字符串表示（针对个位数月份而言，方便从数据库中查询数据）
        if (month < 9) {
            strmonth = "0" + (month + 1);//如4月转化为04月
            // console.log("strmonth",strmonth);
        }
        else strmonth = month + 1;
        wx.cloud.database().collection("Goods").where({
            sellMonth: strmonth,
        })
            .get()
            .then(res => {
                console.log("获取成功", res);
                this.setData({
                    monthGoods: res.data
                });
                this.showGood(today);
            })
            .catch(res => {
                console.log("获取失败", res);
            })
        
    },

    //切换年月
    switchDate(y, m) {  //调用此方法切换指定时间
        //重置年月
        year = y;
        month = m - 1;
        this.setData({
            day: getMonthNums(year, month),
            date: year + "年" + (month + 1) + "月",
            monthStart: (new Date(year, month, 1)).getDay()
        });
    },
    //点击这一天的时候，在下边的显示模块提示当天即将上架的裙子
    clickItem(e) {
        this.setData({
            todayGoods: [],
            clicked:true
        })
        var day = e.target.dataset.day;
        console.log(year + '年' + (month + 1) + '月' + day + "日");
        console.log("todayGoods",this.data.todayGoods);
        //如果用户点击16，获取到数字16之后呢
        //从monthGoods里面找到sellDay为16的数据并将其赋值给todayGoods
        //渲染的时候，直接显示todayGoods数组里的内容
        //问题：当点击某一个售卖日之后，todayGoods里面会附上值，再次点击非售卖日，这个值应该清空
        console.log("day",day);
        this.showGood(day);
        console.log("todayGoods",this.data.todayGoods);

    },
    //判断是否有新品
    showGood(day) {
        console.log("day",day);
        var len=0;
        for (var i = 0; i < this.data.monthGoods.length; i++) {
            
            if (day == this.data.monthGoods[i].sellDay) {
                //数组赋值的坑直接使用push不能及时显示在前端页面
               // this.data.todayGoods.push(this.data.monthGoods[i]) ,
               this.setData({
                   ['todayGoods['+len+']']:this.data.monthGoods[i]
               })
               len++;
                this.setData({
                    isSellDay: true
                });  
            }   
        }
        console.log("monthGoods",this.data.monthGoods);
        console.log("todayGoods",this.data.todayGoods);
    },

    onShow() {
        //获取某月的新品销售
        var strmonth = "";//月份的字符串表示（针对个位数月份而言，方便从数据库中查询数据）
        if (month < 9) {
            strmonth = "0" + (month + 1);//如4月转化为04月
            // console.log("strmonth",strmonth);
        }
        else strmonth = month + 1;
        wx.cloud.database().collection("Goods").where({
            sellMonth: strmonth,
        })
            .get()
            .then(res => {
                console.log("获取成功", res);
                this.setData({
                    monthGoods: res.data
                });
                //this.showGood(today);

            })
            .catch(res => {
                console.log("获取失败", res);
            })
    },
    //回到今天
    handleToday(e) {
        this.switchDate(DATE.getFullYear(), DATE.getMonth() + 1);
    }
});