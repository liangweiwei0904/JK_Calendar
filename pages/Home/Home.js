/*
1.页面加载即从数据库请求数据，查询当月即3月的商品信息（按月份查询）
   将返回的多个数据对象存入对象数组中，数组长度31还是？（将来是否优化？）
*/
let DATE = new Date();
let month = DATE.getMonth();
let year = DATE.getFullYear();
let today = DATE.getDate();
//月份天数表，平年和闰年每月天数
let Month_Nums = [
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
var get_month_num = (year, month) => {
    return Month_Nums[isRunYear(year)][month];
};

Page({
    data: {
        week: ["日", "一", "二", "三", "四", "五", "六"],
        monthStart: (new Date(year, month, 1)).getDay(),//得到某月1号是周(1,2,3,4,5,6,7)
        day: get_month_num(year, month),//获取某月有多少天
        //month从0开始，因此要+1
        date: year + '年' + (month + 1) + '月',//首页选择器里显示的2021年X月
        tipsImageSrc: "../../image/TipsImage.jpg",
        //从数据库请求的数据应该是什么类型的，string型（2021年03月17日）如何判断3月17日有新品
        isSellDay: false, //是否有新品？默认为false
        tempdata: [],
        NewGoods: [],
        today: today
    },
    //选择器"<"和">"的点击事件
    switchMonth(e) {
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
    },

    //切换年月
    switchDate(y, m) {  //调用此方法切换指定时间
        //重置年月
        year = y;
        month = m - 1;
        this.setData({
            day: get_month_num(year, month),
            date: year + "年" + (month + 1) + "月",
            monthStart: (new Date(year, month, 1)).getDay()
        });
    },
    //点击这一天的时候，在下边的显示模块提示当天即将上架的裙子
    clickItem(e) {
        var day = e.target.dataset.day;
        console.log(year + '年' + (month + 1) + '月' + day + "日");
        //如果用户点击16，获取到数字16之后呢
        //从tempdata里面找到sell_day为16的数据并将其赋值给NewGoods
        //渲染的时候，直接显示NewGoods数组里的内容
        //问题：当点击某一个售卖日之后，NewGoods里面会附上值，再次点击非售卖日，这个值应该清空
        this.showGood(day);
        
    },
    //判断是否有新品
    showGood(day){
        for (var i = 0; i < this.data.tempdata.length; i++) {
            if (day == this.data.tempdata[i].sell_day) {
                this.setData({
                    NewGoods: this.data.tempdata[i],
                    isSellDay: true
                });
                console.log("this.data.NewGoods", this.data.NewGoods);
                break;
            }
            else {
                this.setData({
                    NewGoods: [],
                    isSellDay: false
                });
            }
        }
    },

    onShow() {
        //获取某月的新品销售

        wx.cloud.database().collection("Goods").where({
            sell_month: "04",

        })
            .get()
            .then(res => {
                console.log("获取到多条3月份的数据成功", res);
                this.setData({
                    tempdata: res.data
                });
                for (var i = 0; i < 2; i++) {
                    console.log("tempdata.sell_day:", this.data.tempdata[i].sell_day);
                }
                this.showGood(today);

            })
            .catch(res => {
                console.log("获取3月份的数据失败", res);
            })

        console.log("today", today);

    },
    //回到今天
    handleToday(e) {
        this.switchDate(DATE.getFullYear(), DATE.getMonth() + 1);
    }
});