<template>
  <div class="content">
    <div class="example">
      <h5>时间格式：{{options.format}}</h5>
      <p>时间：{{options.curtime}}</p>
      <Datepicker ref="Datepicker" :options="options" @change="clock"></Datepicker>
    </div>
    <div class="funcList">
      <ul>
        <li>
          <div>
            <span>您已累计打卡 xx 天</span>
            <div @click="daka" class="btn">今日打卡</div>
          </div>
        </li>
        <li>
          <div>
            <span>不接单时间标记</span>
            <div class="btn" @click="showDateSegmentPicker">现在创建</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Datepicker from "../vueDatepicker/index";

// cube-ui
const dateSegmentData = [
  {
    is: 'cube-date-picker',
    title: '起始时间',
    min: new Date(2000, 0, 1),
    max: new Date(2030, 11, 31),
    format:{
      year:'YYYY',
      month:'MM',
      date:'DD'
    }
  },
  {
    is: 'cube-date-picker',
    title: '结束时间',
    min: new Date(2000, 0, 1),
    max: new Date(2030, 11, 31),
    format:{
      year:'YYYY',
      month:'MM',
      date:'DD'
    }
  }
]

export default {
  data() {
    return {
      options: {
        curtime: "", //为空时，获取当前时间  （参数是必须项，但可以不赋值）
        format: "yyyy-mm-dd", //时间格式   （必选项）
        isHideOtherday: false, //是否禁止选择未标记的日期（true禁止)  （可选项）
        _markList: [
          {
            date: "2019-04-11",
            className: "label1" //自定义class选择器名称
          },
          {
            date: "2019/4/2",
            className: "label1 clock"
          },
          {
            date: "2019/4/3",
            className: "label1"
          },
          {
            date: "2019/04/13",
            className: "label2"
          },
          {
            date: "2019/04/14",
            className: "label2"
          }
        ],
        get markList() {
          return this._markList;
        },
        set markList(value) {
          this._markList = value;
        },
      },
      todayClock: "",
      inputClock: {
        date: "",
        className: ""
      }

    };
  },
  watch: {
    "options.curtime": function() {
      console.log("watch监听到options.curtime的点击");
      console.log(this.options.curtime);
      //alert(this.options.curtime)
    },
    options: {
      handler(curtime, old) {
        //...
      },
      immediate: true
    }
  },
  components: {
    Datepicker
  },
  methods: {
    clock(res) {
      console.log("接受到的是change的所有参数");
      console.log("res", res);
      this.todayClock = res;
    },
    daka() {
      //今日打卡方法
      //如果今日不存在类名clock（没打卡），那么就打卡
      if (this.todayClock.markClassName.indexOf("clock") == -1) {
        this.inputClock = {
          date: this.todayClock.date,
          className: this.todayClock.markClassName + " clock"
        };
      }

      this.options._markList.push(this.inputClock);
      console.log(this.options);
    },
    showDateSegmentPicker() {
      this.dateSegmentPicker.show()
    }
  },
  created() {},
   mounted () {
    this.dateSegmentPicker = this.$createSegmentPicker({
      data: dateSegmentData,
      onSelect: (selectedDates, selectedVals, selectedTexts) => {
        this.$createDialog({
          type: 'warn',
          content: `这就是想要提交给后台的时间: <br/> - 起始时间: ${selectedTexts[0].join('-')} <br/> - 结束时间: ${selectedTexts[1].join('-')}`,
          icon: 'cubeic-alert'
        }).show()
      },
      onNext: (i, selectedDate, selectedValue, selectedText) => {
        dateSegmentData[1].min = selectedDate
        if (i === 0) {
          this.dateSegmentPicker.$updateProps({
            data: dateSegmentData
          })
        }
      }
    })
  },
};
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style>
h3 {
  text-align: center;
  width: 90%;
  margin: auto;
}
.example {
  position: relative;
  width: 400px;
  margin: 20px auto;
}

.example h5 {
  line-height: 30px;
}
.example p {
  line-height: 30px;
}

.div {
  margin: auto;
  width: 220px;
  height: 44px;
  line-height: 44px;
  background: #0fc37c;
  color: #fff;
  font-size: 17px;
  text-align: center;
  margin-top: 20px;
}

/* 按钮样式：
     */
.btn {
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #ccc;
  border-radius: 30px;
  cursor: pointer;
  float: right;
}

.label1 {
  background-color: #e75275;
}

.label2 {
  background-color: #6adedd;
}

/* 今日打卡样式 */
.clock::after {
  content: "\2713";
  position: absolute;
  width: 21px;
  height: 21px;
  top: 8px;
  left: 19px;
  font-size: 23px;
}
.funcList ul{
  overflow: auto;
  display: block;
  width: 400px;
  margin: 0 auto;
}
.funcList li{
  display: block;
  height: 60px;
  margin: 2px auto;
}

</style>
