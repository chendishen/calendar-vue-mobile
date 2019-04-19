
  export default {
    name: 'vue-Datepicker',
    data() {
      return {
        textTop: ['一', '二', '三', '四', '五', '六', '日'],
        myDate: [],
        list: [],
        dateTop: '',


        showday:true,
        showdaystatus:true,



        markDate: [],
        markList: [],
        agoDayHide: 0,
        futureDayHide:  '15181550670000' ,
        isHideOtherday: true,

        curtimeformat:"",
        curdaytem:""

      };
    },
    props: {
      options:{
        type: Object,
        required: false,
        twoWay: true
      }
    },
    created() {
      this.curtimeformat=this.checkformat(this.options)
      if(this.options.curtime){
        let curtimedata=this.options.curtime.replace(/-/g,"/")

        if(!this.curtimeformat.match('day')){
          let curymd=new Date();
          curtimedata=curymd.getFullYear()+"/"+(curymd.getMonth()+1)+"/"+curymd.getDate()+" "+(this.curtimeformat=='h'?curtimedata+":00":curtimedata)
        }
        this.myDate = new Date(curtimedata);

      }else{
        this.myDate = new Date();
      }
      this.markList=this.options.markList||[]
      this.isHideOtherday=this.options.isHideOtherday||false
      this.init(this.options)
    },
    methods: {
      init: function(options){

        let that = this;
        if(options.format){
          options.format=options.format.toLocaleLowerCase();

          that.getList(that.myDate);
        }else{
          console.log("未设置时间格式")
          return;
        }
      },
      checkformat: function(options){
        let that = this;
        options.format=options.format.toLocaleLowerCase();
        let val=options.format;

        let formatarr=val.split(" ")

        if(formatarr[0]=='yyyy-mm-dd'||formatarr[0]=='yyyy/mm/dd'){
          that.showdaystatus=true

          return 'day'
        }

      },
      setClass(data) {
        let obj = {};
        obj[data.markClassName] = data.markClassName;
        return obj;
      },

      clickDay: function (item, index) {
        // console.log(item);
        let that = this;
        if(item.otherMonth){
          return;
        }
        if (!(this.isHideOtherday && item.nextDayShow) && !item.dayHide) {
          that.curdaytem=item.date;
          if(that.options.format.match(/-/g)){
            that.curdaytem=item.date.replace(/\//g,"-")
          }else{
            that.curdaytem=item.date;
          }

          that.options.curtime=that.curdaytem;

        }
        if (item.otherMonth) {
          item.otherMonth < 0 ? this.PreMonth(item.date) : this.NextMonth(item.date);
        } else {
          if (!(this.isHideOtherday && item.nextDayShow) && !item.dayHide) {
            for (let i = 0; i < this.list.length; i++) {
              if (i == index) {
                this.list[i].isToday = true;
              } else {
                this.list[i].isToday = false;
              }
            }
          }
        }
      },

      // 绑定输出今日打卡
      handelChange(relist) {
        let newArr = this.list;
        // console.log(newArr,"当前页面的每天的各种数据");
        for(let i=0;i<newArr.length;i++){
          if(newArr[i].isTodayNow==true){
            // console.log(newArr[i],"待打卡的index");
            relist = newArr[i];
          }
        }
        this.$emit('change', relist);
      },

      ChoseMonth: function (date, isChosedDay = true) {
        date = this.dateFormat(date);
        this.myDate = new Date(date);
        this.$emit('changeMonth', this.dateFormat(this.myDate));
        this.getList(this.myDate, date, isChosedDay);
      },
      PreMonth: function (date, isChosedDay = true) {
        date = this.dateFormat(date);
        this.myDate = this.getPreMonth(this.myDate);
        this.$emit('changeMonth', this.dateFormat(this.myDate));
        this.getList(this.myDate, date, isChosedDay);
      },
      NextMonth: function (date, isChosedDay = true) {
        date = this.dateFormat(date);
        this.myDate = this.getNextMonth(this.myDate);
        this.$emit('changeMonth', this.dateFormat(this.myDate));
        this.getList(this.myDate, date, isChosedDay);
      },
      getPreMonth: function (date) {
        let timeArray = this.dateFormat(date).split('/');
        let year = timeArray[0];
        let month = timeArray[1];
        let day = timeArray[2];
        let days = new Date(year, month, 0);
        days = days.getDate();
        let year2 = year;
        let month2 = parseInt(month) - 1;
        if (month2 == 0) {
          year2 = parseInt(year2) - 1;
          month2 = 12;
        }
        let day2 = day;
        let days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
          day2 = days2;
        }
        if (month2 < 10) {
          month2 = '0' + month2;
        }
        if (day2 < 10) {
          day2 = '0' + day2;
        }
        let t2 = year2 + '/' + month2 + '/' + day2;
        return new Date(t2);
      },
      getNextMonth: function (date) {
        let arr = this.dateFormat(date).split('/');
        let year = arr[0]; //获取当前日期的年份
        let month = arr[1]; //获取当前日期的月份
        let day = arr[2]; //获取当前日期的日
        let days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中的月的天数
        let year2 = year;
        let month2 = parseInt(month) + 1;
        if (month2 == 13) {
          year2 = parseInt(year2) + 1;
          month2 = 1;
        }
        let day2 = day;
        let days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
          day2 = days2;
        }
        if (month2 < 10) {
          month2 = '0' + month2;
        }
        if (day2 < 10) {
          day2 = '0' + day2;
        }
        let t2 = year2 + '/' + month2 + '/' + day2;
        return new Date(t2);
      },
      getDaysInOneMonth: function (date) {//当前月的天数
        let getyear = date.getFullYear();
        let getmonth = date.getMonth() + 1;
        let d = new Date(getyear, getmonth, 0);
        return d.getDate();
      },
      getMonthweek: function (date) { //向前空几个
        let getyear = date.getFullYear();
        let getmonth = date.getMonth() + 1;
        let dateOne = new Date(getyear + '/' + getmonth + '/1');
        return dateOne.getDay() == 0 ? 6 : dateOne.getDay() - 1;
      },
      getList: function (date, chooseDay, isChosedDay = true) {
        const mygetMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        this.dateTop = date.getFullYear() + '年' + mygetMonth + '月';
        let array = [];
        const onMonthDays = this.getDaysInOneMonth(date);
        for (let i = 0; i < onMonthDays; i++) {
          const nowTime = date.getFullYear() + '/' + (date.getMonth()>=9?date.getMonth() + 1:'0'+(date.getMonth() + 1)) + '/' + (i>=9?i + 1:'0'+(i+1));
          let markClassName = "";
          for (const k of this.markList) {
            k.date=k.date.replace(/-/g,"/")
            if (new Date(k.date).getTime() == new Date(nowTime).getTime()) {
              markClassName = k.className;
            }
          }
          let listObj = {
            id: i + 1,
            date: nowTime,
            isMark: this.markDate.indexOf(nowTime) >= 0,
            dayHide: new Date(nowTime).getTime() / 1000 < parseInt(this.agoDayHide) || new Date(nowTime).getTime() / 1000 > parseInt(this.futureDayHide),
            markClassName: markClassName,
            nextDayShow:
              new Date(nowTime).getTime() >
              new Date().getTime()
          }
          if (this.dateFormat(new Date(this.myDate)) == this.dateFormat(new Date(nowTime)) && !chooseDay) {
            listObj = Object.assign(listObj, {
              isTodayNow: true,
              isToday: true,
              // 添加一个当前日期
              isTodayTime: this.dateFormat(new Date(this.myDate)),
            })
            this.$emit(
              'isToday',
              this.dateFormat(nowTime)
            );
          }
          else {
            listObj = Object.assign(listObj, {
              isTodayNow: false,
              isToday: chooseDay == nowTime && isChosedDay
            })
          }
          array.push(listObj);
        }
        const leftArr = this.getLeftArr(date);
        const rightArr = this.getRightArr(date, array);
        array = [...leftArr, ...array, ...rightArr];
        this.list = array;

        // 暴露调用事件
        this.handelChange();
      },
      getLeftArr: function (date) {
        let array = [];
        const leftNum = this.getMonthweek(date);
        const num = this.getDaysInOneMonth(this.getPreMonth(date)) - leftNum + 1;
        const preDate = this.getPreMonth(date);
        //上个月多少开始
        for (let i = 0; i < leftNum; i++) {
          const nowTime = preDate.getFullYear() + '/' + (preDate.getMonth() + 1) + '/' + (num + i);
          array.push(
            {
              id: num + i,
              date: nowTime,
              dayHide: new Date(nowTime).getTime() / 1000 < parseInt(this.agoDayHide) || new Date(nowTime).getTime() / 1000 > parseInt(this.futureDayHide),
              nextDayShow:
                new Date(nowTime).getTime() >
                new Date().getTime(),
              otherMonth: -1
            });
        }
        return array;
      },
      getRightArr: function (date, arr) {
        let array = [];
        const nextDate = this.getNextMonth(date);
        const _length = 7 - arr.length % 7;
        //向后添加数据
        if (_length < 7) {
          for (let i = 0; i < _length; i++) {
            const nowTime = nextDate.getFullYear() + '/' + (nextDate.getMonth() + 1) + '/' + (i + 1);
            array.push({
              id: i + 1,
              date: nextDate.getFullYear() + '/' + (nextDate.getMonth() + 1) + '/' + (i + 1),
              dayHide: new Date(nowTime).getTime() / 1000 < parseInt(this.agoDayHide) || new Date(nowTime).getTime() / 1000 > parseInt(this.futureDayHide),
              nextDayShow:
                new Date(nowTime).getTime() >
                new Date().getTime(),
              otherMonth: 1
            });
          }
        }
        return array;
      },
      dateFormat: function (date) {
        date = new Date(date)
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
      }
    },
    mounted() {
      //this.getList(this.myDate);
    },
    watch: {
      markDate(val, oldVal) {
        this.getList(this.myDate);
      },
      markList(val, oldVal) {
        this.getList(this.myDate);
      }
    }
  };
