 let DATE = new Date();
 let month = DATE.getMonth();
 let year = DATE.getFullYear();
 
 //月份天数表，平年和闰年每月天数
 let Month_Nums = [
     [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
     [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
 ];
 
//  判断当前年是不是闰年 是的话返回0，不是返回1，与下面调用有关
 var isRunYear = (year)=> {
     if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
         return 1
     else
         return 0
 };
 
 /**
  * 获取当月有多少天
  * @param year 年
  * @param month 月(未减1)
  * @returns {*}
  */
 var get_day = (year, month)=> {
     return Month_Nums[isRunYear(year)][month];
 };
 
 Page({
     data: {
         week: ["日", "一", "二", "三", "四", "五", "六"],
         monthStart: (new Date(year, month, 1)).getDay(),
         day: get_day(year, month),
         //month从0开始，因此要+1
         date: year + '年'+(month+1)+'月',
         tipsText:"新裙子正在设计中~~~",
         tipsImageSrc:"../../image/AboutTips.jpeg"
     },
 
     switchMonth (e) {
       console.log(e);
         switch (+e.target.dataset.type) {
             case 0 :    //左切
                 if (month == 0) {
                     year--;
                     month = 11;
                 } else {
                     month--;
                 }
                 break;
             case 1 :    //右切
                 if (month == 11) {
                     year++;
                     month = 0;
                 } else {
                     month++;
                 }
                 break;
         }
         this.switchDate(year,month + 1);
     },
 
     //切换年月
     switchDate (y,m) {  //调用此方法切换指定时间
 
         //重置年月
         year = y;
         month = m - 1;
         this.setData({
             day : get_day(year, month),
             date : year + "年" + (month + 1) + "月",
             monthStart: (new Date(year, month, 1)).getDay()
         });
 
     },
 
     clickItem (e) { 
         var day = e.target.dataset.day;
 
         console.log(year + '年'+(month+1)+'月' + day+"日");
 
     },
     onLoad () {
 
 
 
     },
 
     onReady() {
 
         //切换年份
         // this.switchDate(2017,4);
 
     }
 });