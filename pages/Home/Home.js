/*
1.页面加载即从数据库请求数据，查询当月即3月的商品信息（按月份查询）
   将返回的多个数据对象存入对象数组中，数组长度31还是？（将来是否优化？）
*/


let DATE = new Date();
let month = DATE.getMonth();
let year = DATE.getFullYear();

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

var get_day = (year, month) => {
    return Month_Nums[isRunYear(year)][month];
};

Page({
    data: {
        week: ["日", "一", "二", "三", "四", "五", "六"],
        monthStart: (new Date(year, month, 1)).getDay(),
        day: get_day(year, month),
        //month从0开始，因此要+1
        date: year + '年' + (month + 1) + '月',
        tipsText: "新裙子正在设计中~~~",
        tipsImageSrc: "../../image/AboutTips.jpeg",
        //从数据库请求的数据应该是什么类型的，string型（2021年03月17日）如何判断3月17日有新品
        isSellDay: false, //默认为false，当从数据库请求回来的有数据时设置为ture
        tempdata:[]
    },

    switchMonth(e) {
        console.log(e);
        switch (+e.target.dataset.type) {
            case 0:    //左切
                if (month == 0) {
                    year--;
                    month = 11;
                } else {
                    month--;
                }
                break;
            case 1:    //右切
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
            day: get_day(year, month),
            date: year + "年" + (month + 1) + "月",
            monthStart: (new Date(year, month, 1)).getDay()
        });
        console.log(this.data.monthStart);
    },
    clickItem(e) {
        var day = e.target.dataset.day;
        console.log(year + '年' + (month + 1) + '月' + day + "日");
    },
    //获取某月的新品销售
    getGoodsByMonth(month) {

        console.log(this.data.monthStart);
        wx.cloud.database().collection("Goods").where({
            sell_month: "03",
            
        })
            .get({})
            .then(res => {
                console.log("获取到多条3月份的数据成功", res);
                this.setData({
                    tempdata:res.data
                });
                for(var i=0;i<2;i++){
                    console.log("tempdata.sell_day:",this.data.tempdata[i].sell_day);
                }
                
            })
            .catch(res => {
                console.log("获取3月份的数据失败", res);
            })
    },
    onLoad() {
        this.getGoodsByMonth();
    },
    onReady() {
        //切换年份
        // this.switchDate(2017,4);
    }
});